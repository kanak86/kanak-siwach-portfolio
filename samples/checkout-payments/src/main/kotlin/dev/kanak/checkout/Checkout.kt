package dev.kanak.checkout

/**
 * Original sample: a provider-agnostic checkout modelled as a small state machine.
 * It shows the *pattern* used to host several payment methods (card, wallet, buy-now-pay-later)
 * behind one interface. No employer code; provider SDK calls are faked behind [PaymentProvider].
 */
@JvmInline value class Cents(val value: Long) {
    operator fun plus(o: Cents) = Cents(value + o.value)
    operator fun minus(o: Cents) = Cents(value - o.value)
    override fun toString() = "$${value / 100}.${(value % 100).toString().padStart(2, '0')}"
}

enum class MethodType { CARD, WALLET, INSTALLMENTS_4, FINANCING }

/** Each provider declares when it is eligible; the UI simply renders what the registry returns. */
interface PaymentProvider {
    val type: MethodType
    fun isEligible(order: Order): Boolean
    suspend fun authorize(order: Order): AuthResult
}

data class Order(val subtotal: Cents, val shipping: Cents, val currency: String = "USD", val country: String = "US") {
    val total: Cents get() = subtotal + shipping
}

sealed interface AuthResult {
    data class Approved(val reference: String) : AuthResult
    data class Declined(val reason: String) : AuthResult
    data class NeedsAction(val redirectUrl: String) : AuthResult // e.g. 3DS or provider hosted flow
}

class PaymentRegistry(private val providers: List<PaymentProvider>) {
    fun available(order: Order): List<MethodType> =
        providers.filter { it.isEligible(order) }.map { it.type }

    fun provider(type: MethodType): PaymentProvider =
        providers.first { it.type == type }
}

/** Pay-in-4: equal installments, remainder cents pushed onto the first payment so the sum is exact. */
fun splitInFour(total: Cents): List<Cents> {
    val base = total.value / 4
    val remainder = total.value - base * 4
    return listOf(Cents(base + remainder), Cents(base), Cents(base), Cents(base))
}

// ---- Checkout state machine -------------------------------------------------------------------

sealed interface CheckoutState {
    data class Reviewing(val order: Order, val selected: MethodType?, val available: List<MethodType>) : CheckoutState
    data class Processing(val order: Order, val method: MethodType) : CheckoutState
    data class ActionRequired(val order: Order, val method: MethodType, val url: String) : CheckoutState
    data class Success(val reference: String) : CheckoutState
    data class Failed(val order: Order, val method: MethodType, val reason: String, val available: List<MethodType>) : CheckoutState
}

sealed interface CheckoutEvent {
    data class SelectMethod(val type: MethodType) : CheckoutEvent
    data object Pay : CheckoutEvent
    data class Authorized(val result: AuthResult) : CheckoutEvent
    data object Retry : CheckoutEvent
}

/** Pure transition function: illegal transitions are ignored, never crash. */
fun reduce(state: CheckoutState, event: CheckoutEvent): CheckoutState = when {
    state is CheckoutState.Reviewing && event is CheckoutEvent.SelectMethod ->
        if (event.type in state.available) state.copy(selected = event.type) else state

    state is CheckoutState.Reviewing && event is CheckoutEvent.Pay ->
        state.selected?.let { CheckoutState.Processing(state.order, it) } ?: state

    state is CheckoutState.Processing && event is CheckoutEvent.Authorized -> when (val r = event.result) {
        is AuthResult.Approved -> CheckoutState.Success(r.reference)
        is AuthResult.Declined -> CheckoutState.Failed(state.order, state.method, r.reason, emptyList())
        is AuthResult.NeedsAction -> CheckoutState.ActionRequired(state.order, state.method, r.redirectUrl)
    }

    state is CheckoutState.ActionRequired && event is CheckoutEvent.Authorized -> when (val r = event.result) {
        is AuthResult.Approved -> CheckoutState.Success(r.reference)
        is AuthResult.Declined -> CheckoutState.Failed(state.order, state.method, r.reason, emptyList())
        is AuthResult.NeedsAction -> state
    }

    state is CheckoutState.Failed && event is CheckoutEvent.Retry ->
        CheckoutState.Reviewing(state.order, selected = null, available = state.available)

    else -> state
}

// ---- Example eligibility rules (illustrative thresholds) --------------------------------------

class CardProvider : PaymentProvider {
    override val type = MethodType.CARD
    override fun isEligible(order: Order) = true
    override suspend fun authorize(order: Order): AuthResult = AuthResult.Approved("card-${order.total.value}")
}

class WalletProvider : PaymentProvider {
    override val type = MethodType.WALLET
    override fun isEligible(order: Order) = order.currency == "USD"
    override suspend fun authorize(order: Order): AuthResult = AuthResult.Approved("wallet-${order.total.value}")
}

class InstallmentsProvider(private val min: Cents = Cents(3_500), private val max: Cents = Cents(100_000)) : PaymentProvider {
    override val type = MethodType.INSTALLMENTS_4
    override fun isEligible(order: Order) = order.country == "US" && order.total.value in min.value..max.value
    override suspend fun authorize(order: Order): AuthResult = AuthResult.NeedsAction("https://example.test/hosted-flow")
}

class FinancingProvider(private val min: Cents = Cents(5_000)) : PaymentProvider {
    override val type = MethodType.FINANCING
    override fun isEligible(order: Order) = order.country == "US" && order.total.value >= min.value
    override suspend fun authorize(order: Order): AuthResult = AuthResult.Declined("credit check failed (demo)")
}

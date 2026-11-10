package dev.kanak.shared

/**
 * Original sample for Kotlin Multiplatform: business rules written ONCE in commonMain and consumed by
 * Android (Kotlin) and iOS (Swift). UI stays native on each platform; only logic is shared. This is the
 * approach to prototype first: share the domain/rules, keep the UI native, and expand only where it pays off.
 */
data class CartItem(val sku: String, val unitPriceCents: Long, val quantity: Int)

data class Cart(val items: List<CartItem> = emptyList(), val promoPercent: Int = 0) {
    val subtotalCents: Long get() = items.sumOf { it.unitPriceCents * it.quantity }
    val discountCents: Long get() = subtotalCents * promoPercent / 100
    val totalCents: Long get() = subtotalCents - discountCents
    val itemCount: Int get() = items.sumOf { it.quantity }
}

sealed interface CartAction {
    data class Add(val sku: String, val unitPriceCents: Long) : CartAction
    data class Remove(val sku: String) : CartAction
    data class SetQuantity(val sku: String, val quantity: Int) : CartAction
    data class ApplyPromo(val code: String) : CartAction
}

private val PROMOS = mapOf("WELCOME10" to 10, "SAVE20" to 20)

/** Pure reducer: identical behaviour on every platform, tested once. */
fun Cart.reduce(action: CartAction): Cart = when (action) {
    is CartAction.Add -> {
        val existing = items.find { it.sku == action.sku }
        if (existing == null) copy(items = items + CartItem(action.sku, action.unitPriceCents, 1))
        else copy(items = items.map { if (it.sku == action.sku) it.copy(quantity = it.quantity + 1) else it })
    }
    is CartAction.Remove -> copy(items = items.filterNot { it.sku == action.sku })
    is CartAction.SetQuantity ->
        if (action.quantity <= 0) copy(items = items.filterNot { it.sku == action.sku })
        else copy(items = items.map { if (it.sku == action.sku) it.copy(quantity = action.quantity) else it })
    is CartAction.ApplyPromo -> PROMOS[action.code.trim().uppercase()]?.let { copy(promoPercent = it) } ?: this
}

fun formatUsd(cents: Long): String {
    val sign = if (cents < 0) "-" else ""
    val abs = kotlin.math.abs(cents)
    return "$sign$${abs / 100}.${(abs % 100).toString().padStart(2, '0')}"
}

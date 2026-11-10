package dev.kanak.checkout

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs

class CheckoutTest {
    private val registry = PaymentRegistry(listOf(CardProvider(), WalletProvider(), InstallmentsProvider(), FinancingProvider()))

    @Test fun `small orders hide installments and financing`() {
        val order = Order(Cents(2_000), Cents(500))
        assertEquals(listOf(MethodType.CARD, MethodType.WALLET), registry.available(order))
    }

    @Test fun `mid-size US orders offer all methods`() {
        val order = Order(Cents(20_000), Cents(0))
        assertEquals(MethodType.entries, registry.available(order))
    }

    @Test fun `non-USD orders hide wallet`() {
        val order = Order(Cents(20_000), Cents(0), currency = "EUR", country = "DE")
        assertEquals(listOf(MethodType.CARD), registry.available(order))
    }

    @Test fun `installments always sum to the total`() {
        listOf(10_001L, 9_999L, 3_500L, 12_345L).forEach {
            assertEquals(it, splitInFour(Cents(it)).sumOf { c -> c.value })
        }
    }

    @Test fun `happy path reaches success`() {
        val order = Order(Cents(20_000), Cents(0))
        var s: CheckoutState = CheckoutState.Reviewing(order, null, registry.available(order))
        s = reduce(s, CheckoutEvent.Pay)                     // nothing selected -> ignored
        assertIs<CheckoutState.Reviewing>(s)
        s = reduce(s, CheckoutEvent.SelectMethod(MethodType.CARD))
        s = reduce(s, CheckoutEvent.Pay)
        assertIs<CheckoutState.Processing>(s)
        s = reduce(s, CheckoutEvent.Authorized(AuthResult.Approved("ref-1")))
        assertEquals(CheckoutState.Success("ref-1"), s)
    }

    @Test fun `hosted flow then decline allows retry`() {
        val order = Order(Cents(20_000), Cents(0))
        val avail = registry.available(order)
        var s: CheckoutState = CheckoutState.Reviewing(order, MethodType.INSTALLMENTS_4, avail)
        s = reduce(s, CheckoutEvent.Pay)
        s = reduce(s, CheckoutEvent.Authorized(AuthResult.NeedsAction("https://x")))
        assertIs<CheckoutState.ActionRequired>(s)
        s = reduce(s, CheckoutEvent.Authorized(AuthResult.Declined("nope")))
        assertIs<CheckoutState.Failed>(s)
        s = reduce(s, CheckoutEvent.Retry)
        assertIs<CheckoutState.Reviewing>(s)
    }

    @Test fun `selecting an ineligible method is ignored`() {
        val order = Order(Cents(2_000), Cents(0))
        val s = CheckoutState.Reviewing(order, null, registry.available(order))
        assertEquals(s, reduce(s, CheckoutEvent.SelectMethod(MethodType.FINANCING)))
    }
}

package dev.kanak.shared

import kotlin.test.Test
import kotlin.test.assertEquals

class CartTest {
    @Test fun addingSameSkuIncrementsQuantity() {
        val c = Cart().reduce(CartAction.Add("a", 1000)).reduce(CartAction.Add("a", 1000))
        assertEquals(2, c.itemCount)
        assertEquals(2000, c.totalCents)
    }

    @Test fun promoAppliesAndUnknownCodeIsIgnored() {
        val base = Cart().reduce(CartAction.Add("a", 10_000))
        assertEquals(9_000, base.reduce(CartAction.ApplyPromo(" welcome10 ")).totalCents)
        assertEquals(10_000, base.reduce(CartAction.ApplyPromo("NOPE")).totalCents)
    }

    @Test fun zeroQuantityRemovesItem() {
        val c = Cart().reduce(CartAction.Add("a", 500)).reduce(CartAction.SetQuantity("a", 0))
        assertEquals(0, c.items.size)
    }

    @Test fun formatsCurrency() {
        assertEquals("$12.05", formatUsd(1205))
        assertEquals("-$0.99", formatUsd(-99))
    }
}

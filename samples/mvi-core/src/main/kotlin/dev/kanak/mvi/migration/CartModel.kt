package dev.kanak.mvi.migration

/** Shared model for the before/after presenter migration example. Prices are in cents. */
data class CartState(val items: List<Int> = emptyList()) {
    val total: Int get() = items.sum()
}

sealed interface CartEvent {
    data class Add(val priceCents: Int) : CartEvent
    data object Checkout : CartEvent
}

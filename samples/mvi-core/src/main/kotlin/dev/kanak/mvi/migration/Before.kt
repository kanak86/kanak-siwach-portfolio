package dev.kanak.mvi.migration

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.scan

// BEFORE: the deprecated pattern a migration skill rewrites.
// - Two generics, no effect type.
// - Initial state is computed inside bind() from a nullable lastState.
// - Side effects are delegated to an injected coordinator.

interface CartCoordinator {
    fun openCheckout(totalCents: Int)
}

abstract class LegacyStatePresenter<S : Any, E : Any> {
    abstract fun bind(lastState: S?, events: Flow<E>): Flow<S>
}

class LegacyCartPresenter(
    private val coordinator: CartCoordinator, // injected only to perform side effects
) : LegacyStatePresenter<CartState, CartEvent>() {

    override fun bind(lastState: CartState?, events: Flow<CartEvent>): Flow<CartState> =
        events.scan(lastState ?: CartState()) { state, event ->
            when (event) {
                is CartEvent.Add -> state.copy(items = state.items + event.priceCents)
                CartEvent.Checkout -> {
                    coordinator.openCheckout(state.total)
                    state
                }
            }
        }
}

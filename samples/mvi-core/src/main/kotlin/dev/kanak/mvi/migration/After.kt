package dev.kanak.mvi.migration

import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.flow.scan

// AFTER: what the migration produces.
// - A third generic for typed one-shot effects.
// - Initial state is passed to the constructor; bind() only takes events.
// - scan() is seeded from state.value.
// - Coordinator calls become sendEffect(...), collected by the screen's controller.

abstract class BasePresenter<S : Any, E : Any, Ef : Any>(initialState: S) {
    private val _state = MutableStateFlow(initialState)
    val state: StateFlow<S> = _state.asStateFlow()

    private val _effects = Channel<Ef>(Channel.BUFFERED)
    val effects: Flow<Ef> = _effects.receiveAsFlow()

    protected abstract fun bind(events: Flow<E>): Flow<S>

    /** Called by the composable that owns the presenter's lifecycle. */
    fun attach(events: Flow<E>): Flow<S> = bind(events).onEach { _state.value = it }

    protected fun sendEffect(effect: Ef) {
        _effects.trySend(effect)
    }
}

sealed interface CartEffect {
    data class OpenCheckout(val totalCents: Int) : CartEffect
}

class CartPresenter : BasePresenter<CartState, CartEvent, CartEffect>(CartState()) {

    override fun bind(events: Flow<CartEvent>): Flow<CartState> =
        events.scan(state.value) { state, event ->
            when (event) {
                is CartEvent.Add -> state.copy(items = state.items + event.priceCents)
                CartEvent.Checkout -> {
                    sendEffect(CartEffect.OpenCheckout(state.total))
                    state
                }
            }
        }
}

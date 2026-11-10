package dev.kanak.mvi

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch

/** Marker types. Intents are what the user/system *wants*; State is what the UI *shows*; Effects are one-shot events. */
interface MviIntent
interface MviState
interface MviEffect

/**
 * Minimal, framework-agnostic MVI container.
 *
 * - A single immutable [state] is the only source of truth for the UI.
 * - Every change goes through [reduce], a pure function (State, Result) -> State, which makes
 *   screens trivially unit-testable without Android.
 * - One-shot [effects] (navigation, toasts) are delivered exactly once via a Channel.
 */
abstract class MviViewModel<I : MviIntent, S : MviState, R, E : MviEffect>(
    initialState: S,
    protected val scope: CoroutineScope,
) {
    private val _state = MutableStateFlow(initialState)
    val state: StateFlow<S> = _state.asStateFlow()

    private val _effects = Channel<E>(Channel.BUFFERED)
    val effects: Flow<E> = _effects.receiveAsFlow()

    /** Turn an intent into a stream of partial results (loading, success, failure...). */
    protected abstract fun handle(intent: I, current: S): Flow<R>

    /** Pure reducer: previous state + result => next state. */
    protected abstract fun reduce(previous: S, result: R): S

    fun dispatch(intent: I) {
        scope.launch {
            handle(intent, _state.value).collect { result ->
                _state.value = reduce(_state.value, result)
            }
        }
    }

    protected fun sendEffect(effect: E) {
        _effects.trySend(effect)
    }
}

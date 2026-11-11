---
name: migrate-presenter
description: Migrates a presenter from the deprecated LegacyStatePresenter<State, Event> + injected coordinator pattern to BasePresenter<State, Event, Effect> with typed one-shot effects. Use when asked to migrate a presenter or a screen to the new presenter base class.
---

# Migrate a presenter to BasePresenter

The key change: side effects that were delegated to an injected coordinator become typed `Effect` values,
emitted with `sendEffect(...)` and collected by the screen's controller.

## What changes

| | Before (`LegacyStatePresenter`) | After (`BasePresenter`) |
|---|---|---|
| Generics | `<State, Event>` | `<State, Event, Effect>` |
| Initial state | Computed inside `bind(lastState, events)` | Passed to the super constructor |
| `bind()` | `bind(lastState: State?, events: Flow<Event>)` | `bind(events: Flow<Event>)` |
| `scan()` seed | `lastState ?: FooState(...)` | `state.value` |
| Side effects | `coordinator.doSomething(...)` | `sendEffect(FooEffect.DoSomething(...))` |
| Coordinator | Injected constructor parameter | Removed |
| `.onStart { emit(initialState) }` workaround | Often present | Remove it |

## Steps

1. Read the presenter, its state and event types, its coordinator interface, and every call site of the coordinator.
2. Create `sealed interface FooEffect` with one case per coordinator method the presenter calls. Carry the same arguments.
3. Change the superclass to `BasePresenter<FooState, FooEvent, FooEffect>(FooState(...))`, moving the initial state
   out of `bind()`.
4. Change `bind` to take only `events`, seed `scan` with `state.value`, and replace each coordinator call with `sendEffect`.
5. Remove the coordinator from the constructor and from DI. Remove any `onStart { emit(...) }` workaround.
6. In the controller, collect `presenter.effects` and route each effect to what the coordinator used to do.
7. Update tests: assert the same state sequence as before, and replace coordinator verifications with effect assertions.
8. Build and run the screen's tests. Report anything you could not migrate mechanically instead of guessing.

See `samples/mvi-core/src/main/kotlin/dev/kanak/mvi/migration/` for a worked before/after example with tests.

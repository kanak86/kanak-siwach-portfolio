---
name: mvi-feature
description: Scaffold a new MVI feature (Intent, State, Result, Effect, ViewModel, Screen, tests) following the team's conventions. Use when asked to add a new screen or feature.
---

# MVI feature scaffold

Create, in the feature package:
- `XIntent` (sealed), `XState` (immutable data class), `XResult` (sealed), `XEffect` (sealed, one-shot)
- `XViewModel` with a pure `reduce(previous, result)` and `handle(intent, current): Flow<XResult>`
- `XScreen` (stateless content + stateful wrapper) with previews for loading / content / error
- `XViewModelTest`: one test per intent, covering success, failure and effect emission

Rules: state is the single source of truth; reducers are pure; side effects only through `XEffect`;
no Android types in the ViewModel.

# Samples

Small, original examples of patterns I use in production. They are written from scratch and contain no employer code.

| Sample | What it shows | Runs in CI |
|---|---|---|
| [`mvi-core`](mvi-core) | MVI container (intent → result → reducer → state, one-shot effects) and a feature with tests | yes |
| [`checkout-payments`](checkout-payments) | Provider registry with eligibility rules, exact pay-in-4 split, checkout state machine | yes |
| [`bff-core`](bff-core) | BFF aggregator: parallel fan-out, timeouts, graceful degradation; Ktor wiring in `ktor-wiring/` | yes (core only) |
| [`kmp-shared`](kmp-shared) | Kotlin Multiplatform shared cart rules (`commonMain`) + SwiftUI usage sketch | yes (JVM target) |
| [`rn-native-module`](rn-native-module) | React Native ↔ native Android view bridge (TS + Kotlin) | reading sample |
| [`claude-agents`](claude-agents) | Claude Code subagent and skill definitions | n/a |

Run any JVM module: `cd samples/<module> && gradle test` (JDK 17).

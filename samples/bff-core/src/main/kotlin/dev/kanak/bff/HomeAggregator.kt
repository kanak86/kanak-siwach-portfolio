package dev.kanak.bff

import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withTimeoutOrNull

/**
 * Original sample of a Backend-For-Frontend (BFF) aggregation layer.
 *
 * Problem it solves: a mobile home screen needs data from several services. Calling them one by one from
 * the phone costs round-trips on a slow network, and every client re-implements the same stitching logic.
 *
 * The BFF: fans out to downstream services in parallel, enforces per-call timeouts, degrades gracefully when
 * a non-critical dependency is slow or down, and returns ONE response shaped for the screen.
 */
data class User(val id: String, val name: String)
data class OrderSummary(val id: String, val status: String)
data class Recommendation(val sku: String, val title: String)

interface UserService { suspend fun get(id: String): User }
interface OrderService { suspend fun recent(userId: String): List<OrderSummary> }
interface RecoService { suspend fun forUser(userId: String): List<Recommendation> }

/** Section state is explicit so the client can render skeleton/retry UI instead of guessing. */
sealed interface Section<out T> {
    data class Ok<T>(val data: T) : Section<T>
    data class Degraded(val reason: String) : Section<Nothing>
}

data class HomeResponse(
    val user: User,                                   // critical: no user => whole call fails
    val orders: Section<List<OrderSummary>>,                 // non-critical
    val recommendations: Section<List<Recommendation>>, // non-critical
)

class HomeAggregator(
    private val users: UserService,
    private val orders: OrderService,
    private val recos: RecoService,
    private val criticalTimeoutMs: Long = 1_500,
    private val optionalTimeoutMs: Long = 400,
) {
    suspend fun home(userId: String): HomeResponse = coroutineScope {
        // All three start immediately -> latency ~= slowest call, not the sum.
        val user = async { users.get(userId) }
        val ord = async { optional("orders") { orders.recent(userId) } }
        val rec = async { optional("recommendations") { recos.forUser(userId) } }

        val u = withTimeoutOrNull(criticalTimeoutMs) { user.await() }
            ?: error("user service timed out")
        HomeResponse(u, ord.await(), rec.await())
    }

    private suspend fun <T> optional(name: String, block: suspend () -> T): Section<T> =
        try {
            withTimeoutOrNull(optionalTimeoutMs) { block() }
                ?.let { Section.Ok(it) }
                ?: Section.Degraded("$name timed out")
        } catch (e: Exception) {
            Section.Degraded("$name failed: ${e.message}")
        }
}

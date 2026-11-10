package dev.kanak.bff

import kotlinx.coroutines.delay
import kotlinx.coroutines.test.currentTime
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertIs
import kotlin.test.assertTrue

class HomeAggregatorTest {
    private fun users(delayMs: Long = 100) = object : UserService {
        override suspend fun get(id: String): User { delay(delayMs); return User(id, "Kanak") }
    }
    private fun orders(delayMs: Long = 100, fail: Boolean = false) = object : OrderService {
        override suspend fun recent(userId: String): List<OrderSummary> {
            delay(delayMs); if (fail) error("db down"); return listOf(OrderSummary("o1", "SHIPPED"))
        }
    }
    private fun recos(delayMs: Long = 100) = object : RecoService {
        override suspend fun forUser(userId: String) = delay(delayMs).let { listOf(Recommendation("sku1", "Shoe")) }
    }

    @Test fun `calls run in parallel so latency is the slowest call, not the sum`() = runTest {
        val r = HomeAggregator(users(300), orders(300), recos(300)).home("u1")
        assertIs<Section.Ok<*>>(r.orders)
        assertIs<Section.Ok<*>>(r.recommendations)
        assertTrue(currentTime < 600, "expected ~300ms virtual time, was $currentTime")
    }

    @Test fun `slow optional dependency degrades instead of failing`() = runTest {
        val r = HomeAggregator(users(), orders(), recos(delayMs = 5_000)).home("u1")
        assertEquals("Kanak", r.user.name)
        assertEquals(Section.Degraded("recommendations timed out"), r.recommendations)
    }

    @Test fun `failing optional dependency degrades with reason`() = runTest {
        val r = HomeAggregator(users(), orders(fail = true), recos()).home("u1")
        assertEquals(Section.Degraded("orders failed: db down"), r.orders)
    }

    @Test fun `critical dependency timeout fails the whole call`() = runTest {
        assertFailsWith<IllegalStateException> { HomeAggregator(users(delayMs = 9_000), orders(), recos()).home("u1") }
    }
}

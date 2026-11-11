package dev.kanak.mvi.migration

import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals

/** The migration must not change behavior: same states out, same side effect, new delivery mechanism. */
class PresenterMigrationTest {
    private val events = listOf(CartEvent.Add(12000), CartEvent.Add(9000), CartEvent.Checkout)

    @Test fun `migrated presenter emits the same states as the legacy one`() = runTest {
        val legacy = LegacyCartPresenter(object : CartCoordinator {
            override fun openCheckout(totalCents: Int) = Unit
        }).bind(null, flowOf(*events.toTypedArray())).toList()

        val migrated = CartPresenter().attach(flowOf(*events.toTypedArray())).toList()

        assertEquals(legacy, migrated)
    }

    @Test fun `coordinator call becomes a typed effect`() = runTest {
        val opened = mutableListOf<Int>()
        LegacyCartPresenter(object : CartCoordinator {
            override fun openCheckout(totalCents: Int) { opened += totalCents }
        }).bind(null, flowOf(*events.toTypedArray())).toList()

        val presenter = CartPresenter()
        presenter.attach(flowOf(*events.toTypedArray())).toList()

        assertEquals(listOf(21000), opened)
        assertEquals(CartEffect.OpenCheckout(21000), presenter.effects.first())
    }

    @Test fun `state flow holds the latest state after attach`() = runTest {
        val presenter = CartPresenter()
        presenter.attach(flowOf(*events.toTypedArray())).toList()
        assertEquals(21000, presenter.state.value.total)
    }
}

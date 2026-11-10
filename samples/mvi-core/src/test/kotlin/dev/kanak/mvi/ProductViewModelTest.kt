package dev.kanak.mvi

import app.cash.turbine.test
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class ProductViewModelTest {
    private val sneakers = listOf(Product("1", "Air Runner", 12000), Product("2", "Court Classic", 9000))

    @Test fun `load success goes through loading then loaded`() = runTest(StandardTestDispatcher()) {
        val vm = ProductViewModel({ sneakers }, this)
        val seen = mutableListOf<ProductState>()
        backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) { vm.state.toList(seen) }
        vm.dispatch(ProductIntent.Load)
        advanceUntilIdle()
        assertEquals(listOf(false, true, false), seen.map { it.isLoading })
        assertEquals(sneakers, seen.last().products)
    }

    @Test fun `load failure surfaces error and stops loading`() = runTest(StandardTestDispatcher()) {
        val vm = ProductViewModel({ error("offline") }, this)
        vm.dispatch(ProductIntent.Load)
        advanceUntilIdle()
        assertEquals("offline", vm.state.value.error)
        assertTrue(!vm.state.value.isLoading)
    }

    @Test fun `search filters visible list without refetching`() = runTest(StandardTestDispatcher()) {
        val vm = ProductViewModel({ sneakers }, this)
        vm.dispatch(ProductIntent.Load); advanceUntilIdle()
        vm.dispatch(ProductIntent.Search("court")); advanceUntilIdle()
        assertEquals(listOf("Court Classic"), vm.state.value.visible.map { it.name })
    }

    @Test fun `select emits one-shot effect and leaves state untouched`() = runTest(StandardTestDispatcher()) {
        val vm = ProductViewModel({ sneakers }, this)
        vm.dispatch(ProductIntent.Load); advanceUntilIdle()
        val before = vm.state.value
        vm.effects.test {
            vm.dispatch(ProductIntent.Select("2")); advanceUntilIdle()
            assertEquals(ProductEffect.OpenDetail("2"), awaitItem())
            cancelAndIgnoreRemainingEvents()
        }
        assertEquals(before, vm.state.value)
        assertNull(vm.state.value.error)
    }
}

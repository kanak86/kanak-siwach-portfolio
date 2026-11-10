package dev.kanak.mvi.ui

// Reading snippet (not part of the Gradle build, which is Android-free so tests run anywhere).
// Pattern: a stateless content composable driven only by State, plus a thin stateful wrapper.

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dev.kanak.mvi.*

@Composable
fun ProductListScreen(vm: ProductViewModel, onOpenDetail: (String) -> Unit) {
    val state by vm.state.collectAsStateWithLifecycle()
    LaunchedEffect(Unit) {
        vm.effects.collect { if (it is ProductEffect.OpenDetail) onOpenDetail(it.id) }
        vm.dispatch(ProductIntent.Load)
    }
    ProductListContent(state, onIntent = vm::dispatch)
}

@Composable
fun ProductListContent(state: ProductState, onIntent: (ProductIntent) -> Unit) {
    Column(Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = state.query,
            onValueChange = { onIntent(ProductIntent.Search(it)) },
            label = { Text("Search") },
            modifier = Modifier.fillMaxWidth(),
        )
        when {
            state.isLoading -> CircularProgressIndicator(Modifier.padding(24.dp))
            state.error != null -> Text(state.error, color = MaterialTheme.colorScheme.error)
            else -> LazyColumn {
                items(state.visible, key = { it.id }) { p ->
                    ListItem(
                        headlineContent = { Text(p.name) },
                        supportingContent = { Text("$${p.priceCents / 100}") },
                        modifier = Modifier.clickable { onIntent(ProductIntent.Select(p.id)) },
                    )
                }
            }
        }
    }
}

package dev.kanak.mvi

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/** Example feature built on the container: a product list with search and retry. */
data class Product(val id: String, val name: String, val priceCents: Long)

sealed interface ProductIntent : MviIntent {
    data object Load : ProductIntent
    data class Search(val query: String) : ProductIntent
    data class Select(val id: String) : ProductIntent
}

data class ProductState(
    val isLoading: Boolean = false,
    val query: String = "",
    val products: List<Product> = emptyList(),
    val error: String? = null,
) : MviState {
    val visible: List<Product> get() =
        if (query.isBlank()) products else products.filter { it.name.contains(query, ignoreCase = true) }
}

sealed interface ProductResult {
    data object Loading : ProductResult
    data class Loaded(val items: List<Product>) : ProductResult
    data class Failed(val message: String) : ProductResult
    data class QueryChanged(val query: String) : ProductResult
}

sealed interface ProductEffect : MviEffect {
    data class OpenDetail(val id: String) : ProductEffect
}

fun interface ProductRepository { suspend fun fetch(): List<Product> }

class ProductViewModel(
    private val repo: ProductRepository,
    scope: CoroutineScope,
) : MviViewModel<ProductIntent, ProductState, ProductResult, ProductEffect>(ProductState(), scope) {

    override fun handle(intent: ProductIntent, current: ProductState): Flow<ProductResult> = flow {
        when (intent) {
            ProductIntent.Load -> {
                emit(ProductResult.Loading)
                runCatching { repo.fetch() }
                    .onSuccess { emit(ProductResult.Loaded(it)) }
                    .onFailure { emit(ProductResult.Failed(it.message ?: "Unknown error")) }
            }
            is ProductIntent.Search -> emit(ProductResult.QueryChanged(intent.query))
            // Selection is a pure side effect: it never changes state.
            is ProductIntent.Select -> sendEffect(ProductEffect.OpenDetail(intent.id))
        }
    }

    override fun reduce(previous: ProductState, result: ProductResult): ProductState = when (result) {
        ProductResult.Loading -> previous.copy(isLoading = true, error = null)
        is ProductResult.Loaded -> previous.copy(isLoading = false, products = result.items)
        is ProductResult.Failed -> previous.copy(isLoading = false, error = result.message)
        is ProductResult.QueryChanged -> previous.copy(query = result.query)
    }
}

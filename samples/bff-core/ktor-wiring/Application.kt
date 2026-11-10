package dev.kanak.bff

import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.routing

// Thin HTTP layer over HomeAggregator. Not compiled by CI (needs Ktor dependencies; see README).
fun Application.module(aggregator: HomeAggregator) {
    install(ContentNegotiation) { json() }
    routing {
        get("/v1/home/{userId}") {
            val id = call.parameters["userId"] ?: return@get call.respond(HttpStatusCode.BadRequest)
            runCatching { aggregator.home(id) }
                .onSuccess { call.respond(it) }
                .onFailure { call.respond(HttpStatusCode.BadGateway, mapOf("error" to (it.message ?: "upstream"))) }
        }
    }
}

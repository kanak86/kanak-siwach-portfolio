package dev.kanak.venuemap

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter

/** Bridges the native Android seat-map view into React Native (view manager pattern). */
class VenueMapViewManager : SimpleViewManager<VenueMapView>() {
    override fun getName() = "VenueMapView"

    override fun createViewInstance(ctx: ThemedReactContext): VenueMapView =
        VenueMapView(ctx).also { view ->
            view.onSeatPressed = { id ->
                val event = Arguments.createMap().apply { putString("id", id) }
                ctx.getJSModule(RCTEventEmitter::class.java).receiveEvent(view.id, "onSeatPress", event)
            }
        }

    @ReactProp(name = "seats")
    fun setSeats(view: VenueMapView, seats: ReadableArray) = view.setSeats(SeatParser.parse(seats))

    @ReactProp(name = "selectedIds")
    fun setSelected(view: VenueMapView, ids: ReadableArray) =
        view.setSelected((0 until ids.size()).map { ids.getString(it) }.toSet())

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> =
        MapBuilder.of("onSeatPress", MapBuilder.of("registrationName", "onSeatPress"))
}

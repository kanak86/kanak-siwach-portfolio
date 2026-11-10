import React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle, NativeSyntheticEvent } from 'react-native';

/**
 * Original sample: a performance-critical native view (interactive seat/venue map) bridged into React Native.
 * Rendering and gestures stay native for 60fps pan/zoom; the JS layer owns navigation, data and checkout.
 */
export type Seat = { id: string; x: number; y: number; status: 'available' | 'held' | 'sold'; priceCents: number };

type NativeProps = {
  seats: Seat[];
  selectedIds: string[];
  style?: StyleProp<ViewStyle>;
  onSeatPress?: (e: NativeSyntheticEvent<{ id: string }>) => void;
};

const NativeVenueMap = requireNativeComponent<NativeProps>('VenueMapView');

export type VenueMapProps = {
  seats: Seat[];
  selectedIds: string[];
  onToggleSeat: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function VenueMap({ seats, selectedIds, onToggleSeat, style }: VenueMapProps) {
  return (
    <NativeVenueMap
      style={style}
      seats={seats}
      selectedIds={selectedIds}
      onSeatPress={(e) => onToggleSeat(e.nativeEvent.id)}
    />
  );
}

import { useMap, useMapEvents } from 'react-leaflet';

export interface Props {
  useMap: typeof useMap;
  useMapEvents: typeof useMapEvents;
  coordinates: Array<[number, number]>;
  updateOnMapMove: boolean;
}

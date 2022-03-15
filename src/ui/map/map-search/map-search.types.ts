import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { MarkerProps, useMap } from 'react-leaflet';

import { BoundsTuple, Point } from '..';

export interface Props {
  useMap: typeof useMap;
  onChange: ({ lat, lng }: Point) => void;
}

export interface MapSearchEvent extends L.LeafletEvent {
  location: {
    x: number;
    y: number;
    label: string;
  };
}

export interface MapSearchResultDragEvent extends L.LeafletEvent {
  location: Point;
}

export interface MapDragendEvent extends L.LeafletEvent {
  distance: number;
  target: {
    _latlng: Point;
  };
}

export interface SearchResult<RawResult = any> {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple | null;
  raw: RawResult;
}

export interface SearchControlOptions {
  provider: OpenStreetMapProvider;
  style?: 'bar' | 'button';
  autoComplete?: boolean;
  autoCompleteDelay?: number;
  searchLabel?: string;
  marker?: Partial<MarkerProps>;
  showMarker?: boolean;
  showPopup?: boolean;
  maxMarkers?: number;
  retainZoomLevel?: boolean;
  animateZoom?: boolean;
  autoClose?: boolean;
  keepResult?: boolean;
  updateMap?: boolean;
  resultFormat?: (args: { result: SearchResult }) => string;
  popupFormat?: (args: { query: string; result: SearchResult }) => string;
}

import { useMapEvents, Popup } from 'react-leaflet';

import { Point } from 'ui';

interface Item {
  label: string;
  onClick: (point: Point) => void;
}

export interface Props {
  useMapEvents: typeof useMapEvents;
  Popup: typeof Popup;
  items: Item[];
}

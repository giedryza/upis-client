import { FC } from 'react';

import 'leaflet-geosearch/dist/geosearch.css';

import { useInitControl, useMapSearch, useOnChange } from './map-search.hooks';
import { Props } from './map-search.types';

export const MapSearch: FC<Props> = ({ useMap, onChange }) => {
  const map = useMap();

  useInitControl(map);
  const { lat, lng } = useMapSearch(map);
  useOnChange({ lat, lng }, onChange);

  return null;
};

import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import { Point } from '..';

import {
  MapSearchEvent,
  MapSearchResultDragEvent,
  SearchControlOptions,
} from './map-search.types';

export const useInitControl = (map: L.Map) => {
  const { t } = useTranslation();

  useEffect(() => {
    const options: SearchControlOptions = {
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      autoCompleteDelay: 100,
      searchLabel: t('common:actions.enter_address'),
      showMarker: false,
    };

    const searchControl = GeoSearchControl(options);

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, t]);
};

export const useMapSearch = (map: L.Map): Point => {
  const [coordinates, setCoordinates] = useState<Point>({ lat: 0, lng: 0 });

  map.on('geosearch/showlocation', (e) => {
    const { location } = e as MapSearchEvent;
    setCoordinates({ lat: location.y, lng: location.x });
  });

  map.on('geosearch/marker/dragend', (e) => {
    const { location } = e as MapSearchResultDragEvent;
    setCoordinates({ lat: location.lat, lng: location.lng });
  });

  return coordinates;
};

export const useOnChange = (
  { lat, lng }: Point,
  onChange: (point: Point) => void
) => {
  useEffect(() => {
    onChange({ lat, lng });
  }, [lat, lng, onChange]);
};

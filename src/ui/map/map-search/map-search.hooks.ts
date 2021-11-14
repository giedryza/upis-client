import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import {
  MapSearchEvent,
  MapDragEvent,
  SearchControlOptions,
} from './map-search.types';

import { Point } from 'types/common/geo';

export const useInitControl = (map: L.Map) => {
  const { t } = useTranslation();

  useEffect(() => {
    const options: SearchControlOptions = {
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      autoCompleteDelay: 100,
      searchLabel: t('common:actions.enterAddress'),
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
    const { location } = e as MapDragEvent;
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

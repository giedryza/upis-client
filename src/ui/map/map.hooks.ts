import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';

import { NOMINATIM } from './map.constants';
import { Point, OSMLocation } from './map.types';

export const usePoint = ({ lat, lng }: Point) => {
  const [currentPoint, setCurrentPoint] = useState<Point>({ lat, lng });

  const updatePoint = useCallback((point: Point) => {
    if (point.lat && point.lng) {
      setCurrentPoint(point);
    }
  }, []);

  useEffect(() => {
    updatePoint({ lat, lng });
  }, [lat, lng, updatePoint]);

  return { point: currentPoint, updatePoint };
};

export const useSearchByCoordinates = ({
  lat,
  lng,
}: Point): { location: OSMLocation | null } => {
  const { locale } = useRouter();

  const [location, setLocation] = useState<OSMLocation | null>(null);

  useEffect(() => {
    const url = stringifyUrl({
      url: new URL(NOMINATIM.endpoints.reverse, NOMINATIM.baseUrl).href,
      query: {
        lat,
        lon: lng,
        zoom: 18,
        format: 'jsonv2',
        'accept-language': locale,
      },
    });

    const getLocation = async () => {
      const res = await fetch(url);
      const data: OSMLocation = await res.json();

      setLocation(data);
    };

    if (lat && lng) {
      getLocation();
    }

    return () => {
      setLocation(null);
    };
  }, [lat, lng, locale]);

  return { location };
};

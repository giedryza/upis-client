import { useCallback, useEffect, useMemo, useState } from 'react';

import { OSMLocation, Point } from 'types/common/geo';
import { Locale } from 'types/common/locales';
import { useMyCompany } from 'domain/companies/companies.queries';

import { FORM_LOCATION_INITIAL_VALUES } from './form-location.constants';
import { FormLocationValues } from './form-location.types';

export const useValues = (): FormLocationValues => {
  const { data: company } = useMyCompany();

  const values = useMemo((): FormLocationValues => {
    if (!company?.location?.coordinates) return FORM_LOCATION_INITIAL_VALUES;

    const [lng, lat] = company.location.coordinates;

    if (!lat || !lng) return FORM_LOCATION_INITIAL_VALUES;

    return { lat, lng, address: company.address };
  }, [company]);

  return values;
};

export const usePoint = ({ lat, lng }: Point) => {
  const [currentPoint, setCurrentPoint] = useState<Point>({
    lat: FORM_LOCATION_INITIAL_VALUES.lat,
    lng: FORM_LOCATION_INITIAL_VALUES.lng,
  });

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

export const useCoordinates = (
  { lat, lng }: Point,
  locale: Locale
): OSMLocation | null => {
  const [location, setLocation] = useState<OSMLocation | null>(null);

  useEffect(() => {
    const params = {
      baseUrl: 'https://nominatim.openstreetmap.org',
      endpoint: 'reverse',
      lat,
      lng,
      locale,
      zoom: 18,
      format: 'jsonv2',
    };

    const getLocation = async () => {
      const res = await fetch(
        `${params.baseUrl}/${params.endpoint}?lat=${params.lat}&lon=${params.lng}&format=${params.format}&accept-language=${params.locale}&zoom=${params.zoom}`
      );
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

  return location;
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormLocationValues } from './form-location.types';
import { FORM_LOCATION_INITIAL_VALUES } from './form-location.constants';

import { selectMyCompany } from 'domain/companies/companies.selectors';
import { OSMLocation, Point } from 'types/common/geo';
import { Locale } from 'types/common/locales';

export const useValues = (): FormLocationValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo((): FormLocationValues => {
    if (!myCompany?.location?.coordinates) return FORM_LOCATION_INITIAL_VALUES;

    const [lng, lat] = myCompany.location.coordinates;

    if (!lat || !lng) return FORM_LOCATION_INITIAL_VALUES;

    return { lat, lng };
  }, [myCompany]);

  return values;
};

export const usePoint = () => {
  const [point, setPoint] = useState<Point>(FORM_LOCATION_INITIAL_VALUES);

  const values = useValues();

  const updatePoint = useCallback(({ lat, lng }: Point) => {
    if (lat && lng) {
      setPoint({ lat, lng });
    }
  }, []);

  useEffect(() => {
    updatePoint(values);
  }, [values, updatePoint]);

  return { point, updatePoint };
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

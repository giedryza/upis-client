import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormLocationValues } from './form-location.types';
import { FORM_LOCATION_INITIAL_VALUES } from './form-location.constants';

import { selectMyCompany } from 'domain/companies/companies.selectors';
import { Point } from 'types/common/geo';

export const useValues = (): FormLocationValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): FormLocationValues =>
      myCompany?.location?.coordinates
        ? {
            lat:
              myCompany.location.coordinates[1] ??
              FORM_LOCATION_INITIAL_VALUES.lat,
            lng:
              myCompany.location.coordinates[0] ??
              FORM_LOCATION_INITIAL_VALUES.lng,
          }
        : FORM_LOCATION_INITIAL_VALUES,
    [myCompany]
  );

  return values;
};

export const usePoint = () => {
  const [point, setPoint] = useState<Point>(FORM_LOCATION_INITIAL_VALUES);

  const location = useValues();

  const updatePoint = useCallback(({ lat, lng }: Point) => {
    if (lat && lng) {
      setPoint({ lat, lng });
    }
  }, []);

  useEffect(() => {
    updatePoint(location);
  }, [location, updatePoint]);

  return { point, updatePoint };
};

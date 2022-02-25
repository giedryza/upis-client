import { Point } from 'types/common/geo';

import { FormLocationValues } from './form-location.types';

export const DEFAULT_CENTER: Point = {
  lat: 55.19,
  lng: 23.94,
};

export const FORM_LOCATION_INITIAL_VALUES: FormLocationValues = {
  lat: 0,
  lng: 0,
  address: '',
};

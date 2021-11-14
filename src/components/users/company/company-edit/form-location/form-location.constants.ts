import { FormLocationValues } from './form-location.types';

import { Point } from 'types/common/geo';

export const DEFAULT_CENTER: Point = {
  lat: 55.0,
  lng: 24.5,
};

export const FORM_LOCATION_INITIAL_VALUES: FormLocationValues = {
  lat: DEFAULT_CENTER.lat,
  lng: DEFAULT_CENTER.lng,
};

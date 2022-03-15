import { Point } from './map.types';

export const DEFAULT_CENTER: Point = {
  lat: 55.19,
  lng: 23.94,
};

export const NOMINATIM = {
  baseUrl: 'https://nominatim.openstreetmap.org',
  endpoints: {
    reverse: '/reverse',
  },
};

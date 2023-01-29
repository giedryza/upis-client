import { Point } from './map.types';

export const DEFAULT_CENTER: Point = {
  lat: 55.330041,
  lng: 23.905423,
};

export const NOMINATIM = {
  baseUrl: 'https://nominatim.openstreetmap.org',
  endpoints: {
    reverse: '/reverse',
  },
};

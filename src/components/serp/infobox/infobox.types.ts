import { useMap } from 'react-leaflet';

import { Tour } from 'domain/tours';

export type Props = {
  useMap: typeof useMap;
} & Pick<
  Tour,
  '_id' | 'name' | 'photos' | 'distance' | 'days' | 'duration' | 'price'
>;

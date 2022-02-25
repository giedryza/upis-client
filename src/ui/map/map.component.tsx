import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

import { Loader } from 'ui';

export const Map = dynamic(() => import('./map-wrapper/map-wrapper'), {
  loading: () => <Loader />,
  ssr: false,
});

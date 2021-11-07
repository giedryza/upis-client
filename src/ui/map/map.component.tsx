import { useMemo, VFC } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

import { Loader } from 'ui/loader/loader.component';

export const Map: VFC = () => {
  const MapWithoutSSR = useMemo(
    () =>
      dynamic(
        () =>
          import(
            'components/users/company/company-edit/location/location.component'
          ),
        {
          loading: () => <Loader />,
          ssr: false,
        }
      ),
    []
  );

  return <MapWithoutSSR />;
};

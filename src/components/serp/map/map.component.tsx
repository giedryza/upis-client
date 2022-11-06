import { FC } from 'react';

import { DEFAULT_CENTER, Map, mapIcon } from 'ui';

import styles from './map.module.scss';

export const SerpMap: FC = () => {
  return (
    <div className={styles.map}>
      <Map
        center={{ lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng }}
        zoom={10}
      >
        {({ leaflet: { icon }, reactLeaflet: { Marker } }) => (
          <Marker
            position={{ lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng }}
            icon={icon(mapIcon({ name: 'pin', size: 32 }))}
          />
        )}
      </Map>
    </div>
  );
};

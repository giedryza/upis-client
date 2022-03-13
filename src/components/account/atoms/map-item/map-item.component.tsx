import { VFC } from 'react';

import { Map, mapIcon } from 'ui';

import { Props } from './map-item.types';
import styles from './map-item.module.scss';

export const MapItem: VFC<Props> = ({ lat, lng }) => {
  if (!lat || !lng) return null;

  return (
    <div className={styles.container}>
      <Map
        center={{ lat, lng }}
        zoom={16}
        zoomControl={false}
        boxZoom={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        tap={false}
        touchZoom={false}
      >
        {({ leaflet: { icon }, reactLeaflet: { Marker } }) => (
          <Marker
            position={{ lat, lng }}
            icon={icon(mapIcon({ name: 'pin', size: 32 }))}
          />
        )}
      </Map>
    </div>
  );
};

import { VFC } from 'react';

import { Map, mapIcon } from 'ui';

import { Props } from './map-item.types';
import styles from './map-item.module.scss';

export const MapItem: VFC<Props> = ({ markers }) => {
  if (
    markers
      .map((marker) => [marker.lat, marker.lng])
      .flat()
      .filter((point) => point === 0).length
  ) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Map
        bounds={markers.map((marker) => [marker.lat, marker.lng])}
        boundsOptions={{
          padding: [20, 20],
        }}
        zoomControl={false}
        boxZoom={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        tap={false}
        touchZoom={false}
      >
        {({ leaflet: { icon }, reactLeaflet: { Marker, Tooltip } }) =>
          markers.map((marker, i) => (
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={icon(mapIcon({ name: 'pin', size: 32 }))}
              key={i}
            >
              {!!marker.label && (
                <Tooltip direction="right" permanent offset={[10, -20]}>
                  {marker.label}
                </Tooltip>
              )}
            </Marker>
          ))
        }
      </Map>
    </div>
  );
};

import { FC, useState } from 'react';

import { DEFAULT_CENTER, Map, mapIcon } from 'ui';
import { Infobox } from 'components/serp';

import styles from './map.module.scss';

export const SerpMap: FC = () => {
  const [popupActive, setPopupActive] = useState(false);

  return (
    <div className={styles.map}>
      <Map
        center={{ lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng }}
        zoom={10}
      >
        {({
          leaflet: { icon, point },
          reactLeaflet: { Marker, Popup, useMap },
        }) => {
          return (
            <Marker
              position={{ lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng }}
              icon={icon(mapIcon({ name: 'circle', size: 24 }))}
              eventHandlers={{
                popupopen: () => setPopupActive(true),
                popupclose: () => setPopupActive(false),
              }}
            >
              <Popup
                className={styles.popup}
                closeButton={false}
                offset={point(0, 15)}
              >
                {popupActive ? <Infobox useMap={useMap} /> : null}
              </Popup>
            </Marker>
          );
        }}
      </Map>
    </div>
  );
};

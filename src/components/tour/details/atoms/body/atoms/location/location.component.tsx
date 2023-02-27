import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Map, mapIcon } from 'ui';

import { Props } from './location.types';
import styles from './location.module.scss';

export const BodyLocation: FC<Props> = ({ departure, arrival }) => {
  const { t } = useTranslation();

  const coordinates = [
    ...(departure.coordinates.length
      ? [
          {
            label: t('tours:details.location.departure'),
            lat: departure.coordinates[1],
            lng: departure.coordinates[0],
          },
        ]
      : []),
    ...(arrival.coordinates.length
      ? [
          {
            label: t('tours:details.location.arrival'),
            lat: arrival.coordinates[1],
            lng: arrival.coordinates[0],
          },
        ]
      : []),
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('tours:details.location.title')}</h2>

      <div className={styles.map}>
        <Map
          bounds={coordinates.map(({ lat, lng }) => [lat, lng])}
          boundsOptions={{ padding: [20, 20] }}
        >
          {({ leaflet: { icon }, reactLeaflet: { Marker, Tooltip } }) =>
            coordinates.map((coordinate, i) => (
              <Marker
                position={{ lat: coordinate.lat, lng: coordinate.lng }}
                icon={icon(mapIcon({ name: 'circle', size: 24 }))}
                key={i}
              >
                <Tooltip permanent offset={[12, -12]}>
                  {coordinate.label}
                </Tooltip>
              </Marker>
            ))
          }
        </Map>
      </div>
    </section>
  );
};

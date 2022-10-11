import { VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import {
  Button,
  Toast,
  Map,
  usePoint,
  Point,
  DEFAULT_CENTER,
  mapIcon,
  MapDragendEvent,
} from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTour } from 'domain/tours';

import styles from './tour-edit-location.module.scss';

export const TourEditLocation: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { data: tour } = useActiveTour();
  const { mutate: updateTour, isLoading: isUpdating } = useUpdateTour();

  const { point: departurePoint, updatePoint: updateDeparturePoint } = usePoint(
    {
      lat: tour?.departure.coordinates[1] ?? 0,
      lng: tour?.departure.coordinates[0] ?? 0,
    }
  );
  const { point: arrivalPoint, updatePoint: updateArrivalPoint } = usePoint({
    lat: tour?.arrival.coordinates[1] ?? 0,
    lng: tour?.arrival.coordinates[0] ?? 0,
  });

  const OFFSET = 0.8;

  const center: { departure: Point; arrival: Point } = {
    departure: {
      lat: departurePoint.lat || DEFAULT_CENTER.lat + OFFSET,
      lng: departurePoint.lng || DEFAULT_CENTER.lng - OFFSET,
    },
    arrival: {
      lat: arrivalPoint.lat || DEFAULT_CENTER.lat - OFFSET,
      lng: arrivalPoint.lng || DEFAULT_CENTER.lng + OFFSET,
    },
  };

  const onSubmit = () => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTour(
      {
        id: tourId,
        form: {
          arrival: [arrivalPoint.lng, arrivalPoint.lat],
          departure: [departurePoint.lng, departurePoint.lat],
        },
      },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tourId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.location.title')}
      icon="globe"
      columns={1}
    >
      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <Map
            bounds={[
              [center.departure.lat, center.departure.lng],
              [center.arrival.lat, center.arrival.lng],
            ]}
            boundsOptions={{
              padding: [50, 50],
            }}
          >
            {({ leaflet: { icon }, reactLeaflet: { Marker, Tooltip } }) => (
              <>
                <Marker
                  draggable
                  position={center.arrival}
                  icon={icon(mapIcon({ name: 'pin', size: 48 }))}
                  eventHandlers={{
                    dragend: (e) => {
                      const { lat, lng } = (e as MapDragendEvent).target
                        ._latlng;

                      updateArrivalPoint({ lat, lng });
                    },
                  }}
                  title="labas"
                >
                  <Tooltip
                    direction="top"
                    permanent
                    offset={[0, -40]}
                    className={styles.tooltip}
                  >
                    {t('account:tours.location.map.arrival')}
                  </Tooltip>
                </Marker>

                <Marker
                  draggable
                  position={center.departure}
                  icon={icon(mapIcon({ name: 'pin', size: 48 }))}
                  eventHandlers={{
                    dragend: (e) => {
                      const { lat, lng } = (e as MapDragendEvent).target
                        ._latlng;

                      updateDeparturePoint({ lat, lng });
                    },
                  }}
                >
                  <Tooltip
                    direction="top"
                    permanent
                    offset={[0, -40]}
                    className={styles.tooltip}
                  >
                    {t('account:tours.location.map.departure')}
                  </Tooltip>
                </Marker>
              </>
            )}
          </Map>
        </div>
        <Toast message={t('account:tours.location.map.info')} type="info" />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.cancel')}
          variant="ghost"
          size="sm"
          url={routes.account.tours.one.index.replace(':id', tour?._id ?? '')}
        />

        <Button
          label={t('common:actions.save')}
          variant="tertiary"
          size="sm"
          attributes={{
            disabled: isUpdating,
            onClick: onSubmit,
          }}
        />
      </div>
    </InfoBlock>
  );
};
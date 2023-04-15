import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
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

export const TourEditLocation: FC = () => {
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

  if (!tour) return null;

  const onSubmit = () => {
    updateTour(
      {
        id: tour._id,
        form: {
          arrival: [arrivalPoint.lng, arrivalPoint.lat],
          departure: [departurePoint.lng, departurePoint.lat],
        },
      },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tour._id }));
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
        <Toast message={t('account:tours.location.map.info')} type="info" />

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
            {({
              leaflet: { icon },
              reactLeaflet: { Marker, Tooltip, Popup, useMapEvents },
              custom: { ContextMenu },
            }) => {
              return (
                <>
                  <ContextMenu
                    useMapEvents={useMapEvents}
                    Popup={Popup}
                    items={[
                      {
                        label: t(
                          'account:tours.location.map.actions.set_departure'
                        ),
                        onClick: updateDeparturePoint,
                      },
                      {
                        label: t(
                          'account:tours.location.map.actions.set_arrival'
                        ),
                        onClick: updateArrivalPoint,
                      },
                    ]}
                  />

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
              );
            }}
          </Map>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          as="link"
          label={t('common:actions.cancel')}
          variant="ghost"
          size="sm"
          href={generateUrl(routes.account.tours.one.index, {
            id: tour._id,
          })}
        />

        <Button
          as="button"
          label={t('common:actions.save')}
          variant="tertiary"
          size="sm"
          disabled={isUpdating}
          onClick={onSubmit}
        />
      </div>
    </InfoBlock>
  );
};

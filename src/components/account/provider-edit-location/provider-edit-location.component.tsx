import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import {
  Button,
  Map,
  mapIcon,
  MapDragendEvent,
  usePoint,
  Point,
  useSearchByCoordinates,
  DEFAULT_CENTER,
  Toast,
} from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider, useUpdateLocation } from 'domain/providers';

import styles from './provider-edit-location.module.scss';

export const ProviderEditLocation: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { data: provider } = useActiveProvider();
  const { mutate: updateLocation, isLoading } = useUpdateLocation();

  const { point, updatePoint } = usePoint({
    lat: provider?.location.coordinates[1] ?? 0,
    lng: provider?.location.coordinates[0] ?? 0,
  });
  const { location } = useSearchByCoordinates({
    lat: point.lat,
    lng: point.lng,
  });

  const center: Point = {
    lat: point.lat || DEFAULT_CENTER.lat,
    lng: point.lng || DEFAULT_CENTER.lng,
  };

  const onSubmit = () => {
    const providerId = provider?._id;

    if (!providerId) return;

    updateLocation(
      {
        id: providerId,
        form: {
          lat: point.lat,
          lng: point.lng,
          address: location?.display_name || '',
        },
      },
      {
        onSuccess: () => {
          push(
            generateUrl(routes.account.providers.one.index, {
              id: providerId,
            })
          );
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:providers.location.title')}
      icon="pin"
      columns={1}
    >
      <div className={styles.mapContainer}>
        <Toast message={t('account:providers.location.map.info')} type="info" />

        <div className={styles.map}>
          <Map
            center={{
              lat: center.lat + 0.00025,
              lng: center.lng,
            }}
            zoom={point.lat && point.lng ? 18 : 7}
          >
            {({
              leaflet: { icon, point: p },
              reactLeaflet: { Marker, Popup, useMap, useMapEvents },
              custom: { SearchBar, ContextMenu },
            }) => (
              <>
                <SearchBar useMap={useMap} onChange={updatePoint} />

                <ContextMenu
                  useMapEvents={useMapEvents}
                  Popup={Popup}
                  items={[
                    {
                      label: t(
                        'account:providers.location.map.actions.set_location'
                      ),
                      onClick: updatePoint,
                    },
                  ]}
                />

                <Marker
                  draggable
                  position={center}
                  icon={icon(mapIcon({ name: 'pin', size: 48 }))}
                  eventHandlers={{
                    dragend: (e) => {
                      const { lat, lng } = (e as MapDragendEvent).target
                        ._latlng;

                      updatePoint({ lat, lng });
                    },
                    add: (e) => {
                      e.target.openPopup();
                    },
                  }}
                >
                  <Popup offset={p(0, 15)}>
                    <div className={styles.popup}>
                      {location?.display_name ??
                        t('account:providers.location.map.info')}
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          as="link"
          label={t('common:actions.cancel')}
          variant="ghost"
          size="sm"
          href={generateUrl(routes.account.providers.one.index, {
            id: provider?._id ?? '',
          })}
        />

        <Button
          as="button"
          label={t('common:actions.save')}
          variant="tertiary"
          size="sm"
          disabled={isLoading}
          onClick={onSubmit}
        />
      </div>
    </InfoBlock>
  );
};

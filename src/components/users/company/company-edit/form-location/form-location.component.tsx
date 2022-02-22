import { useState, VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Map, mapIcon } from 'ui/map';
import { MapDragendEvent } from 'ui/map/map-search/map-search.types';
import { DEFAULT_CENTER } from 'components/users/company/company-edit/form-location/form-location.constants';
import { Point } from 'types/common/geo';
import { Locale } from 'types/common/locales';
import { PreviewLocation } from 'components/users/company/company-edit/preview-location/preview-location.component';
import { Button } from 'ui/button';
import { useUpdateLocation } from 'domain/companies/companies.mutations';

import styles from './form-location.module.scss';
import { useCoordinates, usePoint, useValues } from './form-location.hooks';
import { ComponentProps } from './form-location.types';

export const Location: VFC<ComponentProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const values = useValues();
  const { point, updatePoint } = usePoint({ lat: values.lat, lng: values.lng });
  const location = useCoordinates(
    { lat: point.lat, lng: point.lng },
    locale as Locale
  );
  const { mutate: updateLocation } = useUpdateLocation();

  const center: Point = {
    lat: point.lat || DEFAULT_CENTER.lat,
    lng: point.lng || DEFAULT_CENTER.lng,
  };

  return isEditing ? (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map
          center={{
            lat: center.lat + 0.00025,
            lng: center.lng,
          }}
          zoom={center.lat && center.lng ? 18 : 7}
        >
          {({
            leaflet: { icon },
            reactLeaflet: { Marker, Popup, useMap },
            custom: { SearchBar },
          }) => (
            <>
              <SearchBar useMap={useMap} onChange={updatePoint} />

              <Marker
                draggable
                position={center}
                icon={icon(mapIcon({ name: 'pin', size: 48 }))}
                eventHandlers={{
                  dragend: (e) => {
                    const { target } = e as MapDragendEvent;
                    updatePoint({
                      lat: target._latlng.lat,
                      lng: target._latlng.lng,
                    });
                  },
                  add: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup className={styles.popup}>
                  {location?.display_name ?? '-'}
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.cancel')}
          variant="ghost-dark"
          size="sm"
          attributes={{
            onClick: () => setIsEditing(false),
          }}
        />

        <Button
          label={t('common:actions.save')}
          variant="primary"
          size="sm"
          attributes={{
            onClick: () => {
              updateLocation({
                id: companyId,
                form: {
                  lat: point.lat,
                  lng: point.lng,
                  address: location?.display_name ?? '-',
                },
              });
            },
            disabled: !point.lat || !point.lng,
          }}
        />
      </div>
    </div>
  ) : (
    <PreviewLocation
      onClick={() => setIsEditing(true)}
      center={{ lat: values.lat, lng: values.lng }}
      address={values.address}
    />
  );
};

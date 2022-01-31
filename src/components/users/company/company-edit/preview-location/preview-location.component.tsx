import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/editable-info/info-block/info-block.component';
import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon';
import { Map, mapIcon } from 'ui/map';

import { Props } from './preview-location.types';
import styles from './preview-location.module.scss';

export const PreviewLocation: VFC<Props> = ({ onClick, center, address }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <InfoBlock
        info={address || '-'}
        label={t('users:company.form.address.label')}
        variant="edit"
        icon={IconName.Home}
        actions={
          <Button
            label={t('common:actions.edit')}
            icon={IconName.Pencil}
            variant="link"
            size="sm"
            attributes={{
              onClick,
            }}
          />
        }
      />
      {!center.lat || !center.lng ? null : (
        <div className={styles.mapContainer}>
          <Map
            center={center}
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
                position={center}
                icon={icon(mapIcon({ name: 'pin', size: 32 }))}
              />
            )}
          </Map>
        </div>
      )}
    </div>
  );
};

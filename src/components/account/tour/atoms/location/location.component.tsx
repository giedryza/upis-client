import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock, MapItem } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';

export const Location: VFC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.location.title')}
      icon="pin"
      columns={1}
      editPage={routes.account.tours.one.location.replace(':id', tour._id)}
    >
      <MapItem
        markers={[
          {
            lat: tour.departure.coordinates[1] ?? 0,
            lng: tour.departure.coordinates[0] ?? 0,
            label: t('account:tours.location.map.departure'),
          },
          {
            lat: tour.arrival.coordinates[1] ?? 0,
            lng: tour.arrival.coordinates[0] ?? 0,
            label: t('account:tours.location.map.arrival'),
          },
        ]}
      />
    </InfoBlock>
  );
};

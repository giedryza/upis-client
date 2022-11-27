import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock, MapItem } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { EmptyState } from 'ui';

export const Location: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.location.title')}
      icon="pin"
      columns={1}
      actions={[
        {
          url: routes.account.tours.one.location.replace(':id', tour._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      {!!tour.departure.coordinates.length &&
      !!tour.arrival.coordinates.length ? (
        <MapItem
          markers={[
            {
              lat: tour.departure.coordinates[1],
              lng: tour.departure.coordinates[0],
              label: t('account:tours.location.map.departure'),
            },
            {
              lat: tour.arrival.coordinates[1],
              lng: tour.arrival.coordinates[0],
              label: t('account:tours.location.map.arrival'),
            },
          ]}
        />
      ) : (
        <EmptyState
          title={t('account:tours.location.map.empty.title')}
          message={t('account:tours.location.map.empty.message')}
        />
      )}
    </InfoBlock>
  );
};

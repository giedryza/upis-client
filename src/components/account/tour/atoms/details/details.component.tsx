import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';

export const Details: VFC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.details.title')}
      icon="timer"
      columns={2}
      editPage={routes.account.tours.one.details.replace(':id', tour._id)}
    >
      <InfoItem
        label={t('account:tours.details.form.distance.label')}
        value={tour.distance}
      />
      <InfoItem
        label={t('account:tours.details.form.duration.label')}
        value={tour.duration}
      />
      <InfoItem
        label={t('account:tours.details.form.days.label')}
        value={tour.days}
      />
      <InfoItem
        label={t('account:tours.details.form.difficulty.label')}
        value={tour.difficulty}
      />
    </InfoBlock>
  );
};

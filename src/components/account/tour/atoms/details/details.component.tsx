import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { LabeledValue, Meter } from 'ui';

export const Details: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.details.title')}
      icon="timer"
      columns={2}
      actions={[
        {
          url: routes.account.tours.one.details.replace(':id', tour._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:tours.details.form.distance.display')}
        value={tour.distance}
        formatOptions={{
          style: 'unit',
          unit: 'kilometer',
        }}
      />
      <LabeledValue
        label={t('account:tours.details.form.duration.display')}
        value={tour.duration}
        formatOptions={{
          style: 'unit',
          unit: 'hour',
        }}
      />
      <LabeledValue
        label={t('account:tours.details.form.days.display')}
        value={tour.days}
        formatOptions={{
          style: 'unit',
          unit: 'day',
        }}
      />
      <Meter
        label={t('account:tours.details.form.difficulty.display')}
        min={0}
        max={5}
        value={tour.difficulty}
        valueLabel={`${tour.difficulty} / 5`}
        formatOptions={{ style: 'decimal' }}
      />
    </InfoBlock>
  );
};

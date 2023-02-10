import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/common';

export const Geography: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.geography.title')}
      icon="globe"
      columns={1}
      actions={[
        {
          url: generateUrl(routes.account.tours.one.geography, {
            id: tour._id,
          }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:tours.geography.form.regions.display')}
        value={tour.regions.map((region) => t(`regions:${region}`)).join(', ')}
      />
      <LabeledValue
        label={t('account:tours.geography.form.rivers.display')}
        value={tour.rivers.map((river) => t(`rivers:${river}`)).join(', ')}
      />
    </InfoBlock>
  );
};

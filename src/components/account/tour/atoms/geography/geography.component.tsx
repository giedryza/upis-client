import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { FieldDisplay } from 'ui';

export const Geography: VFC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.geography.title')}
      icon="globe"
      columns={1}
      editPage={routes.account.tours.one.geography.replace(':id', tour._id)}
    >
      <FieldDisplay
        label={t('account:tours.geography.form.regions.display')}
        value={tour.regions
          .map((region) =>
            t(`account:tours.geography.form.regions.values.${region}`)
          )
          .join(', ')}
      />
      <FieldDisplay
        label={t('account:tours.geography.form.rivers.display')}
        value={tour.rivers.map((river) => t(`rivers:${river}`)).join(', ')}
      />
    </InfoBlock>
  );
};

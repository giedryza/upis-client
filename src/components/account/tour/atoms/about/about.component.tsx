import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';

export const About: VFC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.about.title')}
      icon="info"
      columns={1}
      editPage={routes.account.tours.one.about.replace(':id', tour._id)}
    >
      <InfoItem
        label={t('account:tours.about.form.name.label')}
        value={tour.name}
      />
      <InfoItem
        label={t('account:tours.about.form.description.label')}
        value={tour.description}
      />
      <InfoItem
        label={t('account:tours.about.form.website.label')}
        value={tour.website}
      />
      <InfoItem
        label={t('account:tours.about.form.company.label')}
        value={tour.company.name}
      />
    </InfoBlock>
  );
};

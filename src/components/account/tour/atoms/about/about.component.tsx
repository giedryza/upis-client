import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { FieldDisplay } from 'ui';

export const About: VFC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.about.title')}
      icon="info"
      columns={1}
      actions={[
        {
          url: routes.account.tours.one.about.replace(':id', tour._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <FieldDisplay
        label={t('account:tours.about.form.name.label')}
        value={tour.name}
      />
      <FieldDisplay
        label={t('account:tours.about.form.description.label')}
        value={tour.description}
      />
      <FieldDisplay
        label={t('account:tours.about.form.website.label')}
        value={tour.website}
      />
      <FieldDisplay
        label={t('account:tours.about.form.company.label')}
        value={tour.company.name}
      />
    </InfoBlock>
  );
};

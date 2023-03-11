import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/services';

export const About: FC = () => {
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
          as: 'link',
          href: generateUrl(routes.account.tours.one.about, { id: tour._id }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:tours.about.form.name.label')}
        value={tour.name}
      />
      <LabeledValue
        label={t('account:tours.about.form.description.label')}
        value={tour.description}
      />
      <LabeledValue
        label={t('account:tours.about.form.website.label')}
        value={tour.website}
      />
      <LabeledValue
        label={t('account:tours.about.form.provider.label')}
        value={tour.provider.name}
      />
    </InfoBlock>
  );
};

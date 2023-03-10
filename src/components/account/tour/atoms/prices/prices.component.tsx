import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/services/url';

export const Prices: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.prices.title')}
      icon="price"
      columns={2}
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.tours.one.prices, { id: tour._id }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:tours.prices.form.price.display')}
        value={tour.price?.amount ? tour.price.amount / 100 : null}
        formatOptions={{
          style: 'currency',
          currency: tour.price?.currency,
        }}
      />
    </InfoBlock>
  );
};

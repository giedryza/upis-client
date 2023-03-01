import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { FormattedField, Tile } from 'ui';
import { useDeleteTour, useMyTours } from 'domain/tours';
import { useConfirm } from 'domain/confirm';
import { formatCurrency } from 'tools/format';
import { generateUrl } from 'tools/common';

export const ToursList: FC = () => {
  const { t, lang } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: tours } = useMyTours();
  const { mutate: deleteTour, isLoading: isDeleting } = useDeleteTour();

  return (
    <>
      {tours?.items.map((tour) => (
        <Tile
          title={tour.name}
          subtitle={tour.provider.name}
          url={generateUrl(routes.account.tours.one.index, { id: tour._id })}
          heading="h2"
          fields={[
            {
              label: t('account:tours.table.price'),
              sublabel: tour.price
                ? formatCurrency(lang, tour.price.amount, tour.price.currency)
                : '-',
            },
            {
              label: t('account:tours.table.distance'),
              sublabel: (
                <FormattedField
                  value={tour.distance}
                  formatOptions={{
                    style: 'unit',
                    unit: 'kilometer',
                  }}
                />
              ),
            },
            {
              label: t('account:tours.table.duration'),
              sublabel: (
                <FormattedField
                  value={tour.duration}
                  formatOptions={{
                    style: 'unit',
                    unit: 'hour',
                  }}
                />
              ),
            },
            {
              label: t('account:tours.table.days'),
              sublabel: (
                <FormattedField
                  value={tour.days}
                  formatOptions={{
                    style: 'unit',
                    unit: 'day',
                  }}
                />
              ),
            },
          ]}
          actions={[
            {
              as: 'link',
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              href: generateUrl(routes.account.tours.one.index, {
                id: tour._id,
              }),
            },
            {
              as: 'button',
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              title: t('common:actions.delete'),
              disabled: isDeleting,
              onClick: async () => {
                const { confirmed } = await confirmation(
                  t('account:tours.texts.confirm_delete', {
                    name: tour.name,
                  })
                );

                if (confirmed) {
                  deleteTour({ id: tour._id });
                }
              },
            },
          ]}
          key={tour._id}
        />
      ))}
    </>
  );
};

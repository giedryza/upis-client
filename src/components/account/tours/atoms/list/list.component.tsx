import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { FormattedField, Tile } from 'ui';
import { useDeleteTour, useMyTours } from 'domain/tours';
import { useConfirm } from 'domain/confirm';
import { formatCurrency } from 'tools/format';

export const ToursList: FC = () => {
  const { t, lang } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: tours = [] } = useMyTours();
  const { mutate: deleteTour, isLoading: isDeleting } = useDeleteTour();

  return (
    <>
      {tours.map((tour) => (
        <Tile
          title={tour.name}
          subtitle={tour.provider.name}
          url={routes.account.tours.one.index.replace(':id', tour._id)}
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
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              url: routes.account.tours.one.index.replace(':id', tour._id),
            },
            {
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              attributes: {
                title: t('common:actions.delete'),
                disabled: isDeleting,
                onClick: async () => {
                  const { confirmed } = await confirmation(
                    t('account:tours.texts.confirmDelete', {
                      name: tour.name,
                    })
                  );

                  if (confirmed) {
                    deleteTour({ id: tour._id });
                  }
                },
              },
            },
          ]}
          key={tour._id}
        />
      ))}
    </>
  );
};

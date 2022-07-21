import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, FormattedField, Meter, Table, TableProps } from 'ui';
import { useDeleteTour, useMyTours } from 'domain/tours';
import { useConfirm } from 'domain/confirm';

import { TableColumns } from './table.types';
import styles from './table.module.scss';

export const ToursTable: VFC = () => {
  const { t } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: tours = [] } = useMyTours();
  const { mutate: deleteTour, isLoading: isDeleteTourLoading } =
    useDeleteTour();

  const columns = useMemo<TableProps<TableColumns>['columns']>(() => {
    return [
      { accessor: 'name', label: t('account:tours.table.name') },
      { accessor: 'trip', label: t('account:tours.table.trip') },
      { accessor: 'price', label: t('account:tours.table.price') },
      { accessor: 'distance', label: t('account:tours.table.distance') },
      { accessor: 'duration', label: t('account:tours.table.duration') },
      { accessor: 'days', label: t('account:tours.table.days') },
      {
        accessor: 'difficulty',
        label: t('account:tours.table.difficulty'),
      },
      { accessor: 'actions', label: '', align: 'right' },
    ];
  }, [t]);

  const rows = useMemo<TableProps<TableColumns>['rows']>(() => {
    return tours.map((tour) => ({
      id: tour._id,
      content: {
        name: (
          <Button
            label={tour.name}
            variant="link"
            size="sm"
            textAlign="left"
            url={routes.account.tours.one.index.replace(':id', tour._id)}
          />
        ),
        trip: [tour.departure, tour.arrival].join(' - '),
        price: tour.price ? (
          <FormattedField
            value={tour.price.amount / 100}
            formatOptions={{
              style: 'currency',
              currency: tour.price.currency,
            }}
          />
        ) : (
          '-'
        ),
        distance: (
          <FormattedField
            value={tour.distance}
            formatOptions={{
              style: 'unit',
              unit: 'kilometer',
            }}
          />
        ),
        duration: (
          <FormattedField
            value={tour.duration}
            formatOptions={{
              style: 'unit',
              unit: 'hour',
            }}
          />
        ),
        days: (
          <FormattedField
            value={tour.days}
            formatOptions={{
              style: 'unit',
              unit: 'day',
            }}
          />
        ),
        difficulty: (
          <Meter
            ariaLabel={t('account:tours.table.difficulty')}
            min={0}
            max={5}
            value={tour.difficulty}
            formatOptions={{ style: 'decimal' }}
          />
        ),
        actions: (
          <div className={styles.actions}>
            <Button
              icon="trash"
              size="xs"
              variant="secondary"
              attributes={{
                title: t('common:actions.delete'),
                disabled: isDeleteTourLoading,
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
              }}
            />
            <Button
              icon="pencil"
              size="xs"
              variant="secondary"
              url={routes.account.tours.one.index.replace(':id', tour._id)}
              attributes={{ title: t('common:actions.edit') }}
            />
          </div>
        ),
      },
    }));
  }, [tours, t, deleteTour, isDeleteTourLoading, confirmation]);

  return <Table columns={columns} rows={rows} />;
};

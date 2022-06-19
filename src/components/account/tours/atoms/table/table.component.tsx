import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, MeterBar, Table, TableProps } from 'ui';
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
      { accessor: 'distance', label: t('account:tours.table.distance') },
      { accessor: 'duration', label: t('account:tours.table.duration') },
      { accessor: 'days', label: t('account:tours.table.days') },
      { accessor: 'rivers', label: t('account:tours.table.rivers') },
      { accessor: 'regions', label: t('account:tours.table.regions') },
      {
        accessor: 'difficulty',
        label: t('account:tours.table.difficulty'),
      },
      { accessor: 'price', label: t('account:tours.table.price') },
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
        distance: tour.distance,
        duration: tour.duration,
        days: tour.days,
        rivers: tour.rivers.join(', '),
        regions: tour.regions.join(', '),
        difficulty: (
          <MeterBar
            ariaLabel={t('account:tours.table.difficulty')}
            min={0}
            max={5}
            value={tour.difficulty}
            formatOptions={{ style: 'decimal' }}
          />
        ),
        price: tour.price,
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

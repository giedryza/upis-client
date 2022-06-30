import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { routes } from 'config/routes';
import { useConfirm } from 'domain/confirm';
import { useActiveTour, useDeleteTour } from 'domain/tours';
import { Button } from 'ui';

import styles from './actions.module.scss';

export const TourActions: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { confirmation } = useConfirm();

  const { data: tour } = useActiveTour();
  const { mutate: deleteTour, isLoading: isDeleteTourLoading } =
    useDeleteTour();

  if (!tour) return null;

  return (
    <div className={styles.container}>
      <Button
        label={t('account:tours.actions.delete')}
        variant="ghost"
        icon="trash"
        size="sm"
        attributes={{
          disabled: isDeleteTourLoading,
          onClick: async () => {
            const { confirmed } = await confirmation(
              t('account:tours.texts.confirmDelete', {
                name: tour.name,
              })
            );

            if (confirmed) {
              deleteTour(
                { id: tour._id },
                {
                  onSuccess: () => {
                    push(routes.account.tours.index);
                  },
                }
              );
            }
          },
        }}
      />
    </div>
  );
};

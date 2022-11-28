import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useConfirm } from 'domain/confirm';
import { useActiveTour, useDeleteTour } from 'domain/tours';
import { Button } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { generateRoute } from 'tools/common';

export const Settings: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { confirmation } = useConfirm();

  const { data: tour } = useActiveTour();
  const { mutate: deleteTour, isLoading: isDeleteTourLoading } =
    useDeleteTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.settings.title')}
      columns={1}
      icon="gear"
    >
      <div>
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
                      push(generateRoute(routes.account.tours.index));
                    },
                  }
                );
              }
            },
          }}
        />
      </div>
    </InfoBlock>
  );
};

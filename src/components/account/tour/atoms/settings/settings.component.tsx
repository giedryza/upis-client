import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { useConfirm } from 'domain/confirm';
import { useActiveTour, useDeleteTour } from 'domain/tours';
import { Button } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { generateUrl } from 'tools/services/url';

import styles from './settings.module.scss';

export const Settings: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { confirmation } = useConfirm();

  const { data: tour } = useActiveTour();
  const { mutate: deleteTour, isLoading: isDeleting } = useDeleteTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.settings.title')}
      columns={1}
      icon="gear"
    >
      <div className={styles.actions}>
        <Button
          as="button"
          label={t('account:tours.actions.delete')}
          variant="outline"
          icon="trash"
          size="sm"
          disabled={isDeleting}
          onClick={async () => {
            const { confirmed } = await confirmation(
              t('account:tours.texts.confirm_delete', {
                name: tour.name,
              })
            );

            if (confirmed) {
              deleteTour(
                { id: tour._id },
                {
                  onSuccess: () => {
                    push(generateUrl(routes.account.tours.index));
                  },
                }
              );
            }
          }}
        />
        <Button
          as="link"
          label={t('common:actions.preview')}
          variant="outline"
          // TODO: replace with eye icon
          icon="magnifying-glass-plus"
          size="sm"
          href={generateUrl(routes.tours.one.index, {
            id: tour._id,
            slug: tour.slug,
          })}
        />
      </div>
    </InfoBlock>
  );
};

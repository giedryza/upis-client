import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';
import { useConfirm } from 'domain/confirm';
import { useActiveProvider, useDeleteProvider } from 'domain/providers';
import { InfoBlock } from 'components/account/atoms';

export const Settings: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { confirmation } = useConfirm();

  const { data: provider } = useActiveProvider();
  const { mutate: deleteProvider, isLoading: isDeleting } = useDeleteProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.settings.title')}
      columns={1}
      icon="gear"
    >
      <div>
        <Button
          label={t('account:providers.actions.delete')}
          variant="ghost"
          icon="trash"
          size="sm"
          attributes={{
            disabled: isDeleting,
            onClick: async () => {
              const { confirmed } = await confirmation(
                t('account:providers.texts.confirmDelete', {
                  name: provider.name,
                })
              );

              if (confirmed) {
                deleteProvider(
                  { id: provider._id },
                  {
                    onSuccess: () => {
                      push(routes.account.providers.index);
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

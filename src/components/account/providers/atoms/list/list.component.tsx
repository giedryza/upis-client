import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Tile } from 'ui';
import { useMyProviders, useDeleteProvider } from 'domain/providers';
import { useConfirm } from 'domain/confirm';
import { toExternalLink } from 'tools/common';

export const ProvidersList: VFC = () => {
  const { t } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: providers = [] } = useMyProviders();
  const { mutate: deleteProvider, isLoading: isDeleting } = useDeleteProvider();

  return (
    <>
      {providers.map((provider) => (
        <Tile
          title={provider.name}
          subtitle={provider.address}
          url={routes.account.providers.one.index.replace(':id', provider._id)}
          heading="h2"
          fields={[
            {
              label: t('account:providers.table.email'),
              sublabel: provider.email ? (
                <a
                  href={`mailto:${provider.email}`}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {provider.email}
                </a>
              ) : (
                '-'
              ),
            },
            {
              label: t('account:providers.table.phone'),
              sublabel: provider.phone || '-',
            },
            {
              label: t('account:providers.table.website'),
              sublabel: provider.website ? (
                <a
                  href={toExternalLink(provider.website)}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {provider.website}
                </a>
              ) : (
                '-'
              ),
            },
          ]}
          actions={[
            {
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              url: routes.account.providers.one.index.replace(
                ':id',
                provider._id
              ),
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
                    t('account:providers.texts.confirmDelete', {
                      name: provider.name,
                    })
                  );

                  if (confirmed) {
                    deleteProvider({ id: provider._id });
                  }
                },
              },
            },
          ]}
          key={provider._id}
        />
      ))}
    </>
  );
};

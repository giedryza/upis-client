import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { Tile } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useConfirm } from 'domain/confirm';
import { generateUrl } from 'tools/services/url';
import { toExternalLink } from 'tools/common';
import {
  useActiveProvider,
  useDeleteSocialLink,
  ICON_BY_SOCIAL_LINK_TYPE,
} from 'domain/providers';

export const SocialLinks: FC = () => {
  const { t } = useTranslation();
  const { confirmation } = useConfirm();

  const { data: provider } = useActiveProvider();
  const { mutate: deleteSocialLink, isLoading: isDeleting } =
    useDeleteSocialLink();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.socials.title')}
      icon="network"
      columns={2}
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.providers.one.socials.add, {
            id: provider._id,
          }),
          label: t('common:actions.add'),
          variant: 'tertiary',
          icon: 'plus',
        },
      ]}
    >
      {provider.socials.map((social) => (
        <Tile
          title={t(`socials:${social.type}`)}
          icon={ICON_BY_SOCIAL_LINK_TYPE[social.type]}
          fields={[
            {
              label: t('account:providers.socials.table.url'),
              sublabel: social.url ? (
                <a
                  href={toExternalLink(social.url)}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.url}
                </a>
              ) : (
                '-'
              ),
            },
          ]}
          actions={[
            {
              as: 'link',
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              href: generateUrl(routes.account.providers.one.socials.one, {
                id: provider._id,
                socialId: social._id,
              }),
            },
            {
              as: 'button',
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              disabled: isDeleting,
              onClick: async () => {
                const { confirmed } = await confirmation(
                  t('account:providers.socials.texts.confirm_delete', {
                    type: t(`socials:${social.type}`),
                    url: social.url,
                  })
                );

                if (confirmed) {
                  deleteSocialLink({
                    id: provider._id,
                    form: { id: social._id },
                  });
                }
              },
            },
          ]}
          key={social._id}
        />
      ))}
    </InfoBlock>
  );
};

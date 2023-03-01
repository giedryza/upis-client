import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { Tile } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import {
  useSocialLinks,
  useDeleteSocialLink,
  ICON_BY_SOCIAL_LINK_TYPE,
} from 'domain/social-links';
import { useConfirm } from 'domain/confirm';
import { generateUrl, getRouteParam, toExternalLink } from 'tools/common';

export const SocialLinks: FC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { confirmation } = useConfirm();

  const providerId = getRouteParam(query.id);

  const { data: socialLinks = [] } = useSocialLinks({
    host: providerId,
  });
  const { mutate: deleteSocialLink, isLoading: isDeleting } =
    useDeleteSocialLink();

  return (
    <InfoBlock
      title={t('account:providers.socialLinks.title')}
      icon="network"
      columns={2}
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.providers.one.socialLinks.add, {
            id: providerId,
          }),
          label: t('common:actions.add'),
          variant: 'tertiary',
          icon: 'plus',
        },
      ]}
    >
      {socialLinks.map((socialLink) => (
        <Tile
          title={t(`socials:${socialLink.type}`)}
          icon={ICON_BY_SOCIAL_LINK_TYPE[socialLink.type]}
          fields={[
            {
              label: t('account:providers.socialLinks.table.url'),
              sublabel: socialLink.url ? (
                <a
                  href={toExternalLink(socialLink.url)}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {socialLink.url}
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
              href: generateUrl(routes.account.providers.one.socialLinks.one, {
                id: socialLink.host,
                socialLinkId: socialLink._id,
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
                  t('account:providers.socialLinks.texts.confirm_delete', {
                    type: t(`socials:${socialLink.type}`),
                    url: socialLink.url,
                  })
                );

                if (confirmed) {
                  deleteSocialLink({ id: socialLink._id });
                }
              },
            },
          ]}
          key={socialLink._id}
        />
      ))}
    </InfoBlock>
  );
};

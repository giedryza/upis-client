import { VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, Tile } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useSocialLinks, useDeleteSocialLink } from 'domain/social-links';
import { useConfirm } from 'domain/confirm';
import { getRouteParam } from 'tools/common';

import { ICON_BY_SOCIAL_LINK_TYPE } from './social-links.constants';

export const SocialLinks: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { confirmation } = useConfirm();

  const companyId = getRouteParam(query.id);

  const { data: socialLinks = [] } = useSocialLinks({
    host: companyId,
  });
  const { mutate: deleteSocialLink, isLoading: isDeleting } =
    useDeleteSocialLink();

  return (
    <InfoBlock
      title={t('account:companies.socialLinks.title')}
      icon="network"
      columns={1}
    >
      {socialLinks.map((socialLink) => (
        <Tile
          title={t(`common:social.${socialLink.type}`)}
          icon={ICON_BY_SOCIAL_LINK_TYPE[socialLink.type]}
          fields={[
            {
              label: t('account:companies.socialLinks.table.url'),
              sublabel: socialLink.url ? (
                <a
                  href={socialLink.url}
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
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              url: routes.account.companies.one.socialLinks.one
                .replace(':id', socialLink.host)
                .replace(':socialLinkId', socialLink._id),
            },
            {
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              attributes: {
                disabled: isDeleting,
                onClick: async () => {
                  const { confirmed } = await confirmation(
                    t('account:companies.socialLinks.texts.confirmDelete', {
                      type: t(`common:social.${socialLink.type}`),
                      url: socialLink.url,
                    })
                  );

                  if (confirmed) {
                    deleteSocialLink({ id: socialLink._id });
                  }
                },
              },
            },
          ]}
          key={socialLink._id}
        />
      ))}

      <div>
        <Button
          label={t('common:actions.add')}
          variant="tertiary"
          icon="plus"
          size="xs"
          url={routes.account.companies.one.socialLinks.add.replace(
            ':id',
            companyId
          )}
        />
      </div>
    </InfoBlock>
  );
};

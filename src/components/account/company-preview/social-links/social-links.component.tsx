import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Icon, IconName, Table, TableProps } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies/companies.queries';
import { useDeleteSocialLink } from 'domain/companies/companies.mutations';

import { SocialLinksTableColumns } from './social-links.types';
import { ICON_BY_SOCIAL_LINK_TYPE } from './social-links.constants';
import styles from './social-links.module.scss';

export const SocialLinks: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();
  const { mutate: deleteSocialLink, isLoading: isDeleteSocialLinkLoading } =
    useDeleteSocialLink();

  const columns = useMemo<
    TableProps<SocialLinksTableColumns>['columns']
  >(() => {
    return [
      {
        accessor: 'type',
        label: t('account:companies.socialNetworks.table.type'),
      },
      {
        accessor: 'url',
        label: t('account:companies.socialNetworks.table.url'),
      },
      { accessor: 'actions', label: '', align: 'right' },
    ];
  }, [t]);

  const rows = useMemo<TableProps<SocialLinksTableColumns>['rows']>(() => {
    return (
      company?.socialLinks.map((socialLink) => ({
        id: socialLink._id,
        content: {
          type: (
            <div className={styles.actions}>
              <Icon
                name={ICON_BY_SOCIAL_LINK_TYPE[socialLink.type]}
                className={styles.icon}
              />
              <span>{t(`common:social.${socialLink.type}`)}</span>
            </div>
          ),
          url: socialLink.url,
          actions: (
            <div className={styles.actions}>
              <Button
                icon={IconName.Trash}
                size="xs"
                variant="secondary"
                attributes={{
                  title: t('common:actions.delete'),
                  disabled: isDeleteSocialLinkLoading,
                  onClick: () =>
                    deleteSocialLink({ socialLinkId: socialLink._id }),
                }}
              />
              <Button
                icon={IconName.Pencil}
                size="xs"
                variant="secondary"
                attributes={{ title: t('common:actions.edit') }}
              />
            </div>
          ),
        },
      })) ?? []
    );
  }, [company, t, deleteSocialLink, isDeleteSocialLinkLoading]);

  return (
    <InfoBlock
      title={t('account:companies.socialNetworks.title')}
      icon={IconName.Network}
      columns={1}
    >
      <Table columns={columns} rows={rows} />
    </InfoBlock>
  );
};

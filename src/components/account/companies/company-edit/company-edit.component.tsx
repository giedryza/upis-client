import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Icon, IconName, Table, TableProps } from 'ui';
import { useActiveCompany } from 'domain/companies/companies.queries';
import { InfoBlock, InfoItem, MapItem } from 'components/account/atoms';
import { useDeleteSocialLink } from 'domain/companies/companies.mutations';
import { SocialType } from 'domain/companies/companies.types';

import styles from './company-edit.module.scss';

type SocialNetworksTableColumns = 'type' | 'url' | 'actions';

const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialType, IconName> = {
  [SocialType.Facebook]: IconName.LogoFacebook,
  [SocialType.Instagram]: IconName.LogoInstagram,
  [SocialType.Youtube]: IconName.LogoYoutube,
  [SocialType.Linkedin]: IconName.LogoLinkedin,
  [SocialType.Twitter]: IconName.LogoTwitter,
};

export const CompanyEdit: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();
  const { mutate: deleteSocialLink, isLoading: isDeleteSocialLinkLoading } =
    useDeleteSocialLink();

  const columns = useMemo<
    TableProps<SocialNetworksTableColumns>['columns']
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

  const rows = useMemo<TableProps<SocialNetworksTableColumns>['rows']>(() => {
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

  if (!company) return null;

  const {
    name,
    description,
    email,
    phone,
    website,
    address,
    location: {
      coordinates: [lng, lat],
    },
  } = company;

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.about.title')}
        icon={IconName.Info}
        columns={1}
      >
        <InfoItem
          label={t('account:companies.about.form.name.label')}
          value={name}
        />
        <InfoItem
          label={t('account:companies.about.form.description.label')}
          value={description}
        />
      </InfoBlock>

      <InfoBlock
        title={t('account:companies.contacts.title')}
        icon={IconName.Phone}
      >
        <InfoItem
          label={t('account:companies.contacts.form.email.label')}
          value={email}
        />
        <InfoItem
          label={t('account:companies.contacts.form.phone.label')}
          value={phone}
        />
        <InfoItem
          label={t('account:companies.contacts.form.website.label')}
          value={website}
        />
      </InfoBlock>

      <InfoBlock
        title={t('account:companies.location.title')}
        icon={IconName.Pin}
        columns={1}
      >
        <InfoItem
          label={t('account:companies.location.form.address.label')}
          value={address}
        />

        <MapItem lat={lat} lng={lng} />
      </InfoBlock>

      <InfoBlock
        title={t('account:companies.socialNetworks.title')}
        icon={IconName.Network}
        columns={1}
      >
        <Table columns={columns} rows={rows} />
      </InfoBlock>
    </div>
  );
};

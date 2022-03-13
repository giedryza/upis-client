import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { IconName } from 'ui';
import { getRouteParam } from 'tools/common/getRouteParam';
import { useCompany } from 'domain/companies/companies.queries';
import { InfoBlock, InfoItem, MapItem } from 'components/account/atoms';

import styles from './company-edit.module.scss';
import { FormName } from './form-name/form-name.component';
import { FormEmail } from './form-email/form-email.component';
import { FormPhone } from './form-phone/form-phone.component';
import { FormDescription } from './form-description/form-description.component';
import { FormWebsite } from './form-website/form-website.component';
import { SocialLinks } from './social-links/social-links.component';
import { Location } from './form-location/form-location.component';

export const CompanyEdit: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const slug = getRouteParam(query?.slug);

  const { data: company } = useCompany(slug);

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
      {/* 
      <div className={styles.block}>
        <h2>{t('account:company.subtitle.socialLinks')}</h2>
        <SocialLinks companyId={company._id} />
      </div>
       */}
    </div>
  );
};

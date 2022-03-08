import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useMyCompany } from 'domain/companies/companies.queries';

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

  const { data: company } = useMyCompany();

  if (!company) return null;

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h2>{t('account:company.subtitle.about')}</h2>
        <FormName companyId={company._id} />
        <FormDescription companyId={company._id} />
      </div>

      <div className={styles.block}>
        <h2>{t('account:company.subtitle.contacts')}</h2>
        <FormEmail companyId={company._id} />
        <FormPhone companyId={company._id} />
        <FormWebsite companyId={company._id} />
      </div>

      <div className={styles.block}>
        <h2>{t('account:company.subtitle.location')}</h2>
        <Location companyId={company._id} />
      </div>

      <div className={styles.block}>
        <h2>{t('account:company.subtitle.socialLinks')}</h2>
        <SocialLinks companyId={company._id} />
      </div>
    </div>
  );
};

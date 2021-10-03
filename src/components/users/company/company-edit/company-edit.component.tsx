import { VFC } from 'react';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './company-edit.module.scss';

import { FormName } from 'components/users/company/company-edit/form-name/form-name.component';
import { FormEmail } from 'components/users/company/company-edit/form-email/form-email.component';
import { FormPhone } from 'components/users/company/company-edit/form-phone/form-phone.component';
import { FormDescription } from 'components/users/company/company-edit/form-description/form-description.component';
import { FormWebsite } from 'components/users/company/company-edit/form-website/form-website.component';
import { selectMyCompany } from 'domain/companies/companies.selectors';

export const CompanyEdit: VFC = () => {
  const { t } = useTranslation();

  const company = useSelector(selectMyCompany);

  if (!company) return null;

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h2>{t('users:company.subtitle.about')}</h2>
        <FormName companyId={company._id} />
        <FormDescription companyId={company._id} />
      </div>

      <div className={styles.block}>
        <h2>{t('users:company.subtitle.contacts')}</h2>
        <FormEmail companyId={company._id} />
        <FormPhone companyId={company._id} />
        <FormWebsite companyId={company._id} />
      </div>
    </div>
  );
};

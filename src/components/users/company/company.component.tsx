import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CompanyCreate } from 'components/users/company/company-create/company-create.component';
import { CompanyEdit } from 'components/users/company/company-edit/company-edit.component';
import { useMyCompany } from 'domain/companies/companies.queries';

import styles from './company.module.scss';

export const Company: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useMyCompany();

  return (
    <div className={styles.content}>
      <h1>{t('users:company.title')}</h1>

      {company ? <CompanyEdit /> : <CompanyCreate />}
    </div>
  );
};

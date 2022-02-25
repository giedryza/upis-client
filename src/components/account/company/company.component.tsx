import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CompanyCreate } from 'components/account/company/company-create/company-create.component';
import { CompanyEdit } from 'components/account/company/company-edit/company-edit.component';
import { useMyCompany } from 'domain/companies/companies.queries';

import styles from './company.module.scss';

export const Company: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useMyCompany();

  return (
    <div className={styles.content}>
      <h1>{t('account:company.title')}</h1>

      {company ? <CompanyEdit /> : <CompanyCreate />}
    </div>
  );
};

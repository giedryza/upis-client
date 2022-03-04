import { VFC } from 'react';

import { CompanyCreate } from 'components/account/company/company-create/company-create.component';
import { CompanyEdit } from 'components/account/company/company-edit/company-edit.component';
import { useMyCompany } from 'domain/companies/companies.queries';

import styles from './company.module.scss';

export const Company: VFC = () => {
  const { data: company } = useMyCompany();

  return (
    <div className={styles.content}>
      {company ? <CompanyEdit /> : <CompanyCreate />}
    </div>
  );
};

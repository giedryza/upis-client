import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import {
  selectIsCompaniesLoading,
  selectIsMyCompanyExist,
} from 'domain/companies/companies.selectors';
import { useInitMyCompany } from 'components/users/company/company.hooks';
import { Loader } from 'ui/loader';
import { CompanyCreate } from 'components/users/company/company-create/company-create.component';
import { CompanyEdit } from 'components/users/company/company-edit/company-edit.component';

import styles from './company.module.scss';

export const Company: VFC = () => {
  const { t } = useTranslation();

  const isMyCompanyExist = useSelector(selectIsMyCompanyExist);
  const isLoading = useSelector(selectIsCompaniesLoading);

  useInitMyCompany();

  return (
    <div className={styles.content}>
      <h1>{t('users:company.title')}</h1>

      {isLoading ? (
        <Loader />
      ) : isMyCompanyExist ? (
        <CompanyEdit />
      ) : (
        <CompanyCreate />
      )}
    </div>
  );
};

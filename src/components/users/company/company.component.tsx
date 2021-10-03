import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import styles from './company.module.scss';

import {
  selectIsCompaniesLoading,
  selectIsMyCompanyExist,
} from 'domain/companies/companies.selectors';
import { useInitMyCompany } from 'components/users/company/company.hooks';
import { Loader } from 'ui/loader/loader.component';
import { CompanyCreate } from 'components/users/company/company-create/company-create.component';
import { CompanyEdit } from 'components/users/company/company-edit/company-edit.component';

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

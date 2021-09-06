import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import styles from './company.module.scss';

import { FormSteps } from 'ui/form-steps/form-steps.component';
import { FormInfo } from 'components/users/company/form-info/form-info.component';
import { COMPANY_FORM_TOTAL_STEPS } from 'domain/companies/companies.constants';
import { selectCurrentStep } from 'domain/companies/companies.selectors';
import { useMyCompany } from 'components/users/company/company.hooks';

const Company: FC = () => {
  const { t } = useTranslation();

  const step = useSelector(selectCurrentStep);

  useMyCompany();

  return (
    <div className={styles.content}>
      <h1>{t('users:company.title')}</h1>

      <div className={styles.form}>
        <FormSteps total={COMPANY_FORM_TOTAL_STEPS} current={step} />

        <FormInfo />
      </div>
    </div>
  );
};

export { Company };

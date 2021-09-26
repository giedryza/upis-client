import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import styles from './company.module.scss';

import { FormSteps } from 'ui/form-steps/form-steps.component';
import { selectCurrentStep } from 'domain/companies/companies.selectors';
import { useInitMyCompany } from 'components/users/company/company.hooks';
import { FORM_BY_STEP } from 'components/users/company/company.constants';
import { CompanyFormStep } from 'domain/companies/companies.types';

const Company: VFC = () => {
  const { t } = useTranslation();

  const step = useSelector(selectCurrentStep);

  useInitMyCompany();

  const FormByStep = FORM_BY_STEP[step] ?? 'div';

  return (
    <div className={styles.content}>
      <h1>{t('users:company.title')}</h1>

      <div className={styles.form}>
        <FormSteps
          total={Object.values(CompanyFormStep).length}
          current={Object.values(CompanyFormStep).indexOf(step) + 1}
        />

        <FormByStep />
      </div>
    </div>
  );
};

export { Company };

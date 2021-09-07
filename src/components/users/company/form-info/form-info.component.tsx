import React, { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-info.module.scss';

import { Input } from 'ui/input/input.component';
import { Button } from 'ui/button/button.component';
import { submitCompanyForm } from 'domain/companies/companies.thunks';
import {
  useFormInfo,
  useValues,
} from 'components/users/company/form-info/form-info.hooks';
import { FormInfoValues } from 'components/users/company/form-info/form-info.types';

const FormInfo: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ name, email, phone }: FormInfoValues) => {
    dispatch(submitCompanyForm({ name, email, phone }));
  };

  const { handleSubmit, refs, errorMessages, isSubmitDisabled } = useFormInfo(
    onSubmit,
    values
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Input
          {...refs.name}
          label={t('users:company.form.name')}
          error={errorMessages.name}
        />

        <Input
          {...refs.email}
          label={t('users:company.form.email')}
          error={errorMessages.email}
        />

        <Input
          {...refs.phone}
          label={t('users:company.form.phone')}
          error={errorMessages.phone}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.next')}
          styleType="primary"
          type="submit"
          disabled={isSubmitDisabled}
        />
      </div>
    </form>
  );
};

export { FormInfo };

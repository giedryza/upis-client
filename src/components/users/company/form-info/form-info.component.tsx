import React, { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-info.module.scss';

import { TextInput } from 'ui/text-input/text-input.component';
import { Button } from 'ui/button/button.component';
import {
  useMyCompanyInfoForm,
  useValues,
} from 'components/users/company/form-info/form-info.hooks';
import { MyCompanyInfoFormValues } from 'components/users/company/form-info/form-info.types';
import { thunks } from 'domain/thunks';

const FormInfo: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({
    name,
    email,
    phone,
    description,
  }: MyCompanyInfoFormValues) => {
    dispatch(
      thunks.companies.createMyCompany({ name, email, phone, description })
    );
  };

  const {
    handleSubmit,
    refs,
    errorMessages,
    isDisabled,
  } = useMyCompanyInfoForm(onSubmit, values);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <TextInput
          {...refs.name}
          label={t('users:company.form.name')}
          error={errorMessages.name}
        />

        <TextInput
          {...refs.email}
          label={t('users:company.form.email')}
          error={errorMessages.email}
        />

        <TextInput
          {...refs.phone}
          label={t('users:company.form.phone')}
          error={errorMessages.phone}
        />

        <TextInput
          {...refs.description}
          label={t('users:company.form.description')}
          type="textarea"
          rows={10}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.next')}
          styleType="primary"
          type="submit"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
};

export { FormInfo };

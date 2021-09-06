import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './form-info.module.scss';

import { Input } from 'ui/input/input.component';
import { Button } from 'ui/button/button.component';
import { ValidationRules } from 'types/common/forms';
import { submitCompanyForm } from 'domain/companies/companies.thunks';

interface Values {
  name: string;
  phone: string;
  email: string;
}

const INITIAL_VALUES: Values = {
  name: '',
  phone: '',
  email: '',
};

const FormInfo: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const { isSubmitting, isValidating, isSubmitted, isValid } = formState;

  const validation: ValidationRules<Values> = {
    name: {
      required: {
        value: true,
        message: t('users:errors.company.name.empty'),
      },
    },
    email: {
      required: {
        value: true,
        message: t('users:errors.company.email.empty'),
      },
    },
    phone: {
      required: {
        value: true,
        message: t('users:errors.company.phone.empty'),
      },
    },
  };

  const onSubmit = ({ name, email, phone }: Values) => {
    dispatch(submitCompanyForm({ form: { name, email, phone }, setError }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <Input
          name="name"
          label={t('users:company.form.name')}
          ref={register(validation.name)}
          error={isSubmitted ? errors.name?.message : ''}
        />

        <Input
          name="email"
          label={t('users:company.form.email')}
          ref={register(validation.email)}
          error={isSubmitted ? errors.email?.message : ''}
        />

        <Input
          name="phone"
          label={t('users:company.form.phone')}
          ref={register(validation.phone)}
          error={isSubmitted ? errors.phone?.message : ''}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.next')}
          styleType="primary"
          type="submit"
          disabled={isSubmitting || isValidating || (isSubmitted && !isValid)}
        />
      </div>
    </form>
  );
};

export { FormInfo };

import { FC } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import styles from './signin.module.scss';

import { Button } from 'ui/button/button.component';
import { Http } from 'utils/libs/http/http.lib';
import { uri } from 'utils/libs/http/http.constants';
import { Errors } from 'utils/libs/errors/errors.lib';
import { Input } from 'ui/input/input.component';
import { ValidationRules } from 'types/common/forms';

interface Values {
  email: string;
  password: string;
}

const INITIAL_VALUES: Values = {
  email: '',
  password: '',
};

const Signin: FC = () => {
  const { t } = useTranslation();
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
    email: {
      required: {
        value: true,
        message: t('users:errors.email.empty'),
      },
    },
    password: {
      required: {
        value: true,
        message: t('users:errors.password.empty'),
      },
      minLength: {
        value: 8,
        message: t('users:errors.password.length'),
      },
      maxLength: {
        value: 50,
        message: t('users:errors.password.length'),
      },
    },
  };

  const onSubmit = async ({ email, password }: Values) => {
    try {
      await new Http(uri.endpoints.users.signin, {
        body: { email, password },
      }).post();

      Router.push('/');
    } catch (error: unknown) {
      new Errors(error).handleForm(setError);
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <Trans i18nKey="users:layout.title" components={[<span />]} />
      </h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <Input
            name="email"
            label={t('users:form.email')}
            ref={register(validation.email)}
            error={errors.email?.message}
          />

          <Input
            name="password"
            label={t('users:form.password')}
            type="password"
            error={errors.password?.message}
            ref={register(validation.password)}
          />
        </div>

        <Button
          label={t('users:actions.forgot-pass')}
          styleType="link"
          size="xs"
        />

        <div className={styles.actions}>
          <Button
            label={t('users:actions.signin')}
            styleType="primary"
            type="submit"
            disabled={isSubmitting || isValidating || (isSubmitted && !isValid)}
          />
        </div>
      </form>
    </div>
  );
};

export { Signin };

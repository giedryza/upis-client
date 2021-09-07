import { FC } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import styles from './signin.module.scss';

import { Button } from 'ui/button/button.component';
import { Card } from 'ui/card/card.component';
import { Http } from 'utils/libs/http/http.lib';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import { Input } from 'ui/input/input.component';
import { ValidationRules } from 'types/common/forms';
import { Session } from 'domain/auth/auth.types';
import { authActions } from 'domain/auth/auth.actions';
import { Response } from 'utils/libs/http/http.types';
import { routes } from 'uri/routes';

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

  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

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
      const { data } = await new Http<Response<Session>>(
        endpoints.users.signin,
        {
          body: { email, password },
        }
      ).post();

      dispatch(authActions.setSession(data));

      Router.push(routes.home);
    } catch (error: unknown) {
      new Errors(error).handleApi();
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1>{t('users:layout.signin')}</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <Input
                {...register('email', { ...validation.email })}
                label={t('users:form.email')}
                error={isSubmitted ? errors.email?.message : ''}
              />

              <Input
                {...register('password', { ...validation.password })}
                label={t('users:form.password')}
                type="password"
                error={isSubmitted ? errors.password?.message : ''}
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
                disabled={
                  isSubmitting || isValidating || (isSubmitted && !isValid)
                }
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export { Signin };

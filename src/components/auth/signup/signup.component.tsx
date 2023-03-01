import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { Button, Container, Divider, TextInput, Card } from 'ui';
import { useSignup } from 'domain/users';

import { Values } from './signup.types';
import {
  INITIAL_VALUES,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './signup.constants';
import styles from './signup.module.scss';

export const Signup: FC = () => {
  const { t } = useTranslation();

  const { mutate: signup, isLoading } = useSignup();

  const onSubmit: SubmitHandler<Values> = ({
    email,
    password,
    confirmPassword,
  }) => {
    signup({ email, password, confirmPassword });
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('auth:signup.title')}</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
              <TextInput
                {...register('email', {
                  required: {
                    value: true,
                    message: t('auth:signup.form.email.errors.empty'),
                  },
                })}
                label={t('auth:signup.form.email.label')}
                placeholder={t('auth:signup.form.email.placeholder')}
                type="email"
                error={errors.email?.message}
              />

              <TextInput
                {...register('password', {
                  required: {
                    value: true,
                    message: t('auth:signup.form.password.errors.empty'),
                  },
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: t('auth:signup.form.password.errors.length', {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }),
                  },
                  maxLength: {
                    value: PASSWORD_MAX_LENGTH,
                    message: t('auth:signup.form.password.errors.length', {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }),
                  },
                })}
                label={t('auth:signup.form.password.label')}
                placeholder={t('auth:signup.form.password.placeholder')}
                type="password"
                error={errors.password?.message}
              />

              <TextInput
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: t(
                      'auth:signup.form.confirm_password.errors.empty'
                    ),
                  },
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return t(
                        'auth:signup.form.confirm_password.errors.not_match'
                      );
                    }
                  },
                })}
                label={t('auth:signup.form.confirm_password.label')}
                placeholder={t('auth:signup.form.confirm_password.placeholder')}
                type="password"
                error={errors.confirmPassword?.message}
              />
            </fieldset>

            <Button
              as="button"
              label={t('auth:actions.signup')}
              variant="primary"
              width="full"
              disabled={isLoading}
              type="submit"
            />
          </form>

          <Divider label={t('common:texts.or')} />

          <Button
            as="button"
            label={t('auth:actions.signin-google')}
            icon="logo-google"
            variant="secondary"
            width="full"
          />

          <div className={styles.footer}>
            <span>{t('auth:signup.texts.have-account')}</span>
            <Button
              as="link"
              label={t('auth:actions.signin')}
              variant="link"
              size="xs"
              href={generateUrl(routes.auth.signin)}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useForm, SubmitHandler } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl, useAppDispatch } from 'tools/services';
import { Button, Container, Card, TextInput } from 'ui';
import { useResetPassword } from 'domain/users';
import { alerts } from 'domain/alerts';

import { PasswordResetSuccess } from './atoms';
import { Values } from './reset.types';
import {
  INITIAL_VALUES,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './reset.constants';
import styles from './reset.module.scss';

export const PasswordReset: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: resetPassword, isLoading } = useResetPassword();

  const onSubmit: SubmitHandler<Values> = async ({ newPassword }) => {
    // TODO: use zod
    const { token, user } = query;

    if (typeof token !== 'string' || typeof user !== 'string') {
      dispatch(
        alerts.actions.open({
          type: 'danger',
          message: (
            <Trans
              i18nKey="auth:password_reset.error"
              components={[
                <Button
                  as="link"
                  label={t('common:actions.try_again')}
                  size="sm"
                  variant="link"
                  href={generateUrl(routes.auth.password.forgot)}
                  key="try-again"
                />,
              ]}
            />
          ),
        })
      );

      return;
    }

    resetPassword(
      {
        user,
        token,
        password: newPassword,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  if (isSuccess) {
    return <PasswordResetSuccess />;
  }

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('auth:password_reset.title')}</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset} disabled={isLoading}>
              <TextInput
                {...register('newPassword', {
                  required: {
                    value: true,
                    message: t(
                      'auth:password_reset.form.new_password.errors.empty'
                    ),
                  },
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: t(
                      'auth:password_reset.form.new_password.errors.length',
                      {
                        minLength: PASSWORD_MIN_LENGTH,
                        maxLength: PASSWORD_MAX_LENGTH,
                      }
                    ),
                  },
                  maxLength: {
                    value: PASSWORD_MAX_LENGTH,
                    message: t(
                      'auth:password_reset.form.new_password.errors.length',
                      {
                        minLength: PASSWORD_MIN_LENGTH,
                        maxLength: PASSWORD_MAX_LENGTH,
                      }
                    ),
                  },
                })}
                label={t('auth:password_reset.form.new_password.label')}
                placeholder={t(
                  'auth:password_reset.form.new_password.placeholder'
                )}
                type="password"
                error={errors.newPassword?.message}
              />

              <TextInput
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: t(
                      'auth:password_reset.form.confirm_password.errors.empty'
                    ),
                  },
                  validate: (value) => {
                    if (watch('newPassword') !== value) {
                      return t(
                        'auth:password_reset.form.confirm_password.errors.not_match'
                      );
                    }
                  },
                })}
                label={t('auth:password_reset.form.confirm_password.label')}
                placeholder={t(
                  'auth:password_reset.form.confirm_password.placeholder'
                )}
                type="password"
                error={errors.confirmPassword?.message}
              />
            </fieldset>

            <Button
              as="button"
              label={t('common:actions.submit')}
              variant="primary"
              width="full"
              type="submit"
              disabled={isLoading}
            />
          </form>

          <div className={styles.footer}>
            <span>{t('auth:signin.texts.no_account')}</span>
            <Button
              as="link"
              label={t('auth:actions.signup')}
              variant="link"
              size="xs"
              href={generateUrl(routes.auth.signup)}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

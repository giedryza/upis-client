import { useState, VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { routes } from 'config/routes';
import { Button, Container, Card, TextInput } from 'ui';
import { useResetPassword } from 'domain/users';
import { notifications } from 'domain/notifications';

import { PasswordResetSuccess } from './atoms';
import { Values } from './reset.types';
import {
  INITIAL_VALUES,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './reset.constants';
import styles from './reset.module.scss';

export const PasswordReset: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { query } = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: resetPassword, isLoading } = useResetPassword({
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const onSubmit: SubmitHandler<Values> = async ({ newPassword }) => {
    const { token, userId } = query;

    if (typeof token !== 'string' || typeof userId !== 'string') {
      dispatch(
        notifications.actions.open({
          type: 'danger',
          message: (
            <Trans
              i18nKey="auth:passwordReset.error"
              components={[
                <Button
                  label={t('common:actions.tryAgain')}
                  size="sm"
                  variant="link"
                  url={routes.auth.password.forgot}
                />,
              ]}
            />
          ),
        })
      );

      return;
    }

    resetPassword({
      userId,
      token,
      password: newPassword,
    });
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
          <h1 className={styles.title}>{t('auth:passwordReset.title')}</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset} disabled={isLoading}>
              <TextInput
                {...register('newPassword', {
                  required: {
                    value: true,
                    message: t(
                      'auth:passwordReset.form.newPassword.errors.empty'
                    ),
                  },
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: t(
                      'auth:passwordReset.form.newPassword.errors.length',
                      {
                        minLength: PASSWORD_MIN_LENGTH,
                        maxLength: PASSWORD_MAX_LENGTH,
                      }
                    ),
                  },
                  maxLength: {
                    value: PASSWORD_MAX_LENGTH,
                    message: t(
                      'auth:passwordReset.form.newPassword.errors.length',
                      {
                        minLength: PASSWORD_MIN_LENGTH,
                        maxLength: PASSWORD_MAX_LENGTH,
                      }
                    ),
                  },
                })}
                label={t('auth:passwordReset.form.newPassword.label')}
                placeholder={t(
                  'auth:passwordReset.form.newPassword.placeholder'
                )}
                type="password"
                error={errors.newPassword?.message}
              />

              <TextInput
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: t(
                      'auth:passwordReset.form.confirmPassword.errors.empty'
                    ),
                  },
                  validate: (value) => {
                    if (watch('newPassword') !== value) {
                      return t(
                        'auth:passwordReset.form.confirmPassword.errors.not-match'
                      );
                    }
                  },
                })}
                label={t('auth:passwordReset.form.confirmPassword.label')}
                placeholder={t(
                  'auth:passwordReset.form.confirmPassword.placeholder'
                )}
                type="password"
                error={errors.confirmPassword?.message}
              />
            </fieldset>

            <Button
              label={t('common:actions.submit')}
              variant="primary"
              width="full"
              attributes={{
                type: 'submit',
                disabled: isLoading,
              }}
            />
          </form>

          <div className={styles.footer}>
            <span>{t('auth:signin.texts.not-have-account')}</span>
            <Button
              label={t('auth:actions.signup')}
              variant="link"
              size="xs"
              url={routes.auth.signup}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};
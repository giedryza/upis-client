import { useState, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Button, Container, Card, TextInput } from 'ui';
import { useForgotPassword } from 'domain/users';

import { PasswordForgotSent } from './atoms';
import { Values } from './forgot.types';
import { INITIAL_VALUES } from './forgot.constants';
import styles from './forgot.module.scss';

export const PasswordForgot: FC = () => {
  const { t } = useTranslation();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: forgotPassword, isLoading } = useForgotPassword();

  const onSubmit: SubmitHandler<Values> = async ({ email }) => {
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  if (isSuccess) {
    return (
      <PasswordForgotSent
        onRetry={() => {
          setIsSuccess(false);
          resetField('email');
        }}
      />
    );
  }

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('auth:password_forgot.title')}</h1>

          <p className={styles.text}>
            {t('auth:password_forgot.texts.instructions')}
          </p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset} disabled={isLoading}>
              <TextInput
                {...register('email', {
                  required: {
                    value: true,
                    message: t('auth:password_forgot.form.email.errors.empty'),
                  },
                })}
                label={t('auth:password_forgot.form.email.label')}
                placeholder={t('auth:password_forgot.form.email.placeholder')}
                type="email"
                error={errors.email?.message}
              />
            </fieldset>

            <Button
              as="button"
              label={t('common:actions.continue')}
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

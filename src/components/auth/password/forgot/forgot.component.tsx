import { useState, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { routes } from 'config/routes';
import { generateRoute } from 'tools/common';
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
          <h1 className={styles.title}>{t('auth:passwordForgot.title')}</h1>

          <p className={styles.text}>
            {t('auth:passwordForgot.texts.instructions')}
          </p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset} disabled={isLoading}>
              <TextInput
                {...register('email', {
                  required: {
                    value: true,
                    message: t('auth:passwordForgot.form.email.errors.empty'),
                  },
                })}
                label={t('auth:passwordForgot.form.email.label')}
                placeholder={t('auth:passwordForgot.form.email.placeholder')}
                type="email"
                error={errors.email?.message}
              />
            </fieldset>

            <Button
              label={t('common:actions.continue')}
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
              url={generateRoute(routes.auth.signup)}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};

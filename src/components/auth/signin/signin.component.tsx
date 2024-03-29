import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Button, Container, Card, Divider, TextInput } from 'ui';
import { useSigninWithCredentials, useSigninWithGoogle } from 'domain/users';

import { Values } from './signin.types';
import { INITIAL_VALUES } from './signin.constants';
import styles from './signin.module.scss';

export const Signin: FC = () => {
  const { t } = useTranslation();

  const { mutate: signinWithCredentials, isLoading } =
    useSigninWithCredentials();
  const { mutate: signinWithGoogle } = useSigninWithGoogle();

  const onSubmit: SubmitHandler<Values> = ({ email, password }) => {
    signinWithCredentials({ email, password });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('auth:signin.title')}</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
              <TextInput
                {...register('email', {
                  required: {
                    value: true,
                    message: t('auth:signin.form.email.errors.empty'),
                  },
                })}
                label={t('auth:signin.form.email.label')}
                placeholder={t('auth:signin.form.email.placeholder')}
                type="email"
                error={errors.email?.message}
              />

              <TextInput
                {...register('password', {
                  required: {
                    value: true,
                    message: t('auth:signin.form.password.errors.empty'),
                  },
                })}
                label={t('auth:signin.form.password.label')}
                placeholder={t('auth:signin.form.password.placeholder')}
                type="password"
                error={errors.password?.message}
              />

              <Button
                as="link"
                label={t('auth:actions.forgot_password')}
                variant="link"
                size="xs"
                href={generateUrl(routes.auth.password.forgot)}
              />
            </fieldset>

            <Button
              as="button"
              label={t('auth:actions.signin')}
              variant="primary"
              width="full"
              type="submit"
              disabled={isLoading}
            />
          </form>

          <Divider label={t('common:texts.or')} />

          <Button
            as="button"
            label={t('auth:actions.signin_google')}
            icon="logo-google"
            variant="secondary"
            width="full"
            onClick={() => signinWithGoogle()}
          />

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

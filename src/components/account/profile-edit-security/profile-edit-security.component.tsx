import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config/routes';
import { Button, Container, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useUpdatePassword } from 'domain/users';

import {
  INITIAL_VALUES,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './profile-edit-security.constants';
import { Values } from './profile-edit-security.types';
import styles from './profile-edit-security.module.scss';

export const ProfileEditSecurity: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: updatePassword, isLoading } = useUpdatePassword();

  const onSubmit: SubmitHandler<Values> = ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    updatePassword(
      { currentPassword, newPassword, confirmPassword },
      {
        onSuccess: () => {
          push(routes.account.profile.index);
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:profile.security.title')}
      icon="lock"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('currentPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:profile.security.form.currentPassword.error.empty'
                  ),
                },
              })}
              label={t('account:profile.security.form.currentPassword.label')}
              placeholder={t(
                'account:profile.security.form.currentPassword.placeholder'
              )}
              type="password"
              error={errors.currentPassword?.message}
            />

            <TextInput
              {...register('newPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:profile.security.form.newPassword.error.empty'
                  ),
                },
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: t(
                    'account:profile.security.form.newPassword.error.length',
                    {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }
                  ),
                },
                maxLength: {
                  value: PASSWORD_MAX_LENGTH,
                  message: t(
                    'account:profile.security.form.newPassword.error.length',
                    {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }
                  ),
                },
              })}
              label={t('account:profile.security.form.newPassword.label')}
              placeholder={t(
                'account:profile.security.form.newPassword.placeholder'
              )}
              type="password"
              error={errors.newPassword?.message}
            />

            <TextInput
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:profile.security.form.confirmPassword.error.empty'
                  ),
                },
                validate: (value) => {
                  if (watch('newPassword') !== value) {
                    return t(
                      'account:profile.security.form.confirmPassword.error.notMatch'
                    );
                  }
                },
              })}
              label={t('account:profile.security.form.confirmPassword.label')}
              placeholder={t(
                'account:profile.security.form.confirmPassword.placeholder'
              )}
              type="password"
              error={errors.confirmPassword?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.profile.index}
            />

            <Button
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};

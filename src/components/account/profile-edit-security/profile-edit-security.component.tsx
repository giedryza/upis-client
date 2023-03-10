import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl } from 'tools/services/url';
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
          push(generateUrl(routes.account.profile.index));
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
                    'account:profile.security.form.current_password.error.empty'
                  ),
                },
              })}
              label={t('account:profile.security.form.current_password.label')}
              placeholder={t(
                'account:profile.security.form.current_password.placeholder'
              )}
              type="password"
              error={errors.currentPassword?.message}
            />

            <TextInput
              {...register('newPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:profile.security.form.new_password.error.empty'
                  ),
                },
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: t(
                    'account:profile.security.form.new_password.error.length',
                    {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }
                  ),
                },
                maxLength: {
                  value: PASSWORD_MAX_LENGTH,
                  message: t(
                    'account:profile.security.form.new_password.error.length',
                    {
                      minLength: PASSWORD_MIN_LENGTH,
                      maxLength: PASSWORD_MAX_LENGTH,
                    }
                  ),
                },
              })}
              label={t('account:profile.security.form.new_password.label')}
              placeholder={t(
                'account:profile.security.form.new_password.placeholder'
              )}
              type="password"
              error={errors.newPassword?.message}
            />

            <TextInput
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:profile.security.form.confirm_password.error.empty'
                  ),
                },
                validate: (value) => {
                  if (watch('newPassword') !== value) {
                    return t(
                      'account:profile.security.form.confirm_password.error.not_match'
                    );
                  }
                },
              })}
              label={t('account:profile.security.form.confirm_password.label')}
              placeholder={t(
                'account:profile.security.form.confirm_password.placeholder'
              )}
              type="password"
              error={errors.confirmPassword?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.profile.index)}
            />

            <Button
              as="button"
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              type="submit"
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};

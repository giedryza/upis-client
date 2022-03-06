import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config/routes';
import { Button, IconName, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useUpdatePassword } from 'domain/users/users.mutations';

import {
  INITIAL_VALUES,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './security.constants';
import { Values } from './security.types';
import styles from './security.module.scss';

export const Security: VFC = () => {
  const { t } = useTranslation();

  const {
    register,
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
    updatePassword({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:security.title')}
        icon={IconName.Gear}
        columns={1}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('currentPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:security.form.currentPassword.error.empty'
                  ),
                },
              })}
              label={t('account:security.form.currentPassword.label')}
              placeholder={t(
                'account:security.form.currentPassword.placeholder'
              )}
              type="password"
              error={errors.currentPassword?.message}
            />

            <TextInput
              {...register('newPassword', {
                required: {
                  value: true,
                  message: t('account:security.form.newPassword.error.empty'),
                },
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: t('account:security.form.newPassword.error.length', {
                    minLength: PASSWORD_MIN_LENGTH,
                    maxLength: PASSWORD_MAX_LENGTH,
                  }),
                },
                maxLength: {
                  value: PASSWORD_MAX_LENGTH,
                  message: t('account:security.form.newPassword.error.length', {
                    minLength: PASSWORD_MIN_LENGTH,
                    maxLength: PASSWORD_MAX_LENGTH,
                  }),
                },
              })}
              label={t('account:security.form.newPassword.label')}
              placeholder={t('account:security.form.newPassword.placeholder')}
              type="password"
              error={errors.newPassword?.message}
            />

            <TextInput
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: t(
                    'account:security.form.confirmPassword.error.empty'
                  ),
                },
              })}
              label={t('account:security.form.confirmPassword.label')}
              placeholder={t(
                'account:security.form.confirmPassword.placeholder'
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
              variant="primary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </InfoBlock>
    </div>
  );
};
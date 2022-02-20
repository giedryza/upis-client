import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { signIn } from 'next-auth/react';

import { Button } from 'ui/button/button.component';
import { Card } from 'ui/card/card.component';
import { TextInput } from 'ui/text-input/text-input.component';
import { useSigninForm } from 'components/users/signin/signin.hooks';
import { SigninFormValues } from 'components/users/signin/signin.types';
import { INITIAL_VALUES } from 'components/users/signin/signin.constants';

import styles from './signin.module.scss';

export const Signin: VFC = () => {
  const { t } = useTranslation();

  const onSubmit = ({ email, password }: SigninFormValues) => {
    signIn<'credentials'>('credentials', {
      redirect: false,
      email,
      password,
    });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useSigninForm(
    onSubmit,
    INITIAL_VALUES
  );

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1>{t('auth:layout.signin')}</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <TextInput
                {...refs.email}
                label={t('auth:form.email')}
                error={errorMessages.email}
              />

              <TextInput
                {...refs.password}
                label={t('auth:form.password')}
                type="password"
                error={errorMessages.password}
              />
            </div>

            <Button
              label={t('auth:actions.forgot-pass')}
              variant="link"
              size="xs"
            />

            <div className={styles.actions}>
              <Button
                label={t('auth:actions.signin')}
                variant="primary"
                attributes={{
                  type: 'submit',
                  disabled: isDisabled,
                }}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

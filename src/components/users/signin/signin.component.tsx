import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import styles from './signin.module.scss';

import { Button } from 'ui/button/button.component';
import { Card } from 'ui/card/card.component';
import { Input } from 'ui/input/input.component';
import { useSigninForm } from 'components/users/signin/signin.hooks';
import { SigninFormValues } from 'components/users/signin/signin.types';
import { INITIAL_VALUES } from 'components/users/signin/signin.constants';
import { thunks } from 'domain/thunks';

const Signin: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }: SigninFormValues) => {
    dispatch(thunks.auth.signin({ email, password }));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useSigninForm(
    onSubmit,
    INITIAL_VALUES
  );

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1>{t('users:layout.signin')}</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <Input
                {...refs.email}
                label={t('users:form.email')}
                error={errorMessages.email}
              />

              <Input
                {...refs.password}
                label={t('users:form.password')}
                type="password"
                error={errorMessages.password}
              />
            </div>

            <Button
              label={t('users:actions.forgot-pass')}
              styleType="link"
              size="xs"
            />

            <div className={styles.actions}>
              <Button
                label={t('users:actions.signin')}
                styleType="primary"
                type="submit"
                disabled={isDisabled}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export { Signin };

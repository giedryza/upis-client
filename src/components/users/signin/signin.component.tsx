import { VFC } from 'react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import styles from './signin.module.scss';

import { Button } from 'ui/button/button.component';
import { Card } from 'ui/card/card.component';
import { Http } from 'utils/libs/http/http.lib';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import { Input } from 'ui/input/input.component';
import { Session } from 'domain/auth/auth.types';
import { authActions } from 'domain/auth/auth.actions';
import { Response } from 'utils/libs/http/http.types';
import { routes } from 'uri/routes';
import { useSigninForm } from 'components/users/signin/signin.hooks';
import { SigninFormValues } from 'components/users/signin/signin.types';
import { INITIAL_VALUES } from 'components/users/signin/signin.constants';

const Signin: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }: SigninFormValues) => {
    try {
      const { data } = await new Http<Response<Session>>(
        endpoints.users.signin,
        {
          body: { email, password },
        }
      ).post();

      dispatch(authActions.setSession(data));

      Router.push(routes.home);
    } catch (error: unknown) {
      new Errors(error).handleApi();
    }
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

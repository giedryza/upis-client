import { FC } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import styles from './signin.module.scss';

import { Button } from 'ui/button/button.component';
import { Http } from 'utils/libs/http/http.lib';
import { uri } from 'utils/libs/http/http.constants';
import { Input } from 'ui/input/input.component';
import { Errors } from 'utils/libs/errors/errors.lib';

interface Values {
  email: string;
  password: string;
}

const INITIAL_VALUES: Values = {
  email: '',
  password: '',
};

const Signin: FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const { isSubmitting, isValidating, isSubmitted, isValid } = formState;

  const onSubmit = async ({ email, password }: Values) => {
    try {
      await new Http(uri.endpoints.users.signin, {
        body: { email, password },
      }).post();

      Router.push('/');
    } catch (error: unknown) {
      new Errors(error).handleForm(setError);
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <span>Sign</span> in
      </h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <Input
            name="email"
            label="Email"
            ref={register({ required: { value: true, message: 'reikalinga' } })}
            error={errors.email?.message}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            error={errors.password?.message}
            ref={register({
              required: { value: true, message: 'reikalinga' },
            })}
          />
        </div>

        <Button label="Forgot password?" styleType="link" size="xs" />

        <div className={styles.actions}>
          <Button
            label="Sign in"
            styleType="primary"
            type="submit"
            disabled={isSubmitting || isValidating || (isSubmitted && !isValid)}
          />
        </div>
      </form>
    </div>
  );
};

export { Signin };

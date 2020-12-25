import { FC, FormEvent, useState } from 'react';
import Router from 'next/router';

import styles from './signin.module.scss';

import { Input } from 'ui/input/input.component';
import { Button } from 'ui/button/button.component';
import { http } from 'utils/libs/http/http.lib';
import { uri } from 'utils/libs/http/http.constants';

const Signin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await http(uri.endpoints.users.signin, {
        method: 'POST',
        body: { email, password },
      });

      Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <span>Sign</span> in
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputs}>
          <Input
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button label="Forgot password?" styleType="link" size="xs" />
        <div className={styles.actions}>
          <Button label="Sign in" styleType="primary" type="submit" />
        </div>
      </form>
    </div>
  );
};

export { Signin };

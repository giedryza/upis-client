import { FC, FormEvent } from 'react';

import styles from './signin.module.scss';

import { Input } from 'ui/input/input.component';
import { Button } from 'ui/button/button.component';

const Signin: FC = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>
        <span>Sign</span> in
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputs}>
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
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

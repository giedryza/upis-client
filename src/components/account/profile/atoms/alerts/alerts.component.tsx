import { FC } from 'react';
import Trans from 'next-translate/Trans';
import { useSession } from 'next-auth/react';

import { Toast } from 'ui';
import { useSendVerifyEmail } from 'domain/users';

import styles from './alerts.module.scss';

export const Alerts: FC = () => {
  const { data: session } = useSession();
  const { mutate: sendVerifyEmail, isLoading } = useSendVerifyEmail();

  return session?.user.role === 'pending' ? (
    <Toast
      message={
        <Trans
          i18nKey="account:profile.verify_email.message"
          components={[
            <button
              className={styles.action}
              onClick={() => sendVerifyEmail()}
              disabled={isLoading}
              type="button"
              key="verify_email"
            >
              placeholder
            </button>,
          ]}
        />
      }
      type="danger"
    />
  ) : null;
};

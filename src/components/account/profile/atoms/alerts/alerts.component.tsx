import { FC } from 'react';
import Trans from 'next-translate/Trans';
import { useSession } from 'next-auth/react';

import { Toast } from 'ui';

import styles from './alerts.module.scss';

export const Alerts: FC = () => {
  const { data: session } = useSession();

  return session?.user.role === 'pending' ? (
    <Toast
      message={
        <Trans
          i18nKey="account:profile.alerts.verify_email"
          components={[
            <button className={styles.action} type="button" key="verify_email">
              placeholder
            </button>,
          ]}
        />
      }
      type="danger"
    />
  ) : null;
};

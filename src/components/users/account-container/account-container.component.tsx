import { FC } from 'react';

import { Container } from 'ui/container/container.component';
import { Card } from 'ui/card/card.component';
import { AccountNav } from 'components/users/account-nav/account-nav.component';

import styles from './account-container.module.scss';

const AccountContainer: FC = ({ children }) => {
  return (
    <Container size="md">
      <div className={styles.container}>
        <AccountNav />

        <Card>{children}</Card>
      </div>
    </Container>
  );
};

export { AccountContainer };

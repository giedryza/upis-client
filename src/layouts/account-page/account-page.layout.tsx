import { FC } from 'react';

import { Container } from 'ui';

import styles from './account-page.module.scss';

export const AccountPageLayout: FC = ({ children }) => {
  return (
    <Container>
      <div className={styles.layout}>{children}</div>
    </Container>
  );
};

import { FC } from 'react';

import { Container } from 'ui';

import styles from './page.module.scss';

export const PageLayout: FC = ({ children }) => {
  return (
    <Container>
      <div className={styles.layout}>{children}</div>
    </Container>
  );
};

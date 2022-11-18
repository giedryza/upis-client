import { FC, PropsWithChildren } from 'react';

import { Container } from 'ui';

import styles from './page.module.scss';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <div className={styles.layout}>{children}</div>
    </Container>
  );
};

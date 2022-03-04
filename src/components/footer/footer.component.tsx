import { VFC } from 'react';

import { Container } from 'ui';

import styles from './footer.module.scss';

export const Footer: VFC = () => {
  return (
    <footer className={styles.footer}>
      <Container>footer</Container>
    </footer>
  );
};

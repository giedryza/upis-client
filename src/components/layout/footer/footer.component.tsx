import { FC } from 'react';

import { Container } from 'ui';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>footer</Container>
    </footer>
  );
};

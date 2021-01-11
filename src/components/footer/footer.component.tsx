import styles from './footer.module.scss';

import { Container } from 'ui/container/container.component';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>footer</Container>
    </footer>
  );
};

export { Footer };

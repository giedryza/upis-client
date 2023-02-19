import { FC } from 'react';

import { Container } from 'ui';

import { DetailsHeader } from './atoms';
import styles from './details.module.scss';

export const TourDetails: FC = () => {
  return (
    <Container>
      <main className={styles.main}>
        <DetailsHeader />
      </main>
    </Container>
  );
};

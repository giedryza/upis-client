import { FC } from 'react';

import { Container } from 'ui';
import { APP } from 'config';

import {
  DetailsBody,
  DetailsHeader,
  DetailsNavigation,
  DetailsSidebar,
} from './atoms';
import styles from './details.module.scss';

export const TourDetails: FC = () => {
  return (
    <div>
      <DetailsNavigation />

      <Container>
        <main
          className={styles.main}
          style={{ '--spacing': APP.serp.gridGap }}
          id="main"
        >
          <DetailsHeader />

          <div className={styles.sections}>
            <DetailsBody />
            <DetailsSidebar />
          </div>
        </main>
      </Container>
    </div>
  );
};

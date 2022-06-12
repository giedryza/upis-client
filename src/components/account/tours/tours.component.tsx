import { VFC } from 'react';

import { Card } from 'ui';

import { ToursActions } from './atoms';
import styles from './tours.module.scss';

export const Tours: VFC = () => {
  return (
    <Card>
      <div className={styles.content}>
        <ToursActions />
      </div>
    </Card>
  );
};

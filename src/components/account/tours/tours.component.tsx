import { VFC } from 'react';

import { Card } from 'ui';

import { ToursActions, ToursTable } from './atoms';
import styles from './tours.module.scss';

export const Tours: VFC = () => {
  return (
    <Card>
      <div className={styles.content}>
        <ToursActions />
        <ToursTable />
      </div>
    </Card>
  );
};

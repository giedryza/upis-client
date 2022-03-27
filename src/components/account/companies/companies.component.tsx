import { VFC } from 'react';

import { Card } from 'ui';

import { Actions, CompaniesTable } from './atoms';
import styles from './companies.module.scss';

export const Companies: VFC = () => {
  return (
    <Card>
      <div className={styles.content}>
        <Actions />
        <CompaniesTable />
      </div>
    </Card>
  );
};

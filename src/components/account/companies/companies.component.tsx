import { VFC } from 'react';

import { Card } from 'ui';

import { CompaniesActions, CompaniesTable } from './atoms';
import styles from './companies.module.scss';

export const Companies: VFC = () => {
  return (
    <Card>
      <div className={styles.content}>
        <CompaniesActions />
        <CompaniesTable />
      </div>
    </Card>
  );
};

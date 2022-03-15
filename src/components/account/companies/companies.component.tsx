import { VFC } from 'react';

import { Actions, CompaniesTable } from './atoms';
import styles from './companies.module.scss';

export const Companies: VFC = () => {
  return (
    <div className={styles.content}>
      <Actions />
      <CompaniesTable />
    </div>
  );
};

import { VFC } from 'react';

import { CompaniesTable } from 'components/account';

import styles from './companies.module.scss';

export const Companies: VFC = () => {
  return (
    <div className={styles.content}>
      <CompaniesTable />
    </div>
  );
};

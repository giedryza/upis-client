import { VFC } from 'react';

import { CompaniesTable } from 'components/account';

import styles from './company.module.scss';

export const Company: VFC = () => {
  return (
    <div className={styles.content}>
      <CompaniesTable />
    </div>
  );
};

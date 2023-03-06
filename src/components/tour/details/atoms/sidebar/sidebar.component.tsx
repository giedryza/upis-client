import { FC } from 'react';

import { Provider } from '../body/atoms';

import styles from './sidebar.module.scss';

export const DetailsSidebar: FC = () => {
  return (
    <aside className={styles.container}>
      <Provider placement="aside" />
    </aside>
  );
};

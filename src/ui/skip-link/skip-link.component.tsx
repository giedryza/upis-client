import { FC } from 'react';

import { Props } from './skip-link.types';
import styles from './skip-link.module.scss';

export const SkipLink: FC<Props> = ({ label, target }) => {
  return (
    <a href={`#${target}`} className={styles.link}>
      {label}
    </a>
  );
};

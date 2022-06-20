import { VFC } from 'react';
import { useId } from 'react-aria';

import { isDefined } from 'tools/common';

import { Props } from './field-display.types';
import styles from './field-display.module.scss';

export const FieldDisplay: VFC<Props> = ({ label, value, fallback = '-' }) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <span className={styles.title} id={id}>
        {label}
      </span>
      <p className={styles.subtitle} aria-labelledby={id}>
        {isDefined(value) ? value : fallback}
      </p>
    </div>
  );
};

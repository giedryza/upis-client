import { VFC } from 'react';
import { useNumberFormatter } from 'react-aria';

import { Props } from './field-display.types';
import styles from './field-display.module.scss';

export const FieldDisplay: VFC<Props> = ({
  label,
  value,
  fallback = '-',
  formatOptions,
}) => {
  const formatter = useNumberFormatter(formatOptions);

  const displayValue = ['', NaN, null, undefined].includes(value)
    ? fallback
    : formatOptions
    ? formatter.format(Number(value))
    : value;

  return (
    <div className={styles.container}>
      <span className={styles.title}>{label}</span>
      <p className={styles.subtitle}>{displayValue}</p>
    </div>
  );
};

import { FC } from 'react';
import { useNumberFormatter } from 'react-aria';

import { Props } from './labeled-value.types';
import styles from './labeled-value.module.scss';

export const LabeledValue: FC<Props> = ({
  label,
  value,
  fallback = '-',
  formatOptions,
}) => {
  const isValidValue = !['', NaN, null, undefined].includes(value);

  const formatter = useNumberFormatter(
    isValidValue ? formatOptions : undefined
  );

  const displayValue = !isValidValue
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

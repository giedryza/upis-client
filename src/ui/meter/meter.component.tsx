import { FC } from 'react';
import { useMeter } from 'react-aria';
import { clsx } from 'clsx';

import { Props } from './meter.types';
import styles from './meter.module.scss';

export const Meter: FC<Props> = ({
  label,
  ariaLabel,
  valueLabel,
  id,
  value = 0,
  min = 0,
  max = 100,
  variant = 'neutral',
  formatOptions,
}) => {
  const { meterProps, labelProps } = useMeter({
    label,
    'aria-label': ariaLabel,
    valueLabel,
    id,
    value,
    minValue: min,
    maxValue: max,
    showValueLabel: !!label,
    formatOptions,
  });

  return (
    <div
      {...meterProps}
      className={clsx(styles.meter, styles[`-variant-${variant}`])}
      style={{
        '--ratio': (value - min) / (max - min),
      }}
    >
      {!!label && (
        <span className={styles.label} {...labelProps}>
          {label}
        </span>
      )}

      <div className={styles.body}>
        <div className={styles.track}>
          <div className={styles.bar} />
        </div>
        <span className={styles.value}>{meterProps['aria-valuetext']}</span>
      </div>
    </div>
  );
};

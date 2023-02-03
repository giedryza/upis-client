import { FC } from 'react';
import { useProgressBar } from 'react-aria';

import { Props } from './progress.types';
import styles from './progress.module.scss';

export const Progress: FC<Props> = ({
  label,
  ariaLabel,
  valueLabel,
  id,
  showValue,
  value = 0,
  min = 0,
  max = 100,
  formatOptions,
}) => {
  const { progressBarProps, labelProps } = useProgressBar({
    label,
    'aria-label': ariaLabel,
    valueLabel,
    id,
    value,
    minValue: min,
    maxValue: max,
    showValueLabel: !!showValue,
    formatOptions,
  });

  return (
    <div
      {...progressBarProps}
      className={styles.progress}
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
        {!!showValue && (
          <span className={styles.value}>
            {progressBarProps['aria-valuetext']}
          </span>
        )}
      </div>
    </div>
  );
};

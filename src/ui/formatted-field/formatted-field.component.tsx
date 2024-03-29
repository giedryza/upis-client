import { FC } from 'react';
import { useNumberFormatter } from 'react-aria';

import { Props } from './formatted-field.types';

export const FormattedField: FC<Props> = ({
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

  return <>{displayValue}</>;
};

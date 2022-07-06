import { useNumberFormatter } from 'react-aria';

interface UseNumberFormat {
  // units: https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
  unit: 'kilometer' | 'hour' | 'day';
  grouping?: boolean;
  trailingZero?: boolean;
}

export const useFormatUnit = ({
  unit,
  grouping = true,
  trailingZero = false,
}: UseNumberFormat) => {
  const formatter = useNumberFormatter({
    style: 'unit',
    unit,
    useGrouping: grouping,
    ...(trailingZero && {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  });

  return { formatter } as const;
};

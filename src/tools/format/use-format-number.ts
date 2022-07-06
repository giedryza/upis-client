import { useNumberFormatter } from 'react-aria';

interface UseNumberFormat {
  trailingZero?: boolean;
}

export const useFormatNumber = ({
  trailingZero = false,
}: UseNumberFormat = {}) => {
  const formatter = useNumberFormatter({
    style: 'decimal',
    useGrouping: false,
    ...(trailingZero && {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  });

  return { formatter } as const;
};

import { Locale } from 'types/common';

export const formatUnit = (
  language: string,
  amount: number,
  // https://unicode.org/reports/tr35/tr35-general.html#Unit_Elements
  unit: string
): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'unit',
    unit,
  };

  const locale = Object.values(Locale).includes(language as Locale)
    ? language
    : Locale.Lt;

  return Intl.NumberFormat(locale, options).format(amount);
};

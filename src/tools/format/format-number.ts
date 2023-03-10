import { Locale } from 'types/common';

export const formatNumber = (language: string, amount: number): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'decimal',
  };

  const locale = Object.values(Locale).includes(language as Locale)
    ? language
    : Locale.Lt;

  return Intl.NumberFormat(locale, options).format(amount);
};

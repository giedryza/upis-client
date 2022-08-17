import { Currency, Locale } from 'types/common';

export const formatCurrency = (
  language: string,
  amount: number,
  currency: Currency = 'EUR'
): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  };

  const locale = Object.values(Locale).includes(language as Locale)
    ? language
    : Locale.Lt;

  return Intl.NumberFormat(locale, options).format(amount / 100);
};

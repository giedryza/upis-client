import { APP } from 'config';
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
    : APP.locales.default;

  return Intl.NumberFormat(locale, options).format(amount / 100);
};

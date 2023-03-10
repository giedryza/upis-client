import { APP } from 'config';
import { Locale } from 'types/common';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
export const formatList = (
  language: string,
  list: string[],
  options?: Intl.ListFormatOptions
): string => {
  const locale = Object.values(Locale).includes(language as Locale)
    ? language
    : APP.locales.default;

  return new Intl.ListFormat(locale, options).format(list);
};

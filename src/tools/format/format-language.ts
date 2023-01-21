import { Locale } from 'types/common';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
export const formatLanguage = (language: string, code: string): string => {
  const locale = Object.values(Locale).includes(language as Locale)
    ? language
    : Locale.Lt;

  return new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? code;
};

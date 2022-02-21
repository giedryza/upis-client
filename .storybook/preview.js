import '../src/styles/index.scss';

import I18nProvider from 'next-translate/I18nProvider';

import i18nConfig from '../i18n';

const namespaces = [...new Set(Object.values(i18nConfig.pages).flat())];
const translations = Object.assign(
  ...i18nConfig.locales.map((locale) => ({
    [locale]: Object.assign(
      ...namespaces.map((namespace) => ({
        [namespace]: require(`../src/translations/${locale}/${namespace}.json`),
      }))
    ),
  }))
);

export const globalTypes = {
  locale: {
    name: 'Language',
    description: 'Language',
    defaultValue: i18nConfig.defaultLocale,
    toolbar: {
      icon: 'globe',
      items: i18nConfig.locales,
    },
  },
};

export const decorators = [
  (Story, { globals }) => (
    <I18nProvider
      lang={globals.locale}
      namespaces={translations[globals.locale]}
    >
      <Story />
    </I18nProvider>
  ),
];

export const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'grey',
        value: '#f1f2f4',
      },
    ],
  },
};

import '../src/styles/index.scss';

import I18nProvider from 'next-translate/I18nProvider';
import * as NextLink from 'next/link';
import * as NextImage from 'next/image';

import i18nConfig from '../i18n';

const OriginalLink = NextLink.default;
Object.defineProperty(NextLink, 'default', {
  configurable: true,
  value: (props) => (
    <OriginalLink {...props}>
      <a {...props}>{props.children}</a>
    </OriginalLink>
  ),
});

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
    />
  ),
});

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
  actions: { argTypesRegex: '^on.*' },
};

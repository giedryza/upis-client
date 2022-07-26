module.exports = {
  locales: ['lt', 'en'],
  defaultLocale: 'lt',
  pages: {
    '*': ['common'],
    '/': ['home'],
    'rgx:^/account': ['account', 'rivers'],
    'rgx:^/auth': ['auth'],
  },
  loadLocaleFrom: (locale, namespace) =>
    // eslint-disable-next-line import/no-dynamic-require
    require(`./src/translations/${locale}/${namespace}`),
};

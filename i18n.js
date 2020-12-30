module.exports = {
  locales: ['lt', 'en'],
  defaultLocale: 'lt',
  pages: {
    '*': ['common'],
    '/': ['home'],
    'rgx:^/users': ['users'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/translations/${locale}/${namespace}`).then((m) => m.default),
};

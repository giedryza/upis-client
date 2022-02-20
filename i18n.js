module.exports = {
  locales: ['lt', 'en'],
  defaultLocale: 'lt',
  pages: {
    '*': ['common'],
    '/': ['home'],
    'rgx:^/users': ['users'],
    'rgx:^/auth': ['auth'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/translations/${locale}/${namespace}`).then((m) => m.default),
};

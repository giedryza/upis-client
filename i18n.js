module.exports = {
  locales: ['lt', 'en'],
  defaultLocale: 'lt',
  pages: {
    '*': ['common'],
    '/': ['home', 'serp', 'amenities', 'rivers', 'regions'],
    'rgx:^/account': ['account', 'amenities', 'rivers', 'regions'],
    'rgx:^/auth': ['auth'],
    'rgx:^/tours': ['tours', 'amenities', 'rivers', 'regions'],
  },
  loadLocaleFrom: (locale, namespace) => {
    // eslint-disable-next-line import/no-dynamic-require
    const m = require(`./src/translations/${locale}/${namespace}`);

    return Promise.resolve(m);
  },
};

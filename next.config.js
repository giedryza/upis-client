module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  i18n: {
    locales: ['lt', 'en'],
    defaultLocale: 'lt',
  },
};

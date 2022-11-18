const path = require('path');

module.exports = {
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve = {
      extensions: ['.js', '.ts', '.tsx', '.scss'],
      modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../'),
    });

    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'next/router': 'next-router-mock',
      'next/dist/client/router': 'next-router-mock',
    };

    return config;
  },
};

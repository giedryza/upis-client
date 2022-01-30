import nextTranslate from 'next-translate';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextTranslate(nextConfig);

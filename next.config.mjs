// eslint-disable-next-line import/no-extraneous-dependencies
import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      'upis.s3.eu-central-1.amazonaws.com',
      'res.cloudinary.com',
      'picsum.photos',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextTranslate(nextConfig);

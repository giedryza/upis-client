import nextTranslate from 'next-translate';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // reactStrictMode: true,
  images: {
    domains: ['upis.s3.eu-central-1.amazonaws.com'],
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

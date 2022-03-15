/** @type {import('next').NextConfig} */

module.exports = (phase, { defaultConfig }) => ({
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
});

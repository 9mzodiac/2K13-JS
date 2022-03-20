/** @type {import('next').NextConfig} */

module.exports = (phase, { defaultConfig }) => ({
  env: {
    API_URL: process.env.API_URL
      ? process.env.API_URL
      : "https://picsum.photos/v2",
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost", "unsplash.com"],
  },
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
});

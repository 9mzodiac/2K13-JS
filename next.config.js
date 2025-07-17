/** @type {import('next').NextConfig} */

module.exports = (phase, { defaultConfig }) => ({
  env: {
    API_URL: process.env.API_URL
      ? process.env.API_URL
      : "https://picsum.photos/v2",
  },
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "storage.googleapis.com",
      "cdn.discordapp.com",
      "firebasestorage.googleapis.com",
      "icons.veryicon.com",
      "2k13boyz.vercel.app",
      "images.unsplash.com"
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});

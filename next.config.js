/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = (phase, { defaultConfig }) =>
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    },
    env: {
      API_URL: process.env.API_URL
        ? process.env.API_URL
        : "https://picsum.photos/v2",
    },
    reactStrictMode: false,
    images: {
      domains: [
        "localhost",
        "unsplash",
        "c2.staticflickr.com",
        "c4.staticflickr.com",
      ],
    },
    webpack: (config, { isServer, webpack }) => {
      return config;
    },
  });

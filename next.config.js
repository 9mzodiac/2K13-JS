/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = (phase, { defaultConfig }) =>
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      buildExcludes: [/middleware-manifest.json$/],
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
        "storage.googleapis.com",
        "cdn.discordapp.com",
        "firebasestorage.googleapis.com",
      ],
    },
    webpack: (config, { isServer, webpack }) => {
      return config;
    },
  });

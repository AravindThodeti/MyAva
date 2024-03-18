const withPWA = require("next-pwa");

const runtimeCaching = require("next-pwa/cache");
runtimeCaching[0].handler = "StaleWhileRevalidate";

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: false,
    skipWaiting: false,
    scope: "/",
    sw: "service-worker.js",
    dest: "public",
    publicExcludes: ["!firebase-messaging-sw.js"],
    runtimeCaching,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-firebase-sw");
    }
    return config;
  },
});

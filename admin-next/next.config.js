// next.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// TO-DO: import from db
const plugins_list = [
  { plugin: "helloDolly", registry: "http://localhost:8081/remoteEntry.js" },
];

const remotes = plugins_list.reduce((acc, plugin) => {
  acc[plugin.plugin] = `${plugin.plugin}@${plugin.registry}`;
  return acc;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "admin",
          remotes,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;

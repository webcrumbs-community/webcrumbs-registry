const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// TO-DO: import from db
plugins_list = [
  { plugin: "helloDolly", registry: "http://localhost:7081/remoteEntry.js" },
];

const remotes = plugins_list.reduce((acc, plugin) => {
  acc[plugin.plugin] = `${plugin.plugin}@${plugin.registry}`;
  return acc;
}, {});

module.exports = {
  mode: "development",
  devServer: {
    port: 7080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "admin",
      remotes,
      filename: "remoteEntry.js",
      exposes: {
        "./Admin": "./src/admin.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

import { config } from './webcrumbs';

module.exports = {
    mode: "development",
    devServer: {
        port: 8081
    },
    plugins: [
        new ModuleFederationPlugin({
            name: config.name,
            filename: 'remoteEntry.js',
            exposes: {
                './Canvas': './src/canvas.js',
                './Command': './src/command.js',
                './Manifest': './src/manifest.js',
                './Pulse': './src/pulse.js',
            },
            shared: config.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
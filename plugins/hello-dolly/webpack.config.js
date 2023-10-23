const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "development",
    devServer: {
        port: 8081
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'helloDolly',
            filename: 'remoteEntry.js',
            exposes: {
                './HelloDolly': './src/index.js'
            },
            shared: ['faker-js']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
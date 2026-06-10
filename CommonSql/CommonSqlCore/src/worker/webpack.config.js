"use strict";
const TerserPlugin = require('terser-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const babelpolyfill = require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', './CommonSqlLanguageServiceWorker.ts'], 
    mode: 'production',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] },
                    },
                ],
            },
        ],
    },
    plugins: [new NodePolyfillPlugin()],
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: { fs: false },
    },
    output: {
        globalObject: 'this', 
        filename: 'CommonSqlLanguageServiceWorker.js',
        library: 'CommonSqlLanguageServiceWorker',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } }, extractComments: false })],
    },
};
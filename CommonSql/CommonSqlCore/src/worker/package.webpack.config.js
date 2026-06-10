"use strict";
const TerserPlugin = require('terser-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');
const babelpolyfill = require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', './CommonSqlLanguageServiceWorker.js'], 
    mode: 'production',
    target: 'web',
    module: { 
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { configFile: path.resolve(__dirname, 'package.tsconfig.json') },
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
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

module.exports = {
    mode: 'development',
    entry: {
        "app": './src/index.tsx',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker', 
    },
    devServer: { hot: true },
    resolve: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
    output: {
        globalObject: 'self',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { preserveSymlinks: true },
                            transpileOnly: true,
                            happyPackMode: true,
                            projectReferences: false,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{ loader: 'file-loader' }],
            },
        ],
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebPackPlugin({ template: 'src/index.html' }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
        isDevelopment && new webpack.NormalModuleReplacementPlugin(
            /CommonSql\/CommonSqlFacade\/src\/providers\/CommonSqlLanguageServiceProvider/,
            './providers/MockLanguageServiceProvider',
        ),
    ].filter(Boolean),
};

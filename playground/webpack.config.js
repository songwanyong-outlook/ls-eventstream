const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

// Load .env.local (server-side only - values not exposed to the bundle
// unless prefixed with PUBLIC_).
const envPath = path.resolve(__dirname, '.env.local');
const env = {};
if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
        const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
        if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    });
}

const aoaiEndpoint = env.AOAI_ENDPOINT;
const aoaiKey = env.AOAI_API_KEY;
const aoaiDeployment = env.PUBLIC_AOAI_DEPLOYMENT;
const aoaiApiVersion = env.PUBLIC_AOAI_API_VERSION || '2024-08-01-preview';
const aoaiConfigured = !!(aoaiEndpoint && aoaiKey && aoaiDeployment);

if (aoaiConfigured) {
    console.log('[webpack] Azure OpenAI proxy enabled: /api/aoai/* -> ' + aoaiEndpoint + '/openai/* (deployment: ' + aoaiDeployment + ')');
} else {
    console.log('[webpack] Azure OpenAI proxy DISABLED (set AOAI_ENDPOINT, AOAI_API_KEY, PUBLIC_AOAI_DEPLOYMENT in playground/.env.local to enable).');
}

module.exports = {
    mode: 'development',
    entry: {
        "app": './src/index.tsx',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    },
    devServer: {
        hot: true,
        client: { overlay: false },
        proxy: aoaiConfigured ? [{
            context: ['/api/aoai'],
            target: aoaiEndpoint,
            changeOrigin: true,
            secure: true,
            pathRewrite: { '^/api/aoai': '/openai' },
            onProxyReq(proxyReq) {
                // Inject the API key server-side - the bundle never sees it.
                proxyReq.setHeader('api-key', aoaiKey);
            },
        }] : undefined,
    },
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
        // Inject browser-safe AOAI config into the bundle. Server-side
        // values (AOAI_API_KEY, AOAI_ENDPOINT) are NOT defined here.
        new webpack.DefinePlugin({
            'process.env.PUBLIC_AOAI_DEPLOYMENT': JSON.stringify(aoaiDeployment || ''),
            'process.env.PUBLIC_AOAI_API_VERSION': JSON.stringify(aoaiApiVersion),
            'process.env.PUBLIC_AOAI_PROXY_BASE': JSON.stringify('/api/aoai'),
        }),
        isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
        isDevelopment && new webpack.NormalModuleReplacementPlugin(
            /CommonSql\/CommonSqlFacade\/src\/providers\/CommonSqlLanguageServiceProvider/,
            './providers/MockLanguageServiceProvider',
        ),
    ].filter(Boolean),
};




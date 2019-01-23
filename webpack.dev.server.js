const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        name: 'Bundling dev server',
        mode: 'development',
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
            fs: 'empty',
            net: 'empty'
        },
        entry: {
            server: [
                'babel-polyfill',
                path.join(__dirname, 'server/server.js')
            ]
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: false
            }),
            new CopyWebpackPlugin([
                { from: '.env', to: path.join(__dirname, 'dist') }
            ])
        ]
    }
];

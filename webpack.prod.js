const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entries = [
    'babel-polyfill',
    path.join(__dirname, 'src/js/index.js'),
    path.join(__dirname, 'src/scss/master.scss')
];

module.exports = {
    target: 'node',
    node: {
        fs: 'empty',
        net: 'empty'
    },
    name: 'Bundling dev',
    mode: 'production',
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist/public'),
        filename: 'js/index.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/master.min.css'
        }),
        new CopyWebpackPlugin([
            { from: 'src/*.html', to: path.join(__dirname, 'dist/www'), flatten: true },
            { from: 'src/images', to: path.join(__dirname, 'dist/public/images'), flatten: true },
            { from: 'server/*.js', to: path.join(__dirname, 'dist'), flatten: true },
            { from: 'server/routes/*.js', to: path.join(__dirname, 'dist/routes'), flatten: true },
            { from: 'server/middleware/*.js', to: path.join(__dirname, 'dist/middleware'), flatten: true },
            { from: 'server/PageTemplates/*.js', to: path.join(__dirname, 'dist/PageTemplates'), flatten: true }
        ])
    ]
};

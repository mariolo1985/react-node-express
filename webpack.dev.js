const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        name: 'Bundling dev client',
        mode: 'development',
        entry: {
            index: [
                'babel-polyfill',
                path.join(__dirname, 'src/js/index.js'),
                path.join(__dirname, 'src/scss/master.scss')
            ]
        },
        output: {
            path: path.join(__dirname, 'dist/public'),
            filename: 'js/[name].min.js',
            chunkFilename: 'js/[name].chunk.js'
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
                minimize: false
            }),
            new MiniCssExtractPlugin({
                filename: 'css/master.min.css'
            }),
            new CopyWebpackPlugin([
                { from: 'src/*.html', to: path.join(__dirname, 'dist/www'), flatten: true },
                { from: 'src/images', to: path.join(__dirname, 'dist/public/images'), flatten: true }
            ])
        ]
    },
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

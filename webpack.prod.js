const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
    {
        name: 'Bundling dev client',
        mode: 'production',
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
                minimize: true
            }),
            new MiniCssExtractPlugin({
                filename: 'css/master.min.css'
            }),
            new CopyWebpackPlugin([
                { from: 'src/*.html', to: path.join(__dirname, 'dist/www'), flatten: true },
                { from: 'src/images', to: path.join(__dirname, 'dist/public/images'), flatten: true }
            ]),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.join(__dirname, 'report.html')
            })
        ]
    },
    {
        name: 'Bundling dev server',
        mode: 'production',
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
                minimize: true
            }),
            new CopyWebpackPlugin([
                { from: '.env', to: path.join(__dirname, 'dist') }
            ])
        ]
    }
];

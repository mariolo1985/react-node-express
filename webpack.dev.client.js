const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
    {
        name: 'Bundling dev client',
        mode: 'development',
        entry: {
            index: [
                'babel-polyfill',
                path.join(__dirname, 'src/js/index.js'),
                path.join(__dirname, 'src/less/master.less')
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
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader'
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
            ]),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: path.join(__dirname, 'report.html')
            })
        ]
    }
];

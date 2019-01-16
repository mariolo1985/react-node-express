const webpack = require('webpack');
const path = require('path');

const entries = [
    'babel-polyfill',
    path.join(__dirname, 'server/server.js')
];

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
        fs: 'empty',
        net: 'empty'
    },
    name: 'Bundling dev',
    mode: 'development',
    entry: entries,
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
        })
    ]
};

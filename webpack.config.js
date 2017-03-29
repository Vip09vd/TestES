const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './script.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/assets'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        port: 4000,
        inline: true,
        hot: true
    },
    devtool: 'eval',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /vendor/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime', 'transform-class-properties']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=\.]+)?$/,
                use: [
                    'url-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            },
            {
                test: /\.html$/,
                loader: 'file-loader'
            }
        ]
    }
};

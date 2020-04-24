const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        index: [
            "webpack-hot-middleware/client?path=/__client&timeout=2000&overlay=false", // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
            './src/index.js',
        ]
    },
        devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins:[
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // resolve: {
    //     alias: {
    //       'react-dom': '@hot-loader/react-dom',  // 如果用react hook 需要使用这个
    //     },
    //   },
});
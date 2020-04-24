const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js', // [hash] 每次hash都会更新， 不管变不变， 且所有文件的hash都一样， 起不到对于cdn缓存优化的作用/[chunkhash](不改动公用库的代码， hash值就不会变， 保证线上构建， 没变的文件hash值不变) 通常不在开发环境下
        // chunkFilename: '[name].bundle.js',
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.js'  // main 就是对应outPut中的【name】
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/' // 表示的是打包生成的静态文件的前缀 ， 如果写了/aaa, 则打包出来的引用路径就会变成 src = "/aaa/main.bundle.js" 否则 src = "/main.bundle.js"
    },
    mode: "production", // 默认不写为生产环境， 生产环境自动压缩代码，且会删除被标记为无用的代码(package.json 中 sideEffects 配置)； 开发环境默认不压缩代码， 且不会删除diamante
    // 执行 webpack-dev-server 会清理掉磁盘里边的dist内容， 读取内存的内容
    devServer: {
        contentBase: './dist', // 设置查找哪个文件夹下的index.html, 这个是读取的物理内存， 如果磁盘目录下有同名的会优先读取内存中的，这样的原理快， 不要和打包的dist 弄混， 一般来说都输出和查找的路径都是当前路径， 所以也就和眼看见的路径查找方式一样了 
        publicPath: '/', // 表示的是打包生成的静态文件所在的位置
        hot: true
    },
    devtool: 'inline-source-map', // 用于分析查找代码错误的文件和位置
    plugins: [
        new CleanWebpackPlugin(), // 每次build的时候清空dist文件夹的内容

        // 自动生成html, 并自动引用 entry 设置的文件依赖，不写的话需要自己手动在dist 目录去创建引入
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),

        // 热更新插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
        // 解析css， 可以将css 按照模块引入吗还有自动更新css的功能 
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']  
        },
                  
        ]
    }
};
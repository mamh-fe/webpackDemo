const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js' //这样写要配合删除多余的重复import 内容 ： splitChunks(对应名称是common的) (下边vendor 同理， 意为命中缓存，splitChunks 中 name 取名和vendor相同了，一般的全局的依赖， 像lodash， react )
        // vender: [
        //     'lodash',
        // ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: "public/index.html"   // 因为react 插入dom 用的getElementByID， 所以要首先存在这样一个html的id， 所以不用默认的模板， 用自己写的一个
        }),
        new ExtractTextPlugin("styles.css"),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // 指定公共 bundle 的名称。 新版本废弃了
        // }),
        new webpack.HashedModuleIdsPlugin(), // 这个插件保证 如果修改了其他文件，公共资源vendor 的hash值不变， 一般用于生产环境

        new webpack.ProvidePlugin({  // 公用变量按照标准的模块导出方式
            _: 'lodash'
        })
    ],
    output: {
        filename: '[name].[hash].js', // 开发环境[hash] 每次hash都会更新， 不管变不变， 且所有文件的hash都一样， 起不到对于cdn缓存优化的作用/生产环境：[chunkhash](不改动公用库的代码， hash值就不会变， 保证线上构建， 没变的文件hash值不变) 通常不在开发环境下
        path: path.resolve(__dirname, 'dist'),
        // chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            // 解析css， 可以将css 按照模块引入还有自动更新css的功能 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({    // 这个写法比下边的好处是可以独立生成css文件， 而不是包含在app入口文件里边, ExtractTextPlugin通常不包括在开发环境下， 这只是为了调试方便
                    fallback: "style-loader",
                    use: "css-loader"
                })
                // use: ['style-loader', 'css-loader']  
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                // test: /\.js$/,
                // include: path.resolve(__dirname, "src"), // include exclude 可以提高性能,排除不需要查找匹配的文件
                // loader: "babel-loader",   // 要配合 .babellrc配置
                // options: {
                //     presets: [['@babel/preset-env', {
                //         useBuiltIns: 'usage' // 这种方式打包比直接import babel-polyfill 体积要小 ， 
                //     }]]
                // }
              }
                  
        ]
    },
    optimization: {
        splitChunks: {     // production 下 该模式默认被启用
            // 抽离入口文件公共模块为commmons模块
            cacheGroups: {
                // commons: {   //入口点之间共享的代码
                //     name: "commons", //common // 如果为了提取其他相同的文件引入 而不是全局的依赖可取名common(如果和entry name 取同名了， 则只会生成一份叫这个的，一般这个就是整个文件都是公共的， 要是文件一部分引入可能会重复引入的话就取不同名)
                //     chunks: "initial",
                //     minChunks: 2
                // },
                vendor: {
                    // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, 
                    test: /[\\/]node_modules[\\/]/, // 分离node_modules 不分离这个会都打包到index 入口文件里
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    }
};
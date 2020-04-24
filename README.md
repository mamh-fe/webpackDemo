package.json:

webpack 打包
"build": "webpack",

文件更新， 但需要手动刷新页面
"watch": "webpack --watch",

帮助我们自动刷新页面，可以配置热更新进行js单独更新， 不配置就是刷新全部， css 更新借助的是loader
"start": "webpack-dev-server --open",
 "start": "webpack-dev-server --open --config webpack.dev.js", // config 指定应用的配置文件， 

 如果就一个config文件， 导出是一个函数， 可以指定环境变量
"start": " webpack --env.production "   # 设置 env.production == true

如果用了node 相关的框架 express koa 等， 相对于的实时更新是webpack-dev-middleware， 有独特的node中的配置方法
"server": "node server.js",

sideEffects : 标记除了那些文件， export 没有用到的可以删除， 

关于babel-loader

只是架起连接webpack和babel的桥梁，还无法进行ES6转ES5
loader: 'babel-loader', 

配置成这样只是将const 转成了var ， 箭头函数转成了function ， 但是一些特性语法， 如promise 是识别不了的， 只是找样子在打包的时候复制了下来， 这样有些老的浏览器是支持不了的， 如果自己测试没问题可能因为你用的是google浏览器
use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']  // 对babel-loader 进行相关的配置
        }
    }

为了识别promise 需要安装 import babel-polyfill， 这个是在生产环境需要的， 但是这个打包体积比较大
 use: {
        loader: 'babel-loader',
        options: {
            presets: [['@babel/preset-env', {
            useBuiltIns: 'usage' // 这种方式打包比直接import babel-polyfill 体积要小 ， 
            }]]
        }
    }

server 层实现热更新

1.webpack-dev-middleware  // 只是服务器编译打包更新了，
2.webpack-hot-middleware +  react-hot-loader 前者更新了不知道如何更新页面需要搭配后者， 后者在react16.6+版本会失效
webpackHotMiddleware 需要在入口如配置语句连接服务器， 保持长连接

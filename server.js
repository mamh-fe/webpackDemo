const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');  // 只是完成了打包像服务器的更新， 修改 app.js 可以看到命令行编译的文件id已经改变, 但是用服务器的页面并没有刷新， 还需要手动刷新
const webpackHotMiddleware = require('webpack-hot-middleware'); // 服务端热更新，只写这个不知道如何更新， 需要加 + react-hot-loader 不用刷新页面

const app = express();
const config = require('./webpack.dev.js');
// config.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server","./src/index.js");

const compiler = webpack(config);


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 使用webpack-hot-middleware中间件，配置在console台输出日志
// app.use(webpackHotMiddleware(compiler, {
//     log: console.log, path: '/', heartbeat: 10 * 1000   // 对应webpack.dev.js里边的entry的修改和 plugin添加
// }));

app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: "/__client",
    heartbeat: 2000
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
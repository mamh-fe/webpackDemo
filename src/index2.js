/** 
 * new webpack.ProvidePlugin({  // 公用变量按照标准的模块导出方式
            _: 'lodash'
    })
 */
// import _ from 'lodash'; // 用了上边配置的模块导出， 可以不用这样的导出方式， 这是第三方需要导出的全局变量， 不是标准的模块导出
import printMe from './print.js';
import { cube } from './math.js';
import './styles.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    var element = document.createElement('div');
    // var element = document.createElement('pre');
  
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!wa o';
    btn.onclick = printMe;

    element.appendChild(btn);

    // element.innerHTML = [
    //     'Hello webpack!',
    //     '5 cubed is equal to ' + cube(5)
    // ].join('\n\n');
    
    return element;
  }
  
//   document.body.appendChild(component());
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

// console.error('出错了');

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        // printMe(); 如果不按照下边这样写， 下边这打印出来的是旧的
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}
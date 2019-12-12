## 调试
直接打印
```js
// main.js
// Vue 原型上挂载
Vue.prototype.$log = window.console.log

// 组件中使用
<h2>{{$log(data)}}</h2>
```

使用vconsole
``` bash
npm install vconsole -S

# main.js
# 直接使用
import VConsole from "vconsole"
new VConsole()
```

只在开发环境中开启调试
```js
// main.js
// 动态引入需要使用import() 或 require()
if (process.env.NODE_ENV === 'development') {
  // let VConsole = require('vconsole') 
  let VConsole = import('vconsole')
  new VConsole()
  Vue.prototype.$log = window.console.log
}
```
## 移动端调试流程
待续...
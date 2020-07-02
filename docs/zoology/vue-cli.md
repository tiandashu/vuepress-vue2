## 介绍
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，[详细解读](https://www.cnblogs.com/zhaowy/p/9542369.html)
:::tip
此文章仅做用于快速开发，详见[@vue/cli官网](https://github.com/vuejs/vue-cli/tree/v2#vue-cli--)版本2
:::

## 设置环境
`vue-cli`默认只提供了`dev`和`prod`两种环境。但其实正真的开发流程可能还会多一个`sit`或者`stage`环境
```bash
# npm 脚本重新指定 NODE_ENV
"build:pre": "NODE_ENV=pre node build/build.js"
"dev:pre": "NODE_ENV=pre webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"

# config目录下新增对应的文件
pre.env.js 中改变对应的变量

# 判断process.env.NODE_ENV === 'pre'
# webpack.dev.conf.js 或 webpack.prod.conf.js
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : process.env.NODE_ENV === 'pre' 
    ? require('../config/pre.env')
    : require('../config/prod.env')
```

## 浏览器兼容性
``` bash
npm install --save babel-polyfill

# main.js
import 'babel-polyfill'
// 或者
require('babel-polyfill') //es6

# webpack.config.js
module.exports = {
  entry: ['babel-polyfill', './app/js']
}
```
## 路径别名
```bash
# webpack.bash.conf.js
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    ...
  }
}
```

## 页面插值
```css
<link rel="icon" href="<%= process.env.NODE_ENV %>">
```

## 配置jsx
```bash
# https://github.com/vuejs/jsx
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

# .babelrc
{
  "presets": ["@vue/babel-preset-jsx"]
}
```

## require.context
> 一个webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

这个方法有 3 个参数：
- directory：要搜索的文件夹目录
- useSubdirectories：是否还应该搜索它的子目录，
- regExp：以及一个匹配文件的正则表达式

返回值：返回的是一个函数,并且这个函数有3个属性
- resolve 是一个函数，它返回请求被解析后得到的模块 id
- keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成
- id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

示例：
```js
// 注册全局组件
const requireAll = context => context.keys().map(context);
const component = require.context('./components', false, /\.vue$/);   // false 不遍历子目录，true遍历子目录
requireAll(component).forEach(({default:item}) => {
	console.log(item)
	Vue.component(`wb-${item.name}`, item);
});

```

## 打包设置
``` bash
# config.js
build.assetsPublicPath: './',

# utils.js
ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
    //线上环境打包资源问题
    publicPath: '../../'
})
```

## 开启 gzip 压缩
``` bash
npm install --save-dev compression-webpack-plugin
# config/index.js
build.productionGzip:true
```
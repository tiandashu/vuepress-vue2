### 是什么？
> 在服务端将vue组件解析成 HTML 字符串，将它们直接发送到浏览器，最后在客户端将这些静态标记"激活"并 成为完全可交互的应用程序

- 服务端解析vue组件为html字符串
- 保证服务端和客户端状态一致，且在客户端能够**激活**
- ssr不代表完全在服务端渲染完所有

### 优势？
- 更好的 SEO
- 更快的内容响应

### 局限？
- 浏览器特定代码或者某些生命周期需要特殊处理
- 需要node server环境，对部署需要更多要求
- 更多的服务器端负载：消耗更多的服务器资源，需要准备相应的服务器负载，并明智地采用缓存策略

### 适用场景
- 需要seo的
- 首屏要求比较高的
- 后台admin没必要

### 环境
- node6+
- vue-server-renderer 和 vue 必须匹配版本

### 基本使用
- `npm install vue vue-server-renderer --save`
- vue-server-renderer用来把vue实例render成html字符串
- `<!--vue-ssr-outlet-->` 插入标记
- 

### 通用代码
> 确保可以同时运行在服务器和客户端的代码

- 每个请求都应是一个新的实例，避免单例造成状态污染
- 服务端的渲染不需要响应数据，默认情况下禁用响应式数据，还可以避免将「数据」转换为「响应式对象」的性能开销
- hook：只有 beforeCreate 和 created 会在服务器端渲染调用，其余在客户端执行
- 不能使用平台特定的api：window、document、global

### webpack构建
- 通过webpack构建服务端和客户端特有的功能
>所以基本看法是，对于客户端应用程序和服务器应用程序，我们都要使用 webpack 打包 - 服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)，而「客户端 bundle」会发送给浏览器，用于混合静态标记。

### 路由和代码分割
- 避免单例
- router.getMatchedComponents()获取路由的组件实例
- 在服务端通过vue-server-renderer转化成html
- 需要在挂载 app 之前调用 router.onReady

### 数据预取和状态
> 依赖异步数据的时候需要，那么在开始渲染过程之前，需要先预取和解析好这些数据

- 挂载到客户端之前应确保和服务端数据一致，否则导致混合失败
- 获取的数据需要在视图之外统一管理
- asyncData预取路由组件的异步数据，会在组件实例化之前调用，无法访问this；需要将 store 和路由信息作为参数传递进去

### 客户端激活
> 指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程

- 注意，为能够正确匹配，请确保在模板中写入有效的 HTML。比如浏览器会浏览器会在` <table>` 内部自动注入 `<tbody>`，然而，由于 Vue 生成的虚拟 DOM (virtual DOM) 不包含 `<tbody>`，所以会导致无法匹配。

### 缓存
- 页面级别:注意缓存时间，是动态内容还是静态内容
- 组件级别:vue-server-renderer 内置支持组件级别缓存

```
const LRU = require('lru-cache')

const renderer = createRenderer({
  cache: LRU({
    max: 10000,
    maxAge: ...
  })
})
```

### 深入浅出
- 纯客户端渲染
- 服务端渲染，不包含ajax
- 服务端渲染，包含ajax
- 服务端渲染，使用serverBundle和clientManifest进行优化
- 一个完整的基于Vue + VueRouter + Vuex的SSR工程
- [示例1](https://github.com/tiandashu/vue-ssr-lessons)
- [示例2](https://github.com/leocoder351/vue-ssr-demo)


### 问题
- 为何要避免单例?
    + 避免客户访问的请求是同一个vue实例，造成用户数据混乱
- 服务器端和客户端匹配不一致？
    + 保证dom结构，如果不一致浏览器会重新渲染
- 在created()中请求的数据是服务端渲染么？
    + 在beforeCreate里发起异步请求是否可以呢，也是不行的。因为请求是异步的，可能还没有等接口返回，服务端就已经把html字符串拼接出来了
- 如何部署项目
    + 只需要将server.js(渲染服务)部署到服务器即可
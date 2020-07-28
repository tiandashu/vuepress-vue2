

### vue-router
1、安装配置
```
npm install vue-router -S

# src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [ ... ]
})

# main.js
import router from './router'
new Vue({
  el: '#app',
  router,
  ...
})
```
2、使用

2.1 注意
- router-link
- router-view
- 路由参数
```
params: 一般在设置动态路由的时候用到
query: 对应url中?后面的`key=val`
meta: 在定义route的时候手动配置
```
- 区分 router 和 route
```
route: 当前激活的路由信息对象
router: router 实例
```
- `/*`匹配路由，要写在最后，否则会拦截正常的路由

2.2 按需加载
- 虽然可以优化加载速度，但是需要区分哪些页面需要，哪些不需要
- eg: `const Foo = () => import('./Foo.vue')`

2.3 划分模块
- 项目页面比较多的时候可以，划分模块文件

2.3 路由钩子
```
# 全局前置钩子
router.beforeEach((to, from, next) => {
  // ...
})

router.afterEach((to, from) => {
  // ...
})

# 路由独享钩子
beforeEnter: (to, from, next) => {
  // ...
}

# 组件内路由钩子
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
},
beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
},
beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
}


```

2.3 动态生成路由

```
# 一般结合权限进行路由控制
router.addRoutes([])
```

:::tip
如果项目结构较大，建议划分路由模块管理
:::

3、history模式配置

vue.config.js 配置成相对路径
```js
// 如果nginx配置了location，注意相对位置的层级
publicPath: './',  // ../
```

vue-router 配置base
```js
export default new VueRouter({
  mode: 'history',
  // 默认 /, base的路径要和nginx中保持一致，详情如下
  base: '/vue/',
  routes: [
    {
      path: '/b',
      component: pageB
    },
    {
      path: '/c',
      component: pageC
    },
  ]
})
```

nginx.conf
```bash
server {
  listen       8080;
  server_name  localhost;

  # 配置成打包后的路径
  root /Users/tian/vue-history/dist;

  # / 对应 publicPath: './' ; vue-router 对应的base为 '/'
  # /vue/ 对应 publicPath: '../' ; vue-router 对应的base为 '/vue/'
  location /vue/ { 
    # history 模式
    try_files $uri $uri/ /index.html;
  }
}
```

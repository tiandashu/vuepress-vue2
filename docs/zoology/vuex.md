## 介绍
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。详见[vuex官网](https://vuex.vuejs.org/zh/)

## 项目配置
```bash
# 安装
npm install vuex --save

# @/store/index.js
import Vue form 'vue'
import Vuex form 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
})

export default store

# @/main.js
import store from '@/store/index.js'
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})

```
## 核心概念

### state
- 存放初始状态
- 一般在组件中通过computed读取
- 组件中通过`this.$store.state.xxx`访问
- `mapState`辅助函数
```js
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

// mapState
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

```

### getter
- 抽离业务逻辑代码，避免在各个组件中单独处理
- 一般在组件中通过computed读取
- 参数：state, getter
- 组件中通过`this.$store.getters.xxx`访问
- `mapGetters`辅助函数
```js
import { mapGetters } from 'vuex'

export default {
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // 数组形式
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
    // 对象形式
    mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  }
}
```

### mutations
- 参数：state, payload
- 只支持同步事务
- 通过`store.commit()`触发对应的mutation方法，修改state
- `mapMutations`辅助函
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### action
- Action 提交的是 mutation，而不是直接变更状态
- Action 可以包含任意异步操作。
- 参数：context，payload,context可以通过解构的方式{state, getters, commit}
- Action 通过`store.dispatch`方法触发
- 返回的是一个promise
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### module
- 划分模块使代码更加清晰
- 每个模块拥有自己的 state、mutation、action、getter甚至是嵌套子模块——从上至下进行同样方式的分割
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
### 模块的局部状态
- 对于模块内部的 getter，参数为：
```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```
- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
```
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```
- 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```
### 命名空间 namespaced: true
- 模块内部的 state 即使不设置**namespaced: true** 也是注册在模块局部的
- 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间
- 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit
- 在带命名空间的模块内访问全局内容
> 如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```
## 插件
vuex插件每次 mutation 之后调用

```js
// plugin.js
import store from '../index'
// 可以利用插件拦截，执行某些逻辑
let loginplugin = store => {
  store.subscribe((mutation, state) => {
    // mutation 的格式为 { type, payload }
    // vuex插件每次 mutation 之后调用
    console.log('-----vuex 插件日志------')
    console.log(mutation)
    console.log(state)
    console.log('-----vuex 插件日志 end------')
  })
}
export default loginplugin

// store.js
const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [loginPlugin]
})

```

## 表单 v-model处理
```
<input v-model="message">
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
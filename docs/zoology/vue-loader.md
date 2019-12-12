## 介绍
vue-loader 是一个 webpack 的 loader，可以将用下面这个格式编写的 Vue 组件转换为 JavaScript 模块
:::tip
此文章仅做用于快速开发，详见[vue-loader官网](https://vue-loader-v14.vuejs.org/zh-cn/#)
:::

## tempalte
- 每个`.vue`文件最多包含一个`<template>`块

## script
- 每个`.vue`文件最多包含一个`<script>`块

## style
- 每个`.vue`文件中允许存在多个`<style>`标签
- `<style>` 标签可以有 scoped 或者 module 属性 (查看 CSS 作用域和 CSS Modules) 以帮助你将样式封装到当前组件
- 当`<style>`标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素

### 深度选择器

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符
```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

如果配置了scss等预处理器，使用 /deep/
```html
<style scoped lang="scss">
.a /deep/ .b { /* ... */ }
</style>
```
通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式

### 注意
- 性能考虑不建议使用scoped，建议使用css BEM命名规范
- 递归组件中慎用后代选择器

## 资源路径处理
- 如果路径是绝对路径，会原样保留
- 如果路径以 . 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析
- 如果路径以 ~ 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 node 依赖中的资源
- 如果路径以 @ 开头，也会被看作模块依赖。如果你的 webpack 配置中给 @ 配置了 alias，这就很有用了。所有 vue-cli 创建的项目都默认配置了将 @ 指向 /sr

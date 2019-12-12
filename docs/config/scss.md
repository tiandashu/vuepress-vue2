## 安装
```bash
npm install sass-loader node-sass --save-dev
<style lang="sass">
  /* write sass here */
</style>
```
sass-loader 默认解析 SCSS 语法。如果你想要使用 Sass 语法，你需要配置 vue-loader 的选项
```js
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
    }
  }
}
```
::: danger
# Modele build failed: TypeError: this.getResolve is not a function at Object.loader...
"sass-loader": "^8.0.0"，更换成了 "sass-loader": "^7.3.1",
:::

## 加载一个全局设置文件
在每个组件里加载一个设置文件，而无需每次都将其显式导入，是一个常见的需求。比如为所有组件全局使用 scss 变量。为了达成此目的：
```bash
npm install sass-resources-loader --save-dev
```
```js
// build/utils.js
// 为了避免编译重复，建议只包含变量、mixins 等
// resources 也可以是一个数组，配置多个全局样式
scss: generateLoaders('sass').concat(
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/assets/styles/_var.scss')
    }
  }
),
```
::: warning
配置成全局的scss文件无需在main.js中全局引入，直接使用即可
:::

## 代码
```html
<template>
  <div class="scss-page">
    {{varscss}}
  </div>
</template>

<script>
  // 需要单独引入
  import varscss from '@/assets/styles/_var.scss';
  export default {
    name: 'ScssPage',
    data(){
      varscss
    },
    mounted(){
      console.log(varscss)
    }
  }
</script>

<style lang="scss">
// 无需引入，直接使用
.scss-page{
  color: $red;
}
</style>
```

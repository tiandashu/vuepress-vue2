## 安装
```bash
npm install sass-loader node-sass --save-dev

<style lang="scss">
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

## 设置一个全局文件
解决每次使用通用scss文件都要在组件中显示引入的问题，配置成全局的scss文件无需在组件中引入，直接使用即可

```js
npm install sass-resources-loader --save-dev

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

```html
<template>
  <div class="scss__page">
    <h3>this is scss-page</h3>
    <div class="scss__demo"></div>
  </div>
</template>

<script>
  // 需要单独引入
  import varscss from '@/assets/styles/varibles.scss';
  export default {
    name: 'ScssPage',
    data(){
      varscss: varscss
    },
    mounted(){
      console.log(varscss)
    }
  }
</script>

<style lang="scss">
/* 配置sass-resources-loader后无需引入直接使用 */
/* @import '~@/assets/styles/varibles.scss'; */
.scss__page{
  .scss__demo{
    width: 300px;
    height: 300px;
    background-color: $menuActiveText;
  }
}
</style>
```

## scss常用语法

### 局部文件
scss文件以下划线`_`开头命名的称为局部文件，不会在编译的时候单独输出，但是引入的时候写不写`_`都行

### @extend、@include
- @extend：主要用来共享样式，精简代码
- @include: 使用@mixin中的代码
```scss
@import '~@/assets/styles/mixins.scss';
.text {
  font-size: 18px;
  color: red;
}
.scss__page {
  .scss__demo {
    width: 300px;
    height: 300px;
    background-color: $menuActiveText;
    @extend .text;
    @include cutline;
  }
}
```



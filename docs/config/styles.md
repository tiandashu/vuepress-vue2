:::tip
为了项目更加的工程化，以及后期的维护，建议项目样式应该维护以下几个文件
:::

## 样式初始化
推荐使用reset.css, 如果项目中已经配置了scss等预处理器，请安装对应的版本

### reset
```bash
# 直接使用
npm install --save reset.css

# 安装了scss
npm install --save reset.scss

# 使用 main.js
import 'reset.scss/reset.scss'
```

### Normalize
```bash
# 直接使用
npm install --save normalize.css

# 安装了scss
npm install --save normalize.scss

# 使用 main.js
import 'normalize.scss/normalize.scss'
```

## 样式变量 variables.scss
存放sass变量，主要包括各种主题颜色、按钮颜色

```scss
//sidebar
$menuText: #bfcbd9;
$menuActiveText: #409eff;
$subMenuActiveText: #f4f4f5; //https://github.com/ElemeFE/element/issues/12951
$menuBg: #304156;
$menuHover: #263445;
$subMenuBg: #1f2d3d;
$subMenuHover: #001528;
$sideBarWidth: 210px;

// the :export directive is the magic sauce for webpack
// https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
// 导出变量给js直接使用
:export {
  menuactivetext: $menuActiveText;
  menubg: $menuBg;
  menuhover: $menuHover;
  menutext: $menuText;
  sidebarwidth: $sideBarWidth;
  submenuactivetext: $subMenuActiveText;
  submenubg: $subMenuBg;
  submenuhover: $subMenuHover;
}

// 使用说明：
// scss中引入该文件，直接使用上面定义的变量
// js中引入该文件，使用:export中定义的,在vue组件中使用需要自行引入
```

## 样式混入 mixin.scss
可复用的样式片段，包括清除浮动、圆角边框、文本溢出省略显示、文本强制换行
```scss
// 主要用来抽离重复样式，使用@include

// 单行文本溢出
@mixin cutline($width: 400rpx) {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: $width;
}

// 清除浮动
@mixin clearfix() {
  &:before,
  &:after {
      content: "";
      display: table;
  }
  &:after {
      clear: both;
  }
}

.container {
  @include clearfix;
}

// 圆角边框
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
   -moz-border-radius: $radius;
    -ms-border-radius: $radius;
        border-radius: $radius;
}
.box {
  @include border-radius(10px);
}

```

## 样式通用 common.scss
公共样式，比如项目布局样式

## BEM 命名规范
- 为了项目具有更好的性能，设置样式的时候不建议使用scoped属性。推荐使用**BEM**命名规范避免样式冲突
- BEM：block(模块)__element(元素)-modifier(修饰)

```bash
# eg:
.alert__button--cancle{
  ...
}
.alert__button--confirm{
  ...
}
```
## rem布局

潜规则：设计稿默认750设计，基准值默认100

原理：基准值 / 设计稿大小  =  设备基准值（rem根节点大小）/ 设备宽度

### meta 设置

```html
<meta name ="viewport" content ="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
<!-- Apple IOS原生浏览器 -->
<!-- 添加到主屏后设置状态栏的背景颜色； -->
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<!-- 忽略数字自动识别为电话号码； -->
<meta name="format-detection" content="telephone=no" />
<!-- 忽略数字自动识别为邮箱 -->
<meta name="format-detection" content="email=no">
<!-- 启动WebApp全屏模式； -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 百度 -->
<!-- 通过百度手机打开网页时，百度可能会对你的网页进行转码，脱下你的衣服，往你的身上贴狗皮膏药的广告，为此可在 head 内添加 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!-- QQ -->
<!-- 设置锁定横屏、竖屏显示模式，portrait（横屏），landscape（竖屏）-->
<meta name="x5-orientation" content="landscape">
<!-- 设置全屏显示页面 -->
<meta name="x5-fullscreen" content="true">
<!-- 360 -->
<!-- 设置 360 浏览器渲染模式：webkit 为极速内核，ie-comp 为 IE 兼容内核，ie-stand 为 IE 标准内核。 -->
<meta name="renderer" content="webkit">
<!-- 360 浏览器就会在读取到这个标签后，立即切换对应的极速核。 另外为了保险起见再加入 -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!-- uc -->
<!-- 1.设置屏幕方向：portrait为横屏，landscape为竖屏； -->
<meta name="screen-orientation" content="landscape">
<!-- 2.设置全屏； -->
<meta name="full-screen" content="yes">
```

### 动态计算html元素字体大小

方式一：css设置，简单

```css
html{
  font-size: calc( 100 / 750 * 100vw );
}
```

方式二：js - 基础版

```js
(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',		
      recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';			//设定根以屏幕宽375做标准来制定
      };
  if (!doc.addEventListener) return;
  //适配手机翻转
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

方式三：js - 升级版

```js
// 会设定最小和最大范围
!function (window) {
  /* 设计图文档宽度 */
  var docWidth = 750;
  var doc = window.document,
    docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  var recalc = (function refreshRem () {
    var clientWidth = docEl.getBoundingClientRect().width;

    /* 设置基准值为100，并添加区域限制 */
    /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
    docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 3.75 + 'px';
    return refreshRem;
  })();

  /* 添加倍屏标识，安卓为1 */
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    /* 添加IOS标识 */
    doc.documentElement.classList.add('ios');
    /* IOS8以上给html添加hairline样式，以便特殊处理 */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
      doc.documentElement.classList.add('hairline');
  }

  if (!doc.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
```

方式四：使用lib-flexible
```bash
npm install lib-flexible -S

# main.js
# 注意 lib-flexible 的基准值是75, 设计稿是750
import 'lib-flexible'
```


### 自动换算rem

> 写样式的时候直接写设计稿的大小即可，会自动将px换算成rem
```bash
npm install postcss-pxtorem -D
```

在 .postcssrc.js 中配置
```js
// rootValue 的值要和上面的基准值保持一致
"postcss-pxtorem": {
    rootValue: 100,  //换算基数根据html的字体大小
    unitPrecision: 5, //计算后的最小精度值，默认保留5位
    propList: ["*"],	//设置哪些属性可以px转换rem
    selectorBlackList: [],	//过滤，给定哪些选择器不转换rem，保留px
    replace: true,	
    mediaQuery: false, //Boolen类型，是否允许在媒体查询中转换px
    minPixelValue: 2
}
```

## 百分比布局
待续...

## 媒体查询
待续...

## vw布局
待续...
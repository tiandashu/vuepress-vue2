## 项目结构
```
├── build                // 构建相关  
├── config               // 配置相关
├── src                  // 源代码
│   ├── api              // 所有请求
│   ├── assets           // 主题字体等静态资源和全局样式
│   ├── icons            // 项目所有 svg |icons
│   ├── lang             // 国际化 language
│   ├── mock             // 项目mock 模拟数据
│   ├── router           // 路由
│   ├── store            // 全局 store管理
│   ├── tools            // 全局公用方法
│   ├── vendor           // 公用vendor
│   ├── global           // 公用components.mixins等
│   ├── pages            // view page
│   ├── App.vue          // 入口页面
│   ├── main.js          // 入口 加载组件 初始化等
│   └── permission.js    // 权限管理
├── static               // 第三方不打包资源
│   └── xxx              // xxx
├── .babelrc             // babel-loader 配置项
├── .eslintrc.js         // eslint 配置项
├── .gitignore           // git 忽略项
├── .postcssrc           // postcssr 配置项
├── favicon.ico          // favicon图标
├── index.html           // html模板
└── package.json         // package.json
```

## static 目录
- 默认在该文件下存放的资源，webpack不做处理直接拷贝
- 项目中的引用路径使用绝对路径 `/static/`
- 如果使用的不是绝对路径，比如 `static` 或 `./statitc` 或 `url: require('/static/..')` 都会被webapck处理
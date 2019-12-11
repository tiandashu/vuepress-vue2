module.exports = [
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/' },
  {
    text: '配置与使用',
    items: [
      {
        text: 'vue生态',
        items: [
          { text: 'Vue', link: '/vue/index' },
          { text: 'Vuex', link: '/zoology/vuex' },
          { text: 'Vue Router', link: '/zoology/vue-router' },
          { text: 'Vue CLI', link: '/zoology/vue-cli' },
          { text: 'Vue Loader', link: '/zoology/vue-loader' },
          { text: 'VueSSR', link: '/zoology/vuessr' },
          { text: 'vuePress', link: '/zoology/vuepress' },
          { text: 'Devtools', link: '/zoology/devtools' },
        ]
      },
      {
        text: '开发配置',
        items: [
          { text: '调试', link: '/config/debug' },
          { text: '样式初始化', link: '/config/reset' },
          { text: 'vantUI', link: '/config/vant' },
          { text: 'webpack', link: '/config/webpack' },
        ]
      },
    ]
  },
  {
    text: '优质资源',
    items: [
      { text: '文章', link: '/language/chinese/' },
      { text: '项目', link: '/language/english/' },
      { text: '面试', link: '/language/english/' },
    ]
  },
  // { text: 'github', link: 'https://github.com/tiandashu/hello-vue2.git' },
]
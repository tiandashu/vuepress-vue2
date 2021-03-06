module.exports = [
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/' },
  {
    text: '配置与使用',
    items: [
      {
        text: 'vue生态',
        items: [
          { text: 'Vuex', link: '/zoology/vuex' },
          { text: 'Vue Router', link: '/zoology/vue-router' },
          { text: 'Vue CLI', link: '/zoology/vue-cli' },
          { text: 'Vue Loader', link: '/zoology/vue-loader' },
          { text: 'Vue SSR', link: '/zoology/vue-ssr' },
          { text: 'vuePress', link: '/zoology/vue-press' },
          { text: 'Devtools', link: '/zoology/devtools' },
        ]
      },
      {
        text: '项目配置',
        items: [
          { text: '调试', link: '/config/debug' },
          { text: 'scss', link: '/config/scss' },
          { text: '样式设置', link: '/config/styles' },
          { text: '移动端配置', link: '/config/mobile' },
          { text: 'vantUI', link: '/config/vant' },
          { text: 'elementUI', link: '/config/elementui' },
        ]
      },
    ]
  },
  {
    text: '优质资源',
    items: [
      { text: '精彩文章', link: '/resource/article/' },
      { text: '开源项目', link: '/resource/project/' },
    ]
  },
  // { text: 'github', link: 'https://github.com/tiandashu/hello-vue2.git' },
]
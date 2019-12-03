module.exports = {
  base: '/hello-vue2-doc/',
  title: 'vue2-QuickStart',
  description: '基于vue2的项目配置',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    // 当前项目的github地址
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'tiandashu/hello-vue2',
    repoLabel: '查看源码',
    // 当前项目配套的文档仓库
    docsRepo: 'tiandashu/hello-vue2-doc',
    // 默认为 "Edit this page"
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      {
        text: '配置与使用',
        items: [
          {
            text: 'vue生态',
            link: '/vue/index',
            items: [
              { text: 'vue', link: '/vue/index' },
              { text: 'vantUI', link: '/vuex/index' },
              { text: 'vueRouter', link: '/vuex/index' },
              { text: 'vuex', link: '/vuex/index' },
              { text: 'vueSSR', link: '/vuex/index' },
              { text: 'vuePress', link: '/vuex/index' },
              { text: 'vuex', link: '/vuex/index' },
            ]
          },
          {
            text: '第三方配置',
            link: '/vue/index',
            items: [
              { text: 'vue', link: '/vue/index' },
              { text: 'vantUI', link: '/vuex/index' },
              { text: 'vueRouter', link: '/vuex/index' },
              { text: 'vuex', link: '/vuex/index' },
              { text: 'vueSSR', link: '/vuex/index' },
              { text: 'vuex', link: '/vuex/index' },
              { text: 'vuex', link: '/vuex/index' },
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
    ],
    // 效果就是在当前页面展示所有导航
    // sidebar:[
    //   ['/guide/','指南'],
    //   ['/vue/','vue'],
    // ],
    // 分组：效果就是需要通过链接跳转到对应的分组，当前页面智展示对应分组的headers导航
    sidebar: {
      '/guide/': [
        '',
      ],
      '/vue/': [
        '',
        ['foo', 'foo']
      ],
      '/vuex/': [
        '',
        ['foo', 'foo']
      ],
    }
  }
}
module.exports = {
  base: '/vuepress-vue2/',
  title: 'vue2-qs',
  description: 'quick start',
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
    smoothScroll: true,
    // - git仓库和编辑链接
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'tiandashu/vuepress-vue2',
    repoLabel: 'github',
    // 当前项目配套的文档仓库
    docsRepo: 'tiandashu/vuepress-vue2',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    // - 更新时间 git提交的时间
    lastUpdated: '最后更新',
    nav: require('./nav.js'),
    // 效果就是在当前页面展示所有导航
    // sidebar:[
    //   ['/guide/','指南'],
    //   ['/vue/','vue'],
    // ],
    // 分组：效果就是需要通过链接跳转到对应的分组，当前页面智展示对应分组的headers导航
    sidebar: {
      '/guide/': [
        ['','开始'],
        ['catalog','项目结构'],
        ['style-guide','vue风格指南'],
      ],
      '/zoology/': getZoologySidebar('vue生态'),
      '/config/': getConfigSidebar('项目配置'),
      '/resource/': [
        ['article','精彩文章'],
        ['project','开源项目'],
      ],
    }
  }
}
// 官方生态
function getZoologySidebar (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ['vuex','Vuex'],
        ['vue-router', 'Vue Router'],
        ['vue-cli','Vue CLI'],
        ['vue-loader', 'Vue Loader'],
        ['vue-ssr', 'Vue SSR'],
        ['vue-press', 'VuePress'],
        ['devtools', 'Devtools'],
      ]
    }
  ]
}

// 项目配置
function getConfigSidebar (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ['debug','调试'],
        ['scss','scss'],
        ['styles', '样式设置'],
        ['mobile', '移动端配置'],
        ['vant', 'vant'],
        ['elementui', 'elementui'],
      ]
    }
  ]
}
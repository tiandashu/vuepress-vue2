#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f "git@github.com:tiandashu/vue2-quickStart-doc.git" master:gh-pages

echo '发布完成，请访问http://tl.tianaitian.com/vue2-quickStart-doc/'

cd -

# npm run build


cd ./docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:tiandashu/vuepress-vue2.git master:gh-pages

echo '发布完成，请访问http://doc.tianaitian.com/vuepress-vue2/'

cd -
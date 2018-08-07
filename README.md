# advertise-platform-home

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#预加载
npm install prerender-spa-pugin --save
#在webpack.prod.config.js中加入
const PrerenderSpaPlugin = require('prerender-spa-plugin')
#在 pugin中加入 
new PrerenderSpaPlugin(
      //将渲染的文件放到dist目录下
      path.join(__dirname, '../dist'), 
      //需要预渲染的路由信息
      ['/','/index',"/weixinspread","/subscriptionfuns","/channelorder","/help","/register","/login","/companyProfile","/companyCulture","/companyRecruit","/companyContact"]
    ),

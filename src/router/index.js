import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router= new Router({
 // export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: "/index"
    },
    {
      path: '/index',
      name: '首页',
      component: resolve=>require(['@/components/Index'],resolve)
    },
    {
      path: '/weixinspread',
      name: '微信推广',
      component: resolve=>require(['@/components/Weixinspread'],resolve)
    },
    {
      path: '/subscriptionfuns',
      name: '公众号涨粉',
      component: resolve=>require(['@/components/Subscriptionfuns'],resolve)
    },
    {
      path: '/channelorder',
      name: '媒体接单',
      component: resolve=>require(['@/components/Channelorder'],resolve)
    },
    {
      path: '/help',
      name: '帮助中心',
      component: resolve=>require(['@/components/Help'],resolve)
    },
    {
      path: '/login',
      name: '登录',
      component: resolve=>require(['@/components/Login'],resolve)
    },
    {
      path: '/main',
      name: '主页',
      component: resolve=>require(['@/components/main/Main'],resolve),
      children:[
        {
          path: 'welcome/:pathParams',
          name: '欢迎页',
          component: resolve=>require(['@/components/main/config/Welcome'],resolve)
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.fullPath.indexOf("role")>0
  ||to.fullPath.indexOf("permission")>0
  ||to.fullPath.indexOf("rolePermission")>0){
    //判断是否超级管理员，是就显示账户管理
    if(sessionStorage.getItem("account")){
      let account=JSON.parse(sessionStorage.getItem("account"));
      if(account.role.name=="超级管理员"){
        next()
      }else{
        next(false)
      }
    }
  }else{
    next()
  }
  
})
export default router
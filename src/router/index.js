import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from '@/router/routes'
import store from '@/store'

//连续点击搜索多次触发了push或replace会报错NavigationDuplicated，
// 因为的push会产生没有结果的promise

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected ===undefined){
    return originPush.call(this,location).catch(()=>{})
  }else{
    return originPush.call(this,location,onResolved,onRejected)
  }
}
VueRouter.prototype.replace = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected ===undefined){
    return originReplace.call(this,location).catch(()=>{})
  }else{
    return originReplace.call(this,location,onResolved,onRejected)
  }
}
const router = new VueRouter({
  routes,
  //设置进入新页面滚动的初始位置在左上角
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//问题，未登录的用户不应该能直接跳转至我的订单页面
// 必须登录后才能访问的页面一般使用全局路由守卫（如交易，订单，用户信息等）
router.beforeEach((to,from,next)=>{
  let targetPath = to.path
  if(targetPath.startsWith('/pay') || targetPath.startsWith('/myorder') ||targetPath.startsWith('/center')  ){
    if(store.state.user.userInfo.name){
      next()
    }else{
      next('/login?redirect='+targetPath)
    }
  }else{
    next()
  }
})


export default router
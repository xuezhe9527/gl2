import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from '@/router/routes'

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

export default new VueRouter({
  routes
})
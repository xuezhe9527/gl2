import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import * as API from '@/api'
import SlideLoop from '@/components/SlideLoop'


// console.log(API);
// console.log(API.reqBannerList());
// API.reqFloorList()

//全局注册TypeNav组件
Vue.component("TypeNav",TypeNav)
Vue.component("SlideLoop",SlideLoop)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')

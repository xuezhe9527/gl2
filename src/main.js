import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import * as API from '@/api'
import SlideLoop from '@/components/SlideLoop'
import Pagination from '@/components/Pagination'
import {MessageBox,Message} from 'element-ui'


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


// console.log(API);
// console.log(API.reqBannerList());
// API.reqFloorList()

//全局注册TypeNav组件
Vue.component("TypeNav",TypeNav)
Vue.component("SlideLoop",SlideLoop)
Vue.component("Pagination",Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')

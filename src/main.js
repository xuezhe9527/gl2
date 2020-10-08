import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import * as API from '@/api'
import SlideLoop from '@/components/SlideLoop'
import loading from './assets/lazy.gif'
import VueLazyLoad from 'vue-lazyload'
import '@/validate'

//import Pagination from '@/components/Pagination' //自己写的分页组件，这次使用elementui的组件，会冲突，故注释掉
import {MessageBox,Message,Pagination} from 'element-ui'
Vue.use(Pagination)

Vue.use(VueLazyLoad,{loading})

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


// console.log(API);
// console.log(API.reqBannerList());
// API.reqFloorList()

//全局注册TypeNav组件
Vue.component("TypeNav",TypeNav)
Vue.component("SlideLoop",SlideLoop)
// Vue.component("Pagination",Pagination)

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

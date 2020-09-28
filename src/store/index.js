import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'

Vue.use(Vuex)

const state = {}

const mutations = {}

const actions = {}

const getters = {}


//本来还有一个modules，但是因为modules包括多个，所以将其中的各个模块单独抽取出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    home,
    search,
    detail,
    shopcart,
    user
  }
})
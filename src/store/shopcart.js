import { reqAddOrUpdateToCart,reqShopCartList } from '@/api'

const state = {
  shopCartList:{}
}

const mutations = {
  RECEIVESHOPCARTLIST(state,arg){
    state.shopCartList = arg
  }
}

const actions = {
  //添加购物车
  async addOrUpdateToCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateToCart(skuId, skuNum)
    if (result.code === 200) {
      return '添加购物车成功'
    } else {
      // return '添加购物车失败' //❌，只是字面上失败，实际返回的还是成功的promise
      return Promise.reject(new Error('添加购物车失败'))
    }
  },

  //查詢购物车列表
  async getShopCartList({commit}){
    const result = await  reqShopCartList()
    if(result.code===200){
      commit("RECEIVESHOPCARTLIST",result.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
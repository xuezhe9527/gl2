import { reqAddOrUpdateToCart } from '@/api'

const state = {

}

const mutations = {}

const actions = {
  async addOrUpdateToCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateToCart(skuId, skuNum)
    if (result.code === 200) {
      return '添加购物车成功'
    } else {
      // return '添加购物车失败' //❌，只是字面上失败，实际返回的还是成功的promise
      return Promise.reject(new Error('添加购物车失败'))
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
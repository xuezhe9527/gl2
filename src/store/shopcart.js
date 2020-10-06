import { reqAddOrUpdateToCart, reqShopCartList, reqChangeOneShopCartChecked, reqDeleteOneShopCart } from '@/api'

const state = {
  shopCartList: []
}

const mutations = {
  RECEIVESHOPCARTLIST(state, arg) {
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
  async getShopCartList({ commit }) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data)
    }
  },

  //改变一个商品的购物车的选中状态
  async changeOneShopCartChecked({ commit }, { skuId, isChecked }) {
    const result = await reqChangeOneShopCartChecked(skuId, isChecked)
    if (result.code === 200) {
      return "购物车选中状态修改成功"
    } else {
      return Promise.reject(new Error("购物车选中状态修改失败"))
    }
  },
  //修改全部商品的选中状态
  changeAllShopCartChecked({ commit, state, dispatch }, val) {
    let promises = []
    state.shopCartList.forEach(item => {
      // console.log('vuex里面:',val);
      if (item.isChecked === val) return
      console.log(item);
      let promise = dispatch('changeOneShopCartChecked', { skuId: item.skuId, isChecked: val })
      promises.push(promise)
    });
    return Promise.all(promises)
  },
  //删除单个商品的购物车信息
  async deleteOneShopCart({ commit }, skuId) {
    const result = await reqDeleteOneShopCart(skuId)
    if (result.code === 200) {
      return "删除单个购物车成功"
    }else{
      return Promise.reject(new Error("删除单个购物车失败"))
    }
  },
  //删除选中的购物车的数量
  deleteCheckedShopCart({commit,state,dispatch}){
    let promises = []
    state.shopCartList.forEach(item=>{
      if(!item.isChecked) return
      let promise = dispatch('deleteOneShopCart',item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }

}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
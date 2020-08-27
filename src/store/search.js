import {reqGoodsList} from '@/api'

const state = {
  goodsListInfo:{}
}

const mutations = {
  RECEIVEGOODSLISTINFO(state,arg){
    state.goodsListInfo = arg
  }
}

const actions = {
  async getGoodsListInfo({commit},searchParams){
    const result = await reqGoodsList(searchParams)
    if(result.code ===200){
      commit('RECEIVEGOODSLISTINFO',result.data)
    }
  }
}

const getters = {
  attrsList(state){
    return state.goodsListInfo.goodsListInfo||[]
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){ 
    return state.goodsListInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
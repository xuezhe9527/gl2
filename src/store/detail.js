import {reqGoodsDetailInfo} from '@/api'

const state = {
  goodsDetailInfo:{}
}

const mutations = {
  RECEIVEGOODSDETAILINFO(state,arg){
    state.goodsDetailInfo = arg
  }
}

const actions = {
  async getGoodsDetailInfo({commit},skuId){
    const result = await reqGoodsDetailInfo(skuId)
    if(result.code===200){
      commit('RECEIVEGOODSDETAILINFO',result.data)
    }
  }
}

const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  },
  imgList(state){
    // console.log((state.goodsDetailInfo.skuInfo || {}).skuImageList);
    return (state.goodsDetailInfo.skuInfo || {}).skuImageList
  }
}


export default{
  state,
  mutations,
  actions,
  getters
}
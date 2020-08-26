import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

const state = {
  categoryList:[],
  bannerList:[],
  floorList:[]
}

const mutations = {
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,arg){
    state.bannerList = arg
  },
  RECEIVEFLOORLIST(state,arg){
    state.floorList = arg
  }
}

const actions = {
  //获取三级分类
  async getCategoryList({commit}){
    const result = await reqCategoryList()
    // console.log(result);
    if(result.code ===200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  },
  //查詢主轮播图列表
  async getBannerList({commit}){
    const result = await reqBannerList()
    if(result.code===200){
      commit('RECEIVEBANNERLIST',result.data)
    }
  },
  //查詢楼层信息
  async getFloorList({commit}){
    const result = await reqFloorList()
    if(result.code===200){
      commit('RECEIVEFLOORLIST',result.data)
    }
  },
}

const getters = {}


export default{
  state,
  mutations,
  actions,
  getters
}
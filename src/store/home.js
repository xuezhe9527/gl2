import {reqCategoryList} from '@/api'

const state = {
  categoryList:[]
}

const mutations = {
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  }
}

const actions = {
  //获取三级分类
  async getCategoryList({commit}){
    const result = await reqCategoryList()
    console.log(result);
    if(result.code ===200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  }
}

const getters = {}


export default{
  state,
  mutations,
  actions,
  getters
}
import {getUserTempId} from '@/utils/userabout'
import {reqLogin, reqRegister,reqLogout} from '@/api'
const state = {
  userTempId : getUserTempId(),
  userInfo : JSON.parse(localStorage.getItem('USERINFO_KEY'))||{}
}

const mutations = {
  RECEIVEUSERINFO(state,arg){
    state.userInfo = arg
  },
  RESETUSERINFO(state){
    state.userInfo = {}
  }
}

const actions = {
  //用户注册
  async toRegister({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code ===200){   
      return '注册成功'
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  },
  //用户登录
  async toLogin({commit},userInfo){
    const result = await reqLogin(userInfo)
    if(result.code===200){
      commit('RECEIVEUSERINFO',result.data)
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      return "登陆成功，即将跳转至首页"     
    }else{
      return Promise.reject(new Error("登陆失败"))
    }
  },
  //用户退出
  async toLogout({commit}){
    const result = await reqLogout()
    if(result.code===200){
      commit('RESETUSERINFO')
      localStorage.removeItem('USERINFO_KEY')
      return '登出成功'
    }else{
      return Promise.reject(new Error('登出失败'))
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
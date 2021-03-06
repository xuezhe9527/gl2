import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'


const service = axios.create({
  baseURL: '/api',
  timeout: 20000
})


service.interceptors.request.use(config => {
  NProgress.start()
  //让每次请求都带上userTempId
  let userTempId = store.state.user.userTempId
  if(userTempId){
    config.headers.userTempId = userTempId
  }
  //让每次请求都带上token
  let token = store.state.user.userInfo.token
  if(token){
    config.headers.token = token
  }
  return config
})

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    alert('请求出错:' + error.message || '未知错误')
    return new Promise(() => { })  //返回一个中断的Promise，不允许用户继续处理
    // return Promise.reject(error)  //允许用户继续处理错误
  }
)

export default service
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//mock的ajax
const service = axios.create({
  baseURL: '/mock',
  timeout: 20000
})


service.interceptors.request.use(config => {
  NProgress.start()
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
import Mock from 'mockjs'
import banner from './banner'
import floor from './floor'

//mock可以拦截Ajax请求,所以不会再NetWork里面找到,因为它并不向后台发请求

//第一个参数是模拟要访问的路径(类似后台接口),第二个是返回的参数,
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

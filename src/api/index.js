import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'

//采用分别暴露的方式
//获取三级分类
export const reqCategoryList = () => Ajax({
  url: '/product/getBaseCategoryList',
  method: 'GET'
})

// 获取轮播图图片
export const reqBannerList = () =>mockAjax.get('/banner')  //baseURL里面已经有'/mock'，所以这里只需要写'/banner'
export const reqFloorList = () =>mockAjax.get('/floor')

//请求商品搜索列表
export const reqGoodsList = (searchParams) => Ajax.post('/list',searchParams)



// console.log(111);
// reqBannerList()
// reqFloorList()
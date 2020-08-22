import Ajax from '@/ajax/Ajax'

//采用分别暴露的方式
//获取三级分类
export const reqCategoryList = () => Ajax({
  url: '/product/getBaseCategoryList',
  method: 'GET'
})
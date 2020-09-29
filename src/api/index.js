import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'

//采用分别暴露的方式
//获取三级分类
export const reqCategoryList = () => Ajax({
  url: '/product/getBaseCategoryList',
  method: 'GET'
})

// 获取轮播图图片
export const reqBannerList = () => mockAjax.get('/banner')  //baseURL里面已经有'/mock'，所以这里只需要写'/banner'
export const reqFloorList = () => mockAjax.get('/floor')

//请求商品搜索列表
export const reqGoodsList = (searchParams) => Ajax.post('/list', searchParams)

//请求某个商品的详情信息
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${skuId}`)

//请求添加购物车 /api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdateToCart = (skuId,skuNum) => Ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

//查詢所有的购物车列表 /api/cart/cartList  get
export const reqShopCartList = ()=> Ajax.get('/cart/cartList')

//修改单个购物车的选中状态  /api/cart/checkCart/{skuID}/{isChecked}  get
export const reqChangeOneShopCartChecked = (skuID,isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)

//点击全选修改所有购物车的选中状态是通过多次重复使用reqChangeOneShopCartChecked（修改单个购物车的选中状态）实现的


// console.log(111);
// reqBannerList()
// reqFloorList()
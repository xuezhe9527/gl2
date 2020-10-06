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

////删除购物车单个商品 /api/cart/deleteCart/{skuId}  delete
export const reqDeleteOneShopCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`)

//注册用户信息 /api/user/passport/register   post
export const reqRegister = (userInfo) => Ajax.post(`/user/passport/register`,userInfo)

//用户登录 /api/user/passport/login post
export const reqLogin = (userInfo) => Ajax.post(`/user/passport/login`,userInfo)

//用户退出 /api/user/passport/logout  get
export const reqLogout = () =>Ajax.get('/user/passport/logout')




// console.log(111);
// reqBannerList()
// reqFloorList()
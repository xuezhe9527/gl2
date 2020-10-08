const Home = () => import('@/pages/Home')  //路由懒加载：优势：1单独打包，2按需加载
// import Home from '@/pages/Home'
import Login  from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
export default 
[
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder,
      },
      {
        path:'grouporder',
        component:GroupOrder,
      },
      {
        path:'',
        redirect:'myorder'
      }
    ]
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHideFooter:true
    },
    //未登录的用户才可以进入登陆页面
    beforeEnter: (to, from, next) => {
      if(!store.state.user.userInfo.name){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHideFooter:true
    }
  },
  {
    path:'/search/:keyword?',
    component:Search,
    name:'search',
    // props:route=>({keyword:route.params.keyword,keyword1:route.query.keyword1})
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/trade',
    component:Trade
  },
  {
    path:'/pay',
    component:Pay
  },
  {
    path:'/paysuccess',
    component:PaySuccess
  },
  {
    path:'/center',
    component:Center
  },

  {
    path:'/',
    redirect:'/home'
  },
]
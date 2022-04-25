import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import main from '../views/main.vue'
// 引入验证token是否过期
import {checktoken} from"@/api/user/user"
// 单独引入element ui
import { Message } from 'element-ui';
// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 登录页面
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 后台首页
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/main/index',
      children:[
        {
          path: '/main/index',
          meta:{title:"后台首页",url:"/main/index"},
          component: () => import ("@/views/main/index.vue")
        }
      ]
    },
    // 订单管理
    {
      path: '/order',
      name: 'order',
      component: main,
      redirect: '/order/index',
      children:[
        {
          path: '/order/index',
          meta:{title:"订单管理",url:"/order/index"},
          component: () => import ("@/views/order/order.vue")
        }
      ]
    },
    // 商品管理
    {
      path: '/goods',
      name: 'goods',
      meta:{title:"商品管理",url:"/goods"},
      component: main,
      redirect: '/goods/goodslist',
      children:[
        {
          path: '/goods/goodslist',
          meta:{title:"商品列表",url:"/goods/goodslist"},
          component: () => import ("@/views/goods/goodslist.vue")
        },
        {
          path: '/goods/goodsadd',
          meta:{title:"商品添加",url:"/goods/goodsadd"},
          component: () => import ("@/views/goods/goodsadd.vue")
        },
        {
          path: '/goods/goodscate',
          meta:{title:"商品分类",url:"/goods/goodscate"},
          component: () => import ("@/views/goods/goodscate.vue")
        }
      ]
    },
    // 店铺管理
    {
      path: '/shop',
      name: 'shop',
      component: main,
      redirect: '/shop/index',
      children:[
        {
          path: '/shop/index',
          meta:{title:"店铺管理",url:"/shop/index"},
          component: () => import ("@/views/shop/shop.vue")
        }
      ]
    },
    // 账号管理
    {
      path: '/users',
      name: 'users',
      component: main,
      meta:{title:"账号管理",url:"/users"},
      redirect: '/users/userslist',
      children:[
        {
          path: '/users/userslist',
          meta:{title:"账号列表",url:"/goods/userslist"},
          component: () => import ("@/views/users/userslist.vue")
        },
        {
          path: '/users/usersadd',
          meta:{title:"账号添加",url:"/users/usersadd"},
          component: () => import ("@/views/users/usersadd.vue")
        },
        {
          path: '/users/modifypwd',
          meta:{title:"修改密码",url:"/users/modifypwd"},
          component: () => import ("@/views/users/modifypwd.vue")
        },
        {
          path: '/users/accountInfo',
          meta:{title:"个人中心",url:"/users/accountInfo"},
          component: () => import ("@/views/users/accountInfo.vue")
        },
      ]
    },
    // 销售统计
    {
      path: '/census',
      name: 'census',
      meta:{title:"销售统计",url:"/census"},
      component: main,
      redirect: '/census/goodscensus',
      children:[
        {
          path: '/census/goodscensus',
          meta:{title:"商品统计",url:"/census/goodscensus"},
          component: () => import ("@/views/census/goodscensus")
        },
        {
          path: '/census/ordercensus',
          meta:{title:"订单统计",url:"/census/ordercensus"},
          component: () => import ("@/views/census/ordercensus")
        }
      ]
    },
  ]
})
// 路由前置守卫
router.beforeEach(async (to,from,next)=>{
  // 判断是否跳转到登录页
  if(to.path!="/"){
    // 判断若没有token或者token过期，跳转到登录页，
    let res = await checktoken({token:localStorage.token})
    let {code,msg}=res.data
    if(code===0){
      next()
    }else{
      Message({
        message:"饭团温馨提示：登录过期，请重新登录！",
        type:"error"
      })
      next("/")
    }
  }else{
    next()
  }
})
export default router

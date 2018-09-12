import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/User.vue'
import Welconme from '@/views/Welcome.vue'
import Right from '@/views/right/Right.vue'
import Role from '@/views/right/Role.vue'
import Categories from '@/views/goods/Categories.vue'
import Goods from '@/views/goods/Goods.vue'
import Params from '@/views/goods/Params.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import GoodsAdd from '@/views/goods/GoodsAdd.vue'
import Chart from '@/views/chart/Chart.vue'
// 引入静态资源文件
// import styles  from '@/'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: {
      'name': 'welconme'
    },
    children: [
      // 登录显示的页面
      {
        path: 'users',
        name: 'users',
        component: User
      },
      {
        path: 'welconme',
        name: 'welconme',
        component: Welconme
      },
      // 权限列表
      {
        path: 'roles',
        name: 'roles',
        component: Role
      },
      // 角色列表
      {
        path: 'rights',
        name: 'rights',
        component: Right
      },
      // 商品列表的三个路由
      {
        path: 'goods',
        name: 'goods',
        component: Goods,
        // 当他访问goods的重定向到goodlist路由 如果重定向用到path，则需要加上goods/list才能跳转，不然会想到跟目录跳转(home)，不会在goods下跳转
        redirect: {
          name: 'list'
        },
        // goods里面的嵌套两个路由
        children: [{
          path: 'list',
          name: 'list',
          component: GoodsList
        },
        {
          path: 'add',
          name: 'add',
          component: GoodsAdd
        }
        ]
      },
      {
        path: 'categories',
        name: 'categories',
        component: Categories
      },
      {
        path: 'params',
        name: 'params',
        component: Params
      },
      // echart实例
      {
        name: 'chart',
        path: 'reports',
        component: Chart
      }
    ]
  }
  ]
})

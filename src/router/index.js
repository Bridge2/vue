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
// 引入静态资源文件
// import styles  from '@/'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {'name': 'welconme'},
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
          component: Goods
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
        }
      ]
    }
  ]
})

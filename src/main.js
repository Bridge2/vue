// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 使用elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入css样式
import './styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局路由守卫
router.beforeEach((to, from, next) => {
  /*
    1 to  即将要进入的目标 路由对象
    2 from  当前导航正要离开的路由
    3 next 一定要调用该方法来 resolve 这个钩子
   */
// 判断有没有token值.获取去令牌
  var token = localStorage.getItem('mytoken')
  if (token) {
    // 有token 继续
    next()
  } else if (to.path === '/login') {
    // 如果访问默认的页面如登录页面就可以访问
    next()
  } else {
    // 如果不是就重定向，不是使用this.$router.push() 会报错，因为此时的vm实例还没创建
    // 可以使用next来重定向 不是访问loginnp
    next({name: 'login'})
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

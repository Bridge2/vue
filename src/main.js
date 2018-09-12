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
// 引入store 用来存取登录用户的用户信息
import store from './store/store.js'
// 引入高德地图插件
// 引入vue-amap
import VueAMap from 'vue-amap'
// 引入echarts
import ECharts from 'vue-echarts'
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})
// register component to use
Vue.component('chart', ECharts)
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
  store,
  components: { App },
  template: '<App/>'
})

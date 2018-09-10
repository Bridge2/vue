// 1 下载vue 和vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 2 告诉vue 使用vuex
Vue.use(Vuex)

// 3 创建state用来存放数据，它是一个对象
const state = {
  // 存取当前用户登录名
  username: ''
}

// 4 创建 mutations 一个对象，保存更改state的函数
// 提供一个方法，为state中的username赋值
//   这些方法有一个默认的参数，这个参数就是当前store中的State
const mutations = {
  // 存取username
  setUserName (state, username) {
    state.username = username
    // 把获取到的username存在永久存取当中
    localStorage.setItem('myname', username)
  },
  // 获取username
  getUserName (state) {
    return state.username
  }
}
// 5 利用触发器来触发mutations事件 commit固定参数
const actions = {
  setUserNameAction: ({commit}, username) => {
    commit('setUserName', username)
  },
  getUserNameAction: ({commit}) => {
    commit('getUserName')
  }
}
// 6 利用getter来获取存取到永久存储当中的数据
const getters = {
  getUserName: (state) => {
    return localStorage.getItem('myname')
  }
}
// 7 去登录成功把用户名存取到state当中，当登录成功后赋值给回去
export default new Vuex.Store({
  // 如果添加了严格模式(strict: true,)，那么直接修改state中的数据会报错：Do not mutate vuex store state outside mutation handlers，所以还是需要使用mutations中的函数进行数据的修改
  strict: true,
  state,
  getters,
  actions,
  mutations
})

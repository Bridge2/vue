import axios from 'axios'

// 基准url 是服务器的url，我们发送的请求是路由，而路由会找到对应的服务器的地址，后期我们只需要
// 输入路由就可以直接访问
const baseUrl = 'http://localhost:8888/api/private/v1/'

axios.defaults.baseURL = baseUrl
// 通过axios来设置拦截器，如果用户没有携带token则不跳转
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取token
  let token = localStorage.getItem('mytoken')
  // 把token设置在axios请求头里面携带过去
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 校验登录

export const login = (params) => {
  // 返回axios请求和结果
  return axios.post('login', params).then((res) => {
    return res.data
  })
}

export const getUserList = (pa) => {
  return axios.get('users', {params: pa}).then((res) => {
    return res.data
  })
}

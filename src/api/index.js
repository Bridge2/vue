import axios from 'axios'

// 基准url 是服务器的url，我们发送的请求是路由，而路由会找到对应的服务器的地址，后期我们只需要
// 输入路由就可以直接访问
const baseUrl = 'http://localhost:8888/api/private/v1/'

axios.defaults.baseURL = baseUrl
// 校验登录

export const login = (params) => {
  // 返回axios请求和结果
  return axios.post('login', params).then((res) => {
    return res.data
  })
}

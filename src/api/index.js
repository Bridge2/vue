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
// 2 获取用户信息列表
export const getUserList = (pa) => {
  return axios.get('users', {params: pa}).then((res) => {
    return res.data
  })
}

// 3 添加新用户
export const getAddUser = (pa) => {
  return axios.post('users', pa).then((res) => {
    return res.data
  })
}
// 4 编辑用户
export const editUserinfo = (pa) => {
  // put 为修改提交 要求url传参，传送id
  return axios.put(`users/${pa.id}`, pa).then((res) => {
    return res.data
  })
}
// 5 删除用户
export const deleteUserByid = (id) => {
  return axios.delete(`users/${id}`).then((res) => {
    return res.data
  })
}
// 6 修改用户状态 users/:uId/state/:type 传送两个参数 id 和 修改的状态
export const editState = (pa) => {
  return axios.put(`users/${pa.uid}/state/${pa.type}`).then((res) => {
    return res.data
  })
}
// 7 获取所有角色列表不需要参数
export const getRole = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}
// 8 分配用户角色 users/:id/role
export const grantRoleById = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid}).then((res) => {
    return res.data
  })
}
// 9 获取所有权限列表  rights/:type
export const getAllRights = (pa) => {
  return axios.get(`rights/${pa.type}`).then((res) => {
    return res.data
  })
}
// 10 删除角色的指定权限 roles/:roleId/rights/:rightId
export const deleteRight = (roleid, rightid) => {
  return axios.delete(`roles/${roleid}/rights/${rightid}`).then((res) => {
    return res.data
  })
}
// 11 角色授权 请求路径：roles/:roleId/rights :roleId角色ID不能为空携带在url中
// rids权限ID列表以 , 分割的权限ID列表需要传送字符串(我们选中的授权角色的id)
export const grantUserRole = (pa) => {
  return axios.post(`roles/${pa.roleid}/rights`, {rids: pa.rids}).then((res) => {
    return res.data
  })
}
// 12 实现添加用户
export const getAllRole = (params) => {
  // 返回axios请求和结果
  return axios.post('roles', params).then((res) => {
    return res.data
  })
}
// 13 渲染左侧导航栏 menus
export const getAllmenus = () => {
  // 返回axios请求和结果
  return axios.get('menus').then((res) => {
    return res.data
  })
}
// 14 商品列表数据categories

export const getAllcategories = (type) => {
  // 返回axios请求和结果
  return axios.get('categories', {params: {'type': type}}).then((res) => {
    return res.data
  })
}
// 15 实现商品分类的添加
export const addCtegories = (pa) => {
  // 返回axios请求和结果
  return axios.post('categories', pa).then((res) => {
    return res.data
  })
}
// 16 商品列表数据
export const goodsList = (pa) => {
  return axios.get('goods', {params: pa}).then((res) => {
    return res.data
  })
}
// 17 实现商品分类的添加goods
export const addGoodsList = (pa) => {
  // 返回axios请求和结果
  return axios.post('goods', pa).then((res) => {
    return res.data
  })
}

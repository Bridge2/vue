<template>
    <div class="home">
        <el-container>
            <el-aside width="auto" >
                <div class="logo"></div>
                <el-menu default-active="1-1" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse='isCollapse' :router='true'>
                  <!-- 展开索引也应该动态绑定 -->
                    <el-submenu :index="item.id +''" v-for="(item) in menusList" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 跳转的路径在part里面 路由的路径要根据这里的路径修改-->
                        <el-menu-item :index="subitem.path" v-for="(subitem) in item.children" :key="subitem.id">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <span class=" myicon myicon-menu toggle-btn" @click='isCollapse=!isCollapse'></span>
                    <div class="system-title">电子商务管理后台 </div>
                    <div>
                      <!-- 先判断$store.username是否有数据，没有则取永久存取的数据 -->
                        <span class="welcome">您好:{{$store.state.username?$store.state.username:$store.getters.getUserName}}</span>
                        <el-button type="text" @click="outLogin">退出</el-button>
                    </div>
                </el-header>
                <el-main>
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 用户登录显示的内容 -->

    </div>
</template>
<script>
import { getAllmenus } from '@/api/index.js'
export default {
  data () {
    return {
      isCollapse: false,
      menusList: []
    }
  },
  mounted () {
  // 一上来就渲染用户页面
    getAllmenus().then((res) => {
      this.menusList = res.data
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出清除token
    outLogin () {
      localStorage.removeItem('mytoken')
      // 跳转回登录界面
      this.$router.push({name: 'login'})
    }

  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #f7f7f7;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>

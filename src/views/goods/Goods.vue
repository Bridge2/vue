<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card class="box-card" >
        <router-view></router-view>
      </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>

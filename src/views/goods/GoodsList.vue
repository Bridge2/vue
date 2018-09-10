<template>
    <div>
<!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="seachValue" class="input-with-select" style="width:300px" @keydown.native.enter="searchUserList">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click='$router.push({"path":"add"})'>添加用户</el-button>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>

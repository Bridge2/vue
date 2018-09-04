<template>
    <div class="user">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>用户管理</el-breadcrumb-item>
           <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
         <div style="margin-top: 15px;">
   <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:300px">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
   <el-button type="success" plain>添加用户</el-button>
</div>
   <!-- 表格 -->
   <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px;" >
    <!-- 显示序号 -->
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <!-- 自定义列表找的列表 -->
      <el-table-column label="状态">
      <template slot-scope="scope">
         <!-- 通过动态绑定状态来决定状态是true还是false -->
         <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
             @click="handleEdit(scope.$index, scope.row)">
         </el-switch>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" @click="handleEdit(scope.$index, scope.row)">
               <el-button type="primary" plain>
                   <i class="el-icon-edit"></i>
               </el-button>
          </el-tooltip>
           <el-tooltip content="删除" placement="bottom-start" @click="handleEdit(scope.$index, scope.row)">
               <el-button type="primary" plain>
                  <i class="el-icon-delete"></i>
               </el-button>
          </el-tooltip>
           <el-tooltip content="授权角色" placement="bottom" @click="handleEdit(scope.$index, scope.row)">
               <el-button type="primary" plain>
                   <i class="el-icon-check"></i>
               </el-button>
          </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
    </div>
    <!-- 分页码 -->

</template>

<script>
// 获取登录用户的详细信息
import { getUserList } from '@/api/index.js'
export default {
  data () {
    return {
      input5: '',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: []
    }
  },
  methods: {
    handleEdit () {},
    // 获取用户数据 要求传送query , 页数，
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    getUserList({query: '', pagenum: 1, pagesize: 10}).then((res) => {
      console.log(res)
      this.tableData = res.data.users
    })
  }
}
</script>

<style lang="scss" scoped>

</style>

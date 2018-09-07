<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <el-table ref="singleTable" :data="rightDataList" highlight-current-row  style="width: 100%" border>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="authName" label="权限" width="120">
        </el-table-column>
        <el-table-column property="path" label="路径" width="120">
        </el-table-column>
        <el-table-column property="level" label="层级" width="120">
          <!-- 添加模板，为了过滤层级 不能直接在property="level"里面过滤，因为无法识别管道符，要使用插值表达式的方式过滤，可以通过slot-scope来获取到当前行再使用插值表达式来实现过滤-->
          <template slot-scope="scope">
            <span> {{scope.row.level | capitalize}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
    <!-- 表格 -->

</template>
<script>
// 引入
import { getAllRights } from '@/api/index.js'
export default {
  data () {
    return {
      rightDataList: [],
      total: 0,
      pagesize: 10,
      pagenum: 10
    }
  },
  // 1 页面一加载就渲染页面
  mounted () {
    // 发送请求 type类型值: list 或 tree , list 列表显示权限, tree 树状显示权限,参数是url参数:type
    getAllRights({type: 'list'}).then((res) => {
      console.log(res)
      this.rightDataList = res.data
    })
  },
  // 过滤器
  filters: {
    // level 是形参就是通道符|前面的数据
    capitalize: function (level) {
      // 过滤数字1,2,3变成一级，二级，因为返回来的是字符串，所以转成字符串
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

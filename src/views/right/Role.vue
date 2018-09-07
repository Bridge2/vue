<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮 -->
        <el-button type="success" plain>添加角色</el-button>
        <!-- 表格 -->
        <template>
            <el-table ref="singleTable" :data="roleData" highlight-current-row @current-change="handleCurrentChange" style="width: 100% ; margin-top:15px" border="">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <!-- 自己的内容这是展开行的内容props跟scope一样的用法只是名字不一样，往后这里的内容应该是栅格来做。elment ui也提供了Layout 布局一种栅格来布局 -->
                        <el-row v-for='(first) in props.row.children' :key="first.id">
                            <el-col :span="4">
                                <el-tag closable type="success">
                                    {{first.authName}}
                                </el-tag>
                            </el-col>
                            <el-col :span="20">
                                <el-row v-for="(second) in first.children" :key="second.id">
                                    <el-col :span="8">
                                        <el-tag closable type="info">
                                            {{second.authName}}
                                        </el-tag>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-tag v-for="(third) in second.children " :key="third.id" closable type="warning">
                                            {{third.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!-- 当该角色没有没有任何权限的时候，则提示用户，应该判断props.row.children数组的长度，而不是判断roleData数组的长度，因为这个数组肯定是有数据的 -->
                        <el-row v-if="props.row.children.length===0">
                            <el-col>该用户没有权限，请前往添加更多权限</el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column property="roleName" label="角色名称">
                </el-table-column>
                <el-table-column property="roleDesc" label="描述">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="success" plain>
                                <i class="el-icon-edit"></i>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom-start">
                            <!--                                          根据id删除，传进一个id        -->
                            <el-button type="danger" plain>
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="授权角色" placement="bottom">
                            <el-button type="info" plain>
                                <i class="el-icon-check"></i>
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

        </template>
    </div>
</template>
<script>
import { getRole } from '@/api/index.js'
export default {
  data () {
    return {
      roleData: [],
      currentRow: null
    }
  },

  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },
  // 页面一加载显示数据
  mounted () {
    // 发送请求
    getRole().then(res => {
      console.log(res)
      this.roleData = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
</style>

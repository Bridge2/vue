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
   <el-input placeholder="请输入内容" v-model="seachValue" class="input-with-select" style="width:300px" @keydown.native.enter="searchUserList">
    <el-button slot="append" icon="el-icon-search" @click="searchUserList"></el-button>
  </el-input>
   <el-button type="success" plain @click="getAddUser=true">添加用户</el-button>
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
             @change="Editstate(scope.row)">
         </el-switch>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
               <el-button type="success" plain  @click="showEditUser(scope.row)">
                   <i class="el-icon-edit"></i>
               </el-button>
          </el-tooltip>
           <el-tooltip content="删除" placement="bottom-start" >
             <!--                                          根据id删除，传进一个id        -->
               <el-button type="danger" plain @click="deleteUser( scope.row.id)">
                  <i class="el-icon-delete"></i>
               </el-button>
          </el-tooltip>
           <el-tooltip content="授权角色" placement="bottom" >
               <el-button type="info" plain @click="granteEdit( scope.row)">
                   <i class="el-icon-check"></i>
               </el-button>
          </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
 <!-- 分页 -->
<div class="block" style="margin-top:15px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=1
      :page-sizes="[10, 20, 30, 40]"
      :page-size=10
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
<!-- 添加用户对话框 -->
 <!-- :visible.sync 动态绑定这个提示框是隐藏还是显示，默认给false。当点击才显示 -->
<el-dialog title="添加用户" :visible.sync="getAddUser">
  <!-- label-width 设置表格的宽度  :model="addform" addfrom 是一个对象-->
  <el-form :model="addform" label-width="100px" :rules="rules" ref='addform'>
    <el-form-item label="添加用户:" prop="username">
      <el-input v-model="addform.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="addform.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model="addform.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号:" prop="mobile">
      <el-input v-model="addform.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="getAddUser = false">取 消</el-button>
    <el-button type="primary" @click="addUserSubmit('addform')">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑用户对话框 -->
 <!-- :visible.sync 动态绑定这个提示框是隐藏还是显示，默认给false。当点击才显示 -->
<el-dialog title="编辑用户" :visible.sync="editUser">
  <!-- label-width 设置表格的宽度  :model="addform" addfrom 是一个对象-->
  <el-form :model="editform" label-width="100px" :rules="rules" ref='editform'>
    <el-form-item label="用户名:" prop="username">
      <el-input v-model="editform.username" auto-complete="off" disabled=""></el-input>
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model="editform.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号:" prop="mobile">
      <el-input v-model="editform.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editUser = false">取 消</el-button>
    <el-button type="primary" @click="editUserSubmit('editform')">确 定</el-button>
  </div>
</el-dialog>
<!-- 角色授权 -->
<el-dialog title="添加用户" :visible.sync="grantUser">
  <!-- label-width 设置表格的宽度  :model="addform" addfrom 是一个对象-->
  <el-form :model="grantform" label-width="100px" ref='grantform'>
    <el-form-item label="用户名:">
      <el-input v-model="grantform.username" auto-complete="off" disabled="" style="width:80px"></el-input>
   </el-form-item>
     <!-- 下拉选择框 -->
    <el-form-item label="角色" >
      <!-- 当选择框改变了获取到所选择的的id，此时rolevalue就是我们需要的角色id -->
   <el-select v-model="rolevalue" placeholder="请选择" @change='roleChange'>
     <!-- :label就是要显示的数据  -->
     <!--v-model:这可以自动的获取:value所绑定的数据，意味着rolevalue就是item.id -->
    <el-option
      v-for="item in grantList"
      :key="item.value"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="grantUser = false">取 消</el-button>
    <el-button type="primary" @click="grantUserSubmit('grantform')">确 定</el-button>
  </div>
</el-dialog>
    </div>

</template>

<script>
// 获取登录用户的详细信息
import { getUserList, getAddUser, editUserinfo, deleteUserByid, editState, getRole, grantRoleById } from '@/api/index.js'
export default {
  data () {
    return {
      /* 这是角色的id */
      rolevalue: '',
      grantList: [],
      getAddUser: false,
      editUser: false,
      grantUser: false,
      total: 0,
      pagenum: 1,
      pagesize: 10,
      seachValue: '',
      tableData: [],

      // 添加用户的信息
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editform: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      grantform: {
        username: '',
        id: '',
        rid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email:
          [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    // 6.1 当下拉框改变的时候，获取角色id
    roleChange () {
      // 赋值给角色rid   rolevalue是通过动态绑定的，通过item.id获取到
      this.grantform.rid = this.rolevalue
    },
    // 6.2 获取到 id 和rid 后发送请求分配用户角色
    grantUserSubmit () {
      grantRoleById(this.grantform).then((res) => {
        // console.log(res) 设置成功
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
        // 设置成功关闭对话提示框
        this.grantUser = false
      })
    },
    // 6 角色授权管理
    granteEdit (row) {
      // 获取id 用户名 rid
      // 弹出提示框
      this.grantUser = true
      // 填充默认数据
      this.grantform.username = row.username
      this.grantform.id = row.id
      // 加载默认数据 发送请求加载
      getRole().then((res) => {
        console.log(res)
        // 赋值给下拉框
        this.grantList = res.data
      })
    },
    // 5 编辑状态信息 应该用change事件
    Editstate (row) {
      // row 存放了当前行的信息包括id 和状态
      // console.log(row)
      // 发送请求
      editState({uid: row.id, type: row.mg_state}).then((res) => {
        // 修改成功。弹框提示
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            tyep: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            tyep: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    // 4 删除用户信息
    deleteUser (id) {
      // 点击删除应该弹出提示框给用户确认
      this.$confirm(`确认删除id号为${id}的数据吗？, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定则删除数据，发送请求
        deleteUserByid(id).then((res) => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            // 重新渲染数据
            this.initList()
          } else {
            this.$message({
              type: 'error',
              message: res.meta.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 3 编辑后提交数据
    editUserSubmit (editform) {
      // 提交用户编辑后的 信息
      this.$refs[editform].validate((valid) => {
        if (valid) {
          // 验证通过 发送请求
          editUserinfo(this.editform).then((res) => {
            // 更新成功 提示用户
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              // 编辑框消失
              this.editUser = false
              // 重新渲染数据
              this.initList()
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    // 2 添加用户信息
    addUserSubmit (addform) {
      // 获取用户提交的信息提交到后台
      this.$refs[addform].validate((valid) => {
        // 如果为true,有数据则发送请求
        if (valid) {
          // 发送请求
          getAddUser(this.addform).then((res) => {
            console.log(res)

            if (res.meta.status === 201) {
              // 提示添加成功
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              // 添加用户框消失
              this.getAddUser = false
              // 刷新数据
              this.initList()
              // 重置提示框的内容 利用框架自带的属性
              // 重置表单元素的数据
              this.$refs[addform].resetFields()
            } else {
              (
                this.$message.error(res.meta.msg)
              )
            }
          })
        }
      })
    },
    // 1 编辑用户信息
    initList () {
      getUserList({query: this.seachValue, pagenum: this.pagenum, pagesize: this.pagesize}).then((res) => {
        console.log(res)
        this.tableData = res.data.users
        // 总页数
        this.total = res.data.total
      })
    },

    // 获取用户数据 要求传送query , 页数，
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    },
    // 点击添加和enter事件搜索后重新渲染
    searchUserList () {
      this.initList()
    },
    // 3 编辑用户
    showEditUser (row) {
      // 让提示框显示
      console.log(row)
      this.editUser = true
      this.editform.username = row.username
      this.editform.id = row.id
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    }

  },
  mounted () {
    this.initList()
  }
}
</script>

<style lang="scss" scoped>

</style>

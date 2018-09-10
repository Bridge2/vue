<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button type="success" plain @click='addRole'>添加角色</el-button>
    <!-- 表格 -->
    <template>
      <el-table ref="singleTable" :data="roleData" highlight-current-row @current-change="handleCurrentChange" style="width: 100% ; margin-top:15px" border="">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 自己的内容这是展开行的内容props跟scope一样的用法只是名字不一样，往后这里的内容应该是栅格来做。elment ui也提供了Layout 布局一种栅格来布局 -->
            <el-row v-for='(first) in props.row.children' :key="first.id">
              <el-col :span="4">
                <el-tag closable type="success" @close='deleteFirst(props.row,first.id)'>
                  {{first.authName}}
                </el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(second) in first.children" :key="second.id">
                  <el-col :span="8">
                    <el-tag closable type="info" @close='deleteSecond(props.row,second.id)'>
                      {{second.authName}}
                    </el-tag>
                  </el-col>
                  <el-col :span="16">
                    <el-tag v-for="(third) in second.children " :key="third.id" closable type="warning" @close='deleteThird(props.row,third.id)'>
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
              <el-button type="info" plain @click="grantRight(scope.row)">
                <i class="el-icon-check"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </template>
    <!-- 授权角色对话框 -->
    <el-dialog title="分配权限" :visible.sync="grantdialogFormVisible">
      <!-- 树形控件 给树形设置滚动条 default-expand-all是否默认展开所有节点 default-checked-keys="rolerdeightlist" 默认勾选key的数组-->
      <el-tree ref='tree' :default-expand-all='true' :data="grantRole" show-checkbox node-key="id" :default-checked-keys="rolerdeightlist" :props="defaultProps" style="height:200px;overflow:auto">
      </el-tree>
      <!-- 树形控件 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialog">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权角色对话框 -->
    <!-- 添加角色对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible" >
      <el-form ref="addEoleform" :model="addEoleform" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="roleName">
          <el-input v-model="addEoleform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addEoleform.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 树形控件 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('addEoleform')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getRole,
  deleteRight,
  getAllRights,
  grantUserRole,
  getAllRole
} from '@/api/index.js'
export default {
  data () {
    return {
      addEoleform: {
        roleName: '',
        roleDesc: ''
      },
      // 添加用户
      adddialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }

        ],
        roleDesc: [
          { }
        ]
      },
      // 当前角色id
      roleid: '',
      roleData: [],
      /* 用来存放我们展开的数组的id */
      rolerdeightlist: [],
      currentRow: null,
      grantdialogFormVisible: false,
      // 树形控件 grantRole用来存放我们的数据
      grantRole: [],
      defaultProps: {
        // 指定子树为节点对象的某个属性值 即你要遍历的数组的下一个数组，刚刚好我们返回来的的子数组名字就是叫children，所以才会帮我们加载所有的数据(子数据)
        children: 'children',
        // label是要显示的值
        label: 'authName'
      }
    }
  },

  methods: {
    // 添加用户
    addRole () {
      // 提示对话框
      this.adddialogFormVisible = true
    },
    // 点击添加用户按钮提交
    addSubmit (addEoleform) {
      this.$refs[addEoleform].validate((valid) => {
        if (valid) {
          getAllRole(this.addEoleform).then((res) => {
            if (res.meta.status === 201) {
              this.$message({
                tyep: 'success',
                message: res.meta.msg
              })
              // 重新渲染数据
              this.initList()
              // 关闭对话框
              this.adddialogFormVisible = false
            } else {
              this.$message({
                tyep: 'success',
                message: res.meta.msg
              })
            }
            // 重置对话框
            this.$refs[addEoleform].resetFields()
          })
        }
      })
    },
    grantdialog () {
      this.grantdialogFormVisible = false
      this.$refs.tree.setCheckedKeys([])
    },
    // 渲染数据
    initList () {
      // 发送请求
      getRole().then(res => {
        this.roleData = res.data
      })
    },
    // 弹出授权对话框
    grantRight (row) {
      // 4先重置之前的默认id的数据
      //   this.$refs.tree.setCheckedKeys([])
      // 弹出对话框的时候清除前一次的id的操作
      //   this.rolerdeightlist = []
      // 1 弹出授权对话框
      // 获取当前角色id
      this.roleid = row.id
      //   console.log(this.roleid = row.id)
      this.grantdialogFormVisible = true
      // 2 加载数据渲染树形结构，调接口 需要传送type: list 或 tree , list 列表显示权限, tree 树状显示权限,参数是url参数:type
      getAllRights({ type: 'tree' }).then(res => {
        // 1 把数据赋值给树形数组
        this.grantRole = res.data
        // 2 加载默认用户的数据 加载默认选中项--遍历当前角色的权限数组
        // 因为树形默认你只要选中到最里面的权限的，那么他父级也会被选中，所以我们只要找到最里面的角色权限的id,遍历
        // 3 判断是否有children
        if (row.children.length > 0) {
          // 遍历 first是遍历出来的数组的值
          row.children.forEach(first => {
            if (first.children.length > 0) {
              first.children.forEach(second => {
                if (second.children.length > 0) {
                  second.children.forEach(third => {
                    // 把最后的id赋值给数组
                    this.rolerdeightlist.push(third.id)
                  })
                }
              })
            }
          })
        }
      })
    },
    // 确认授权按钮 获取用户id和授权角色的id 用户id可以通过弹出对话框的时候拿到，还有授权角色的id
    grantSubmit () {
      //   console.log(this.$refs.tree.getCheckedKeys())
      console.log(this.$refs.tree.getCheckedNodes())
      // 1  id:105 pid:"104,101" 意味着我们需要拼接id+pid 而每次pid就是他们父级，每选一个pid都会重复，意味着我们需要去重，同时还要变成字符串的形式传送
      var nodeArr = this.$refs.tree.getCheckedNodes()
      // 2 nodeArr返回的是一个对象数组，遍历这个对象数组，并拼接成新的数组
      var idArr = nodeArr.map(value => {
        // 3 获取到这个对象数组的每一个值，然后拼接到新的数组
        return value.id + ',' + value.pid
      })
      console.log(idArr)
      // ["105,104,101", "116,104,101"]
      // 4 再把idArr以逗号的方式拼在一起
      var strArr = idArr.join(',')
      console.log(strArr)
      // 返回来的是一个字符串 105,104,101,116,104,101,117,104,101
      // 5 字符串不能取重复，先把它变成数组，再去重
      var strId = strArr.split(',')
      console.log(strId)
      // ["105", "104", "101", "116", "104", "101", "117", "104", "101"]
      // 6 都strId数组去重复，es6新的语法 let set = new Set(array); 返回是一个对象
      var tempId = new Set(strId)
      console.log(tempId)
      // 7 把tempId对象转成数组 Array新增了一个静态方法Array.from，可以把类似数组的对象转换为数组
      var rids = Array.from(tempId).join(',')
      console.log(rids)
      // rids就是我们需要的角色的id 105,104,101,116,117
      // 发送请求修改角色的权限 传送用户id和授权角色id
      grantUserRole({ roleid: this.roleid, rids: rids }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 关闭对话框
          this.grantdialogFormVisible = false
          // 重新渲染页面
          this.initList()
          this.$refs.tree.setCheckedKeys([])
        }
      })
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 删除采用插件的close事件删除 roles/:roleId/rights/:rightId
    deleteThird (row, rightid) {
      deleteRight(row.id, rightid).then(res => {
        if (res.meta.status === 200) {
          // 提示成功
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 重新渲染数据
          row.children = res.data
        }
      })
    },
    // 删除第二层
    deleteSecond (row, rightid) {
      deleteRight(row.id, rightid).then(res => {
        if (res.meta.status === 200) {
          // 提示成功
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 重新渲染数据
          row.children = res.data
        }
      })
    },
    // 删除第一层
    deleteFirst (row, rightid) {
      deleteRight(row.id, rightid).then(res => {
        if (res.meta.status === 200) {
          // 提示成功
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 重新渲染数据
          row.children = res.data
        }
      })
    }
  },
  // 页面一加载显示数据
  mounted () {
    this.initList()
  }
}
</script>
<style lang="scss" scoped>
</style>

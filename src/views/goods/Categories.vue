<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加用户 -->
        <el-button type="success" plain @click="addUser">添加用户</el-button>

    <!-- 引入自定义组件 treeStructure是否展开树状  columns默认展开的列为数组 data-source数据源deleteCategory 删除需要传送id-->
    <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
    </tree-grid>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="adddialogFormVisible">
  <el-form :model="addform" label-width="100px">
    <el-form-item label="分类名称">
      <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
    </el-form-item  >
   <el-form-item label="父级分类">
       <!-- 级联树形 options 数据源 selectedOptions被选中显示的内容 props 配置选项-->
       <el-cascader
       :props='cascaderProp'
    :options="categoriesList"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
    </el-form-item  >

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
  </div>
</el-dialog>
     </div>
</template>

<script>
/* 引入自定义组件 如果遇到特殊符号，则可以直接引用到vue的组件，后面可以用过components来获取到具体的组件的结构 */
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getAllcategories, addCtegories } from '@/api/index.js'
export default {
  /* 1 通过components来引入组件  2 在页面上渲染结构 */
  components: {
    'tree-grid': TreeGrid
  },
  data () {
    return {
      // 添加用户分类
      categoriesList: [], // 数据源
      cascaderProp: {
        value: 'cat_id', // 必须填写id不然无法显示内容
        label: 'cat_name', // 要显示的数据内容
        children: 'children'// 子选项为选项对象的某个属性值就父级下面的子选项
      },
      selectedOptions: [],
      options: [],
      addform: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      adddialogFormVisible: false,
      //
      dataSource: [],
      columns: [{
        text: '分类名称', // 分类的标题
        dataIndex: 'cat_name', // 数据返回来需要展示的名称
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  methods: {
    // 实现分类的添加
    addSubmit () {
      // 1 获取cat_pid和cat_level里面值都存取在selectedOptions数组里面，当你改变下拉框的时候会得到你要的cat_pai的数组，可以根据selectedOptions数组的长度判断cat_level的层级
      addCtegories()
    },
    // 提交用户分类
    handleChange () {},
    // 添加用户
    addUser () {
      this.adddialogFormVisible = true
      // 点击对话框渲染页面 这里为啥2级，那是因为第一级已经在前面显示了
      getAllcategories(2).then((res) => {
        this.categoriesList = res.data
      })
    },
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    }
  },
  /* 打开页面就渲染数据 */
  mounted () {
    getAllcategories(3).then((res) => {
      this.dataSource = res.data
    })
  }
}
</script>

<style scoped>
</style>

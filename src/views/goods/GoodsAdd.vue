<template>
  <div class="add">
    <!-- 步骤条 -->
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 4"></el-step>
    </el-steps>
    <!-- tap分页 -->
    <template>
      <el-form ref="addform" :model="addform" label-width="80px" style='height:600px'>
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left' style="margin-top:20px">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" label-width="80px">
              <el-input v-model="addform.goods_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" label-width="80px">
              <el-input v-model="addform.goods_price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" label-width="80px">
              <el-input v-model="addform.goods_weight" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" label-width="80px">
              <el-input v-model="addform.goods_number" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" label-width="80px">
              <div class="block">
                <el-cascader :options="goodsList" v-model="selectedOptions" @change="handleChange" :props="cascaderProps">
                </el-cascader>
              </div>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 高德地图 -->
             <div class="amap-wrapper">
            <el-amap vid="amapDemo" :zoom="zoom" :center="center">
            </el-amap>
             </div>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- v-model="addform.goods_introduce动态绑定值，用于后面提交给后台 options是设置富文本框的工具栏，增加或者减少，可以百度用法-->
            <quill-editor v-model="addform.goods_introduce" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style="height:200px">
            </quill-editor>
          </el-tab-pane>
          <el-tab-pane label="商品照片" name="3">
            <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" :headers='gettoken()' :on-success='uploadDone' :before-upload='uploadBeforeValid'>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button type="success" plain @click='addBtn' style='position:absolute;right:50px;bottom:100px'>提交</el-button>
    </template>
    <!-- 图片预览框 放大图片-->
    <el-dialog title="提示" :visible.sync="previewdialogVisible">
      <img :src="uploadImgSrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { getAllcategories, addGoodsList } from '@/api/index.js'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: { },
      zoom: 12,
      center: [121.59996, 31.197646],
      uploadImgSrc: '', // 动态绑定图片的地址
      previewdialogVisible: false,
      cascaderProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      selectedOptions: [],
      goodsList: [],
      addform: {
        // 商品名称
        goods_name: '',
        // 选中的商品分类
        goods_cat: '1,3,6',
        // 商品价格
        goods_price: '',
        // 商品数量
        goods_number: '',
        // 商品重量
        goods_weight: '',
        // 商品的描述
        goods_introduce: '',
        // 商品的图片
        pics: [],
        // 商品的属性，包含了动态参数 和 静态参数
        attrs: [],
        // 商品描述
        content: ''
      },
      activeName: '',
      fileList: []
    }
  },
  methods: {
    // 8点击添加，添加商品分类
    addBtn () {
      addGoodsList(this.addform).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          // 创建成功跳转到list页面
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.$router.push({ name: 'list' })
        }
      })
    },
    handleChange (value) {
      console.log(value) // 返回的是cat-id的数组
      this.addform.goods_cat = value.join(',') // 变成字符串传值给后台，发送接口
    },
    handleClick (v) {
      // 1 console.log(v)// 里面的name的值就是标签里面的name，这样就可以获取到数值，因为要然步骤条有关联，则在步骤条双向绑定的时候都绑定activename就好了，此时步骤条需要的是number类型的数值，而tap栏获取到的是字符串，可以通过-0把他转成数字
      this.activeName = v.name
    },
    // 7  上传文件之前的验证--验证大小 before-upload
    // 如果返回了false,会自动的触发on-remove事件 所以在删除之前要先判断又没有file.responce,不然会报错
    uploadBeforeValid (file) {
      console.log(file)
      // 对象中存取有文件的大小，以b来算
      if (file.size > 50 * 1024) {
        this.$message({
          type: 'success',
          message: '超出了文件上传的最大限制'
        })
        return false
      }
    },
    // 6 文件上传成功触发的 ,把图片存放在数组pics中 有三个参数
    uploadDone (file) {
      //   console.log(response, file, fileList)
      // 存取路径在数组中
      //   console.log(file)
      //   将当前上传成功的文件信息存储到数组
      this.addform.pics.push({ pic: file.data.tmp_path })
    },
    // 3实现文件的删除
    handleRemove (file, fileList) {
      // file 删除的文件 ，fileLiSt剩下的文件
      console.log(file, fileList)
      // 1 删除之前先判断有没有文件
      if (!file.response) {
        return false
      }
      // 2 找到删除文件的路径，然后利用s6的新语法findIndex找到与存取图片的数组(Prc)是否有一致的路径，有则返回该数据在数组中的索引，然后利用splice来删除数数据
      // findIndex:可以查找指定数据的所在索引位置：它有一个回调函数，回调函数有一个参数，就是遍历数组时每次遍历到的成员，每次使用一个成员的数据进行函数的业务逻辑的计算，如果满足条件，则返回当前索引
      // 3 获取删除图片的路径
      var delImg = file.response.data.tmp_path
      // 4 遍历数组，找到与路径相同的数据
      var index = this.addform.pics.findIndex(value => {
        return value.pic === delImg
      })
      // 5 删除数据
      this.addform.pics.splice(index, 1)
    },
    // 2  实现文件放大预览
    handlePreview (file) {
      console.log(file)
      // 1 让都话框的显示，里面存放了图片
      this.previewdialogVisible = true
      // 2 获取图皮的路径 路径存放在response.data.tmp_path中，注意要加上服务器的路径拼接才是完整的图片路径，不加默认是相对于本地的的路径localhost8080/
      this.uploadImgSrc =
        'http://localhost:8888/' + file.response.data.tmp_path
    },
    // 设置请求头，携带token信息，因为上传图片也要携带token的信息
    gettoken () {
      var token = localStorage.getItem('mytoken')
      return { Authorization: token }
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  },
  mounted () {
    getAllcategories(3).then(res => {
      this.goodsList = res.data
    })
  }
}
</script>

<style scoped>
.amap-wrapper {
  width: 500px;
  height: 500px;}
</style>

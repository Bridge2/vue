<template>
  <div>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="seachValue" class="input-with-select" style="width:300px" @keyup.native.enter='searchUserList'>
        <el-button slot="append" icon="el-icon-search" @click='searchUserList'></el-button>
      </el-input>
      <el-button type="success" plain @click='$router.push({"path":"add"})'>添加用户</el-button>
    </div>
    <!-- 表格 -->
    <template>
      <el-table ref="goodsData" :data="goodsData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%" border="">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="450">
        </el-table-column>
        <el-table-column prop="goods_price" width="155" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" width="140" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button type="success" plain size="mini">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom-start">
              <!--                                          根据id删除，传进一个id        -->
              <el-button type="danger" plain size="mini">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页器 -->
    <div class="block" style="margin-top:15px">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1 :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { goodsList } from '@/api/index.js'
export default {
  data () {
    return {
      seachValue: '',
      total: 0,
      pagenum: 1,
      pagesize: 10,
      goodsData: []
    }
  },
  methods: {
    searchUserList () {
      this.initList()
    },
    // 分页器
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
    // 获取数据
    initList () {
      goodsList({
        query: this.seachValue,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        this.goodsData = res.data.goods
        this.total = res.data.total
      })
    }
  },
  mounted () {
    this.initList()
  }
}
</script>

<style scoped>
</style>

<template>
    <div class="login">
    <div class="container">
      <img src="../assets/00.jpg" alt="" class="avatar">

       <el-form :model="fromLogin" :rules="rules" ref="from"  class="demo-ruleForm">
       <el-form-item  prop="username">
       <el-input v-model="fromLogin.username" placeholder="用户名"></el-input>
       </el-form-item>

       <el-form-item  prop="password">
       <el-input v-model="fromLogin.password" placeholder="密码" type="password"></el-input>
       </el-form-item>

      <el-form-item>
                            <!-- 按下提交的时候获取表单 -->
    <el-button type="primary" @click="submitForm('from')" class="login-btn">立即创建</el-button>
     </el-form-item>
</el-form>
    </div>
    </div>
</template>
<script>
// 引入login校验 使用解构
import { login, getUserList } from '@/api/index.js'
export default {
  data () {
    return {
      fromLogin: {
        username: '',
        password: ''

      },
      rules: {
        // 校验谁，写谁的
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.$refs[formName].validate())
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // validate()参数为函数，如果验证通过返回true
          // 调用它返回的是一个promise对象。这个对象有成功则返回then(fn),fn为返回成功的函数
          login(this.fromLogin).then((res) => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              // 1 登录成功设置token和跳转到首页
              localStorage.setItem('mytoken', res.data.token)
              // 2 跳转页面
              this.$router.push({name: 'home'})
              // 发送请求 get 请求是对象的模式传值{params:{id:1}}
              getUserList({query: '', pagenum: 1, pagesize: 10}).then((res) => {
                console.log(res)
              })
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      // 重置
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

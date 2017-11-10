<template>
  <div class="login">
    <!-- 标题 -->
    <div class="login-title">
      {{ title }}
    </div>
    <!-- 登录表单 -->
    <div class="login-form">
      <!-- 表单图像 -->
      <div class="login-img">
        <img src="../../../../static/img/face.jpg" width="100%"/>
      </div>
      <div class="login-input">
        <!-- 表单input框 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <!-- username -->
          <el-form-item class="form-item" prop="username">
            <el-input type="text" v-model="ruleForm.username" size="large" placeholder="username"></el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item class="form-item" prop="password">
            <el-input type="text" v-model="ruleForm.password" size="large" placeholder="password"></el-input>
          </el-form-item>
          <div class="code">
            <!-- 输入验证码 -->
            <div class="code-input">
              <el-form-item prop="code">
                <el-input type="text" v-model="ruleForm.code" placeholder="code"></el-input>
              </el-form-item>
            </div>
            <!-- 验证码显示 -->
            <div class="code-img">
              <v-canvas ref="codeShow"></v-canvas>
            </div>
          </div> 
          <!-- 按钮 -->
          <div class="login-btn">
            <div class="login-btn-left">
              <el-button type="primary" @click="login('ruleForm')">LOGIN</el-button>
            </div>
            <div class="login-btn-right">
              <el-button type="primary" @click="register">REGISTER</el-button>
            </div>
            <div class="login-btn-clear"></div>
            <div class="login-btn-forget">
              <el-button type="text" @click="findPwd">Forget your password ? Please click...</el-button>
            </div>
          </div>   
        </el-form>  
      </div>
    </div>
    <!-- alert提示框 -->
    <v-alert v-show="currentState" ref="alertTitle"></v-alert>
  </div>
</template>
<script>
  import vCanvas from './canvas.vue' // 验证码组件
  import vAlert from './alert.vue' // alert框组件
  export default {
    name: 'login',
    data: function () {
      return {
        title: '后台登录系统', // 登录后台标题
        currentState: false, // 默认不显示alert弹框

        // 默认表单内容为空
        ruleForm: {
          username: '',
          password: '',
          code: ''
        },

        // 表单的验证规则，失去光标时验证
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    // 组件调用
    components: {
      vCanvas,
      vAlert
    },
    methods: {
      // 登录
      login (e) {
        // console.log(e)
        const self = this // 防止与this冲突
        self.$refs[e].validate((valid) => {
          // console.log(valid) // 可以看出valid返回的是boolean，只有验证规则通过返回true
          if (valid) {
            // 首先验证输入的验证码是否正确
            let yzm = localStorage.getItem('yzm') // 获取浏览器中缓存的当前页面的验证码
            // console.log(yzm)
            let code = self.ruleForm.code // 获取当前表单中输入的验证码的值
            // console.log(code)
            if (code !== yzm) {
              self.$refs.codeShow.clickChange() // 当验证码输入错误时，验证码自动刷新
              self.$refs.alertTitle.aTitle = '验证码错误提示'
              self.$refs.alertTitle.aError = 'error'
              self.$refs.alertTitle.aDescription = '验证码输入错误，请重新输入！'
              self.currentState = true
              // 设置定时器，3s后关闭alert组件
              setTimeout(function () {
                self.currentState = false
              }, 3000)
            } else {
              // 发送ajax请求，验证用户名和密码的正确性
              let url = '/login/check'
              self.$ajax({
                method: 'get',
                url: url,
                params: {
                  username: self.ruleForm.username,
                  password: self.ruleForm.password
                }
              })
              .then(function (response) {
                // console.log(response.data)
                let status = response.data.status // status为0表示用户名或密码错误，为1表示用户名和密码都正确
                if (status === 1) {
                  localStorage.setItem('username', self.ruleForm.username) // 将username缓存到浏览器session中
                  self.$router.push('/readme')
                } else {
                  self.$refs.alertTitle.aTitle = '错误提示'
                  self.$refs.alertTitle.aError = 'error'
                  self.$refs.alertTitle.aDescription = '用户名或密码错误'
                  self.currentState = true

                  // 设置定时器，3s后关闭alert组件
                  setTimeout(function () {
                    self.currentState = false
                  }, 3000)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
              // localStorage.setItem('username', this.ruleForm.username)
              // this.$router.push('/readme')
            }
          } else {
            // 对alert组件进行属性设置
            this.$refs.alertTitle.aTitle = '警告提示'
            this.$refs.alertTitle.aError = 'info'
            this.$refs.alertTitle.aDescription = '必填项不能为空'
            this.currentState = true
            const _this = this // 重新定义this，因为每个方法中的this指代的是不一样的

            // 制作定时器，3s后关闭alert
            setTimeout(function () {
              // console.log(_this.currentState)
              _this.currentState = false
            }, 3000)
          }
        })
      },
      // 注册
      register () {
        this.$router.push('/register')
      },
      // 找回密码
      findPwd () {
        this.$router.push('/findpwd')
      }
    },

    // 数据自动调用，组件间数据的响应
    mounted () {
      // 父组件调用子组件中的方法
      this.$refs.codeShow.clickChange()
    }
  }
</script>
<style>
    .login{
      position: absolute;
      /*border: 1px solid red;*/
      width: 100%;
      height: 100%;
      background: url('../../../../static/img/bg1.jpg') no-repeat fixed top;
    }
    .login-title{
      /*border: 1px solid red;*/
      position: absolute;
      width: 100%;
      top: 15%;
      text-align: center;
      font-family: NSimSun;
      font-size: 30px;
      font-weight: bold;
      color: #a4b6ec;
      text-shadow: 5px 5px 5px #88e1f4;
    }
    .login-form{
      /*border: 1px solid green;*/
      background: #f2fdfd;
      /*filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;*/
      position: absolute;
      top: 22%;
      left: 35%;
      width: 30%;
      height: 60%;
      border-radius: 5%;
    }
    .login-img{
      /*border: 1px solid blue;*/
      margin: 0 auto;
      margin-top: 3%;
      border-radius: 50%;
      width: 25%;
      height: 33%;
      overflow: hidden;
    }
    .login-input{
      /*border: 1px solid red;*/
      margin-top: 10px;
      padding: 0 10%;
    }
    .code{
      /*border: 1px solid red;*/
      width: 100%;
      height: 38px;
    }
    .code-input{
      float: left;
      width: 59%;
      height: 100%;
    }
    .code-img{
      /* border: 1px solid blue; */
      float: right;
      width: 40%;
      height: 100%;
    }
    .login-btn{
      /*border: 1px solid blue;*/
      margin-top: 8%;
      /*display: inline-block;*/
    }
    .login-btn-left{
      float: left;
      margin-right: 2%;
    }
    .login-btn-right{
      float: right;
    }
    .login-btn-clear{
      clear: both;
    }
    .login-btn-forget{
      /* border: 1px solid red; */
      float: right;
      /* margin-top: 10px; */
      margin-right: 30px;
    }
</style>
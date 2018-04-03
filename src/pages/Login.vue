<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo paddingB40"><img src="../common/images/logo-text.png" alt=""></div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
          <el-form-item label="" prop="username" required>
            <el-input v-model="loginForm.username" placeholder="请输入用户名" @keyup.enter.native="submit"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="submit"></el-input>
          </el-form-item>
        </el-form>
        <!--  <el-input v-model="userName" placeholder="请输入用户名" @keyup.enter="submit"></el-input>
            <el-input v-model="password" placeholder="请输入密码" @keyup.enter="submit" class="marginT10"></el-input> -->
      </div>
      <div class="input-text-wrapper marginT30 text-center">
        <el-button type="primary" @click="submit" class="loginBtn">登录</el-button>
      </div>
      <!-- <div class="note marginT30">
        <p>最高权限:admin </p>
        <p> 密码：123</p>
      </div> -->
    </div>
  </div>
</template>

<script>
//  初始化一些数据
export default {
  data() {
    return {
      loginUrl:'/pmpheep/pmph/login',
      from:null,
      loginForm: {
        username: '',
        password: '',
        token:'',
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit() {
      var _this=this;
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.doLogin()
        } else {
          //验证未通过
          console.log('error submit!!');
          return false;
        }
      })
    },
    doLogin(){
      var _this=this;
      //验证成功
      this.$axios.get(this.loginUrl, {
        params:this.loginForm
      }).then(function(res) {
        if(res&&res.data.code==1){
          _this.$mySessionStorage.set('currentUser',res.data.data,'json');
          _this.$message.success('登录成功');
          //将session放到cookie里

          _this.$commonFun.Cookie.set('sessionId',res.data.data.userSessionId,2);
          _this.$commonFun.Cookie.set('token',res.data.data.sessionPmphUserToken,2);
          _this.$router.push(_this.from?{path:_this.from}:{name:'个人中心'});
        }else{
          _this.$message.error('账号/密码错误');
        }
      }).catch(function(err) {
        console.log(err)
        _this.$message.error('登录失败');
      })
    },
  },
  created(){
    let username = this.$route.query.username||'';
    let password = this.$route.query.password||'';
    let token = this.$route.query.token||'';
    this.loginForm.username=username;
    this.loginForm.password=password;
    this.loginForm.token=token;
    if(this.loginForm.username&&this.loginForm.password&&this.loginForm.token){
      this.doLogin();
    }
  },
  mounted() {
    if(this.$route.query.f){
      this.from = this.$route.query.f;
    }

    if(window._hmt){
      _hmt.push(['_trackPageview', '/login']);
    }
  }
}
</script>

<style scoped>
.note {
  color: #c8c8c8;
  font-size: 12px;
}


/*必填项 * 图标*/

.note>p:after {
  content: ' *';
  color: red;
  font-size: 120%;
}

.login_page {
  width: 100%;
  height: 100%;
}

.login-page-inner {
  height: 306px;
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  padding: 20px;
  margin-top: -180px;
  z-index: 10;
}

.login-logo {
  text-align: center;
}

#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.loginBtn {
  width: 100%;
}
</style>

<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo paddingB40"><img src="../common/images/logo-text.png" alt=""></div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
          <el-form-item label="" prop="userName" required>
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" @keyup.enter.native="submit"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="submit"></el-input>
          </el-form-item>
        </el-form>
        <!--  <el-input v-model="userName" placeholder="请输入用户名" @keyup.enter="submit"></el-input>
            <el-input v-model="password" placeholder="请输入密码" @keyup.enter="submit" class="marginT10"></el-input> -->
      </div>
      <div class="input-text-wrapper marginT30 text-center">
        <el-button type="primary" @click="submit" class="loginBtn">登录</el-button>
      </div>
      <div class="note marginT30">
        <p>最高权限:root</p>
        <p>主任:admin1</p>
        <p>项目编辑:admin2</p>
        <p>策划编辑:admin3</p>
        <p>密码任意</p>
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
//  初始化一些数据
import { mapActions } from 'vuex'
import { CanvasBackground } from 'common/js/canvas_bg.js'
export default {
  data() {
    return {
      loginUrl:'',
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
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
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          //验证成功
          this.$store.dispatch('doLogin',{username:this.loginForm.userName});
          this.$axios.get('../../static/', {

          }).then(function(res) {

          }).catch(function(err) {

          })
        } else {
          //验证未通过
          console.log('error submit!!');
          return false;
        }
      })


      /* if(this.loginForm.userName){
        this.$store.dispatch('doLogin',{username:this.userName});
      }else{
        window.alert('请输入用户名');
      } */
    }
  },
  mounted() {
    var bg = new CanvasBackground({
      canvasContainerID: "canvas",
      circleColor: "rgba(49,210,142,0.8)",
      lineColor: "rgba(49,210,142,1)",
      canvasOpacity: 0.2
    });
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
  height: 420px;
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  padding: 20px;
  margin-top: -300px;
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

<template>
	<div class="login_page">
      <div class="login-page-inner">
        <div class="input-text-wrapper">
          <span class="justify-align">用户名：</span>
          <el-input v-model="userName" placeholder="请输入用户名" @keyup.enter="submit"></el-input>
        </div>
        <div class="input-text-wrapper marginT30">
          <el-button type="primary" @click="submit">登录</el-button>
        </div>
        <div class="note marginT30">
          <p>最高权限:root</p>
          <p>主任:admin1</p>
          <p>项目编辑:admin2</p>
          <p>策划编辑:admin3</p>
          <p>密码任意</p>
        </div>
      </div>
	</div>
</template>

<script>
//  初始化一些数据
import {mapActions } from 'vuex'
	export default {
		data() {
			return {
        userName:'',
      }
		},
    methods:{
      submit(){
        if(this.userName){
          this.$store.dispatch('doLogin',{username:this.userName});
        }else{
          window.alert('请输入用户名');
        }
      }
    }
	}
</script>

<style scoped>
  .note{
    color: #c8c8c8;
    font-size: 12px;
  }
  /*必填项 * 图标*/
  .note>p:after{
    content: ' *';
    color: red;
    font-size: 120%;
  }
  .login-page-inner{
    max-width: 680px;
    margin: 100px auto 0;
  }
</style>

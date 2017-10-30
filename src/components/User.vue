<template>
  <el-dropdown>
      <span class="el-dropdown-link">
          <span class="user-image"><img :src="headImage" alt=""></span>
          <span>{{userData.realname}}</span>
      </span>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <el-dropdown-item>
        <el-button type="text" @click="$router.push({name:'个人信息',query:{type:'setting'}})">
          个人资料
          <i class="fa fa-id-card-o fa-fw"></i>
        </el-button>
      </el-dropdown-item>
      <el-dropdown-item>
        <el-button type="text" @click="$router.push({name:'个人信息',query:{type:'password'}})">
          修改密码
          <i class="fa fa-key fa-fw"></i>
        </el-button>
      </el-dropdown-item>
      <el-dropdown-item>
        <el-button type="text" @click="logout">
          退出
          <i class="fa fa-sign-out fa-lg"></i>
        </el-button>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
	export default {
    props:{
	    userData: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
		data() {
			return {}
		},
    computed:{
      headImage(){
        return this.$config.BASE_URL+'image/'+this.userData.avatar;
      },
    },
    methods:{
      logout(){
        this.$axios.get('/pmph/logout',{params:{
          sessionId:this.$getUserData().sessionId,
          loginType:parseInt(this.$getUserData().userInfo.loginType)
        }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              this.$message.success('退出成功');
              this.$router.push({name: '登录'});
            }else{
              this.$message.error('退出登录失败，请重试');
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('退出登录失败，请重试');
          })
      },
    },
	}
</script>

<style scoped>
.user-dropdown{
  font-size: 13px;
}
.user-dropdown a i{
  float: right;
  line-height: 36px;
}
.user-image{
  display: inline-block;
  width: 30px;
  height:30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 8px;
  overflow: hidden;
  cursor: pointer;
}
.user-image>img{
  display: block;
  width: 100%;
}
</style>

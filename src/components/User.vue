<template>
  <el-dropdown>
      <span class="el-dropdown-link">
          <span class="user-image"><img :src="headImage" alt=""></span>
          <span>{{userData.realname}}</span>
      </span>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <el-dropdown-item>
        <a>
          个人资料
          <i class="fa fa-id-card-o fa-fw"></i>
        </a>
      </el-dropdown-item>
      <el-dropdown-item>
        <a>
          修改密码
          <i class="fa fa-key fa-fw"></i>
        </a>
      </el-dropdown-item>
      <el-dropdown-item>
        <a>
          退出
          <i class="fa fa-sign-out fa-lg"></i>
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import {BASE_URL} from 'common/config.js';
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
        return BASE_URL+'image/'+this.userData.avatar;
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

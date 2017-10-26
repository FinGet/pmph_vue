<template>
	<div class="personalSetting clearfix">
    <div class="personal-info">
      <div>
        <p class="personalSetting-title">个人信息</p>
        <div class="user-image">
          <img src="http://120.76.221.250/pmpheep/image/59ed934d2d8524d12871e0dd" alt="">
        </div>
        <div class="user-info">
          <p><span>账号：</span><span>zhangqiang</span></p>
          <p><span>姓名：</span><span>张强</span></p>
          <p><span>性别：</span><span>男</span></p>
          <p><span>手机号：</span><span>18200391234</span></p>
          <p><span>邮箱：</span><span>123456789@qq.com</span></p>
          <p><span>地址：</span><span>北京市海淀区中关村大街110310号</span></p>
        </div>
      </div>
    </div>
    <div class="personal-setting">
      <div>
        <p class="personalSetting-title">编辑信息</p>
        <div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="修改个人信息" name="setting">
              <div class="setting-iterm">
                <el-form :model="formSetting"  ref="formSetting" label-width="80px">
                  <el-form-item label="头像:">
                    <div class="headImageWrapper">
                      <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start">
                        <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
                      </el-tooltip>
                      <!--上传文件按钮-->
                      <input type="file" @change="filechange" ref="fileInput" class="fileInput" />
                      <div ref="headImageWrapper" v-show="!userHeadImage.fileName">
                        <img src="http://120.76.221.250/pmpheep/image/59ed934d2d8524d12871e0dd" class="avatar">
                      </div>
                      <div v-show="userHeadImage.fileName">
                        <img :src="userHeadImage.imageUrl" class="avatar">
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="姓名:">
                    <el-input v-model="formSetting.realname"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <el-input v-model="formSetting.realname"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱:">
                    <el-input v-model="formSetting.realname"></el-input>
                  </el-form-item>
                  <el-form-item label="地址:">
                    <el-input v-model="formSetting.realname"></el-input>
                  </el-form-item>
                </el-form>
                <div class="text-right paddingT30">
                  <el-button type="primary">确认修改</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password">
              <div class="setting-iterm">
                <el-form :model="formPassword" ref="formPassword" label-width="140px">
                  <el-form-item label="旧密码">
                    <el-input v-model="formPassword.oldPass"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码">
                    <el-input v-model="formPassword.oldPass"></el-input>
                  </el-form-item>
                  <el-form-item label="再次输入新密码">
                    <el-input v-model="formPassword.oldPass"></el-input>
                  </el-form-item>
                </el-form>
                <div class="text-right paddingT30">
                  <el-button type="primary">确认修改</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        activeName:'setting',
        formSetting:{
          username:'',
          realname:''
        },
        formPassword:{
          oldPass:'',
          newPass:'',
          reEnterNewpass:''
        },
        userHeadImage:{
          fileName:'',
          imageUrl:''
        },
      }
		},
    methods:{
      filechange(){

      },
    },
    created(){
      this.activeName=this.$route.query.type||'setting';
    },
	}
</script>

<style scoped>
.personalSetting{
}
.personal-info{
  width: 400px;
  float: left;
}
.personal-info>div{
  width: 360px;
  padding: 10px 20px 30px;
  border-top: 4px solid #e7eaec;
  margin: 0 auto;
}
.personal-setting{
  margin-left: 460px;
}
.personal-setting>div{
  padding-top: 10px;
  border-top: 4px solid #e7eaec;
}
.personalSetting .user-image{
  width: 80px;
  height: 80px;
  margin-left: 6px;
  border-radius: 50%;
  overflow: hidden;
}
.personalSetting .user-image>img{
  display:block;
  width: 100%;
  height:100%;
}
  .user-info>p{
    padding: 10px;
  }
.user-info>p>span:first-child{
  display: inline-block;
  width: 60px;
}
  .personalSetting-title{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 30px;
  }
  .setting-iterm{
    max-width: 500px;
    padding-top: 60px;
  }

  /*设置中用户头像区域*/
.headImageWrapper{
  width: 100px;
  height: 100px;
  position: relative;
}
.headImageWrapper-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.7);
  opacity: 0;
}
.headImageWrapper-bg>i{opacity: 1;}
.headImageWrapper:hover .headImageWrapper-bg{
  opacity: 0.75;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.fileInput{
  display: block;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index:10;
}
.headImageWrapper>div>img{
  display: block;
  width: 100%;
  height: 100%;
}
.headImageWrapper>div{
  width: 100%;
  height:100%;
}
</style>

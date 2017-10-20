<template>
	<div class="groupsetting">
    <div class="addNewPopup paddingB30">
      <el-row class="marginB30">
        <el-col :span="6">
          <p class="lineHeight-100">小组头像：</p>
        </el-col>
        <el-col :span="18">
          <div class="headImageWrapper">
            <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start">
              <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
            </el-tooltip>
            <!--上传文件按钮-->
            <input type="file" @change="filechange" ref="fileInput" class="fileInput" />
            <div ref="headImageWrapper" v-show="groupData.filename">
              <img :src="DEFAULT_USER_IMAGE" class="avatar">
            </div>
            <div v-show="!groupData.filename">
              <img :src="groupData.groupImage" class="avatar">
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>小组名称：</p>
        </el-col>
        <el-col :span="18">
          <el-input v-model="groupData.groupName" placeholder="请输入小组名称"></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="cutLine-dashed clearfix"></div>
    <div class="paddingT10 text-right">
      <el-popover
        ref="popover"
        placement="top"
        width="160"
        v-model="visible">
        <p>确认解散小组吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteGroup">确定</el-button>
        </div>
      </el-popover>
      <el-button  type="danger" v-popover:popover>解散小组</el-button>
      <el-button class="marginL10" type="primary"  @click="updateGroup">确认修改</el-button>
    </div>
	</div>
</template>

<script>
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
  import bus from 'common/eventBus/bus.js'
	export default {
    props:['currentGroup'],
    data() {
      return {
        visible:false,
        visible1:false,
        DEFAULT_USER_IMAGE:DEFAULT_USER_IMAGE,
        groupData:{
          filename:undefined,
          groupName:null,
          groupImage:null,
        },
      };
    },
    computed:{
      currentGroupId(){
        return this.currentGroup.id;
      },
    },
    methods: {
      /**
       * 上传头像input发生改变时触发
       * @param e input内置事件对象
       */
      filechange(e){
        var self=this;
        var prevDiv = this.$refs.headImageWrapper;
        var file = this.$refs.fileInput;
        if (file.files && file.files[0]) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            self.groupData.filename=evt.target.result;
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" class="avatar" style="display:block;width: 100%;height: 100%;" />';
          }
          reader.readAsDataURL(file.files[0]);
        } else {
          if(!file.value){
            self.groupData.filename=undefined;
          }
          prevDiv.innerHTML = '<div class="avatar" style="display:block;width: 100%;height: 100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        }
      },
      /**
       * 修改小组
       */
      updateGroup(){
        //小组名称不能为空
        if(!this.groupData.groupName){
          this.$message.error('请输入小组名称');
          return false;
        }
        let self= this;
        var filedata = this.groupData.filename?this.$refs.fileInput.files[0]:'';
        var formdata = new FormData();
        formdata.append('file',filedata);
        formdata.append('id',this.currentGroup.id);
        formdata.append('groupName',this.groupData.groupName);
        formdata.append('sessionId',this.getUserData().sessionId);

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('/group/update/pmphgroup',formdata,config)
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              self.$message.success('修改小组成功');
              //修改成功通过vue bus派发一个事件
              bus.$emit('group:info-change')
            }else{
              self.$message.error('修改小组失败，请重试');
            }
          })
          .catch((error) => {
            self.$message.error('修改小组失败，请重试');
          });
      },
      /**
       * 解散小组
       */
      deleteGroup(){
        this.$axios.delete('/group/delete/pmphgroup',{params:{
          id:this.currentGroup.id,
          sessionId:this.getUserData().sessionId
        }})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              self.$message.success('删除小组成功');
              //修改成功通过vue bus派发一个事件
              bus.$emit('group:info-change')
            }
          })
          .catch((error) => {
            self.$message.error('删除小组失败，请重试');
          });
      }
    },
    mounted(){
      this.groupData.groupName=this.currentGroup.groupName;
      this.groupData.groupImage=this.currentGroup.groupImage;
    },
    watch:{
      currentGroupId(){
        this.groupData.groupName=this.currentGroup.groupName;
        this.groupData.groupImage=this.currentGroup.groupImage;
      }
    },
	}
</script>

<style scoped>
  .groupsetting{
    padding: 60px 30px 0;
  }
  .lineHeight-100{line-height: 100px;}
  .addNewPopup{
    max-width: 470px;
    line-height: 36px;
  }
  .addNewPopup .headImageWrapper{
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

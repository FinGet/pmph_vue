<template>
	<div class="groupsetting">
    <div class="addNewPopup paddingB30">
      <el-form label-width="120px" :model="groupData" :rules="rules" ref="ruleForm">
        <el-form-item label="小组头像：">
          <div class="headImageWrapper">
            <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start"
                        v-if="!isIe9">
              <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
            </el-tooltip>
            <!--上传文件按钮-->
            <!--<input type="file" @change="filechange" ref="fileInput" class="fileInput" />-->
            <my-upload
              class="fileInput"
              ref="upload"
              :action="groupImgFile"
              :before-upload="beforeUpload"
              :on-success="upLoadFileSuccess"
              :on-error="uploadError"
              :show-file-list="false">
              <el-button class="fileInput">上传</el-button>
            </my-upload>
            <div ref="headImageWrapper" v-show="groupData.filename">
              <img :src="groupData.imgUrl" class="avatar">
            </div>
            <div v-show="!groupData.filename">
              <img :src="groupData.groupImage" class="avatar">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="小组名称：" prop="groupName">
          <el-input v-model="groupData.groupName" @keyup.enter.native="updateGroup" placeholder="请输入小组名称"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="cutLine-dashed clearfix"></div>
    <div class="paddingT10 text-right">
      <el-button  type="danger" @click="deleteGroup">解散小组</el-button>
      <el-button class="marginL10" type="primary"  @click="updateGroup">确认修改</el-button>
    </div>
	</div>
</template>

<script>
  import bus from 'common/eventBus/bus.js'
	export default {
    props:['currentGroup'],
    data() {
      return {
        groupImgFile:'/pmpheep/group/files',
        visible:false,
        visible1:false,
        DEFAULT_USER_IMAGE:this.$config.DEFAULT_USER_IMAGE,
        groupData:{
          filename:undefined,
          groupName:null,
          groupImage:null,
          imgUrl:undefined,
          currentFile:undefined
        },
        rules:{
          groupName:[
            { required: true, message: '请输入小组名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
      };
    },
    computed:{
      currentGroupId(){
        return this.currentGroup.id;
      },
      groupPostData(){
        let obj = {};
        obj.id = this.currentGroupId;
        obj.groupName = this.groupData.groupName;
        obj.sessionId = this.$getUserData().sessionId;
        return obj
      },

      isIe9(){
        return this.$commonFun.Browser.ie==9
      }
    },
    methods: {
      /**
       * 上传头像input发生改变时触发
       * @param e input内置事件对象
       */
      beforeUpload(file){
        let self=this;
        let prevDiv = this.$refs.headImageWrapper;
        let ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        if(!ext){return false;}
        // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
          this.$confirm("图片的格式必须为png或者jpg或者jpeg或者gif格式！", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });

          self.groupData.filename=undefined;
          return false;
        }
        //文件名不超过40个字符
        if(file.name.length>50){
          this.$confirm("文件名称不能超过50个字符", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          return false;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size==0){
          this.$confirm("文件大小不能为0kb", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          self.groupData.filename=undefined;
          return false;
        }
        if (ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif') {
          this.$confirm('请勿上传可执行文件!', "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          return false;
        }
        // 判断文件大小是否符合 文件不大于10M
        if(file.size/1024/1024 > 10){
          this.$confirm("图片大小不能大于10M", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          self.groupData.filename=undefined;
          return false;
        }

        return true;
      },
      /**
       * 修改小组
       */
      updateGroup(){
        this.$confirm("确定修改该小组信息?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            //小组名称不能为空
            if(!this.groupData.groupName||this.groupData.groupName.length>20){
              this.$confirm('请输入正确的小组名称', "提示",{
              	confirmButtonText: "确定",
              	cancelButtonText: "取消",
              	showCancelButton: false,
              	type: "error"
              });
              return false;
            }
            let self= this;
            this.$axios.put('/pmpheep/group/update/pmphGroupDetail',this.$commonFun.initPostData({
              file:this.groupData.imgUrl?this.groupData.imgUrl.replace('/pmpheep/',''):'',
              id:this.currentGroup.id,
              groupName:this.groupData.groupName,
              sessionId:this.$getUserData().sessionId
            }))
              .then((response) => {
                let res = response.data;
                if (res.code == '1') {
                  self.$message.success('修改小组成功');
                  //修改成功通过vue bus派发一个事件
                  bus.$emit('group:info-change')
                }else{
                  self.$confirm(res.msg.msgTrim(), "提示",{
                  	confirmButtonText: "确定",
                  	cancelButtonText: "取消",
                  	showCancelButton: false,
                  	type: "error"
                  });
                }
              })
              .catch((error) => {
                self.$confirm('修改小组失败，请重试', "提示",{
                	confirmButtonText: "确定",
                	cancelButtonText: "取消",
                	showCancelButton: false,
                	type: "error"
                });
              });

          })
          .catch(e=>{})

      },
      /**
       * 创建小组请求成功的回调
       */
      upLoadFileSuccess(response, file, fileList){
        if (response.code == '1') {
          this.groupData.filename=file.name;
          this.groupData.imgUrl='/pmpheep/'+response.data;
          this.groupData.currentFile=file.file;
        }else{
          this.$confirm(response.msg.msgTrim(), "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
        }
      },
      /**
       * 创建小组请求失败的回调
       */
      uploadError(err, file, fileList){
        this.groupData.filename=undefined;
        this.$confirm('修改小组失败，请重试', "提示",{
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	showCancelButton: false,
        	type: "error"
        });
      },
      /**
       * 解散小组
       */
      deleteGroup(){
        this.$confirm("确定解散该小组?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/pmpheep/group/delete/group',{params:{
              id:this.currentGroup.id,
              sessionId:this.$getUserData().sessionId
            }})
              .then((response) => {
                let res = response.data;
                if (res.code == '1') {
                  this.$message.success('删除小组成功');
                  //修改成功通过vue bus派发一个事件
                  bus.$emit('group:info-change')
                }else{
                  this.$confirm(res.msg.msgTrim(), "提示",{
                  	confirmButtonText: "确定",
                  	cancelButtonText: "取消",
                  	showCancelButton: false,
                  	type: "error"
                  });
                }
              })
              .catch((error) => {
                this.$confirm('删除小组失败，请重试', "提示",{
                	confirmButtonText: "确定",
                	cancelButtonText: "取消",
                	showCancelButton: false,
                	type: "error"
                });
              });
          })
          .catch(e=>{})

      }
    },
    mounted(){
      this.groupData.groupName=this.currentGroup.groupName;
      this.groupData.groupImage=this.currentGroup.groupImage;

      if(window._hmt){
        _hmt.push(['_trackPageview', '/group/group-setting']);
      }
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
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
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

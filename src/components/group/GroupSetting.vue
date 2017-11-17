<template>
	<div class="groupsetting">
    <div class="addNewPopup paddingB30">
      <el-form label-width="120px" :model="groupData" :rules="rules" ref="ruleForm">
        <el-form-item label="小组头像：">
          <div class="headImageWrapper">
            <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start">
              <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
            </el-tooltip>
            <!--上传文件按钮-->
            <!--<input type="file" @change="filechange" ref="fileInput" class="fileInput" />-->
            <el-upload
              class="fileInput"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="filechange"
              :show-file-list="false"
              :auto-upload="false">
              <el-button class="fileInput">上传</el-button>
            </el-upload>
            <div ref="headImageWrapper" v-show="groupData.filename">
              <img :src="DEFAULT_USER_IMAGE" class="avatar">
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
        visible:false,
        visible1:false,
        DEFAULT_USER_IMAGE:this.$config.DEFAULT_USER_IMAGE,
        groupData:{
          filename:undefined,
          groupName:null,
          groupImage:null,
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
    },
    methods: {
      /**
       * 上传头像input发生改变时触发
       * @param e input内置事件对象
       */
      filechange(file){
        var self=this;
        let prevDiv = this.$refs.headImageWrapper;
        let ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();

        if(!ext){return;}
        // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
          this.$message.error("图片的格式必须为png或者jpg或者jpeg格式！");
          self.groupData.filename=undefined;
          return;
        }
        //文件名不超过40个字符
        if(file.name.length>40){
          this.$message.error("文件名不能超过40个字符");
          return;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size==0){
          this.$message.error("图片大小不能小于1bt");
          self.groupData.filename=undefined;
          return;
        }
        // 判断文件大小是否符合 文件不大于10M
        if(file.size/1024/1024 > 10){
          this.$message.error("图片大小不能大于10M");
          self.groupData.filename=undefined;
          return;
        }

        var reader = new FileReader();
        reader.onload = function(evt) {
          self.groupData.filename=file.raw;
          prevDiv.innerHTML = '<img src="' + evt.target.result + '" class="avatar" style="display:block;width: 100%;height: 100%;" />';
        }
        reader.readAsDataURL(file.raw);
      },
      /**
       * 修改小组
       */
      updateGroup(){
        //小组名称不能为空
        if(!this.groupData.groupName||this.groupData.groupName.length>20){
          this.$message.error('请输入正确的小组名称');
          return false;
        }
        let self= this;
        var filedata = this.groupData.filename?this.groupData.filename:'';
        var formdata = new FormData();
        formdata.append('file',filedata);
        formdata.append('id',this.currentGroup.id);
        formdata.append('groupName',this.groupData.groupName);
        formdata.append('sessionId',this.$getUserData().sessionId);

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('/pmpheep/group/update/pmphgroupdetail',formdata,config)
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
        this.$confirm("确定解散该小组?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/pmpheep/group/delete/pmphgroup',{params:{
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
                  this.$message.error(res.msg);
                }
              })
              .catch((error) => {
                this.$message.error('删除小组失败，请重试');
              });
          })
          .catch(e=>{})

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

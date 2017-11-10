<template>
  <div class="message-edit">

    <div class="nextStep-wrapper text-right">
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button type="primary" @click="nextStep()" v-if="currentMessageType!='edit'">下一步</el-button>
      <el-button type="primary" @click="editSave()" v-if="currentMessageType=='edit'">保存</el-button>
    </div>
    <!--输入标题-->
    <el-form :model="messageForm" ref="messageForm" :rules="messageRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
           <el-input v-model="messageForm.title" placeholder="请输入文章标题" class="message-title-input"></el-input>
      </el-form-item>
      <el-form-item label="发送对象：" prop="sendType" v-if="currentMessageType!='edit'">
           <el-radio-group v-model="messageForm.sendType">
            <el-radio :label="1">学校管理员</el-radio>
            <el-radio :label="2">所有人</el-radio>
            <el-radio :label="3">特定对象</el-radio>
            <el-radio :label="4">教材报名者</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="消息内容：" >
        <div class="clearfix">
          <Editor ref="editor" :config="editorConfig"></Editor>
        </div>
      </el-form-item>
      <!--分割线-->
      <el-form-item>
          <el-row>
        <div class="cutLine-dashed" style="width:100%;margin-left:0;"></div>
    </el-row>
      </el-form-item>
    <el-form-item label="附件：" prop="fileList">
        <div class="col-content file-upload-wrapper" style="padding-left:0;" >
          <el-upload
            class="upload-demo"
            :action="fileUploadUrl"
            :on-success="upLoadFileSuccess"
            :on-remove="uploadFileRemove"
            :before-upload="beforeUpload"
            :file-list="uploadFileList">
                  <span>
              <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip" style="line-height:1;">文件大小不超过100M</div>
          </el-upload>
        </div>
    </el-form-item>
    </el-form>


    <!--预览弹窗-->
    <el-dialog
      :visible.sync="previewShow"
      size="large">
      <div class="message-preview paddingR20 paddingL20">
        <h5 class="previewTitle text-center">{{previewData.title}}</h5>
        <div class="previewContent paddingB20" v-html="previewData.content"></div>
        <!--附件-->
        <el-row v-if="previewData.fileList.length">
          <el-col :span="2" class="fontSize-16">
            附件 ：
          </el-col>
          <el-col :span="22">
            <div class="previewFile" title="预览界面不提供下载附件功能">
              <span v-for="(iterm,index) in previewData.fileList" :key="index">{{iterm.name}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from 'components/Editor.vue'
export default {
  data: function() {
    return {
      fileUploadUrl:this.$config.BASE_URL+'messages/message/file',
      currentMessageType:'add',
      currentMessageId:undefined,
      messageForm:{
        title:'',
        content:'',
        sendType:1,
        originalFileList:[],
        filePathList:[],
        removeFile:[],
      },
      messageRules:{
       title:[
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {max:50, message: '长度不能超过50个字符', trigger: 'blur'}
       ],
       content:[
          { required: true, message: '请输入消息内容', trigger: 'blur' },
       ],
       sendType:[
          {type: 'number', required: true, message: '请选择发送对象', trigger: 'change' },
       ],
       fileList:[
        /*  { type: 'array', required: true, message: '请至少上传一个附件', trigger: 'change' } */
       ]

      },
      previewShow: false,
      editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
      },
      uploadFileList:[],
    }
  },
  computed:{
    previewData(){
      var data = {};
      data.title = this.messageForm.title;
      data.content = this.messageForm.content;
      data.fileList = [];
      this.messageForm.originalFileList.forEach(iterm=>{
        data.fileList.push(iterm);
      });
      this.messageForm.filePathList.forEach(iterm=>{
        data.fileList.push(iterm);
      });

      return data;
    },
  },
  methods: {
    /**
     * 添加上传文件
     */
    upLoadFileSuccess(response, file, fileList){
      this.saveFilesToMessageForm(fileList);
    },
    /**
     * 上传之前检验
     */
    beforeUpload(file){
      // console.log(file)
      const isLt0M = file.size / 1024 / 1024 > 0;
      const nameLen = file.name.length <= 80;
      if (!isLt0M) {
        this.$message.error('上传文件大小不能小于 0kb!');
      }
      if (!nameLen) {
        this.$message.error('上传文件名字长度不能超过80个字符!');
      }
      return isLt0M&&nameLen
    },
    /**
     * 移除已添加文件
     */
    uploadFileRemove(file, fileList){
      this.saveFilesToMessageForm(fileList);
      if(!file.response){
        this.messageForm.removeFile.push(file.fileId);
      }
    },
    saveFilesToMessageForm(fileList){
      fileList = fileList||[];
      //将文件列表信息存入messageForm里
      var tempNewFileList = [];
      var tempOldFileList = [];
      fileList.forEach(iterm=>{
        var temp
        if(iterm.response){
          if(iterm.response.code==1){
            temp = iterm;
            temp.path = iterm.response.data;
            tempNewFileList.push(temp);
          }
        }else{
          tempOldFileList.push(iterm)
        }
      });
      this.messageForm.originalFileList = tempOldFileList;
      this.messageForm.filePathList = tempNewFileList;
    },
    preview() {
      this.messageForm.content = this.$refs.editor.getContent();
      this.previewShow = true;
    },
    /**
     * 点击下一步
     */
    nextStep(){
      this.$refs['messageForm'].validate((valid) => {
          if (valid) {
            this.messageForm.content = this.$refs.editor.getContent();
            console.log(this.$refs.editor.getContent())
             switch(this.messageForm.sendType){
                case 1:
                  this.$router.push({name:'选择学校',query:{type:'new'},params:this.messageForm});
                  break;
                case 2:
                  this.$router.push({name:'选择学校',query:{type:'new'},params:this.messageForm});
                  break;
                case 3:
                  this.$router.push({name:'特定对象',query:{type:'new'},params:this.messageForm});
                  break;
                case 4:
                  this.$router.push({name:'教材报名者',query:{type:'new'},params:this.messageForm});
                  break;
                dafault:
                  this.$message({
                    type: 'error',
                    message: '请选择发送对象'
                  });
              }
          } else {

            return false;
          }
        });
    },
    /**
     * 编辑消息时请求当前消息的数据
     */
    getCurrentMessageData(){
      if(!this.$route.query.id){
        return;
      }
      this.$axios.get('/messages/message/content',{params:{
        userMsgId:this.$route.query.id
      }})
        .then(response=>{
          let res = response.data;
          //初始化title
          this.messageForm.title=res.data.title;
          //初始化message 数据，将内容填充到相应位置
          this.$refs.editor.setContent(res.data.content);
          //将已上传文件push到上传组件文件列表中
          res.data.MessageAttachment.forEach(iterm=>{
            iterm.fileId = iterm.attachment.split('/file/download/')[1];
            iterm.attachment = this.$config.BASE_URL + iterm.attachment.substring(1);
            iterm.name = iterm.attachmentName;
          });
          this.messageForm.originalFileList = res.data.MessageAttachment;
          this.uploadFileList = res.data.MessageAttachment;
        })
        .catch(e=>{
          console.log(e);
          this.$message.error('获取当前系统消息失败！');
        })
    },
    /**
     * 点击修改进入编辑消息后保存
     */
    editSave(){
      console.log(this.messageForm);
      let filePath = [];
      this.messageForm.filePathList.forEach(iterm=>{
        filePath.push(iterm.path);
      });
      this.messageForm.content = this.$refs.editor.getContent();
      this.$axios.put('/messages/update/message',this.$commonFun.initPostData({
        msgId:this.currentMessageId,
        msgTitle:this.messageForm.title,
        content:this.messageForm.content,
        file:filePath.join(','),
        attachment:this.messageForm.removeFile.join(',')
      }))
        .then(response=>{
          let res = response.data;
          if(res.code==1){
            this.$message.success('修改成功！');
            this.$router.push({name: '消息列表'});
          }else{
            this.$message.error('提交失败，请重试！');
          }
        })
        .catch(e=>{
          console.log(e);
          this.$message.error('提交失败，请重试！');
        })
    },
    /**
     * 由选择发送对象页面返回编辑页面，需要将原有内容插入编辑器中，供再次编辑
     * 内容参数由路由钩子获取
     */
    reEditMessage(message){
      if(!message.title){
        return;
      }
      for(let key in this.messageForm){
        this.messageForm[key] = message[key]
      }
      //将content插入编辑器
      this.$refs.editor.setContent(this.messageForm.content);
      //将已有文件插入列表
      this.messageForm.originalFileList.forEach(iterm=>{
        this.uploadFileList.push(iterm);
      });
      this.messageForm.filePathList.forEach(iterm=>{
        this.uploadFileList.push(iterm);
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  components:{
    Editor
  },
  mounted(){
    var routerParams = this.$route.params;
    this.currentMessageType = this.$route.query.type;
    this.currentMessageId = this.$route.query.messageId;
    if(this.currentMessageType=='edit'&&this.currentMessageId){
      this.getCurrentMessageData()
    }
    if(this.currentMessageType=='reEdit'){
      setTimeout(()=>{
        this.reEditMessage(routerParams)
      },1000)

    }
  },
  beforeDestroyed(){
    this.$refs.editor.destroy();
  }
}
</script>

<style >
.message-edit {
  max-width: 1580px;
}

.message-edit .el-row {
  margin-bottom: 24px;
}

.message-edit .col-content {
  padding: 0 0 0 16px;
}

.message-edit .text-right .col-content {
  padding: 0 16px 0 0;
}

.lineHeight-36 {
  line-height: 36px;
}

.message-title-input {
  width: 60%;
  max-width: 600px;
}

.cutLine-dashed {
  width: auto;
  margin-top: 28px;
  margin-left: 16px;
}

.file-upload-wrapper {
  width: 60%;
  max-width: 240px;
}

.nextStep-wrapper {
  padding-right: 48px;
}
/*预览弹窗样式*/
.message-preview{
  max-width: 1060px;
  margin: 0 auto;
  min-height: 400px;
}
.previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.previewContent{
  margin-top: 48px;
}
.previewFile>span{
  display: block;
  color: #337ab7;
  margin: 0 0 10px;
}
.fontSize-16{
  font-size: 16px;
}
</style>

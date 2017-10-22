<template>
  <div class="message-edit">

    <div class="nextStep-wrapper text-right">
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button type="primary" @click="nextStep()">
        下一步
      </el-button>
    </div>
    <!--输入标题-->
    <el-form :model="messageForm" ref="messageForm" :rules="messageRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
           <el-input v-model="messageForm.title" placeholder="请输入文章标题" class="message-title-input"></el-input>
      </el-form-item>
      <el-form-item label="发送对象：" prop="sendType">
           <el-radio-group v-model="messageForm.sendType">
            <el-radio :label="1">学校管理员</el-radio>
            <el-radio :label="2">所有人</el-radio>
            <el-radio :label="3">特定对象</el-radio>
            <el-radio :label="4">教材报名者</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容：" required>
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
            :auto-upload="false"
            :action="fileUploadUrl"
            :on-change="upLoadInputChange"
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
        <div class="previewContent" v-html="previewData.content"></div>
        <!--附件-->
        <el-row v-if="previewData.files.length">
          <el-col :span="2" class="fontSize-16">
            附件 ：
          </el-col>
          <el-col :span="22">
            <div class="previewFile" title="预览界面不提供下载附件功能">
              <span v-for="(iterm,index) in previewData.files" :key="index">{{iterm}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from 'components/Editor.vue'
import {BASE_URL} from 'common/config.js'
export default {
  data: function() {
    return {
      fileUploadUrl:BASE_URL+'messages/message/file',
      currentMessageType:'add',
      currentMessageId:undefined,
      messageForm:{
        title:'',
        sendType:1,
        fileList:[],
      },
      messageRules:{
       title:[
          { required: true, message: '请输入文章标题', trigger: 'blur' },
       ],
       sendType:[
          {type: 'number', required: true, message: '请选择发送对象', trigger: 'change' },
       ],
       fileList:[
        /*  { type: 'array', required: true, message: '请至少上传一个附件', trigger: 'change' } */
       ]

      },
      previewShow: false,
      previewData:{
        title:'',
        content:'',
        files:[],
        fileIds:[],
      },
      editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
      },
      uploadFileList:[],
    }
  },
  methods: {
    /**
     * 添加文件
     */
    upLoadInputChange(file,filelist){
      console.log(this.filelist)
      console.log(file)
    },
    preview() {
      this.previewData.title = this.messageForm.title;
      this.previewData.content = this.$refs.editor.getContent()
      this.previewData.files = this.uploadFileList;

      this.previewShow = true;
    },
    /**
     * 点击下一步
     */
    nextStep(){
      this.$refs['messageForm'].validate((valid) => {
          if (valid) {
            var paramData={
              sendType:this.messageForm.sendType,
              content:{
                title:this.messageForm.title,
                content:this.$refs.editor.getContent(),
              },
              fileList:this.messageForm.fileList
            }
             switch(this.messageForm.sendType){
                case 1:
                  this.$router.push({name:'选择学校',query:{type:'new'},params:paramData});
                  break;
                case 2:
                  this.$router.push({name:'选择学校',query:{type:'new'},params:paramData});
                  break;
                case 3:
                  this.$router.push({name:'特定对象',query:{type:'new'},params:paramData});
                  break;
                case 4:
                  this.$router.push({name:'教材报名者',query:{type:'new'},params:paramData});
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
      this.$axios.get('/messages/message/content',{params:{
        userMsgId:this.$route.query.messageId
      }})
        .then(response=>{
          let res = response.data;
          console.log(res);
          //初始化title
          this.messageForm.title=text;
          //初始化message 数据，将内容填充到相应位置
          this.$refs.editor.setContent(res.data.content);
          //将已上传文件push到上传组件文件列表中
          [].unshift.apply(this.uploadFileList,res.data.content.files)
        })
        .catch(e=>{
          this.$message.error('获取当前系统消息失败！');
          this.$route.query.type='add';
        })
    },
  },
  components:{
    Editor
  },
  created(){
    this.currentMessageType = this.$route.query.type;
    this.currentMessageId = this.$route.query.messageId;
    if(this.type=='edit'&&this.currentMessageId){
      this.getCurrentMessageData()
    }
  },
  mounted() {

  },
  destroyed(){

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

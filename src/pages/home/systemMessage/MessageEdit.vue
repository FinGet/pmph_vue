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
           <script id="editor" type="text/plain" style="height:500px;position:relative;z-index:99;"></script>
      </el-form-item>
      <!--分割线-->
      <el-form-item>
          <el-row>
        <div class="cutLine-dashed" style="width:100%;margin-left:0;"></div>
    </el-row>
      </el-form-item>
    <el-form-item label="附件：" prop="fileList">
        <div class="col-content file-upload-wrapper" style="padding-left:0;" >
          <el-upload class="upload-demo" action="http://192.168.200.106:8090/pmpheep/messages/message/file" :on-success="upLoadSuccess" :file-list="messageForm.fileList">
            <span>
              <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip" style="line-height:1;">文件大小不超过100M</div>
          </el-upload>
        </div>
    </el-form-item>
    </el-form>
    <!-- <el-row class="">
      <el-col :span="3" class="text-right">
        <div class="col-content lineHeight-36">
          <span class="required-fields">标题</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content">
          <el-input v-model="title" placeholder="请输入文章标题" class="message-title-input"></el-input>
        </div>
      </el-col>
    </el-row> -->
    <!--选择发送对象区-->
    <!-- <el-row class="lineHeight-36">
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">发送对象</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content">
          <el-radio-group v-model="sendType">
            <el-radio :label="0">学校管理员</el-radio>
            <el-radio :label="1">所有人</el-radio>
            <el-radio :label="2">特定对象</el-radio>
            <el-radio :label="3">教材报名者</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row> -->
    <!--编辑内容区-->
    <!-- <el-row>
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">文章内容</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content">

          <div id="editor_id"></div>
        </div>
      </el-col>
    </el-row> -->

    <!--分割线-->
    <!-- <el-row>
      <el-col :span="20" :offset="3">
        <div class="cutLine-dashed"></div>
      </el-col>
    </el-row>-->
    <!--添加附件-->
   <!--  <el-row class="">
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">附件</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content file-upload-wrapper">
          <el-upload class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
             :file-list="fileList">
            <span>
              <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip">文件大小不超过100M</div>
          </el-upload>
        </div>
      </el-col>
    </el-row> -->

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
export default {
  data: function() {
    return {
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
        files:[]
      },
      uEditor:null
    }
  },
  methods: {
    /**
     * 文件上传成功
     */
    upLoadSuccess(response){
      if (response.code == '1') {
        let res = response.data
        this.messageForm.fileList.push(res)
      }
      //console.log(this.messageForm.fileList)
    },
    preview() {
      this.previewShow = true;
      //console.log(this.previewShow)
      console.log(this.messageForm.fileList)
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
                content:this.uEditor.getContent(),
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
        })
        .catch(e=>{
          this.$message.error('获取当前系统消息失败！');
          this.$route.query.type='add';
        })
    },
    /**
     * 初始化message 数据，将内容填充到相应位置
     */
    setMessageInit(data){

    },
  },
  created(){
    this.currentMessageType = this.$route.query.type;
    this.currentMessageId = this.$route.query.messageId;
    if(this.type=='edit'&&this.currentMessageId){
      this.getCurrentMessageData()
    }
  },
  mounted() {
    this.uEditor = UE.getEditor('editor');
  },
  destroyed(){
    this.uEditor.destroy();
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

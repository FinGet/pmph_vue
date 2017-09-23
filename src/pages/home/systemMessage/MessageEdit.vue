<template>
	<div class="message-edit">
    <!--输入标题-->
    <el-row class="">
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
    </el-row>
    <!--选择发送对象区-->
    <el-row class="lineHeight-36">
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">发送对象</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">学校管理员</el-radio>
            <el-radio :label="6">所有人</el-radio>
            <el-radio :label="9">特定对象</el-radio>
            <el-radio :label="10">教材报名者</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <!--编辑内容区-->
    <el-row>
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">文章内容</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content">
           <Editor :config="{}" :defaultMsg="'123'"></Editor>
        </div>
      </el-col>
    </el-row>

    <!--分割线-->
    <el-row>
      <el-col :span="20" :offset="3">
        <div class="cutLine-dashed"></div>
      </el-col>
    </el-row>

    <!--添加附件-->
    <el-row class="">
      <el-col :span="3" class="text-right">
        <div class="col-content">
          <span class="required-fields">附件</span> ：
        </div>
      </el-col>
      <el-col :span="20">
        <div class="col-content file-upload-wrapper">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList">
            <span> <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip">文件大小不超过100M</div>
          </el-upload>
        </div>
      </el-col>
    </el-row>

    <div class="nextStep-wrapper text-center">
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button type="primary" @click="$router.push({name:'选择学校',query:{history:'1'}})">
        下一步
      </el-button>
    </div>

    <Preview-popup :close.sync="previewShow"></Preview-popup>
	</div>
</template>

<script>
  import Editor from 'components/Editor'
  import PreviewPopup from 'components/PreviewPopup'
  export default {
    data: function() {
      return {
        title:'',
        radio2:3,
        previewShow:false,
        fileList: [],
      }
    },
    methods:{
      preview(){
        this.previewShow=true;
        console.log(this.previewShow)
      }
    },
    components: {
      Editor,
      PreviewPopup
    }
	}
</script>

<style scoped>
  .message-edit{
    max-width: 1580px;
  }
  .message-edit .el-row {
    margin-bottom: 24px;
  }
  .message-edit .col-content{
    padding: 0 0 0 16px;
  }
  .message-edit .text-right .col-content{
    padding: 0 16px 0 0;
  }
  .lineHeight-36{
    line-height:36px;
  }
  .message-title-input{
    width: 60%;
    max-width: 600px;
  }
  .cutLine-dashed{
    width: auto;
    margin-top: 28px;
    margin-left: 16px;
  }
  .file-upload-wrapper{
    width: 60%;
    max-width: 240px;
  }
</style>

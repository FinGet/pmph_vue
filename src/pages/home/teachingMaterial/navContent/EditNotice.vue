<template>
	<div class="edit-notice">
    <!--操作按钮-->
    <div class="clearfix marginT30">
      <div class="operation-wrapper">
        <el-button  type="primary" size="large" class="marginR20" @click="previewShow=true">预览</el-button>
        <el-button  type="primary" size="large" class="marginR20" @click="$router.push({name:'设置书目录'})">保存，下一步</el-button>
      </div>
    </div>
    <!--输入标题-->
    <el-form :model="formData" ref="form" :rules="formRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model.trim="formData.title" placeholder="请输入文章标题" class="title-input"></el-input>
      </el-form-item>
      <el-form-item label="消息内容：" required>
        <el-input v-model="formData.title" class="none"></el-input>
        <div class="clearfix">
          <Editor ref="editor" :config="editorConfig" :defaultMsg="formData.content"></Editor>
        </div>
      </el-form-item>
    </el-form>

    <div class="image-wrapper marginL110 text-center marginB30">
      <img :src="previewData.imageUrl" alt="">
    </div>
    <div class="marginL110 clearfix">
      <p class="width60 paddingR20 pull-left text-right">附件 : </p>
      <div class="marginL80">
        <p><i class="fa fa-paperclip"></i> <span class="link">123456.jpg</span></p>
      </div>
    </div>

    <!--预览弹窗-->
    <el-dialog
      :visible.sync="previewShow"
      size="large">
      <preview-materialmsg :previewData="previewData" readOnly></preview-materialmsg>
    </el-dialog>
	</div>
</template>

<script>
  import Editor from 'components/Editor.vue'
  import previewMaterialmsg from 'components/preview-materialmsg'
	export default {
		data() {
			return {
        formData:{
          materialId:'',
          title:'',
          content:'',
        },
        editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
        },
        formRules:{
          title:[
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            {max:50, message: '长度不能超过50个字符', trigger: 'blur'}
          ]
        },
        previewShow:false,
        previewData:{
          title:'',
          content:'',
          imageUrl:'/static/default_image.png',
          fileList:'',
          endTime:'',
        },
      }
		},
    components:{
      Editor,
      previewMaterialmsg
    },
    methods:{

    },
    created(){
      this.formData.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.formData.materialId){
        this.$router.push({name:'通知列表'});
      }
    },
	}
</script>

<style scoped>
  a {
    color: #2773c1;
    cursor: pointer;
    margin-left: 5px;
  }
  .title-input{
    width: 60%;
    max-width: 600px;
  }
</style>

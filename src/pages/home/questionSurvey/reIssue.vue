<template>
  	<div class="re-issue max-width-1300">
    <!--操作按钮-->
    <div class="clearfix marginT30">
      <div class="operation-wrapper">
        <el-button  type="primary" size="large" class="marginR20" @click="showPreview">预览</el-button>
        <el-button  type="primary" size="large" class="marginR20" @click="saveNextStep">保存，下一步</el-button>
      </div>
    </div>
    <!--输入标题-->
    <el-form :model="formData" ref="form" :rules="formRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model.trim="formData.title" placeholder="请输入文章标题" class="title-input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="消息内容：" required>
        <el-input v-model="formData.title" class="none"></el-input>
        <div class="clearfix">
          <Editor ref="editor" :config="editorConfig" :defaultMsg="formData.content"></Editor>
        </div>
      </el-form-item>
    </el-form>

    <div class="image-wrapper marginL110 text-center marginB30" v-if="formData.image.length">
      <!-- <div class="text-center" v-for="(iterm,index) in formData.image" :key="index">
        <img class="img" :src="iterm.attachment" alt="">
      </div> -->
    </div>
    <div class="marginL110 clearfix" v-if="formData.files.length">
      <p class="width60 paddingR20 pull-left text-right">附件 : </p>
      <div class="marginL80 fileLink">
        <p  v-for="(iterm,index) in formData.files" :key="index">
          <i class="fa fa-paperclip"></i>
          <a :href="iterm.attachment" class="link">{{iterm.attachmentName}}</a>
        </p>
      </div>
    </div>

    <!--预览弹窗-->
    <el-dialog
      :visible.sync="previewShow"
      size="large">
      <div class="material-notice">
        <p class="material-notice-title text-center">
          {{formData.title}}
        </p>
        <p class="material-notice-time text-center" v-if="materialData.materialName">截止日期：{{$commonFun.formatDate(materialData.materialName.deadline).split(' ')[0]}}</p>
        <div class="material-notice-conten paddingT30" v-html="formData.content"></div>
        <!--<div class="material-notice-image text-center">-->
          <!--<div class="material-notice-image-iterm" v-for="(iterm,index) in formData.image" :key="index"><img class="img" :src="iterm.attachment" alt=""></div>-->
        <!--</div>-->
        <div class="clearfix" v-if="formData.files.length">
          <p class="width40 paddingR20 pull-left text-right">附件 : </p>
          <div class="marginL60 paddingT1">
            <p  v-for="(iterm,index) in formData.files" :key="index">
              <i class="fa fa-paperclip"></i>
              <a :href="iterm.attachment" class="link">{{iterm.attachmentName}}</a>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
	</div>
</template>

<script>
  import Editor from 'components/Editor.vue'
  import {teachPicUrl} from '../../../common/config.js'
	export default {
		data() {
			return {
        api_msg_detail:'/pmpheep/material/extra/detail',
        api_msg_save:'/pmpheep/material/extra/update',
        formData:{
          materialId:'',
          title:'',
          content:'',
          image:[],
          files:[],
        },
        editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
        },
        formRules:{
          title:[
            { required: true, message: '请输入文章标题', trigger: 'blur,change' },
            {max:50, message: '长度不能超过50个字符', trigger: 'blur,change'}
          ]
        },
        materialData:{},
        previewShow:false,
      }
		},
    components:{
      Editor,
    },
    methods:{
      /**
       * 获取通知内容
       */
      getNotice(){
        this.$axios.get(this.api_msg_detail,{params:{
          materialId: this.formData.materialId
        }}).then(response=> {
          console.log(response);
          let res = response.data
          if (res.code == '1') {
            let content = '';
            this.formData.title = res.data.materialName.materialName;
            //设置显示图片
            this.formData.image=res.data.materialNoticeAttachments?res.data.materialNoticeAttachments:[];
            //设置文件
            this.formData.files=res.data.materialNoteAttachments?res.data.materialNoteAttachments:[];
            res.data.materialContacts=res.data.materialContacts?res.data.materialContacts:[];

            //简介
            content += `<p>简介：${res.data.materialExtra?res.data.materialExtra.notice:''}</p>`;
            content += `<p></p>`;
            //邮寄地址
            content += `<p>邮寄地址：${res.data.materialName.mailAddress}</p>`;
            content += `<p></p>`;
            //联系人
            let contactsHtml = '';
            for(let i = 0, len = res.data.materialContacts.length; i < len; i++){
              if(i==0){
                contactsHtml+=`<p>联&nbsp;系&nbsp;人：${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
              }else{
                contactsHtml+=`<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
              }
            }
            content+=contactsHtml;
            content += `<p></p>`;
            //备注
            content+=`<p>备注：${res.data.materialExtra?(res.data.materialExtra.note?res.data.materialExtra.note:''):''}</p>`;
           /*  /* 底部图片 */
            for(var i in this.formData.image){
              content+='<br/><p ><img  src="'+teachPicUrl+this.formData.image[i].attachment+'"/><p/>'
            }
            this.formData.content = content;
            this.$refs.editor.setContent(this.formData.content);

            this.materialData = res.data;
          }
        })
      },
      /**
       * 点击预览按钮
       */
      showPreview(){
        this.formData.content = this.$refs.editor.getContent();
        this.previewShow=true;
      },
      /**
       * 保存下一步
       */
      saveNextStep(){
        this.formData.content = this.$refs.editor.getContent();
        //验证表单是否正确
        if(!(this.formData.title&&this.formData.title.length<50&&this.formData.content)){
          this.$message.error('标题和内容都不能为空');
        }

        this.$confirm("确定保存通知详情？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.put(this.api_msg_save,this.$commonFun.initPostData({
              materialId:this.formData.materialId,
              content:this.formData.content,
              materialName:this.formData.title,
            }))
              .then((response)=>{
                let res = response.data
                if (res.code == '1'){
                  this.$message.success('保存成功！');
                  this.$router.push({name:'设置书目录'});
                }
              })
              .catch(e=>{

              })
          })
          .catch(e=>{})
      },

    },
    created(){
      /* this.formData.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.formData.materialId){
        this.$router.push({name:'通知列表'});
      }
      this.getNotice(); */
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
  .max-width-1300{
    max-width: 1300px;
  }
  .material-notice{
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 30px;
    color:#000;
  }
  .material-notice p,.fileLink p{min-height: 19px;margin: 5px 0;}
  .material-notice-title{
    font-size: 24px;
    color: #333333;
  }
  .material-notice-time{
    color: #bdbdbd;
    padding-top: 10px;
  }
</style>

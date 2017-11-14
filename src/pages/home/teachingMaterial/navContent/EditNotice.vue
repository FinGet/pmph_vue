<template>
	<div>
    <!--输入标题-->
    <el-form :model="form" ref="form" :rules="formRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" class="message-title-input"></el-input>
      </el-form-item>
      <el-form-item label="消息内容：" required>
        <el-input v-model="form.title" class="none"></el-input>
        <div class="clearfix">
          <Editor ref="editor" :config="editorConfig"></Editor>
        </div>
      </el-form-item>

      <el-form-item label="联系人：" >
        <p class="grey_p">穆建萍（电话：010-59787213，Email：122093529@qq.com）</p>
        <p class="grey_p">左巍（电话：010-59787213，Email：wei2003001@qq.com）</p>
        <p class="grey_p">海珊（电话：010-59787255，Email：cayhai@qq.com）</p>
      </el-form-item>
      <el-form-item label="备注：" >
        <p class="grey_p">第四轮教材的编写将采用涵盖纸质教材、数字资源以及平台功能融为一体的“融合教材”编写模式，主编、 副主编及编者的申报遴选工作也将采用人民卫生出版社“医学教育交互综合服务平台”（目前名称暂为专家服务平台，http://zhuanjia.pmph.com） 在线填写和提交模式。请各有关院校及专家积极配合，推荐主编、副主编及编者，支持符合条件的教师申报，并对教材的编写给予大力支持。
        </p>

      </el-form-item>
      <el-form-item label="附件：" >
        <p class="appendix_p">
          <i class="fa fa-paperclip" aria-hidden="true"></i>
          <a>通知.pdf</a>
        </p>
        <p class="appendix_p">
          <i class="fa fa-paperclip" aria-hidden="true"></i>
          <a>建议新增教材.doc</a>
        </p>
        <p class="appendix_p">
          <i class="fa fa-paperclip" aria-hidden="true"></i>
          <a>调查表.doc</a>
        </p>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
  import Editor from 'components/Editor.vue'
	export default {
		data() {
			return {
        form:{
          title:'',
          content:'',
          sendType:1,
          originalFileList:[],
          filePathList:[],
          removeFile:[],
        },
        editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
        },
        formRules:{},
      }
		},
    components:{
      Editor
    }
	}
</script>

<style scoped>

</style>

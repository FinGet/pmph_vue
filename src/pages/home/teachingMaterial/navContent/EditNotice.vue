<template>
	<div class="edit-notice">
    <!--操作按钮-->
    <div class="clearfix marginT30">
      <div class="operation-wrapper">
        <el-button  type="primary" size="large" class="marginR20">&nbsp;&nbsp;预览&nbsp;&nbsp;</el-button>
        <el-button  type="primary" size="large" class="marginR20">&nbsp;&nbsp;发布&nbsp;&nbsp;</el-button>
      </div>
    </div>
    <!--输入标题-->
    <el-form :model="form" ref="form" :rules="formRules" label-width="110px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" class="title-input"></el-input>
      </el-form-item>
      <el-form-item label="消息内容：" required>
        <el-input v-model="form.title" class="none"></el-input>
        <div class="clearfix">
          <Editor ref="editor" :config="editorConfig" :defaultMsg="form.content"></Editor>
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
          title:'第四轮全国高等学校医药学成人学历教育（专科起点升本科）护理学专业',
          content:`<p>简介：在深入实施《国家中长期教育改革和发展规划纲要（2010-2020年）》《中共中央国务院关于深化医疗卫生体制改革的意见》，贯彻教育部等六部门联合印发《 关于医教协同深化临床医学人才培养改革的意见》等相关文件精神，整体提升我国医疗教育水平和人才培养质量，创新教学课程、教材编写方法。经全国医药学成人教育发展联盟、人民卫生出版社共同研究决定， 对国家卫生和计划生育委员会全国高等学校医学成人学历教育（专科起点升本科）规划教材进行必要的调整，启动第四轮护理学专业共18种的修订编写工作。
                </p><p style="text-align:center"><img src="http://119.254.226.115/pmph_imesp/upload/notice_introduction/1709/20170914173421006.png" alt="" _src="http://119.254.226.115/pmph_imesp/upload/notice_introduction/1709/20170914173421006.png"></p>`,
          sendType:1,
          originalFileList:[],
          filePathList:[],
          removeFile:[],
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
      }
		},
    components:{
      Editor
    }
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

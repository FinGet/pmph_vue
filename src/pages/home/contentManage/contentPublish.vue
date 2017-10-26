<template>
  <div class="content_publish">
    <el-form :model="formData"  label-width="120px" style="margin:20px 30px 20px 0">
      <el-form-item label="内容标题：">
           <el-input placeholder="请输入内容标题" class="input"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目：">
          <el-cascader
            :options="options"
            v-model="formData.selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
      </el-form-item>
      <el-form-item label="摘要：">
          <el-input type="textarea" :rows="4" class="input" ></el-input>
      </el-form-item>
      <el-form-item label="关键字：">
          <el-input class="input" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
          <el-input class="input"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
          <el-date-picker
               v-model="formData.creatDate"
                type="datetime"
                placeholder="选择创建时间"
                class="date_input"
                :picker-options="pickerOptions">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="是否推荐：">
          <el-radio-group v-model="formData.isRecommend">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐到期时间：" v-if="formData.isRecommend">
           <el-date-picker
               v-model="formData.recEndDate"
                type="datetime"
                placeholder="选择推荐到期时间"
                class="date_input"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="是否置顶：">
          <el-radio-group v-model="formData.isStick">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="置顶到期时间：" v-if="formData.isStick">
           <el-date-picker
               v-model="formData.stickEndTime"
                type="datetime"
                placeholder="选择置顶到期时间"
                class="date_input"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="是否热门：">
          <el-radio-group v-model="formData.isHot">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="热门到期时间：" v-if="formData.isHot">
           <el-date-picker
               v-model="formData.hotEndTime"
                type="datetime"
                placeholder="选择热门到期时间"
                class="date_input"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="文章内容：">
              <Editor ref="editor" :config="editorConfig"></Editor>
      </el-form-item>
      <el-form-item label="附件：">
          <div class="col-content file-upload-wrapper" style="padding-left:0;" >
          <el-upload
            class="upload-demo"
            :action="fileUploadUrl"
            :on-success="upLoadFileSuccess"
            :on-remove="uploadFileRemove"
            :file-list="uploadFileList">
                  <span>
              <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip" style="line-height:1;">文件大小不超过100M</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="是否发布：">
          <el-radio-group v-model="formData.isPublish">
            <el-radio :label="false">立即发布</el-radio>
            <el-radio :label="true">定时发布</el-radio>
          </el-radio-group>
          <el-form-item v-if="formData.isPublish" style="display:inline-block">
              <el-date-picker 
               v-model="formData.timePublish"
                type="datetime"
                placeholder="选择定时发布时间"
                style="margin:0 15px 0 25px;"
                :picker-options="pickerOptions">
         </el-date-picker>
         <el-checkbox v-model="formData.hide">隐藏</el-checkbox>
          </el-form-item>
      </el-form-item>
    </el-form>
    <div class="bottom_box">
          <el-button >返回</el-button>
          <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import Editor from '../../../components/Editor.vue'
export default {
  data() {
    return {
      formData: {
        selectedOptions: [],
        creatDate: "",
        isRecommend:'',
        recEndDate:'',
        isStick:'',
        stickEndTime:'' ,
        isHot:'',
        hotEndTime:'',
        isPublish:'',
        timePublish:'',
        hide:''
      },
      uploadFileList:[],
      fileUploadUrl:'',
      editorConfig: {
          initialFrameWidth: null,
          initialFrameHeight: 500
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    upLoadFileSuccess(){

    },
    uploadFileRemove(){

    }
  },
  components:{
          Editor
  }
};
</script>
<style scoped>
.content_publish .input {
  width: 500px;
}
.content_publish .date_input{
    width:300px;
}
.content_publish .bottom_box{
    margin-left:45%;
    transform: translateX(-50%);
    display: inline-block;
}
</style>

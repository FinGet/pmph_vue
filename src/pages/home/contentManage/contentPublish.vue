<template>
  <div class="content_publish">
    <el-form :model="formData" :rules="formRules" ref="addForm" label-width="120px" style="margin:20px 30px 20px 0">
      <el-form-item label="内容标题：" prop="title">
           <el-input placeholder="请输入内容标题" class="input" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目：" prop="categoryId">
          <el-cascader
            :options="options"
            :clearable="true"
            class="input"
            :props="defaultType"
            v-model="defaultCategoryId"
            :change-on-select="true"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
      </el-form-item>
      <el-form-item label="摘要：" prop="summary">
          <el-input type="textarea" :rows="4" class="input" v-model="formData.summary"></el-input>
      </el-form-item>
      <el-form-item label="关键字：" prop="keyword">
          <el-input class="input" placeholder="请输入关键字" v-model="formData.keyword"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序：" prop="sort">
          <el-input class="input" placeholder="请输入数字" v-model="formData.sort"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否推荐：">
          <el-radio-group v-model="formData.isPromote">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐到期时间："  v-if="formData.isPromote">
           <el-date-picker
               v-model="formData.deadlinePromote"
                type="datetime"
                placeholder="选择推荐到期时间"
                class="date_input"
                format="yyyy-MM-dd HH:mm:ss"
                @change="promoteDateChange"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="推荐显示排序："prop="sortPromote"  v-if="formData.isPromote">
          <el-input placeholder="输入推荐显示排序" style="width:300px" v-model="formData.sortPromote"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶：">
          <el-radio-group v-model="formData.isStick">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="置顶到期时间：" v-if="formData.isStick">
           <el-date-picker
               v-model="formData.deadlineStick"
                type="datetime"
                placeholder="选择置顶到期时间"
                class="date_input"
                @change="stickDateChange"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="分类显示顺序：" prop="sort"  v-if="formData.isStick">
          <el-input placeholder="输入分类显示顺序" style="width:300px" v-model="formData.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否热门：">
          <el-radio-group v-model="formData.isHot">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="热门到期时间：" v-if="formData.isHot">
           <el-date-picker
               v-model="formData.deadlineHot"
                type="datetime"
                placeholder="选择热门到期时间"
                class="date_input"
                @change="hotDateChange"
                :picker-options="pickerOptions">
         </el-date-picker>
      </el-form-item>
      <el-form-item label="热门显示顺序：" prop="sortHot"  v-if="formData.isHot">
          <el-input placeholder="输入热门显示顺序" style="width:300px" v-model="formData.sortHot"></el-input>
      </el-form-item> -->
      <el-form-item label="文章内容：">
              <Editor ref="editor" :config="editorConfig"></Editor>
      </el-form-item>
      <el-form-item label="附件：">
          <div class="col-content file-upload-wrapper" style="padding-left:0;" >
          <el-upload
            class="upload-demo"
            style="max-width:300px;"
            :action="fileUploadUrl"
            :on-success="upLoadFileSuccess"
            :on-remove="uploadFileRemove"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList">
                  <span>
              <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
            <div slot="tip" class="el-upload__tip" style="line-height:1;">文件大小不超过100M</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="是否发布：">
          <el-radio-group v-model="formData.isPublished">
            <el-radio :label="false">立即发布</el-radio>
            <el-radio :label="true">定时发布</el-radio>
          </el-radio-group>
          <el-form-item v-if="formData.isPublished" style="display:inline-block">
              <el-date-picker
               v-model="formData.scheduledTime"
                type="datetime"
                placeholder="选择定时发布时间"
                style="margin:0 15px 0 25px;"
                @change="scheduledDateChange"
                :picker-options="pickerOptions">
         </el-date-picker>
         <el-checkbox v-model="formData.isHide">隐藏</el-checkbox>
          </el-form-item>
      </el-form-item>
    </el-form>
    <div class="bottom_box">
          <el-button >返回</el-button>
          <el-button type="primary" @click="ContentSubmit">确定</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import Editor from "../../../components/Editor.vue";
export default {
  data() {
    return {
      addNewUrl: "/pmpheep/cms/content/new", //发布内容url
      columnListUrl: "/pmpheep/cms/set", //栏目列表Url
      editContentUrl:'/pmpheep/cms/content/update',    //修改提交url
      formData: {
        title: "",
        categoryId: "",
        summary: "",
        keyword: "",
        /* isPromote: "",
        deadlinePromote: "",
        sortPromote: "",
        isStick: "",
        deadlineStick: "",
        sort: "",
        isHot: "",
        deadlineHot: "",
        sortHot: "", */
        sort:'',
        content: "",
        file: [],
        isPublished: "",
        isScheduled: false,
        scheduledTime: "",
        isHide: false
      },
      isEditContent:false,
      fileList: [],
      formRules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "标题过长", trigger: "change" }
        ],
        categoryId: [{ required: true, message: "请选择所属栏目", trigger: "change,blur" }],
        summary: [{ min: 1, max: 50, message: "摘要内容过长", trigger: "change" }],
        keyword: [{ min: 1, max: 50, message: "关键字过长", trigger: "change" }],
        sortPromote:[
            { min:1,max:10, message: "排序码长度不能超过10位", trigger: "change" },
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
        ],
        sort:[
            { min:1,max:10, message: "排序码长度不能超过10位", trigger: "change" },
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
        ],
        sortHot:[
           { min:1,max:10, message: "排序码长度不能超过10位", trigger: "change" },
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
        ]
      },
      defaultType: {
        value: "id",
        label: "categoryName"
      },
      defaultCategoryId:[],
      uploadFileList: [],
         fileUploadUrl:this.$config.BASE_URL+'messages/message/file',
      /* fileUploadUrl:
        "http://192.168.200.109:8090/pmpheep/messages/message/file", */
      editorConfig: {
        initialFrameWidth: null,
        initialFrameHeight: 500
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      options: []
    };
  },
  computed: {},
  methods: {
    /* 获得栏目列表 */
    getColumnList() {
      this.$axios
        .get(this.columnListUrl, {
          params: {
            categoryName: ""
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.options = res.data.data;
          }
        });
    },
    /* 发布新内容url */
    ContentSubmit() {
      this.formData.content = this.$refs.editor.getContent();
      if (!this.formData.content) {
        this.$message.error("内容不能为空");
        return false;
      }
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.formData.sessionId = this.$getUserData().sessionId;
          /* 判断新增还是修改 */
          if(!this.isEditContent){
              this.$axios
            .post(this.addNewUrl, this.$commonFun.initPostData(this.formData))
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message.success("添加成功");
                this.$router.push({ name: "内容列表" });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }else{
            this.$axios.put(this.editContentUrl,this.$commonFun.initPostData(this.formData)).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                  this.$message.success('修改成功');
                  this.$router.push({ name: "内容列表" });
                }else {
                this.$message.error(res.data.msg);
              }
            })
          }



        } else {
          return false;
        }
      });
    },
    /* 栏目选择改变 */
    handleChange(value) {
      this.formData.categoryId = value[value.length - 1] + "";
      this.formData.path = value.join("-");
      console.log(value);
    },
    /* 文件上传大小判断 */
    beforeAvatarUpload(file){
      const isLt100M = file.size / 1024 / 1024 < 100;
       if (!isLt100M) {
          this.$message.error('上传文件大小不能超过 100MB!');
        }
        return isLt100M;
    },
    /* 文件上传成功回调 */
    upLoadFileSuccess(res, file, filelist) {
      this.formData.file = [];
      if (res.code == 1) {
        filelist.forEach(item => {
          if(item.response){
            console.log(item);
            this.formData.file.push(item.response.data);
          }
        });
      }

    },
    /* 文件移除回调 */
    uploadFileRemove(file, flielist) {
      if(!this.isEditContent){
          this.formData.file = [];
         filelist.forEach(item => {
        this.formData.file.push(item.response.data);
      });
      }else{

        if(file.attachment){
          if(!this.formData.attachment){
            this.formData.attachment=[];
          }
            this.formData.attachment.push(file.attachment);
        }
      }

    },
    /* 推荐到期时间改变 */
    promoteDateChange(val) {
      console.log(val);
      this.formData.deadlinePromote = val;
    },
    /* 置顶到期时间改变 */
    stickDateChange(val) {
      this.formData.deadlineStick = val;
    },
    /* 热门到期时间改变 */
    hotDateChange(val) {
      this.formData.deadlineHot = val;
    },
    /* 定时发布时间改变 */
    scheduledDateChange(val) {
      this.formData.scheduledTime = val;
    },
    /* 初始化是新增还是修改 */
    initIsEdit() {
      if (this.$router.currentRoute.query.type == "edit") {
           var editData=this.$router.currentRoute.params;
        if (editData.content) {
          this.isEditContent=true;
          for(var item in editData.cmsContent){
            if(item.indexOf('gmt')!=0){
                 this.formData[item]=editData.cmsContent[item]==null?'':editData.cmsContent[item];
            }
          }
          /* 设置默认栏目 */
          this.formData.categoryId=this.formData.categoryId+'';
          this.defaultCategoryId=editData.cmsContent.path.split('-');
         for(var i in  this.defaultCategoryId){
               this.defaultCategoryId[i]=parseInt(this.defaultCategoryId[i]);
         }
          /* 填充默认内容 */
          var _this=this;
          setTimeout(function() {
             _this.$refs.editor.setContent(editData.content.content);
          }, 1000);
          /* 填充默认附件 */
         editData.cmsExtras.forEach((item)=>{
          var obj={};
          obj.name=item.attachmentName;
          obj.url=item.attachment;
          obj.attachment=item.attachment.split('/').pop();
          this.fileList.push(obj);
         })
         this.formData.attachment=[];
        } else {
          this.$router.push({ name: "内容列表" });
        }
      } else {
        return false;
      }
    }
  },
  created() {
    this.getColumnList();
    this.initIsEdit();
  },
  components: {
    Editor
  }
};
</script>
<style scoped>
.content_publish .input {
  width: 500px;
}
.content_publish .date_input {
  width: 300px;
}
.content_publish .bottom_box {
  margin-left: 45%;
  transform: translateX(-50%);
  display: inline-block;
}
</style>

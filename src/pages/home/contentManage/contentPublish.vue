<template>
  <div class="content_publish">
    <el-form :model="formData" :rules="formRules" ref="addForm" label-width="120px" style="margin:20px 30px 20px 0">
      <el-form-item label="标题：" prop="title">
           <el-input placeholder="请输入内容标题" class="input" v-model.trim="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目：" prop="categoryId">
          <el-cascader
            :options="options"
            :clearable="true"
            class="input"
            :disabled="true"
            :props="defaultType"
            v-model="defaultCategoryId"
            :change-on-select="true"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
      </el-form-item>
      <el-form-item label="显示顺序：" prop="sort">
          <el-input class="input" placeholder="请输入数字" v-model="formData.sort"></el-input>
      </el-form-item>
      <el-form-item label="内容：" required>
              <Editor ref="editor" :config="editorConfig"></Editor>
      </el-form-item>
      <el-form-item label="附件：" v-if="$router.currentRoute.query.columnId!=2">
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
    </el-form>
    <!-- 预览对话框 -->
        <el-dialog
     title=""
     :visible.sync="showPreventDialog"
     size="large">
       <div style="padding:0 10%;">
        <h5 class="previewTitle text-center">{{formData.title}}</h5>
         <p class="senderInfo text-center paddingT10">
      <span class="marginR10">{{routerName}}</span>
      <span>{{$commonFun.getNowFormatDate()}}</span>
       </p>
       <el-form label-width="55px">
         <el-form-item label="" label-width="0">
             <p v-html="preventContent"></p>
         </el-form-item>
         <el-form-item label="附件：" v-if="$router.currentRoute.query.columnId!=2">
              <p type="text" style="color:#337ab7" v-for="(item,index) in fileList" :key="index">{{item.name}}</p>
         </el-form-item>
       </el-form>
        </div>
    </el-dialog>

    <div class="bottom_box">
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="openPreventDialog">预览</el-button>
          <el-button type="primary" v-if="formData.categoryId==1"  @click="examineContent($router.currentRoute.params.cmsContent,2)">通过</el-button>
          <el-button type="danger" v-if="formData.categoryId==1" @click="examineContent($router.currentRoute.params.cmsContent,1)">退回</el-button>
          <el-button type="primary"@click="ContentSubmit(0)" >暂存</el-button>
          <el-button type="primary" @click="publishSubmit(1)"  v-if="formData.categoryId!=1">发布</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import Editor from "../../../components/Editor.vue";
export default {
  data() {
    return {
      newContentUrl: "/pmpheep/cms/newContent", //新建文章
      newLettersUrl:'/pmpheep/cms/newLetters', //新建信息快报
      newNoticeUrl:'/pmpheep/cms/newNotice' , //新建公告管理
      columnListUrl: "/pmpheep/cms/set", //栏目列表Url
      editContentUrl:'/pmpheep/cms/content/update',    //修改文章
      editLettersUrl:'/pmpheep/cms/letters/update',  //修改信息快报
      editNoticeUrl:'/pmpheep/cms/notice/update',  //修改公告
      examineUrl: "/pmpheep/cms/content/update", //审核内容
      formData: {
        title: "",
        categoryId: "",
        sort:'',
        content: "",
        file: [],
        scheduledTime:'',
        isPublished: "",
        path:'0'
      },
      showPreventDialog:false,
      preventContent:'',
      isEditContent:false,
      fileList: [],
      formRules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "标题过长", trigger: "change" }
        ],
        categoryId: [{type:'number', required: true, message: "请选择所属栏目", trigger: "change,blur" }],
        summary: [{ min: 1, max: 50, message: "摘要内容过长", trigger: "change" }],
        keyword: [{ min: 1, max: 50, message: "关键字过长", trigger: "change" }],
        sort:[
            {validator:this.$formCheckedRules.numberChecked,trigger: "blur"},
            { min:1,max:10, message: "排序码长度不能超过10位", trigger: "blur" },
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
      options: [
        {
          id:1,
          categoryName:'文章管理',
          children:null
        },
        {
          id:2,
          categoryName:'信息快报管理',
          children:null
        },
        {
          id:3,
          categoryName:'公告管理',
          children:null
        }
        ]
    };
  },
  computed: {
    addNewUrl(){
      switch (this.$router.currentRoute.query.columnId) {
        case 1:
          return this.newContentUrl;
          break;
        case 2: 
          return this.newLettersUrl;
        case 3:
         return this.newNoticeUrl;  
        default:
          break;
      }
    },
    editUrl(){
      switch (this.$router.currentRoute.query.columnId) {
        case 1:
          return this.editContentUrl;
          break;
        case 2:
        return this.editLettersUrl;
        break;
        case 3:
        return this.editNoticeUrl;
        break;
        default:
          break;
      }
    },
    routerName(){
      switch (this.$router.currentRoute.query.columnId) {
        case 1:
          return '文章管理'
          break;
        case 2 :
         return  '信息快报管理'
         break;
         case 3 :
         return  '公告管理'
         break;
        default:
        break;
      }
    },
  },
  watch:{
   /* 'formData.isScheduled':function(val){
      this.formData.isPublished=!val;
   } */
  },
  methods: {
    publishSubmit(num){
    if(num==0){
      this.ContentSubmit(num);
    }else{
      this.$confirm('发布后将不能修改，确定发布？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ContentSubmit(num);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });          
        });
    }
    },
    /* 发布新内容url */
    ContentSubmit(num) {
      this.formData.content = this.$refs.editor.getContent();
      if (!this.formData.content) {
        this.$message.error("内容不能为空");
        return false;
      }
      this.$refs["addForm"].validate(valid => {
        if (valid) {
            /* 判断暂存还是发布 */
            
            if(num==0){
               this.formData.isStaging=true;
            }
            if(num==1){
              this.formData.isPublished=true;
            }
          this.formData.sessionId = this.$getUserData().sessionId;
          /* 判断新增还是修改 */
          if(!this.isEditContent){
              this.$axios
            .post(this.addNewUrl, this.$commonFun.initPostData(this.formData))
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                switch (num) {
                  case 0:
                    this.$message.success("暂存成功");
                    break;
                  case 1:
                   this.$message.success("发布成功");
                   break;
                  default:
                    break;
                }
                this.$router.push({ name: this.routerName });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }else{
            this.$axios.put(this.editUrl,this.$commonFun.initPostData(this.formData)).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                switch (num) {
                  case 0:
                    this.$message.success("暂存成功");
                    break;
                  case 1:
                    this.$message.success("发布成功");
                   break;
                  default:
                    break;
                }
                  this.$router.push({ name: this.routerName });
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
    /* 预览 */
    openPreventDialog(){
      console.log(this.formData);
     this.preventContent=this.$refs.editor.getContent();
     this.showPreventDialog=true;
    },
    /* 审核 */
    examineContent(obj,status){
      console.log(obj);
      this.$confirm(status==2?"通过后不能修改，确定审核通过该文章？":"确定退回该文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           this.formData.sessionId = this.$getUserData().sessionId;
           this.formData.authStatus=status;
           this.formData.content=this.$refs.editor.getContent();
          this.$axios
            .put(
              this.examineUrl,
              this.$commonFun.initPostData(this.formData)
               )
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message.success("审核成功");
                this.showContentDetail = false;
                this.$router.push({name:'文章管理'})
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
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
      console.log(file);
      console.log(typeof file);
      const isLt100M = file.size / 1024 / 1024 <= 100;
       if (!isLt100M) {
          this.$message.error('上传文件大小不能超过 100MB!');
        }
        if(file.size==0){
           this.$message.error('请勿上传大小为0kb的空文件');
           return false;
        }
        /* .com .bat .exe */
        if((file.name.indexOf('.bat')!=-1||file.name.indexOf('.exe')!=-1||file.name.indexOf('.com'))!=-1){
          console.log()
           this.$message.error('请勿上传可执行文件');
           return false;
        }
        if(file.name.length>80){
          this.$message.error('附件名称长度过长');
          return false;
        }
        return isLt100M;
    },
    /* 文件上传成功回调 */
    upLoadFileSuccess(res, file, filelist) {
       this.fileList=filelist;
      this.formData.file = [];
      if (res.code == 1) {
        filelist.forEach(item => {
          if(item.response){
            this.formData.file.push(item.response.data);
          }
        });
      }

    },
    /* 文件移除回调 */
    uploadFileRemove(file, flielist) {
      this.fileList=flielist;
      if(!this.isEditContent){
          this.formData.file = [];
         flielist.forEach((i) => {
        this.formData.file.push(i.response.data);
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
      if(this.$router.currentRoute.query.columnId){
                this.defaultCategoryId.push(this.$router.currentRoute.query.columnId);
                this.formData.categoryId=this.$router.currentRoute.query.columnId;
      }else{
        this.$router.push({ name: "文章管理" });
      }
      this.isEditContent=false;
      if (this.$router.currentRoute.query.type == "edit") {
           var editData=this.$router.currentRoute.params;
           console.log(editData);
        if (editData.content) {
          this.isEditContent=true;
          for(var item in editData.cmsContent){
            if(item.indexOf('gmt')!=0){
                if(typeof editData.cmsContent[item]!='boolean'){
                 this.formData[item]=editData.cmsContent[item]==null?'':editData.cmsContent[item]+'';
            }else{
                this.formData[item]=editData.cmsContent[item]==null?'':editData.cmsContent[item];
            }
            }
            
          }
          /* 设置默认栏目 */
          this.formData.categoryId=parseInt(this.formData.categoryId);
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
          this.$router.go(-1);
        }
      }
    }
  },
  created() {
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
.previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.content_publish .center_box{
    float:left;
 margin-left:50%;
 transform: translateX(-50%);
}
.content_publish .el-tabs--border-card {
    border: 0;
    box-shadow: none;
  }
</style>

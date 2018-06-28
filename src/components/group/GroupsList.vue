/*小组列表组件*/
<template>
  <div class="groupList">
    <div class="groupList-inner">
      <div class="searchBox">
        <el-input
          id="groupListSearch"
          placeholder="小组搜索"
          icon="search"
          v-model.trim="inputSearchGroup"
          >
        </el-input>
      </div>
      <div class="memberShape">
        <beauty-scroll scrollbar ref="beautyScroll">
          <!--小组头像-->
          <div class="groupHead"
               v-for="(item,index) in groupListData"
               :class="{active:item.id===currentActiveGroupId,firstIterm:index===0}"
               :key="index"
               @click="clickGroup(item)"
               v-show="!item.no_matchSearch"
          >
            <div class="groupHead-inner">
            <span class="groupHeadImg">
              <!-- <img :src="item.groupImage?item.groupImage:DEFAULT_USER_IMAGE" alt="小组头像"> -->
              <img :src="item.groupImage" alt="小组头像">
            </span>
              <div class="groupHeadName">
                <span>{{item.groupName}}</span>
                <span class="textbook">{{item.textbook}}</span>
              </div>
              <span class="lastMessageTime" v-if="item.gmtLastMessage">{{changeDateType(item.gmtLastMessage)}}</span>
            </div>
          </div>
        </beauty-scroll>
      </div>
      <div class="addGroupWrapper text-center">
        <el-button type="text" icon="plus" @click="addNew" class="button">
          新建小组
        </el-button>
      </div>
    </div>
    <!--新增成员弹窗-->
    <el-dialog
      title="新增小组"
      :visible.sync="dialogVisible"
      @close="handleClose"
      size="tiny">
        <div class="addNewPopup">
          <el-form label-width="120px" :model="newGroupData" :rules="rules" ref="ruleForm">
            <el-form-item label="小组头像：">
              <div class="headImageWrapper">
                <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start" v-if="!isIe9">
                  <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
                </el-tooltip>
                <!--上传文件按钮-->
                <!--<input type="file" @change="filechange" ref="fileInput" class="fileInput" />-->

                <my-upload
                  class="fileInput"
                  ref="upload"
                  :action="groupImgFile"
                  :before-upload="beforeUpload"
                  :on-success="upLoadFileSuccess"
                  :on-error="uploadError"
                  :show-file-list="false">
                  <el-button class="fileInput">上传</el-button>
                </my-upload>
                <div ref="headImageWrapper" v-show="newGroupData.filename">
                  <img :src="newGroupData.imgUrl" class="avatar">
                </div>
                <div v-show="!newGroupData.filename">
                  <img :src="DEFAULT_USER_IMAGE" class="avatar">
                </div>
              </div>
            </el-form-item>
            <el-form-item label="小组名称：" prop="name">
              <el-input v-model.trim="newGroupData.name" placeholder="请输入小组名称" @keyup.enter.native="createNewGroup"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createNewGroup">确 定</el-button>
          <el-button @click="dialogVisible=false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import beautyScroll from 'components/beautyScroll.vue';
  import bus from 'common/eventBus/bus.js'
  export default{
    data(){
      var _this = this;
       return {
         groupListUrl:'/pmpheep/group/list/pmphGroup',
         groupImgFile:'/pmpheep/group/files',
         dialogVisible:false,
         DEFAULT_USER_IMAGE:_this.$config.DEFAULT_USER_IMAGE,
         currentActiveGroupId:undefined,
         inputSearchGroup:'',
         groupListData:[],
         newGroupData:{
           filename:undefined,
           name:'',
           currentFile:undefined,
           imgUrl:undefined,
         },
         rules:{
           name:[this.$formRules.required('小组名不能为空','blur'),this.$formRules.name()]
         },
       }
    },
    computed:{
      creadGroupPostData(){
        let obj = {};
        obj.groupName = this.newGroupData.name?this.newGroupData.name:'';
        return obj
      },
      isIe9(){
        return this.$commonFun.Browser.ie==9
      }
    },
    components:{
      beautyScroll
    },
    methods:{
      clickGroup(group){
        this.currentActiveGroupId = group.id;
        this.$emit('clickItem',group)
      },
      changeDateType(num){
         return  this.$commonFun.getDateDiff(num);
      },
      /*点击新建小组按钮*/
      addNew(){
        this.dialogVisible = !this.dialogVisible
      },
      /* 初始化小组列表 */
      getGroupData(onlySearch){
        var _this=this;
        this.$axios.get(this.groupListUrl,{
          params:{
            groupName:this.inputSearchGroup,
            sessionId:this.$getUserData().sessionId
          },
        }).then(function(res){
          if(res.data.code==1){
            res.data.data.map(iterm=>{
              iterm.groupImage=_this.$config.DEFAULT_BASE_URL+iterm.groupImage;
              iterm.filesNumber = iterm.files||0;
            });
            _this.groupListData=res.data.data;
            if(!onlySearch&&res.data.data.length){
              var hasCurrentGroup = false;
              res.data.data.forEach(iterm=>{
                if(iterm.id == _this.currentActiveGroupId){
                  hasCurrentGroup=true;
                }
              });
              //保持当前小组选中

                _this.currentActiveGroupId=res.data.data[0].id;

              res.data.data.forEach(iterm=>{
                if(iterm.id==_this.currentActiveGroupId){
                  _this.$emit('clickItem',iterm);
                }
              });
              //当前小组列表传递给父组件，以备其他组件用
              _this.$emit('getGroupList',res.data.data);
            }
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      /**
       * 上传头像input发生改变时触发
       * @param e input内置事件对象
       */
      beforeUpload(file){
        let self=this;
        let prevDiv = this.$refs.headImageWrapper;
        let ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        if(!ext){return false;}
        // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
          this.$confirm("图片的格式必须为png或者jpg或者jpeg或者gif格式！", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          self.newGroupData.filename=undefined;
          return false;
        }
        //文件名不超过40个字符
        if(file.name.length>50){
          this.$confirm("文件名称不能超过50个字符", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });

          return false;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size==0){
          this.$confirm("文件大小不能为0kb", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });

          self.newGroupData.filename=undefined;
          return false;
        }
        if (ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif') {
          this.$confirm('请勿上传可执行文件!', "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });

          return false;
        }
        // 判断文件大小是否符合 文件不大于10M
        if(file.size/1024/1024 > 10){
          this.$confirm("图片大小不能大于10M", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });

          self.newGroupData.filename=undefined;
          return false;
        }

        return true;



      },
      PreviewImg(imgFile){
        var newPreview = this.$refs.headImageWrapper;
        var imgDiv = document.createElement("div");

        console.log(imgDiv)
        imgDiv.style.width = "100px";     imgDiv.style.height = "100px";
        imgDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)";
        imgDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgFile.value;
        newPreview.appendChild(imgDiv);
      },
      /**
       * 创建小组请求成功的回调
       */
      upLoadFileSuccess(response, file, fileList){
        if (response.code == '1') {
          this.newGroupData.filename=file.name;
          this.newGroupData.imgUrl='/pmpheep/'+response.data;
          this.newGroupData.currentFile=file.file;
        }else{
          this.$confirm(response.msg.msgTrim(), "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });


        }
      },
      /**
       * 创建小组请求失败的回调
       */
      uploadError(err, file, fileList){

      },
      /**
       * 创建小组
       */
      createNewGroup(){
        //小组名称不能为空
        if(!this.newGroupData.name){
          this.$confirm('请输入小组名称', "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          return false;
        }
        console.log(this.newGroupData);
        let self= this;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/pmpheep/group/add',this.$commonFun.initPostData({
              file:this.newGroupData.imgUrl?this.newGroupData.imgUrl.replace('/pmpheep/',''):'',
              groupName:this.newGroupData.name
            }))
              .then((response) => {
                let res = response.data;
                if (res.code == '1') {
                  self.$message.success('创建小组成功');
                  self.getGroupData();
                  self.dialogVisible=false;
                }else{
                  self.$confirm(res.msg.msgTrim(), "提示",{
                  	confirmButtonText: "确定",
                  	cancelButtonText: "取消",
                  	showCancelButton: false,
                  	type: "error"
                  });

                }
              })
              .catch((error) => {
                self.$confirm('创建小组失败', "提示",{
                	confirmButtonText: "确定",
                	cancelButtonText: "取消",
                	showCancelButton: false,
                	type: "error"
                });

              });
          } else {
            self.$confirm('请完善表单后再添加！', "提示",{
            	confirmButtonText: "确定",
            	cancelButtonText: "取消",
            	showCancelButton: false,
            	type: "error"
            });

            return false;
          }
        });
      },
      /**
       * 处理接收到的消息事件
       * 将小组最后收到消息时间改为当前时间
       */
      handlerReceiveMessage(data){
        let message={};
        data=JSON.parse(data);
        if(data.msgType==3){
          this.groupListData.forEach(iterm=>{
            if(iterm.id == data.groupId){
              iterm.gmtLastMessage = +(new Date())
            }
          });
        }
      },
      /**
       * 开始监听webSocket推送的消息事件
       */
      startListenMessage(){
        bus.$on('ws:message',this.handlerReceiveMessage)
      },
      /**
       *  取消监听
       */
      removeListenMessage(){
        bus.$off('ws:message',this.handlerReceiveMessage)
      },
      /**
       *  当页面左侧导航区域展开和收起时执行此方法
       */
      handleSideBarFlod(){
        this.$refs.beautyScroll.refresh(280);
      },
      /**
       * 关闭新增小组弹窗时
       */
      handleClose(){
        this.newGroupData.filename=undefined;
        this.newGroupData.imgUrl = undefined;
        this.newGroupData.name=null;
        console.log(this.newGroupData);
      },
    },
    watch:{
      inputSearchGroup(){
        this.groupListData.map((iterm)=>{
          if(iterm.groupName.includes(this.inputSearchGroup)){
            iterm.no_matchSearch=false;
          }else{
            iterm.no_matchSearch=true;
          }
        })
      }
    },
    created(){
       this.getGroupData();

      if(window._hmt){
        _hmt.push(['_trackPageview', '/group/group-list']);
      }
    },
    mounted(){
      this.$refs.beautyScroll.refresh(300);
      this.startListenMessage();
      bus.$on('group:info-change',this.getGroupData);
      bus.$on('side-bar:flod_unflod',this.handleSideBarFlod)
    },
    beforeDestroy(){
      this.removeListenMessage();
    }
  }
</script>

<style scoped>
  /*小组列表*/
  .groupList{
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #eff1ef;
  }
  .groupList-inner{
    box-sizing: border-box;
    padding: 70px 0 42px;
    height: 100%;
    position: relative;
  }
  .searchBox{
    padding: 0 10px 24px 10px ;
    position: absolute;
    top: 10px;
    left: 0;
    width:100%;
    box-sizing: border-box;
    border-bottom:1px solid rgba(0,0,0,.1);
    z-index: 100;
    /* border-bottom:1px solid rgba(0,0,0,0.1); */
  }
  .memberShape{
    height: 100%;
    position: relative;
  }
  .addGroupWrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,.1);
    z-index: 10;
    cursor: pointer;
  }
  .addGroupWrapper .button{
  }

  .textbook{
    display: block;
    line-height: 14px;
    color: #fff243;
    width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .groupHead{
    height: 68px;
    border-radius: 4px;
    cursor: pointer;
  }
  .groupHead:hover{
    background: #dcdfdc;
  }
  .groupHead.active{
    background: #e6e7e6;
  }
  .groupHead.firstIterm{
    /*background: rgba(255,255,255,.1);*/
  }
  .groupHead-inner{
    position: relative;
    padding: 10px 50px 10px 68px;
  }
  .groupHeadImg{
    position: absolute;
    left: 10px;
    top: 8px;
    width: 50px;
    height:50px;
    overflow: hidden;
    border-radius: 50%;
  }
  .groupHeadImg>img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .lastMessageTime{
    position: absolute;
    right: 4px;
    top:20px;
    width: 50px;
    height: 14px;
    font-size: 12px;
    color: rgba(0,0,0,.5);

  }
  .groupHeadName{
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  /*新增小组弹窗*/
  .lineHeight-100{line-height: 100px;}
  .addNewPopup{
    min-width: 280px;
    line-height: 36px;
    padding: 0 20px;
  }
  .addNewPopup .headImageWrapper{
    width: 100px;
    height: 100px;
    position: relative;
  }
  .headImageWrapper-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.7);
    opacity: 0;
  }
  .headImageWrapper-bg>i{opacity: 1;}
  .headImageWrapper:hover .headImageWrapper-bg{
    opacity: 0.75;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .headImageUploadBtn{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border:2px solid #fff;
    color: #fff;
    opacity: 0;
    z-index: 2;
    transition: all .28s;
  }
  .headImageUploadBtn:after{
    content: "";
    display: inline-block;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index: -1;
    background: rgba(0,0,0,.5);
  }
  .headImageWrapper:hover .headImageUploadBtn{
    opacity: 1;
  }

  .fileInput{
    display: block;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:10;
  }
  .headImageWrapper>div>img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .headImageWrapper>div{
    width: 100%;
    height:100%;
  }

</style>

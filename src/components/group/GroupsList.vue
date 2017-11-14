/*小组列表组件*/
<template>
  <div class="groupList">
    <div class="groupList-inner">
      <div class="searchBox">
        <el-input
          id="groupListSearch"
          placeholder="小组搜索"
          icon="search"
          v-model="inputSearchGroup"
          :on-icon-click="getGroupData"
          @keyup.enter.native="getGroupData"
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
                <el-tooltip class="item" effect="dark" content="点击上传头像" placement="top-start">
                  <div class="headImageWrapper-bg"><i class="el-icon-plus avatar-uploader-icon"></i></div>
                </el-tooltip>
                <!--上传文件按钮-->
                <input type="file" @change="filechange" ref="fileInput" class="fileInput" />
                <div ref="headImageWrapper" v-show="newGroupData.filename">
                  <img :src="DEFAULT_USER_IMAGE" class="avatar">
                </div>
                <div v-show="!newGroupData.filename">
                  <img :src="DEFAULT_USER_IMAGE" class="avatar">
                </div>
              </div>
            </el-form-item>
            <el-form-item label="小组名称：" prop="name">
              <el-input v-model="newGroupData.name" placeholder="请输入小组名称" @keyup.enter.native="createNewGroup"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createNewGroup">确 定</el-button>
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
         groupListUrl:'/group/list/pmphgroup',
         dialogVisible:false,
         DEFAULT_USER_IMAGE:_this.$config.DEFAULT_USER_IMAGE,
         currentActiveGroupId:undefined,
         inputSearchGroup:'',
         groupListData:[],
         newGroupData:{
           filename:undefined,
           name:null
         },
         rules:{
           name:[
             { required: true, message: '请输入小组名称', trigger: 'blur' },
             { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
           ]
         },
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
      getGroupData(){
        var _this=this;
        this.$axios.get(this.groupListUrl,{
          params:{
            groupName:this.inputSearchGroup,
            sessionId:this.$getUserData().sessionId
          },
        }).then(function(res){
          console.log(res);
          if(res.data.code==1){
            res.data.data.map(iterm=>{
              iterm.groupImage=_this.$config.DEFAULT_BASE_URL+iterm.groupImage;
            });
            _this.groupListData=res.data.data;
            if(res.data.data.length){
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
      filechange(e){
        var self=this;
        var prevDiv = this.$refs.headImageWrapper;
        var file = this.$refs.fileInput;
        var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
        if(!ext){return;}
        // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
          this.$message.error("图片的格式必须为png或者jpg或者jpeg格式！");
          self.newGroupData.filename=undefined;
          return;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.files && file.files[0].size<1){
          this.$message.error("图片大小不能小于1bt");
          self.newGroupData.filename=undefined;
          file.value='';
          return;
        }
        // 判断文件大小是否符合 文件不大于5M
        if(file.files && file.files[0].size/1000/1000 > 10 && file.files[0].size<1){
          this.$message.error("图片大小不能大于10M");
          self.newGroupData.filename=undefined;
          file.value='';
          return;
        }
        if (file.files && file.files[0]) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            self.newGroupData.filename=evt.target.result;
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" class="avatar" style="display:block;width: 100%;height: 100%;" />';
          }
          reader.readAsDataURL(file.files[0]);
        } else {
          if(!file.value){
            self.newGroupData.filename=undefined;
          }
          prevDiv.innerHTML = '<div class="avatar" style="display:block;width: 100%;height: 100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        }
      },
      /**
       * 创建小组
       */
      createNewGroup(){
        //小组名称不能为空
        if(!this.newGroupData.name){
          this.$message.error('请输入小组名称');
          return false;
        }
        let self= this;
        var filedata = this.newGroupData.filename?this.$refs.fileInput.files[0]:'';
        var formdata = new FormData();
        console.log(filedata);
        formdata.append('file',filedata);
        formdata.append('groupName',this.newGroupData.name);
        formdata.append('sessionId',this.$getUserData().sessionId);

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/group/add/pmphgroup',formdata,config)
              .then((response) => {
                let res = response.data;
                if (res.code == '1') {
                  self.$message.success('创建小组成功');
                  self.getGroupData();
                  self.dialogVisible=false;
                }else{
                  self.$message.error(res.msg);
                }
              })
              .catch((error) => {
                self.$message.error('创建小组失败');
              });
          } else {
            self.$message.error('请完善表单后再添加！');
            return false;
          }
        });
      },
      /**
       * 处理接收到的消息事件
       * 将小组最后收到消息时间改为当前时间
       */
      handlerReceiveMessage(data){
        console.log('小组聊天窗口成功收到消息',data);
        let message={};
        data=JSON.parse(data);
        if(data.msgType==3){
          this.groupListData.forEach(iterm=>{
            if(iterm.id = data.groupId){
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
        this.newGroupData.name=null;
        this.$refs.fileInput.value = '';
      },
    },
    created(){
       this.getGroupData();
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
    background-color: #687887;
    height: 100%;
    color:#fff;
    overflow: hidden;
    position: relative;
  }
  .groupList-inner{
    box-sizing: border-box;
    padding: 70px 0 42px;
    height: 100%;
    position: relative;
  }
  .searchBox{
    padding: 0 10px;
    position: absolute;
    top: 10px;
    left: 0;
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
    color:#fff;
    border-top: 1px solid rgba(0,0,0,.1);
    z-index: 10;
    cursor: pointer;
  }
  .addGroupWrapper .button{
    color:#fff;
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
    background: rgba(255,255,255,.15);
  }
  .groupHead.active{
    background: rgba(255,255,255,.2);
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
    color: rgba(255,255,255,.5);

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

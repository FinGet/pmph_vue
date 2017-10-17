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
              <img :src="item.image?item.image:DEFAULT_USER_IMAGE" alt="小组头像">
            </span>
              <div class="groupHeadName">
                <span>{{item.name}}</span>
                <span class="textbook">{{item.textbook}}</span>
              </div>
              <span class="lastMessageTime">{{item.lastMesTime}}</span>
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
      size="tiny">
        <div class="addNewPopup">
          <el-row class="marginB30">
            <el-col :span="6">
              <p class="lineHeight-100">小组头像：</p>
            </el-col>
            <el-col :span="18">
              <div class="headImageWrapper">
                <!--上传文件按钮-->
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                  <img v-if="newGroupData.headImage" :src="newGroupData.headImage" class="avatar">
                  <img v-else :src="DEFAULT_USER_IMAGE" class="avatar">
                  <i class="el-icon-plus avatar-uploader-icon headImageUploadBtn"></i>
                </el-upload>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>小组名称：</p>
            </el-col>
            <el-col :span="18">
              <el-input v-model="newGroupData.name" placeholder="请输入小组名称"></el-input>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DEFAULT_USER_IMAGE} from 'common/config.js';
  import beautyScroll from '@/base/beautyScroll.vue';
  import {mapGetters} from 'vuex'
  export default{
    data(){
       return {
         groupListUrl:'/group/list/pmphgroup',
         dialogVisible:false,
         DEFAULT_USER_IMAGE:DEFAULT_USER_IMAGE,
         currentActiveGroupId:1237,
         inputSearchGroup:'',
         groupListData:[
           {name:'人卫社小组',textbook:'健康学导论（或健康服务与管理导论）',id:1231,lastMesTime:'昨天'},
           {name:'成都医科大学内部',lastMesTime:"7-28"},
           {name:'个人小组',id:1232,lastMesTime:"8-28"},
           {name:'个人小组',id:1233,lastMesTime:"8-28"},
           {name:'个人小组',id:1234,textbook:'健康经济与政策',lastMesTime:"8-28"},
           {name:'个人小组',id:1235,lastMesTime:"8-28"},
           {name:'个人小组',id:1236,lastMesTime:"8-28"},
           {name:'个人小组',id:1237,lastMesTime:"8-28"},
           {name:'个人小组',id:1238,lastMesTime:"8-28"},
           {name:'个人小组',id:1239,lastMesTime:"8-28"},
           {name:'个人小组',id:1230,lastMesTime:"8-28"},
           {name:'个人小组',id:12311,lastMesTime:"8-28"},
           {name:'个人小组',id:12322,lastMesTime:"8-28"},
           {name:'个人小组',id:12333,lastMesTime:"8-28"},
           {name:'个人小组',id:12344,lastMesTime:"8-28"},
           {name:'个人小组',id:12355,lastMesTime:"8-28"},
           {name:'个人小组',id:12366,lastMesTime:"8-28"},
           {name:'第九轮教材申报讨论组123',id:12377,lastMesTime:"去年"}],
            filelist:[],
            newGroupData : {
              headImage:null,
              name:null
            },
       }
    },
    computed:{
      ...mapGetters([
        'sidebarFlod'
      ])
    },
    components:{
      beautyScroll
    },
    methods:{
      clickGroup(group){
        this.currentActiveGroupId = group.id;
        this.$emit('clickItem',group)
      },
      /*点击新建小组按钮*/
      addNew(){
        this.dialogVisible = !this.dialogVisible
      },
      /*小组头像上传成功后的回调*/
      handleAvatarSuccess(response, file, fileList){
        this.newGroupData.headImage = URL.createObjectURL(file.raw);
      },
      /* 初始化小组列表 */
      getGroupData(){
        console.log(this.$mySessionStorage.get('currentUser', 'json').pmphUserSessionId);
        this.$axios.get(this.groupListUrl,{
          params:{
            groupName:this.inputSearchGroup,
            sessionId:this.$mySessionStorage.get('currentUser', 'json').userSessionId

          },
        }).then(function(res){
          console.log(res);
          if(res.data.code==1){

          }
        }).catch(function(err){
          console.log(err);
        })
      }
    },
    watch:{
      /**
       * 当左侧导航栏收起或展开式要重新刷新beautyScroll
       */
      sidebarFlod(){
        this.$refs.beautyScroll.refresh(280);

      },
    },
    created(){
       this.getGroupData();
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
    padding: 10px 32px 10px 68px;
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
  }
  .lastMessageTime{
    position: absolute;
    right: 4px;
    top:20px;
    width: 30px;
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
    line-height: 36px;
    padding: 0 20px;
  }
  .addNewPopup .headImageWrapper{
    width: 100px;
    height: 100px;
    position: relative;
  }
  .headImageWrapper:hover .inputFileBtn{
    opacity: 0.5;
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
</style>

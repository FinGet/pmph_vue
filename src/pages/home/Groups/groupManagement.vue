<template>
  <div class="groupmanage" ref="groupmanage" :style="{height:wrapperHeight+'px'}">
    <el-row class="groupmanage-row">
      <el-col :span="grouplistColDefaultWidth" class="border-right-1 groupmanage-col">
        <Groups-list @clickItem="setGroupName" @getGroupList="getGroupList"></Groups-list>
      </el-col>
      <el-col :span="chartColDefaultWidth" class="groupmanage-col" v-if="currentGroupId">
        <div class="groupmanageHead">
          <div class="currentGroupName">
            <p>{{currentGroup.groupName?currentGroup.groupName:'人卫社小组'}} <span v-if="currentGroup.bookName">({{currentGroup.bookName}})</span>  </p>
          </div>
          <ul class="grouptab clearfix">
            <li v-for="(tab,index) in tabs"
                @click="changeTab(index,tab.view)"
                :key="tab.type"
                :class="{active:currentActive===index}"
                v-show="tab.view=='GroupChat'||tab.view=='GroupFile'||(tab.view=='GroupSetting'&&(crurrentMemberInfo.isSystemAdmin||crurrentMemberInfo.isFounder))||(tab.view=='GroupMembers'&&(crurrentMemberInfo.isSystemAdmin||crurrentMemberInfo.isFounder||crurrentMemberInfo.isAdmin))"
            >
              {{tab.type}}
              <span class="filesNumber" v-if="tab.type==='文件共享'&&currentGroup.filesNumber">{{currentGroup.filesNumber}}</span>
            </li>

          </ul>
        </div>
        <div
          class="groupmanageMainContainer"
          ref="groupmanageMainContainer"
          :style="{height:wrapperHeight-80+'px'}"
        >
        <transition name="fade" mode="out-in">
          <component :is="currentView" :currentGroup="currentGroup" :currentGroupList="currentGroupList" :crurrentMemberInfo="crurrentMemberInfo" :groupId.sync="currentGroupId" @refeshMember="refreshMember" :isrefreshMange='isrefreshMange'></component>
        </transition>
        </div>
        <!--<button @click="fold"></button>-->
      </el-col>
      <el-col :span="memberColDefaultWidth" class="groupmanage-col  groupmanageMembershap" v-if="currentGroupId">
        <MembersList
          @refreshMange="refreshMange"
          :refreshMember.sync="isrefreshMember"
          @getGroupMemberList="getGroupMemberList"
          :groupId.sync="currentGroupId"
          :bookId.sync = "currentGroup.bookId"
          :crurrentMemberInfo="crurrentMemberInfo"
        ></MembersList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GroupsList from 'components/group/GroupsList'
  import GroupChat from 'components/group/GroupChat'
  import MembersList from 'components/group/MembersList'
  const GroupFile = () => import('components/group/GroupFile');
  const GroupSetting = () => import('components/group/GroupSetting');
  const GroupMembers = () => import('components/group/GroupMembers');
  import bus from 'common/eventBus/bus.js'
  export default {
    data() {
      return {
        currentGroupId:'',
        wrapperHeight:600,
        foldRightCol:false,
        grouplistColDefaultWidth:5,
        chartColDefaultWidth:15,
        memberColDefaultWidth:4,
        currentActive: 0, // 当前tab
        currentView: 'GroupChat',
        currentGroup:{
          groupImage: "",
          groupName:"",
          bookName:'',
          bookId:'',
          id:null,
          filesNumber:0,
          isMember:''
        },
        currentGroupList:[],
        crurrentMemberList:[],
        isrefreshMember:false,
        isrefreshMange:false,
        tabs:[
          {type:'互动交流',view:'GroupChat'},
          {type:'文件共享',view:'GroupFile'},
          {type:'成员管理',view:'GroupMembers'},
          {type:'小组设置',view:'GroupSetting'},
        ]
      }
    },
    computed:{
      crurrentMemberInfo(){
        let userId= this.$getUserData().userInfo.id;
        let loginType= this.$getUserData().userInfo.loginType;
        let info = {
            id: undefined,
            groupId: undefined,
            userId: userId,
            userType: loginType,
            avatar: undefined,
            isWriter: true,
            isFounder: false,
            isAdmin: false,
            isSystemAdmin:!!this.$getUserData().userInfo.isAdmin,
            displayName: undefined
          };
        this.crurrentMemberList.forEach(function(item){
          if(item.userId==userId&&item.userType==loginType){
            info.id = item.id;
            info.groupId = item.groupId;
            info.avatar = item.avatar;
            info.isWriter = item.isWriter;
            info.isFounder = item.isFounder;
            info.isAdmin = item.isAdmin;
            info.displayName = item.displayName;
          }
        });
        return info;
      },
    },
    created(){
      //组件创建后，初始化三列展示区的宽度
      var self = this;
      var clientHeight = document.documentElement.clientHeight;
      var clientWidth = document.documentElement.clientWidth;
      if(clientWidth>1700){
        this.grouplistColDefaultWidth=4;
        this.chartColDefaultWidth=17;
        this.memberColDefaultWidth=3;
      }else{
        this.grouplistColDefaultWidth=5;
        this.chartColDefaultWidth=15;
        this.memberColDefaultWidth=4;
      }
      this.wrapperHeight = clientHeight-68;
      window.onresize=()=>{
        var clientHeight = document.documentElement.clientHeight;
        var clientWidth = document.documentElement.clientWidth;
        self.wrapperHeight = clientHeight-68;
        if(clientWidth>1700){
          self.grouplistColDefaultWidth=4;
          self.chartColDefaultWidth=17;
          this.memberColDefaultWidth=3;
        }else{
          this.grouplistColDefaultWidth=5;
          this.chartColDefaultWidth=15;
          this.memberColDefaultWidth=4;
        }
      }

      if(window._hmt){
        _hmt.push(['_trackPageview', '/group']);
      }
    },
    mounted(){
      bus.$on('group-file:add',this.currentGroupFileNumberAdd)
      bus.$on('group-file:set',this.currentGroupFileNumberReset)
    },
    methods:{
      fold(){//展开与收起右侧成员列表
          this.foldRightCol=!this.foldRightCol;
      },
      // tab切换 添加active类
      changeTab(index,view) {
        this.currentActive = index
        this.currentView = view
      },
      refreshMember(){
        this.isrefreshMember=!this.isrefreshMember;
      },
      setting(){//点击成员列表下的setting图标按钮

      },
      setGroupName(group) {
        this.currentGroupId =group.id;
        console.log(this.currentGroupId)
        for(let key in this.currentGroup){
          this.currentGroup[key] = group[key]
        }
      },
      refreshMange(){
       this.isrefreshMange=!this.isrefreshMange;
      },
      /**
       * 获取小组列表
       * @param groupList
       */
      getGroupList(groupList){
        this.currentGroupList=groupList;
        this.currentGroupId=this.currentGroupList[0].id;
        console.log("获取小组列表"+this.currentGroupId);
      },
      /**
       * 获取当前小组成员列表
       * @param memberList
       */
      getGroupMemberList(memberList){
        this.crurrentMemberList=memberList;
      },
      currentGroupFileNumberAdd(){
        this.currentGroup.filesNumber++;
      },
      currentGroupFileNumberReset(n){
        this.currentGroup.filesNumber = n;
      }
    },
    watch:{
      /**
       * 当切换小组时，默认跳转到聊天窗口
       */
      currentGroupId(){
        this.currentActive = 0;
        this.currentView = 'GroupChat';
        console.log("当切换小组时，默认跳转到聊天窗口"+this.currentGroupId);
      },
    },
    components:{
      GroupsList,
      GroupChat,
      GroupFile,
      GroupSetting,
      MembersList,
      GroupMembers
    }
  }
</script>

<style scoped>

  .groupmanage{
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
  }
  .border-right-1{
    border-right: 1px solid #e6e7e8;
  }
  .groupmanage-row,.groupmanage-col{
    height: 100%;
    transition: all .28s;
    overflow: hidden;
    background-color:#F5F5F5;
  }
  .groupmanageHead{
    padding: 10px 30px 0;
    border-bottom: 1px solid #DCDBE0;
  }
  .groupmanageHead,.groupmanageHead>div{
    background: #F5F5F5 !important;
  }
  .currentGroupName{
    font-size: 16px;
    padding-bottom: 9px;
  }
  .groupmanageMembershap .groupmanageHead{
    padding: 36px 10px;
    border-bottom: 1px solid #e6e7e8;
  }
  .groupmanageMainContainer{
    border-right: 1px solid #e6e7e8;
  }
  .groupmanage .grouptab{
    width: 100%;
    background: none !important;
    border: none !important;
  }
  .grouptab li {
    float: left;
    text-align: left;
    cursor: pointer;
    padding:2px 18px;
    margin-right: 30px;
    padding-bottom: 8px;
  }
  .grouptab .active{
    border-bottom: 3px solid #1abb9c;
    margin-bottom: -2px;
    border-radius: 2px;
    background: rgba(0,0,0,.1);
  }


.filesNumber{
  display: inline-block;
  background: #1ABB9C!important;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  padding: 3px 6px;
  border-radius: 50%;
}
</style>

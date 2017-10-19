<template>
  <div class="groupmanage" ref="groupmanage" :style="{height:wrapperHeight+'px'}">
    <el-row class="groupmanage-row">
      <el-col :span="grouplistColDefaultWidth" class="border-right-1 groupmanage-col">
        <Groups-list @clickItem="setGroupName"></Groups-list>
      </el-col>
      <el-col :span="chartColDefaultWidth" class="groupmanage-col">
        <div class="groupmanageHead">
          <div class="currentGroupName">
            <p>{{currentGroup.groupName?currentGroup.groupName:'人卫社小组'}} <span v-if="currentGroup.textbook">({{currentGroup.textbook}})</span>  </p>
          </div>
          <ul class="tab clearfix">
            <li v-for="(tab,index) in tabs" @click="changeTab(index,tab.view)" :key="tab.id" :class="{active:currentActive===index}">
              {{tab.type}}
            </li>
          </ul>
        </div>
        <div
          class="groupmanageMainContainer"
          ref="groupmanageMainContainer"
          :style="{height:wrapperHeight-80+'px'}"
        >
          <component :is="currentView" :currentGroup="currentGroup"></component>
        </div>
        <!--<button @click="fold"></button>-->
      </el-col>
      <el-col :span="memberColDefaultWidth" class="groupmanage-col  groupmanageMembershap">
        <MembersList @addNewMember="addNewMember" :groupId.sync="currentGroupId"></MembersList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GroupsList from 'components/group/GroupsList'
  import GroupChat from 'components/group/GroupChat'
  import GroupFile from 'components/group/GroupFile'
  import GroupSetting from 'components/group/GroupSetting'
  import MembersList from 'components/group/MembersList'
  import GroupMembers from 'components/group/GroupMembers'
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
          textbook:'',
          id:13
        },
        tabs:[
          {type:'互动交流',view:'GroupChat'},
          {type:'文件共享',view:'GroupFile'},
          {type:'小组设置',view:'GroupSetting'},
          {type:'成员管理',view:'GroupMembers'}
        ]
      }
    },
    computed:{

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
      setting(){//点击成员列表下的setting图标按钮

      },
      setGroupName(group) {
        this.currentGroupId =group.id;
        for(let key in this.currentGroup){
          this.currentGroup[key] = group[key]
        }
      },
      addNewMember(){

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
    padding-bottom: 16px;
  }
  .groupmanageMembershap .groupmanageHead{
    padding: 36px 10px;
    border-bottom: 1px solid #e6e7e8;
  }
  .groupmanageMainContainer{
    border-right: 1px solid #e6e7e8;
  }
  .tab{
    width: 100%;
  }
  .tab li {
    float: left;
    text-align: left;
    cursor: pointer;
    padding:2px 18px;
    margin-right: 30px;
    padding-bottom: 8px;
  }
  .tab .active{
    border-bottom: 3px solid #1abb9c;
    margin-bottom: -2px;
    border-radius: 2px;
    background: rgba(0,0,0,.1);
  }



</style>

<template>
	<div class="sildbar-wrapper">
    <div class="userHead">
      <div>
        <img src="../common/images/logo-text.png" alt="">
      </div>
    </div>

    <el-menu :default-active="activeIndex" theme="dark" class="sildbar-list" unique-opened router>
      <el-menu-item index="/index" v-if="isShowSide(1)">
        <i class="fa fa-home fa-fw"></i>
        <span slot="title">个人中心(首页)</span>
      </el-menu-item>
      <el-menu-item index="/materialrouter/materials" v-if="isShowSide(2)">
        <i class="fa fa-book fa-fw"></i>
        <span slot="title">教材申报</span>
      </el-menu-item>
      <!--<el-menu-item index="/auth/writers" v-if="isShowSide(3)">-->
        <!--<i class="fa fa-university fa-fw"></i>-->
        <!--<span slot="title">学校/教师审核</span>-->
      <!--</el-menu-item>-->
      <el-menu-item index="/groupmanage" v-if="isShowSide(4)">
        <i class="fa fa-group fa-fw"></i>
        <span slot="title">我的小组</span>
      </el-menu-item>
      <el-menu-item index="/message/messagelist" v-if="isShowSide(5)">
        <i class="fa fa-comments-o fa-fw"></i>
        <span slot="title">系统消息</span>
      </el-menu-item>
      <!--<el-menu-item index="1" v-if="isShowSide(6)">-->
        <!--<i class="fa fa-file-text-o fa-fw"></i>-->
        <!--<span slot="title">系统日志</span>-->
      <!--</el-menu-item>-->

      <el-submenu index="/content" v-if="isShowSide(16)">
        <template slot="title">
          <i class="fa fa-user-plus fa-fw"></i>
          <span slot="title">内容管理</span>
        </template>
        <el-menu-item index="/content/publish" v-if="isShowSide(18)">内容发布</el-menu-item>
        <el-menu-item index="/content/exam" v-if="isShowSide(19)">内容审核</el-menu-item>
        <el-menu-item index="/content/set" v-if="isShowSide(20)">栏目设置</el-menu-item>
      </el-submenu>
      <el-submenu index="/book" v-if="isShowSide(17)">
        <template slot="title">
          <i class="fa fa-user-plus fa-fw"></i>
          <span slot="title">出版图书</span>
        </template>
        <el-menu-item index="/book/manage" v-if="isShowSide(21)">图书管理</el-menu-item>
        <el-menu-item index="/book/comment" v-if="isShowSide(22)">评论审核</el-menu-item>
      </el-submenu>

      <el-submenu index="/userrouter" v-if="isShowSide(7)">
        <template slot="title">
          <i class="fa fa-user-plus fa-fw"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/user/pmph" v-if="isShowSide(9)">社内用户</el-menu-item>
        <el-menu-item index="/user/writer" v-if="isShowSide(10)">作家用户</el-menu-item>
        <el-menu-item index="/user/org" v-if="isShowSide(11)">机构用户</el-menu-item>
      </el-submenu>
      <el-submenu index="10" v-if="isShowSide(8)">
        <template slot="title">
          <i class="fa fa-cog fa-fw"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/set/roles" v-if="isShowSide(12)">角色</el-menu-item>
        <!-- <el-menu-item index="/set/authority">权限</el-menu-item> -->
        <!-- <el-menu-item index="10-3">菜单</el-menu-item> -->
        <el-menu-item index="/set/area" v-if="isShowSide(13)">地区</el-menu-item>
        <el-menu-item index="/set/orgs" v-if="isShowSide(14)">院校机构</el-menu-item>
        <el-menu-item index="/set/departments" v-if="isShowSide(15)">社内部门</el-menu-item>
      </el-submenu>
    </el-menu>

	</div>
</template>

<script>
  export default {
    props:{
      sidebarFlod:{
        type:Boolean,
        default:true,

      }
    },
    data() {
      return {
        userLevel:0,
        activeIndex:'/index',
        PermissionIds:[],
      };
    },
    methods:{
      //用户信息级别初始化
       initUserInfo(){
         if(this.$mySessionStorage.get('currentUser')){
          // console.log(this.$mySessionStorage.get('currentUser','json').pmphUserPermissionIds);
           this.PermissionIds = this.$mySessionStorage.get('currentUser','json').pmphUserPermissionIds;
         }
       },
       //判断是否显示导航栏
       isShowSide(num){
         var isShow=false;
         this.PermissionIds.forEach(function(item) {
           if(item==num){
             isShow=true;
           }
         });
         return isShow;
       },
       //初始化列表active状态
       initActiveIndex(){
        // console.log(this.$router.currentRoute);
         var str =this.$router.currentRoute.path.split('/')[1];
         this.activeIndex=this.$router.currentRoute.path;
        /*  if(str=='userrouter'){
            this.activeIndex=this.$router.currentRoute.path;
         } */
         if(str=='materialrouter'){
           this.activeIndex='/materialrouter/materials';
         }
         if(str=='auth'){
           this.activeIndex='/auth/writers';
         }
         if(str=='message'){
           this.activeIndex='/message/messagelist';
         }

       },
       //列表显示权限初始化
       initSideiShow(num){

       }
    },
    watch:{
       '$route':'initActiveIndex'
    },
    created(){
      this.initUserInfo();
      this.initActiveIndex();
    }
  }
</script>

<style>
  .sildbar-wrapper{
    width: 220px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
    z-index: 10;

  }
  .userHead{
    padding: 20px 0 30px;
  }
  .userHead>div{
    margin-left: -14px;
  }
  .userHead img {
    display: block;
    margin: 0 auto;
  }
  .icon {
    position: absolute;
    left: 210px;
    top: 3px;
    font-size: 30px;
    color: #2a3f54;
    line-height: 30px;
    cursor: pointer;
    transform: rotate(180deg);
    transition: all 0.4s;
  }
  .icon.isCollapse{
    transform: rotate(-180deg);
    transition: all 0.4s;
  }
  .sildbar-list{
    padding-bottom: 50px;
  }
</style>

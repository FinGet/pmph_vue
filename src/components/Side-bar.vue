<template>
	<div class="sildbar-wrapper">
    <div class="userHead">
      <div>
        <img src="../common/images/logo-text.png" alt="">
      </div>
    </div>

    <el-menu :default-active="activeIndex" theme="dark" class="sildbar-list" unique-opened router>
      <el-menu-item index="/index">
        <i class="fa fa-home fa-fw"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/materialrouter/materials">
        <i class="fa fa-book fa-fw"></i>
        <span slot="title">规划教材申报</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="fa fa-university fa-fw"></i>
        <span slot="title">学校/教师审核</span>
      </el-menu-item>
      <el-menu-item index="/groupmanage" v-if="userLevel<=4">
        <i class="fa fa-group fa-fw"></i>
        <span slot="title">小组功能</span>
      </el-menu-item>
      <el-menu-item index="/messagelist" v-if="userLevel<=3">
        <i class="fa fa-comments-o fa-fw"></i>
        <span slot="title">系统消息</span>
      </el-menu-item>
      <el-menu-item index="1" v-if="userLevel<=2">
        <i class="fa fa-file-text-o fa-fw"></i>
        <span slot="title">系统日志</span>
      </el-menu-item>
      <el-submenu index="/userrouter" v-if="userLevel<=1">
        <template slot="title">
          <i class="fa fa-user-plus fa-fw"></i>
          <span slot="title">用户信息管理</span>
        </template>
        <el-menu-item index="/user/pmph">社内用户</el-menu-item>
        <el-menu-item index="/user/writer">作家用户</el-menu-item>
        <el-menu-item index="/user/org">机构用户</el-menu-item>
      </el-submenu>
     <!--  <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-user-times fa-fw"></i>
          <span slot="title">教材纠错</span>
        </template>
        <el-menu-item index="4-1">纠错审核</el-menu-item>
        <el-menu-item index="4-2">纠错记录</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-pencil fa-fw"></i>
          <span slot="title">选题申报</span>
        </template>
        <el-menu-item index="5-1">申报审核</el-menu-item>
        <el-menu-item index="5-2">进度查询</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-shopping-cart fa-fw"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="6-1">商品同步</el-menu-item>
        <el-menu-item index="6-2">评论管理</el-menu-item>
        <el-menu-item index="6-3">微视频管理</el-menu-item>
        <el-menu-item index="6-4">图书附件审核</el-menu-item>
        <el-menu-item index="6-5">图书信息维护</el-menu-item>
        <el-menu-item index="6-6">教材目录管理</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-pencil-square-o fa-fw"></i>
          <span slot="title">内容管理</span>
        </template>
        <el-menu-item index="7-1">文章栏目</el-menu-item>
        <el-menu-item index="7-2">文章管理</el-menu-item>
        <el-menu-item index="7-3">广告管理</el-menu-item>
      </el-submenu> -->
      <!-- <el-submenu index="8">
        <template slot="title">
          <i class="fa fa-sticky-note-o fa-fw"></i>
          <span slot="title">问卷调查</span>
        </template>
        <el-menu-item index="8-1">问卷设置</el-menu-item>
        <el-menu-item index="8-2">问卷列表</el-menu-item>
      </el-submenu> -->
      <!-- <el-submenu index="9">
        <template slot="title">
          <i class="fa fa-bar-chart fa-fw"></i>
          <span slot="title">查询统计</span>
        </template>
        <el-menu-item index="9-1">用户统计</el-menu-item>
        <el-menu-item index="9-2">流量统计</el-menu-item>
      </el-submenu> -->
      <el-submenu index="10" v-if="userLevel==0">
        <template slot="title">
          <i class="fa fa-cog fa-fw"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="10-1">角色管理</el-menu-item>
        <el-menu-item index="10-2">权限管理</el-menu-item>
        <el-menu-item index="10-3">功能菜单管理</el-menu-item>
        <el-menu-item index="10-4">日志管理</el-menu-item>
        <el-menu-item index="10-5">数据字典</el-menu-item>
        <el-menu-item index="10-6">密码管理</el-menu-item>
        <el-menu-item index="10-7">积分管理</el-menu-item>
      </el-submenu>


<!--       <el-submenu index="12">
        <template slot="title">
          <i class="fa fa-pie-chart fa-fw"></i>
          <span slot="title">基础数据维护</span>
        </template>
        <el-menu-item index="12-1">区域信息维护</el-menu-item>
        <el-menu-item index="12-2">院校信息维护</el-menu-item>
        <el-menu-item index="12-3">社内部门维护</el-menu-item>
        <el-menu-item index="12-4">敏感词维护</el-menu-item>
        <el-menu-item index="12-5">标签管理</el-menu-item>
      </el-submenu> -->

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
      };
    },
    methods:{
      //用户信息级别初始化
       initUserInfo(){
         if(sessionStorage.getItem('currentUser')!=null){
           var user =JSON.parse(sessionStorage.getItem('currentUser'));
              this.userLevel=user.level;

         }else{
           this.$router.push('/login');
         }
       },
       //初始化列表active状态
       initActiveIndex(){
         var str =this.$router.currentRoute.path.split('/')[1];
         this.activeIndex=this.$router.currentRoute.path;
        /*  if(str=='userrouter'){
            this.activeIndex=this.$router.currentRoute.path;
         } */
         if(str=='materialrouter'){
           this.activeIndex='/materialrouter/materials';
         }

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

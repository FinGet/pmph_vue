<template>
  <div class="app-wrapper" :class="{sidebarFlod:!sidebarFlod}">
    <div class="sidebar-wrapper" @click="sidebarWrapperClick">
      <Side-bar :sidebarFlod="sidebarFlod"></Side-bar>
    </div>
    <div class="controlSideBarBtn" @click="toggleSideBarBtnFold">
      <span></span>
    </div>
    <div class="nav-top">
      <div class="nav-top-user">
        <Message-icon></Message-icon>
        <User :userData="userData"></User>
      </div>
      <div class="breadcrumb-wrapper">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="app-main" ref="main">
      <div class="app-main-inner"  :class="{'app_main_border':isShowBorder}">

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div class="back_to_top" v-if="isShowBackTop"  @click="backToTop"></div>
    </div>
  </div>
</template>

<script>
  import SideBar from 'components/Side-bar'
  import MessageIcon from 'components/Message-icon'
  import User from 'components/User';
  import {mapGetters} from 'vuex'
  import Breadcrumb from 'components/Breadcrumb'
  import createWebsocket from 'common/mixins/createWebsocket'
  export default {
    mixins:[createWebsocket],
    data() {
      return {
        isShowBackTop:false,
        isShowBorder:true
      }
    },
    computed:{
      ...mapGetters([
        'sidebarFlod'
      ]),
      userData(){
        return this.$getUserData().userInfo;
      },
    },
    methods: {
      toggleSideBarBtnFold(){
        this.$store.commit("TOGGLE_SILDBAR");
      },
      sidebarWrapperClick(){
        if(!this.sidebarFlod){
          this.$store.commit("TOGGLE_SILDBAR");
        }
      },
      backToTop(){
        this.$refs['main'].scrollTop=0;
      },
      //回到顶部事件初始化
      initBackTop(){
        var _this=this;
        this.$refs['main'].onscroll=function(){
          //  console.log(_this.$refs['main'].scrollTop,_this.$refs['main'].offsetHeight);
          if(_this.$refs['main'].scrollTop>=_this.$refs['main'].offsetHeight){

            _this.isShowBackTop=true;
          }else{
            _this.isShowBackTop=false;
          }

        }
      },
      initIsShowBorder(){
       // console.log(this.$router.currentRoute);
            var str=this.$router.currentRoute.fullPath.split('/')[1];
            this.isShowBorder=true;
        if(str=='materialrouter'||str=='groupmanage'||str=='auth'){
          this.isShowBorder=false;
        }
        if(this.$router.currentRoute.name=="通知列表"){
          this.isShowBorder=true;
        }

      }
    },
    components:{
      SideBar,
      User,
      MessageIcon,
      Breadcrumb,
    },
    created(){

    },
    mounted(){

      this.initBackTop();
      this.initIsShowBorder()

    },
    watch:{
      '$route':'initIsShowBorder'
    }
  }
</script>

<style>
  .app-wrapper{
    position: relative;
    height: 100%;
  }

  .sidebar-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 200px;
    background-color: #2a3f54;
    z-index: 1001;
    overflow: hidden;
    transition: all .28s ease-out;
  }
  .app-main{
    position: relative;
    height: calc(100% - 38px) ;
    transition: all .28s ease-out;
    margin-left: 200px;
    margin-top: 38px;
    padding:15px 20px;
    transition: all .3s;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .app-main .back_to_top{
    position: fixed;
    width:46px;
    height: 46px;
    right:30px;
    bottom:60px;
    background: url('../common/images/back_to_top.png')no-repeat 100%;
    background-position: 0px 0px;
    z-index: 999;
    transition: all .3s;
  }
  .app-main .back_to_top:hover{
    background-position: 0px -46px;
  }
  .app-main-inner{
    min-height: 100%;
    float:left;
    width:100%;
    box-sizing: border-box;
  }
  .app_main_border{
      border: 1px solid rgb(209, 217, 229);
      padding:15px 20px;
      background: #fff;
      min-height: 100%;
  }
  .nav-top{
    height:38px;
    width: 100%;
    line-height: 38px;
    text-align: left;
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
    background-color: #ededed;

  }
  .nav-top-user{
    float: right;
    margin-right: 38px;
  }
  .breadcrumb-wrapper{
    display: inline-block;
    margin-left: 220px;
    transition: all 0.28s;
  }
  .app-wrapper.sidebarFlod .breadcrumb-wrapper{
    margin-left: 84px;
  }
  .controlSideBarBtn{
    position: fixed;
    bottom: 20px;
    left: 148px;
    padding: 5px;
    font-size: 0;
    z-index: 1003;
    transform: rotate(180deg);
    transition: all 0.28s;
    cursor: pointer;
    background-color: rgba(255,255,255,.3);
    background-position: center center;
    border-radius: 50%;
  }
  .controlSideBarBtn>span{
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 15px;
    background-image:url(../common/images/right_arrow.png) ;
    background-size: cover;

  }
  .controlSideBarBtn:hover{
    background-color: rgba(255,255,255,.5);
  }
  .app-wrapper.sidebarFlod .controlSideBarBtn{
    transform: rotate(-360deg);
    left: 12px;
    transition: all 0.28s;
  }
  .app-wrapper.sidebarFlod .app-main{
    margin-left: 64px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper{
    width: 64px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-submenu__title span{
    display: none;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-menu-item span{
    display: none;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-submenu .el-menu{
    height: 0;
    overflow: hidden;
  }
  /*鼠标悬浮*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover{*/
  /*width: 200px;*/
  /*}*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover .el-submenu__title span{*/
  /*display: inline-block;*/
  /*}*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover .el-submenu .el-menu{*/
  /*height: auto;*/
  /*overflow: auto;*/
  /*}*/
  /*鼠标悬浮end*/

  /*导航展开列样式*/
  .sidebar-wrapper li.el-submenu.is-opened{
    position: relative;
  }
  .sidebar-wrapper li.el-submenu:after{
    content: ' ';
    display: none;
    width: 8px;
    height:0;
    position: absolute;
    right: 0;
    top:0;
    background: #1abb9c;
    z-index: 1;
    transition: all .28s;
  }
  .sidebar-wrapper li.el-submenu.is-opened:after{
    display: inline-block;
    height:100%;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper li.el-submenu:after{
    right: 136px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper:hover li.el-submenu:after{
    right: 0;
  }

  #cas{
    position: absolute;
    left: 0;
    top:0;
    width: 200px;
    height: 100%;
    z-index: 0;
  }
</style>

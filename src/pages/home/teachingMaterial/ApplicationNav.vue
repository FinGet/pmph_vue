<template>
	<div class="application_nav">
      <div class="tab_nav_outbox" v-if="!$router.currentRoute.meta.hideTabs">
        <el-button type="text"  class="back_button" icon="arrow-left" @click="$router.go(-1)">返回</el-button>
        <el-tabs type="border-card" v-model="activeTagName" class="tab_nav" :class="{tab_active_first:activeFirst,tab_active_last:activeLast}" @tab-click="routerChange" v-if="!$router.currentRoute.meta.isShowTags">
          <el-tab-pane label="申报表审核" class="list_1" name="presscheck"></el-tab-pane>
          <el-tab-pane label="职位遴选" name="1v3"></el-tab-pane>
          <!--<el-tab-pane label="项目编辑视图" name="1v2"></el-tab-pane>-->
          <!--<el-tab-pane label="策划编辑视图" name="1v1"></el-tab-pane>-->
          <el-tab-pane label="结果统计" name="result"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="header_title_tips" v-if="!$router.currentRoute.meta.hideTabs">
        <p >{{title}}</p>
        <div class="tips_icon"></div>
      </div>
		<div class="bottom_tab_content" ref="bottom_tab_content" :style="{'min-height':contentH}">

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
		</div>
	</div>
</template>

<script type="text/ecmascript">
export default {
	data() {
		return {
      activeTagName:'presscheck',
      activeFirst:false,
      activeLast:false,
           contentH:'auto',
           isShowTabs:true,
      title:'全国高等学校五年制临床医学专业第九轮规划教材',
		}
	},
	methods: {
    routerChange(tag) {
      this.$router.push(this.activeTagName);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
    },
    initActiveTag(val){
     this.activeFirst=false;
     this.activeLast=false;
     if(val=='presscheck'){
       this.activeFirst=true;
     }
     else if(val=='1v1'){
      this.activeLast=true;
     }
    }
  },
  watch:{
    activeTagName(newval,old){
         this.initActiveTag(newval);
    }
  },
  created() {
      // console.log(this.$router);
      this.initActiveTag(this.activeTagName);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
      if(this.$router.currentRoute.name=='新建通知'){
        this.title='新建通知'
      }else{
        this.title='全国高等学校五年制临床医学专业第九轮规划教材'
      }
      console.log(this.$route)
    },
  mounted(){
    //初始化页面高度，当页面内容很少时也要保证页面拉满整个屏幕
    var windowH = document.documentElement.clientHeight;
    this.contentH = windowH-100+'px';
  },
}
</script>

<style >
.application_nav{
   float: left;
   width:100%;
  position: relative;
}
.bottom_tab_content{
  background-color: #fff;
}
 .application_nav .tab_nav_outbox{
     float: left;
     width:100%;
     background-color: rgb(238, 241, 246);
     border: 1px solid rgb(209, 217, 229);
     box-sizing: border-box;
 }
 .application_nav .tab_nav_outbox .back_button{
     float:right;
     margin-right:20px;
     margin-left:20px;
     line-height: 20px;
 }
.application_nav .tab_nav{
	box-shadow: none;
    border-bottom:0;
    float: right;
    border:0;
    box-sizing: border-box;

}
.application_nav .tab_nav .el-tabs__nav{
  border-right:1px solid rgb(238, 241, 246);
   border-left:1px solid rgb(238, 241, 246);
}
.application_nav .tab_active_first .el-tabs__nav{
 border-left: 1px solid rgb(209, 217, 229);
}
.application_nav .tab_active_last .el-tabs__nav{
 border-right: 1px solid rgb(209, 217, 229);
}
.application_nav .tab_nav  .el-tabs__header{
    border-bottom:0 ;
}
.application_nav .tab_nav .el-tabs__nav .el-tabs__item{
    border-bottom: 1px solid rgb(209, 217, 229);
}
.application_nav .tab_nav .el-tabs__nav .is-active{
    border-bottom:0;
}
.application_nav .tab_nav .el-tabs__content{
	padding:0 ;
}
.application_nav .bottom_tab_content{
  border: 1px solid rgb(209, 217, 229);
  box-sizing: border-box;
  border-top:0;
  padding:15px 20px;
  float:left;
  width:100%;
  background-color: #fff;
}
.application_nav .header_title_tips{
    margin-bottom:15px;
    float:left;
    color:#fff;
    position: absolute;
    left:-8px;
    top:8px;
}
.application_nav .header_title_tips p{
    float:left;
    background-color: #12806b;
    font-size:16px;
    padding:2px 40px 2px 15px;
}
.application_nav .header_title_tips .tips_icon{
    border:4px solid #475669;
    position: absolute;
    left: 0;
    bottom:-8px;
    border-left-color:#fff;
    border-bottom-color:#fff;
}
</style>

<template>
	<div class="application_nav">
        <div class="tab_nav_outbox">
          <el-button type="text"  class="back_button" icon="arrow-left" @click="$router.go(-1)">返回</el-button>
          <el-tabs type="border-card" v-model="activeTagName" class="tab_nav" @tab-click="routerChange" v-if="!$router.currentRoute.meta.isShowTags">
            <el-tab-pane label="申报表审核" name="presscheck"></el-tab-pane>
            <el-tab-pane label="主任视图" name="1booksselect"></el-tab-pane>
            <el-tab-pane label="项目编辑视图" name="2booksselect"></el-tab-pane>
            <el-tab-pane label="策划编辑视图" name="3booksselect"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="header_title_tips">
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
           contentH:'auto',
           isShowTabs:true,
      title:'全国高等职业教育临床医学院',
		}
	},
	methods: {
    routerChange(tag) {
      /**
      *  因为要在遴选页面把主任视图，项目编辑视图，和策划编辑视图都显示出来，所以暂时先将跳转到booksselect的特殊处理下
      * */
      var path = this.activeTagName;
      var level = undefined;
      if(path.includes('booksselect')){
        level=parseInt(path);
        this.$router.push({path:'booksselect',query:{level:level}});
        return;
      }
      this.$router.push(this.activeTagName);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
    },
  },
  watch:{

  },
  created() {
      // console.log(this.$router);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
      if(this.$router.currentRoute.name=='新建遴选教材'){
        this.title='新建教材申报'
      }else{
        this.title='全国高等职业教育临床医学院'
      }
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

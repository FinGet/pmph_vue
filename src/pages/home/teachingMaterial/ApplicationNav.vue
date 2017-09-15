<template>
	<div class="application_nav">
        <div class="tab_nav_outbox">
		<el-tabs type="border-card" v-model="activeTagName" class="tab_nav" @tab-click="routerChange">
			<el-tab-pane label="申报表审核" name="presscheck"></el-tab-pane>
            <el-tab-pane label="教材遴选" name="booksselect"></el-tab-pane>
		</el-tabs>
        </div>
        <div class="header_title_tips">
          <p >全国高等职业教育临床医学院</p>
          <div class="tips_icon"></div>
      </div>
		<div class="bottom_tab_content">

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
			activeTagName:'presscheck'
		}
	},
	methods: {
    routerChange(tag) {
      this.$router.push(this.activeTagName);
    }
  },
  watch: {
    $route () {
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
    }
  },
}
</script>

<style >
.application_nav{
   float: left;
   width:100%;
  position: relative;
}
 .application_nav .tab_nav_outbox{
     float: left;
     width:100%;
     background-color: rgb(238, 241, 246);
     border: 1px solid rgb(209, 217, 229);
     box-sizing: border-box;
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
    background-color: #1F2D3D;
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

<template>
	<div class="application_list">
		<el-tabs type="border-card" v-model="activeTagName" class="tab_nav" @tab-click="routerChange">
			<el-tab-pane label="通知管理" name="noticemanage"></el-tab-pane>
			<el-tab-pane label="出版社审核" name="presscheck"></el-tab-pane>
			<el-tab-pane label="遴选主编/副主编"></el-tab-pane>
			<el-tab-pane label="分配策划编辑"></el-tab-pane>
			<el-tab-pane label="编委预选"></el-tab-pane>
			<el-tab-pane label="编委审核"></el-tab-pane>
			<el-tab-pane label="查询数据"></el-tab-pane>
		</el-tabs>
		<div class="bottom_tab_content">
<<<<<<< HEAD
            <div class="header_title_tips">
                <p >全国高等职业教育临床医学院</p>
                <div class="tips_icon"></div>
            </div>
<transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
=======
      <div class="header_title_tips">
        <p >全国高等职业教育临床医学院</p>
        <div class="tips_icon"></div>
      </div>
		<router-view></router-view>
>>>>>>> 14ce0aaedfa457f11dfb074feee5b586494df9e0
		</div>
	</div>
</template>

<script type="text/ecmascript">
export default {
	data() {
		return {
			activeTagName:'noticemanage'
		}
	},
	methods:{
		routerChange(tag){
<<<<<<< HEAD
             this.$router.push('/applicationrouter/applicationnav/'+tag.name);
=======
      this.$router.push(tag.name);
>>>>>>> 14ce0aaedfa457f11dfb074feee5b586494df9e0
		}
  },
  created(){
     // console.log(this.$router);
    this.activeTagName=this.$router.currentRoute.meta.applicationName;
  }
}
</script>

<style >
.application_list .tab_nav{
	box-shadow: none;
	border-bottom:0;
}
.application_list .tab_nav .el-tabs__content{
	padding:0 ;
}
.application_list .bottom_tab_content{
  border: 1px solid rgb(209, 217, 229);
  box-sizing: border-box;
  border-top:0;
  padding:15px 20px;
  float:left;
  width:100%;
}
.bottom_tab_content .header_title_tips{
    margin-bottom:15px;
    float:left;
    color:#fff;
    width:100%;
    position: relative;
    left:-28px;
}
.bottom_tab_content .header_title_tips p{
    float:left;
    background-color: #1F2D3D;
    font-size:16px;
    padding:2px 40px 2px 15px;
}
.bottom_tab_content .header_title_tips .tips_icon{
    border:4px solid #475669;
    position: absolute;
    left: 0;
    bottom:-8px;
    border-left-color:#fff;
    border-bottom-color:#fff;
}
</style>

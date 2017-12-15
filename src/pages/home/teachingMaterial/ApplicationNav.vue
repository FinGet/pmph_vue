<template>
	<div class="application_nav">
      <div class="tab_nav_outbox" v-if="!$router.currentRoute.meta.hideTabs">
        <el-button type="text"  class="back_button" icon="arrow-left" @click="$router.go(-1)">返回上一步</el-button>
        <el-tabs type="border-card" v-model="activeTagName" class="tab_nav" :class="{tab_active_first:activeFirst,tab_active_last:activeLast}" @tab-click="routerChange" v-if="!$router.currentRoute.meta.isShowTags">
          <el-tab-pane label="提交到出版社" name="presscheck-pmph"></el-tab-pane>
          <el-tab-pane label="申报表审核" class="list_1" name="presscheck"></el-tab-pane>
          <el-tab-pane label="角色遴选" name="1v3"></el-tab-pane>
          <el-tab-pane label="结果统计" name="result"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="header_title_tips" v-if="!$router.currentRoute.meta.hideTabs&&materialInfo.materialName">
        <p >{{materialInfo.materialName}}</p>
        <div class="tips_icon"></div>
      </div>
		<div class="bottom_tab_content" ref="bottom_tab_content" :style="{'min-height':contentH}">

      <transition name="fade" mode="out-in">
        <router-view :materialInfo="materialInfo"></router-view>
      </transition>
		</div>
	</div>
</template>

<script type="text/ecmascript">
export default {
	data() {
		return {
		  api_material_name:'/pmpheep/material/materialName',
      api_material_info:'/pmpheep/material/getMaterialMainInfoById',
      materialId:'',
      activeTagName:'presscheck',
      activeFirst:false,
      activeLast:false,
           contentH:'auto',
           isShowTabs:true,
      materialInfo:{
        materialName:'新建通知',
      }
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
     else if(val=='result'){
      this.activeLast=true;
     }
    },
    getMaterialData(){
      this.$axios.get(this.api_material_info,{params:{
        id:this.materialId
      }})
        .then(response=>{
          var res = response.data;
          if(res.code==1){
            res.data.hasPermission=(num)=>{
              return this.$commonFun.materialPower(num,res.data.myPower);
            };
            this.materialInfo = res.data
          }
        })
        .catch(e=>{
          console.log(e);
        })
    },

  },
  watch:{
    activeTagName(newval,old){
         this.initActiveTag(newval);
    },
    $route () {
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
    }
  },
  created() {
      // console.log(this.$router);
      this.initActiveTag(this.activeTagName);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;

      this.materialId = this.$route.params.materialId;

      if(this.$router.currentRoute.params.materialId=='new'){
        this.materialInfo.materialName='新建通知'
      }else{
        this.getMaterialData();
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
    padding:2px 20px 2px 15px;
    max-width:545px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

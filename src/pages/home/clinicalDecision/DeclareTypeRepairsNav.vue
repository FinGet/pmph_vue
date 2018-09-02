<template>
	<div class="clinicalDecision_router">
      <div class="tab_nav_outbox">
        <el-tabs type="border-card"  class="tab_nav" v-model="activeTagName"  @tab-click="handleClick">
          <el-tab-pane label="人卫临床助手"  name="first">
            <DeclareTypeRepairs :productType="t1"  ref="de1"></DeclareTypeRepairs>
          </el-tab-pane>
          <el-tab-pane label="人卫用药助手" name="second">
          <DeclareTypeRepairs :productType="t2"  ref="de2"></DeclareTypeRepairs>
          </el-tab-pane>
          <el-tab-pane label="人卫中医助手" name="third">
            <DeclareTypeRepairs :productType="t3"  ref="de3"></DeclareTypeRepairs>
          </el-tab-pane>

        </el-tabs>
      </div>



	</div>
</template>

<script type="text/ecmascript">
  import DeclareTypeRepairs from "./navContent/assistant/DeclareTypeRepairs";
export default {
	data() {
		return {
      contentH:'auto',
      activeTagName:'first',
      content:"content",
      t1:1,
      t2:2,
      t3:3
		}
	},
	methods: {
    handleClick(){

      if(this.activeTagName=="first"){
        console.log(this.$refs.de1);
        //this.$refs.de1.activeName = "content";
        //this.$refs.de1.getContentTableData();
        this.$refs.de1.getSubjectTableDataFun();
        this.$refs.de1.getBtnStatus();
      }else if(this.activeTagName == "second"){
        console.log(this.$refs.de3);
        //this.$refs.de2.activeName = "content";
        //this.$refs.de2.getContentTableData();
        this.$refs.de2.getSubjectTableDataFun();
        this.$refs.de2.getBtnStatus();
      }else{
        console.log(this.$refs.de3);
        //this.$refs.de3.activeName = "content";
        //this.$refs.de3.getContentTableData();
        this.$refs.de3.getSubjectTableDataFun();
        this.$refs.de3.getBtnStatus();
      }
    }

  },
  watch:{

  },
  created() {
    },
  mounted(){
    //初始化页面高度，当页面内容很少时也要保证页面拉满整个屏幕
    var windowH = document.documentElement.clientHeight;
    this.contentH = windowH-100+'px';

  },
  components:{
    DeclareTypeRepairs
  },

}
</script>

<style scoped>

</style>

<template>
	<div class="clinicalDecision_router">
      <div class="tab_nav_outbox">
        <el-tabs type="border-card"  class="tab_nav" v-model="activeTagName" >
          <el-tab-pane label="人卫临床助手"  name="1">
            <DeclareTypeRepairs :productType="activeTagName"></DeclareTypeRepairs>
          </el-tab-pane>
          <el-tab-pane label="人卫用药助手" name="2">
          <DeclareTypeRepairs :productType="activeTagName"></DeclareTypeRepairs>
          </el-tab-pane>
          <el-tab-pane label="人卫中医助手" name="3">
            <DeclareTypeRepairs :productType="activeTagName"></DeclareTypeRepairs>
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
      activeTagName:'1',
		}
	},
	methods: {
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

<template>
	<div class="clinicalDecision_router">
      <div class="tab_nav_outbox">
        <el-tabs type="border-card"  class="tab_nav" v-model="activeTagName" >
          <el-tab-pane label="人卫临床助手"  name="1">
            <ClinicalAssistant :productType="activeTagName"></ClinicalAssistant>
          </el-tab-pane>
          <el-tab-pane label="人卫用药助手" name="2">
          <MedicineAssistant :productType="activeTagName"></MedicineAssistant>
          </el-tab-pane>
          <el-tab-pane label="人卫中医助手" name="3">
            <ChineseMedicineAssistant :productType="activeTagName"></ChineseMedicineAssistant>
          </el-tab-pane>

        </el-tabs>
      </div>



	</div>
</template>

<script type="text/ecmascript">
  import bus from 'common/eventBus/bus.js'
  import ClinicalAssistant from "./navContent/assistant/ClinicalAssistant";
  import MedicineAssistant from "./navContent/assistant/MedicineAssistant";
  import ChineseMedicineAssistant from "./navContent/assistant/ChineseMedicineAssistant";
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
    ChineseMedicineAssistant,
    MedicineAssistant,
    ClinicalAssistant
  },

}
</script>

<style scoped>

</style>

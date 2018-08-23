<template>
	<div class="clinicalDecision_router">
      <div class="tab_nav_outbox">
        <el-tabs type="border-card"   v-model="activeTagName" ref="tabs" @tab-click="handleClick">
          <el-tab-pane label="申报表审核"  name="clinicalDecisionPressCheck">
            <clinical-decision-press-check :productType="product.productType" ref="clinicalDecisionPressCheck" v-if="isShow" @toExpertInfoData="toExpertInfoData"></clinical-decision-press-check>
            <ClinicalDecisionExpertInfo  ref="expert" v-if="!isShow" :expertInfoId="expertInfoId"></ClinicalDecisionExpertInfo>
          </el-tab-pane>
          <el-tab-pane label="结果统计" name="clinicalDecisionResult" v-if="isShowResultSituation">
            <result :productType="product.productType" ref="clinicalDecisionResult"></result>
          </el-tab-pane>

        </el-tabs>
      </div>



	</div>
</template>

<script type="text/ecmascript">
  import bus from 'common/eventBus/bus.js'
  import result from '../clinicalDecision/navContent/Result/index.vue'
  import ClinicalDecisionPressCheck from '../clinicalDecision/navContent/ClinicalDecisionPressCheck.vue'
  import ClinicalDecisionExpertInfo from "./navContent/ClinicalDecisionExpertInfo";
export default {
	data() {
		return {
      contentH:'auto',
      activeTagName:'clinicalDecisionPressCheck',
      productName:['','人卫临床助手','人卫用药助手','人卫中医助手'],
      isShow:true,
      isShowResultSituation:true,
       expertInfoId:'',
      product:{
        productType: this.$route.query.clinicalTabletype,

      },

		}
	},
	methods: {
    /*routerChange(tag) {
      this.$router.push(this.activeTagName);
      this.activeTagName = this.$router.currentRoute.meta.applicationName;
    }*/
    handleClick(){
      if(this.activeTagName=="clinicalDecisionPressCheck"){
        console.log(this.$refs.clinicalDecisionPressCheck);
        //this.$refs.clinicalDecisionPressCheck.getContentTableData();
      }else{
        console.log(this.$refs.clinicalDecisionResult);
        this.$refs.clinicalDecisionResult.getSubjectEchart();
        this.$refs.clinicalDecisionResult.getSubjectTableData();
      }
    },
    toExpertInfoData(id) {
      this.isShow = false;
      // 获取到信息
      this.expertInfoId = id;

    },
    isShowResultSituationFun(){
        //this.isShowResultSituation = false;
      this.hideTabs([1]);
    },
    hideTabs(childArray) {
      var _this = this;
      console.log(111);
      console.log(this.$refs.clinicalDecisionResult);
      childArray.forEach(iterm=>{
        //_this.$refs.clinicalDecisionResult.$children[iterm].$el.style.display = 'none';
      })

    }
  },
  watch:{
    expertInfoId(val, oldVal){//普通的watch监听
      console.log("expertInfo: "+val, oldVal);
     // this.getExpertInfoData();
    },
  },
  created() {

      if(window._hmt){
        _hmt.push(['_trackPageview', '/material-application']);
      }
      this.isShowResultSituationFun();
    },
  mounted(){
    //初始化页面高度，当页面内容很少时也要保证页面拉满整个屏幕
    var windowH = document.documentElement.clientHeight;
    this.contentH = windowH-100+'px';

  },
  components:{
    ClinicalDecisionExpertInfo,
    ClinicalDecisionPressCheck,result
  },

}
</script>

<style scoped>
  .clinicalDecision_router .el-tabs--border-card {
    border: 0;
    box-shadow: none;
  }
</style>

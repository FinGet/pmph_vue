<template>
	<div class="material-result">
    <div class="material-result-title clearfix  marginB20">
      <div class="pull-left paddingL100 result-title-tab">
        <span :class="{'active':isResultTotal}" @click="isResultTotal=true">申报情况统计</span>
        <span :class="{'active':!isResultTotal}" @click="isResultTotal=false">申报结果统计</span>
      </div>
      <div class="pull-right  result-title-tab paddingR20">
        <el-button type="text">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i>
          导出
        </el-button>
      </div>
    </div>

    <transition name="fade" mode="out-in">
    <div class="material-result-content" v-if="isResultTotal" id="result-admin1">
      <div class="result-content-head clearfix marginB20">
        <p>申报情况统计</p>
        <div class="pull-right paddingR20">
          <el-button type="text">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
            导出
          </el-button>
        </div>
      </div>
      <application-statistics></application-statistics>
    </div>
   </transition>
    <transition name="fade" mode="out-in">
    <div class="material-result-content" v-if="!isResultTotal" id="result-admin2">
      <div class="result-content-head clearfix marginB20">
        <p>申报结果统计</p>
        <div class="pull-right paddingR20">
          <el-button type="text">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
            导出
          </el-button>
        </div>
      </div>
      <result-statistics></result-statistics>
    </div>
    </transition>
	</div>
</template>

<script>
  import applicationStatistics from './ApplicationStatistics.vue';
  import resultStatistics from './ResultStatistics.vue'
	export default {
		data() {
			return {
        isResultTotal:true
      }
		},
    components:{
      applicationStatistics,
      resultStatistics
    }
	}
</script>

<style scoped>
.material-result-title{
  height: 60px;
  background-image: url(../../../../../common/images/book_bevel.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-color: #f9f9f9;
}
.result-title-tab{padding-top: 12px;}
.result-title-tab>span{
  display: inline-block;
  padding: 5px 15px;
  margin-right: 10px;
  border-radius: 6px;
  font-size: 16px;
  color:inherit;
  cursor: pointer;
}
.result-title-tab>span.active{
  background: #116dc2;
  color:#fff;
}
  .result-content-head{
    height:34px;
    line-height: 34px;
    background: #fdf2de;
  }
.result-content-head>p{
  position: relative;
  display: inline-block;
  padding: 0 120px 0 10px;
  background: #116dc2;
  font-size: 16px;
  color:#fff;
}
.result-content-head>p:after{
  content: "";
  position: absolute;
  right: 0;
  top:0;
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 17px solid transparent;
  border-right: 17px solid #fdf2de;
  border-bottom: 17px solid transparent;
}

</style>

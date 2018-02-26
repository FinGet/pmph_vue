<template>
	<div class="flow-page">
      <div class="page-title text-center">
        流量概况（ 2017-12-20 ）
      </div>

      <div class="flow-section">
        <div class="flow-title">
          <i class="fa  fa-area-chart fa-lg"></i>
          统计开通日期：2016-12-22
          <div class="pull-right fontsize-normal">
            <a class="link" href="https://tongji.baidu.com/web/24785489/homepage/index" target="_blank">点击查看更多统计数据 >></a>
          </div>
        </div>
        <div class="table-wrapper">
          <flow-today :startDate="20171220" :endDate="20180102"></flow-today>
        </div>
      </div>

      <div class="flow-section">
        <div class="flow-title">
          <i class="fa  fa-line-chart fa-lg"></i>
          流量趋势
        </div>
        <div class="paddingT20 paddingB20">
          <span>选择时间：</span>
          <div class="inline-block">
            <el-radio-group v-model="time" @change="changeSelectDate">
              <el-radio :label="0">今天</el-radio>
              <el-radio :label="1">昨日</el-radio>
              <el-radio :label="2">近48小时</el-radio>
              <el-radio :label="7">近7天(单位:小时)</el-radio>
              <el-radio :label="30">近30天(单位:小时)</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="flow-section">
          <ul class="clearfix panel-box">
            <li>
              <div>
                <flow-trend :startDate="startDate" :endDate="endDate"></flow-trend>
              </div>
            </li>
            <li>
              <div>
                <flow-topentry :startDate="startDate" :endDate="endDate"></flow-topentry>
              </div>
            </li>
            <li>
              <div>
                <flow-visitpage :startDate="startDate" :endDate="endDate"></flow-visitpage>
              </div>
            </li>
            <li>
              <div>
                <flow-visitortype :startDate="startDate" :endDate="endDate"></flow-visitortype>
              </div>
            </li>
          </ul>
        </div>
      </div>
	</div>
</template>

<script>
  import echarts from "../../../../static/echarts/echarts.common.min";
  import flowToday from './_components/flow-today.vue'
  import flowTrend from './_components/flow-trend.vue'
  import flowTopentry from './_components/flow-topentry.vue'
  import flowVisitpage from './_components/flow-visitpage.vue'
  import flowVisitortype from './_components/flow-visitortype.vue'
	export default {
		data() {
			return {
        time:0,
        timeline:(new Date()),
        endDate:this.$commonFun.getcurrentDate(this.timeline),
        startDate:this.$commonFun.getcurrentDate(this.timeline),
      }
		},
    components:{
      flowToday,
      flowTrend,
      flowTopentry,
      flowVisitpage,
      flowVisitortype
    },

    methods:{
      changeSelectDate(){

        let days = this.time*24*60*60*1000;
        if(this.time==1){
          this.endDate=this.$commonFun.getcurrentDate(this.timeline-days);
        }else{
          this.endDate=this.$commonFun.getcurrentDate(this.timeline)
        }
        this.startDate = this.$commonFun.getcurrentDate(this.timeline-days);

      },
    },
    created(){
    }
	}
</script>

<style scoped>
.flow-title{
  padding: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}
.flow-section{
  padding-bottom: 30px;
}
  .page-title{
    font-size: 18px;
  }
/*面板*/
.panel-box {
  overflow: hidden;
}
.panel-box > li {
  float: left;
  width: 50%;
  height: 400px;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.panel-box > li:nth-of-type(2n + 1) > div {
  margin: 10px 30px 0px 0;
}
.panel-box > li:nth-of-type(2n) > div {
  margin: 10px 0 0px 30px;
}
.panel-box > li > div {
  min-height: 200px;
  padding: 4px 0 0;
  border-top: 4px solid #e7eaec;
}
</style>

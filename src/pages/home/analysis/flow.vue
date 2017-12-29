<template>
	<div class="flow-page">
      <div class="page-title text-center">
        流量概况（ 2017-12-20 ）
      </div>

      <div class="flow-section">
        <div class="flow-title">
          <i class="fa  fa-area-chart fa-lg"></i>
          统计开通日期：2016-12-22
        </div>
        <div class="table-wrapper">
          <el-table
            ref="multipleTable"
            :data="tableData_1"
            border
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column label="统计日期"  prop="date" width="100"></el-table-column>
            <el-table-column label="浏览量(PV)"  align="center">
              <template scope="scope">{{scope.row.pv_count}}</template>
            </el-table-column>
            <el-table-column label="访客数(UV)"  align="center">
              <template scope="scope">{{scope.row.visitor_count}}</template>
            </el-table-column>
            <el-table-column label="IP数"  prop="ip_count"  align="center">
              <template scope="scope">{{scope.row.ip_count}}</template>
            </el-table-column>
            <el-table-column label="跳出率" align="center">
              <template scope="scope">{{scope.row.bounce_ratio}}{{scope.row.isObject?'':'%'}}</template>
            </el-table-column>
            <el-table-column label="转化次数"  prop="trans_countv"  align="center">
              <template scope="scope">{{scope.row.trans_countv}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-wrapper">
          <el-table
            ref="multipleTable"
            :data="tableData_2"
            border
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column label="统计日期"  prop="date" width="100"></el-table-column>
            <el-table-column label="当日回头访客(占比)"  prop="pv" align="center"></el-table-column>
            <el-table-column label="访问平均访问频度"  prop="uv" align="center"></el-table-column>
            <el-table-column label="平均访问时长"  prop="ip" align="center"></el-table-column>
            <el-table-column label="平均访问深度"  prop="shitiao" align="center"></el-table-column>
            <el-table-column label="人均浏览页数"  prop="num" align="center"></el-table-column>
          </el-table>
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
              <el-radio :label="1">今天</el-radio>
              <el-radio :label="2">昨日</el-radio>
              <el-radio :label="3">近48小时</el-radio>
              <el-radio :label="4">近7天(单位:小时)</el-radio>
              <el-radio :label="5">近30天(单位:小时)</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="echart-wrapper">
          <div id="echarts" style="width: 100%;height:600px;" ref="echarts"></div>
        </div>
      </div>
	</div>
</template>

<script>
  import echarts from "../../../../static/echarts/echarts.common.min";
	export default {
		data() {
			return {
			  api_flow:'/pmpheep/baidu/rpt/trend',
        tableData_1:[],
        tableData_2:[],
        time:1,
        metricsList:["date", "pv_count", "visitor_count", "ip_count", "bounce_ratio", "avg_visit_time", "trans_count"],
        searchParams:{
          pageSize:100,
          pageNum:1,
          method:'overview/getOutline',
          metrics:'pv_count,visit_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,contri_pv',
          startDate:'20171220',
          endDate:this.$commonFun.getcurrentDate(),
        },
        userTypeParams:{
          pageSize:100,
          pageNum:1,
          method:'visit/type/a',
          metrics:'',
          startDate:parseInt(this.$commonFun.getcurrentDate())-1+'',
          endDate:this.$commonFun.getcurrentDate(),
        }
      }
		},
    mounted(){
      var myChart = echarts.init(this.$refs.echarts);
		  var option = {
        title: {
          text: '流量趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['近7天']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'近7天',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          }
        ]
      };
      myChart.setOption(option);
    },
    methods:{
      /**
       * 获取数据
       */
      getData(params,callback){
        this.$axios.get(this.api_flow,{params:params})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              let data = JSON.parse(res.data);
              callback&&callback(data);
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      handleResultFlow(data){
        let tempdata = data.body.data[0].result.items;
        let tempList = [];
        tempdata.forEach((iterm,index)=>{
          let obj = {};
          this.metricsList.forEach((t,i)=>{
            if(iterm[0]=='预计今日'&&t!='date'){
              obj[t] = iterm[i]['val']
            }else if(iterm[0]=='历史峰值'&&t!='date'){
              obj[t] = (iterm[i]['val']?'值:'+iterm[i]['val']:'')+' | '+(iterm[i]['date']?'日期:'+iterm[i]['date']:'')
            }else{
              obj[t] = iterm[i]
            }
          });
          obj.isObject = ((typeof iterm[1]).toLowerCase() === 'object');
          tempList.push(obj);
        });
        this.tableData_1=tempList;
      },
      handleResultUserType(data){
        console.log(456,data)
      },
      /**
       * 当选择日期发生变化
       */
      changeSelectDate(){

      }
    },
    created(){
      this.getData(this.searchParams,this.handleResultFlow);
      this.getData(this.userTypeParams,this.handleResultUserType);
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
</style>

<template>
  <div class="book-flow-page">
    <div class="page-title text-center">
      图书流量概况（ 2017-12-20 ）
    </div>

    <div class="flow-section">
      <div class="flow-title">
        <i class="fa  fa-area-chart fa-lg"></i>
        统计开通日期：2016-12-22
      </div>

      <!--搜索-->
      <div class="clearfix paddingT30">
        <div class="searchBox-wrapper">
          <div class="searchName">书籍名称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>
      </div>

      <div class="table-wrapper">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column label="统计日期"  prop="date" width="100"></el-table-column>
          <el-table-column label="浏览次数(PV)"  prop="pv"></el-table-column>
          <el-table-column label="独立访问(UV)"  prop="uv"></el-table-column>
          <el-table-column label="IP"  prop="ip"></el-table-column>
          <el-table-column label="失跳率"  prop="shitiao"></el-table-column>
          <el-table-column label="访问次数"  prop="num"></el-table-column>
        </el-table>
      </div>
      <div class="table-wrapper">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column label="统计日期"  prop="date" width="100"></el-table-column>
          <el-table-column label="当日回头访客(占比)"  prop="pv"></el-table-column>
          <el-table-column label="访问平均访问频度"  prop="uv"></el-table-column>
          <el-table-column label="平均访问时长"  prop="ip"></el-table-column>
          <el-table-column label="平均访问深度"  prop="shitiao"></el-table-column>
          <el-table-column label="人均浏览页数"  prop="num"></el-table-column>
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
          <el-radio-group v-model="time">
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
        tableData:[{
          date:'今天',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        },{
          date:'昨天',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        },{
          date:'今天',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        }],
        time:1,
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

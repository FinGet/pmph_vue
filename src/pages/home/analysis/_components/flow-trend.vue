<template>
	<div class="flow-subpage-iterm">
    <div class="flow-subpage-iterm-title">
      趋势图:
    </div>
    <div class="data-min">
      <el-radio-group v-model="metrics" size="small" class="paddingT10" @change="typeChange">
        <el-radio-button label="pv_count">浏览量(pv)</el-radio-button>
        <el-radio-button label="visitor_count">访问数(uv)</el-radio-button>
        <el-radio-button label="ip_count">IP数</el-radio-button>
      </el-radio-group>
      <div id="echarts" style="width: 100%;height:316px;" ref="echarts"></div>
    </div>
	</div>
</template>

<script>
  import echarts from "../../../../../static/echarts/echarts.common.min";
	export default {
    props:['startDate','endDate'],
		data() {
			return {
        api_flow:'/pmpheep/baidu/rpt/trend',
        indicators:['pv_count','visit_count','visitor_count','ip_count','bounce_ratio','avg_visit_time','contri_pv'],
        searchParams:{
          pageSize:100,
          pageNum:1,
          siteId:'',
          method:'overview/getTimeTrendRpt',
          metrics:'pv_count',
          startDate:this.startDate,
          endDate:this.endDate,
        },
        metrics:'pv_count',
      }
		},
    watch:{
      startDate(){
        this.searchParams.startDate=this.startDate;
        this.searchParams.endDate=this.endDate;
        this.getData();
      },
      endDate(){
        this.searchParams.startDate=this.startDate;
        this.searchParams.endDate=this.endDate;
        this.getData();
      }
    },
    methods:{
      getData(){
        this.$axios.get(this.api_flow,{params:this.searchParams})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              let data = JSON.parse(res.data);
              this.handleResultFlow(data);
            }else{
              self.$confirm(res.msg.msgTrim(), "提示",{
              	confirmButtonText: "确定",
              	cancelButtonText: "取消",
              	showCancelButton: false,
              	type: "error"
              });
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      handleResultFlow(data){
        let tempdata = data.body.data[0].result.items;

        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
          },
          grid: {
//            left: '3%',
//            right: '4%',
//            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'值：',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[]
            }
            ]
        };
        tempdata[0].forEach((iterm,index)=>{
          option.xAxis.data[index] = iterm[0]
        });
        tempdata[1].forEach((iterm,index)=>{
          option.series[0].data[index] = parseInt(iterm[0])?iterm[0]:0;
        });

        var myChart = echarts.init(this.$refs.echarts);
        myChart.setOption(option);
      },
      typeChange(){
        this.searchParams.metrics=this.metrics;
        this.getData();
      },
    },
    created(){
      this.getData();
    },
    mounted(){

    },
	}
</script>

<style scoped>
.flow-subpage-iterm-title{
  font-size: 16px;
  font-weight: bold;
  padding-top: 5px;
}
</style>

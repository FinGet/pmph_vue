<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
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
    <el-table-column label="平均访问时长"  align="center">
      <template scope="scope">{{scope.row.avg_visit_time}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
	export default {
	  props:['startDate','endDate'],
		data() {
			return {
        api_flow:'/pmpheep/baidu/rpt/trend',
        tableData:[],
        metricsList:["date", "pv_count", "visitor_count", "ip_count", "bounce_ratio", "avg_visit_time", "trans_count"],
        searchParams:{
          pageSize:100,
          pageNum:1,
          siteId:'',
          method:'overview/getOutline',
          metrics:'pv_count,visit_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,contri_pv',
          startDate:this.startDate,
          endDate:this.endDate,
        },
      }
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

          obj.avg_visit_time = this.$commonFun.formatSeconds(obj.avg_visit_time);
          tempList.push(obj);
        });
        this.tableData=tempList;
      },
    },
    created(){
      this.getData(this.searchParams,this.handleResultFlow);
    }
	}
</script>

<style scoped>

</style>

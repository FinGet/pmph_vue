<template>
	<div class="flow-map-page">
    <!--搜索-->
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">统计日期：<span></span></div>
        <div class="searchInput">
          <el-date-picker
            v-model="value"
            type="daterange"
            align="left"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">查看</el-button>
      </div>
    </div>

    <!--地图-->
    <div class="map-all paddingT30  paddingL30">
      <div class="all-echar text-center fontsize-lg">
        <span class="gray inline-block paddingT20">总流量</span>
        <p class="orange all-echar-num">
          100%
        </p>
      </div>
      <div class="all-text-num">
        <span class="inline-block">PV : 4456</span>
        <span class="inline-block paddingL30">UV : 4456</span>
      </div>

      <div class="map-line-123"></div>
    </div>

    <!--树状图-->
    <div class="paddingL60">
      <map-list :data="data"></map-list>
    </div>
	</div>
</template>

<script>
  import mapList from './_components/flowmap-list.vue'
	export default {
		data() {
			return {
        api_flow:'/pmpheep/baidu/rpt/trend',
        searchParams:{
          pageSize:100,
          pageNum:1,
          method:'visit/toppage/a',
          metrics:'pv_count,visitor_count,outward_count,average_stay_time',
          order:'outward_count,desc',
          startDate:this.$commonFun.getcurrentDate(),
          endDate:this.$commonFun.getcurrentDate(),
        },
        data_sum:{},
        value:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        data:[{
          path:'首页',
          pv:1,
          uv:1,
          zb:2
        },{
          path:'读书',
          pv:1,
          uv:1,
          zb:2,
          children:[{
            path:'学校教育',
            pv:1,
            uv:1,
            zb:2,
          },{
            path:'0/2/2',
            pv:1,
            uv:1,
            zb:2,
          }]
        },{
          path:'0/3',
          pv:1,
          uv:1,
          zb:2,
        },{
          path:'0/4',
          pv:1,
          uv:1,
          zb:2,
        },{
          path:'0/4',
          pv:1,
          uv:1,
          zb:2,
        },{
          path:'0/4',
          pv:1,
          uv:1,
          zb:2,
        }],
      }
		},
    methods:{
      /**
       * 获取数据
       */
      getData(callback){
        this.$axios.get(this.api_flow,{params:this.searchParams})
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
      handleResult(data){
        let tempdata = data.body.data[0].result;

        //初始化总量 pv_count,visitor_count,outward_count,average_stay_time
        let sum = tempdata.sum;
        this.data_sum={
          pv_count:sum[0],
          visitor_count:sum[1],
          outward_count:sum[2],
          average_stay_time:sum[3]
        }
      },
    },
    created(){
		  this.getData(this.handleResult)
    },
    components:{
      mapList
    }
	}
</script>

<style scoped>
.searchBox-wrapper{
  width: 360px;
}
  .all-echar{
    display: inline-block;
    vertical-align:middle;
    width: 110px;
    height: 110px;
    border:15px solid #199ed8;
    border-radius: 50%;
  }
  .gray{color: #8c8c8c;}
  .all-echar-num{
    margin: 4px 16px;
    font-size: 22px;
    font-weight: bold;
    border-top:1px dashed #ccc;
    border-bottom:1px dashed #ccc;
  }
  .all-text-num{
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    border: 1px dashed #ccc;
    padding: 14px 30px;
    color: #098309;
    font-weight: bold;
  }
  .map-line-123{
    width: 110px;
    height: 22px;
    margin-left: 70px;
    border-bottom: 2px solid #ccc;
    border-left: 2px solid #ccc;
  }
</style>

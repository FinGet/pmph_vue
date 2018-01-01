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
        <span class="inline-block">PV : {{sum.pv}}</span>
        <span class="inline-block paddingL30">UV : {{sum.uv}}</span>
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
			  api_baidu_analysis:'/pmpheep//baidu/rpt/trend',
        params:{
          method:'visit/toppage/a',
          startDate:'20171226',
          endDate:'20180101',
          metrics:'pv_count,visitor_count,visit1_count',
          order:'visit1_count,desc',
          pageNum:1,
          pageSize:100,
        },
        sum:[],
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
        data:[],
      }
		},
    methods:{
      /**
       * 获取数据
       */
      getData(){
        this.$axios.get(this.api_baidu_analysis,{params:this.params})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              let data = JSON.parse(res.data)
              console.log(data.body.data[0].result);
              this.handleResultData(data.body.data[0].result);
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 处理获取到的数据
       * @param result
       */
      handleResultData(result){
        this.sum = {
            pv:result.sum[0][0],
            uv:result.sum[0][1]
        };

        let map=[];
        result.items[0].forEach((iterm,index)=>{
          map.push({
            name:iterm[0].name,
            pv:result.items[1][index][0],
            uv:result.items[1][index][1],
            visit1_count:result.items[1][index][2],
            zb:Math.round((result.items[1][index][0]/result.sum[0][0])*10000)/100+'%',
            path:this.$commonFun.parseURL(iterm[0].name).path,
            splitPath:this.$commonFun.parseURL(iterm[0].name).path.split('/').splice(1)
          });
        });
        map.sort((x,y)=>{
            return x.splitPath.length-y.splitPath.length
        });
        let temp = [];
        map.forEach((iterm,index)=>{
           for(let i = 0, len = iterm.splitPath.length; i < len; i++){
               if(temp[iterm.splitPath])
           }
        });
        this.data=map;
      }
    },
    created(){
		    this.getData();
    },
    components:{
      mapList
    }
	}

  function getNowformatDate() {
    var date=new Date();
    var year=date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate();
    return  ''+year+mon+day
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

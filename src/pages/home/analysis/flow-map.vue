<template>
	<div class="flow-map-page">
    <!--搜索-->
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">统计日期：<span></span></div>
        <div class="searchInput">
          <el-date-picker
            ref="picker"
            v-model="value"
            type="daterange"
            align="left"
            :clearable="false"
            :placeholder="today"
            @change="dateChange"
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
          startDate:'',
          endDate:'',
          siteId:'',
          metrics:'pv_count,visitor_count,visit1_count',
          order:'visit1_count,desc',
          pageNum:1,
          pageSize:100,
        },
        sum:[],
        value:'',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '近48小时',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        data:[],
      }
		},
    computed:{
      today(){
        let temp_time =  this.$commonFun.getNowFormatDate().split(' ')[0];
        return temp_time+' - '+temp_time;
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
            zb:Math.round((result.items[1][index][0]/result.sum[0][0])*10000)/100,
            path:decodeURIComponent(this.$commonFun.parseURL(iterm[0].name).path),
            splitPath:decodeURIComponent(this.$commonFun.parseURL(iterm[0].name).path).split('/').splice(1)
          });
        });
        map.sort((x,y)=>{
            return x.splitPath.length-y.splitPath.length
        });
        let list=[];
        map.forEach((iterm,index)=>{
          if(!list[iterm.splitPath.length-1]){
            list[iterm.splitPath.length-1]=[];
          }
          list[iterm.splitPath.length-1].push(iterm);
        });
        console.log(list);
        let computedData = [];
        for(let i = 0, len = list.length; i < len; i++){
          if(i===0){
            list[i].forEach((iterm,index)=>{
              if(computedData[iterm.splitPath[0]]){
                computedData[iterm.splitPath[0]].pv+=iterm.pv;
                computedData[iterm.splitPath[0]].uv+=iterm.uv;
                computedData[iterm.splitPath[0]].zb+=iterm.zb;
              }else{
                computedData[iterm.splitPath[0]]=iterm;
              }
            });
          }
          if(i===1){
            list[i].forEach((iterm,index)=>{
              if(!(computedData[iterm.splitPath[0]])){
                computedData[iterm.splitPath[0]]={};
              }
              if(!(computedData[iterm.splitPath[0]].children)){
                computedData[iterm.splitPath[0]].children=[];
              }
              if(computedData[iterm.splitPath[0]].children[iterm.splitPath[1]]){
                computedData[iterm.splitPath[0]].children[iterm.splitPath[1]].pv+=iterm.pv;
                computedData[iterm.splitPath[0]].children[iterm.splitPath[1]].uv+=iterm.uv;
                computedData[iterm.splitPath[0]].children[iterm.splitPath[1]].zb+=iterm.zb;
              }else{
                computedData[iterm.splitPath[0]].children[iterm.splitPath[1]]=iterm;
              }
            });
          }
        }
        let data_list=[];
        for(let key in computedData){
          data_list.push(computedData[key]);
          let len = data_list.length;
          if(data_list[len-1].children){
            let t_list=[];
            for(let k in computedData[key].children){
              t_list.push(computedData[key].children[k]);
            }
            data_list[len-1].children = t_list;
          }
        }
        console.log(data_list);
        this.data=data_list;
      },
      dateChange(val){
        let temp_time =  val.split(' - ');
        this.params.startDate = temp_time[0].trim().replaceAll('-','');
        this.params.endDate = temp_time[1].trim().replaceAll('-','');
        this.getData();
      },
    },
    created(){
      let temp_time =  this.$commonFun.getNowFormatDate().split(' ')[0].replaceAll('-','');
      this.params.startDate = temp_time;
      this.params.endDate = temp_time;
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

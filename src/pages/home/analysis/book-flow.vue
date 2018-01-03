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
        <!--<div class="searchBox-wrapper">-->
          <!--<div class="searchName">书籍名称：<span></span></div>-->
          <!--<div class="searchInput">-->
            <!--<el-input placeholder="请输入" v-model="searchText"   @keyup.enter.native="_input_search"></el-input>-->
          <!--</div>-->
        <!--</div>-->
        <div class="searchBox-wrapper lg">
          <div class="searchName">统计日期：<span></span></div>
          <div class="searchInput">
            <el-date-picker
              ref="picker"
              v-model="value"
              type="daterange"
              align="left"
              :placeholder="today"
              @change="dateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="_input_search">搜索</el-button>
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
          <el-table-column label="书籍名称"  prop="name" min-width="200"></el-table-column>
          <el-table-column label="浏览次数(PV)"  prop="pv_count" align="center"></el-table-column>
          <el-table-column label="独立访问(UV)"  prop="visitor_count" align="center"></el-table-column>
          <el-table-column label="IP"  prop="ip_count" align="center"></el-table-column>
          <el-table-column label="失跳率" align="center">
            <template scope="scope">{{scope.row.exit_ratio}}%</template>
          </el-table-column>
          <el-table-column label="平均停留时长"  prop="average_stay_time" align="center"></el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          v-if="totalNum > searchParams.pageSize"
          :page-sizes="[10,30,50,100, 200, 300, 400]"
          :page-size="searchParams.pageSize"
          :current-page.sync="searchParams.pageNum"
          @size-change="paginationSizeChange"
          @current-change="search"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        api_flow:'/pmpheep/baidu/rpt/trend',
        searchParams:{
          siteId:'11588122',
          pageSize:10,
          pageNum:1,
          method:'visit/toppage/a',
          metrics:'average_stay_time,ip_count,visit1_count,exit_ratio,visitor_count,pv_count',
          order:'pv_count,desc',
          startDate:this.$commonFun.getcurrentDate(),
          endDate:this.$commonFun.getcurrentDate(),
        },
        totalNum:0,
        metrics:["pv_count", "visitor_count", "ip_count", "visit1_count", "average_stay_time", "exit_ratio"],
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
        tableData:[],
        searchText:'',
      }
    },
    computed:{
      today(){
        let temp_time =  this.$commonFun.getNowFormatDate().split(' ')[0];
        return temp_time+' - '+temp_time;
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
              self.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      handleResultFlow(data){
        console.log(data);
        let list = [];
        let tempdata = data.body.data[0].result.items;
        this.totalNum = data.body.data[0].result.total;
        tempdata[1].forEach((iterm,index)=>{
          let obj = {
            name: (tempdata[0][index][0].name).split('/')
          };
          this.metrics.forEach((key,index)=>{
            obj[key] = iterm[index]
          });
          obj.average_stay_time=this.$commonFun.formatSeconds(obj.average_stay_time);
          obj.name=obj.name[obj.name.length-1];
          list.push(obj);
        });
        this.tableData=list;
        console.log(this.tableData)
      },
      dateChange(val){
        let temp_time =  val.split(' - ');
        this.searchParams.searchWord ='/book/' +this.searchText;
        this.searchParams.startDate = temp_time[0].trim().replaceAll('-','');
        this.searchParams.endDate = temp_time[1].trim().replaceAll('-','');
        this.searchParams.pageNum=1;
        this.getData();
      },
      search(){
        this.searchParams.searchWord ='/book/' +this.searchText;
        this.getData();
      },
      /**
       * 搜索
       */
      _input_search(){
        this.searchParams.pageNum=1;
        this.searchParams.searchWord ='/book/' +this.searchText;
        this.getData();
      },
      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      paginationSizeChange(val){
        this.searchForm.pageSize=val;
        this.searchForm.pageNum=1;
        this.getData();
      },
      /**
       * 获取书籍类别树数据
       */
    },
    created(){
      this.getData();
    },
  }
</script>

<style scoped>
  .searchBox-wrapper.lg{
    width: 360px;
  }
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

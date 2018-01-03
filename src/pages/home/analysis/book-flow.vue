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
            <el-input placeholder="请输入" v-model="searchText"   @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper lg">
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
          <el-button  type="primary" icon="search" @click="search">搜索</el-button>
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
          <el-table-column label="书籍名称"  prop="bookName" min-width="200"></el-table-column>
          <el-table-column label="浏览次数(PV)"  prop="pv" align="center"></el-table-column>
          <el-table-column label="独立访问(UV)"  prop="uv" align="center"></el-table-column>
          <el-table-column label="IP"  prop="ip" align="center"></el-table-column>
          <el-table-column label="失跳率"  prop="shitiao" align="center"></el-table-column>
          <el-table-column label="访问次数"  prop="num" align="center"></el-table-column>
        </el-table>
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
          pageSize:30,
          pageNum:1,
          method:'overview/getVisitPage',
          metrics:'visitor_count',
          searchWord:'/book/',
          startDate:this.$commonFun.getcurrentDate(),
          endDate:this.$commonFun.getcurrentDate(),
        },
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
        let tempdata = data.body.data[0].result.items;
        this.tableData=tempdata;
        console.log(tempdata)
      },
      dateChange(val){
        let temp_time =  val.split(' - ');
        this.searchParams.searchWord ='/book/' +this.searchText;
        this.searchParams.startDate = temp_time[0].trim().replaceAll('-','');
        this.searchParams.endDate = temp_time[1].trim().replaceAll('-','');
        this.getData();
      },
      search(){
        this.searchParams.searchWord ='/book/' +this.searchText;
        this.getData();
      },
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

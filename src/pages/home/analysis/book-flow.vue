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
          <el-table-column label="书籍名称"  prop="bookName" min-width="200"></el-table-column>
          <el-table-column label="ISBN"  prop="isbn" width="200"></el-table-column>
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
        tableData:[{
          bookName:'X线摄影化学及暗室技术',
          isbn:'7-117-02962-5/R·963',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        },{
          bookName:'X线摄影化学及暗室技术',
          isbn:'7-117-02962-5/R·963',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        },{
          bookName:'X线摄影化学及暗室技术',
          isbn:'7-117-02962-5/R·963',
          pv:902,
          uv:631,
          ip:519,
          shitiao:'92.34%',
          num:2179
        }],
        time:1,
      }
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

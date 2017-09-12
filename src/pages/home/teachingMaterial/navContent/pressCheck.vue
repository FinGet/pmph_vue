<template>
  <div class="teachingMaterial publisherAudit">
    <div class="teachingMaterial-search clearfix">
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--姓名搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职务：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职务：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--职称搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职称：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--工作单位搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">工作单位：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">申报职务：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--学校审核搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">学校审核：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--纸质表搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">纸质表：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--姓名搜索-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary">查询</el-button>
      </div>
    </div>
    <!--操作按钮-->
    <div class="operation-wrapper">
      <el-button type="primary">导出World</el-button>
      <el-button type="primary">导出Excel</el-button>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="申报账号"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style scoped>

</style>

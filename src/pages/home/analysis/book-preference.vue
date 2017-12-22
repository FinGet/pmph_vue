<template>
	<div class="book-preference-page">
    <!--搜索-->
    <div class="clearfix">
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

    <!--图表-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="图书名称"  prop="bookName"></el-table-column>
        <el-table-column label="收藏次数"  prop="pv" width="140" align="center"></el-table-column>
        <el-table-column label="浏览次数"  prop="uv" width="140" align="center"></el-table-column>
        <el-table-column label="3以上星评价次数"  prop="ip" width="160" align="center"></el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[{
          bookName:'X线摄影化学及暗室技术',
          pv:10,
          uv:7,
          ip:0
        }],
      }
		}
	}
</script>

<style scoped>

</style>

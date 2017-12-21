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
    <div class="map-all paddingT30">
      <div class="all-echar text-center fontsize-lg">
        <span class="gray inline-block paddingT20">总流量</span>
        <p class="orange all-echar-num">
          100%
        </p>
      </div>
      <div class="all-text-num">
        <span class="inline-block">PV:4456</span>
        <span class="inline-block paddingL30">UV:4456</span>
      </div>
    </div>

    <!--树状图-->
    <div>

    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
      }
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
  }
</style>

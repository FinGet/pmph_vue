<template>
  <div class="applicationStatistics">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="按书名统计" name="bookName">
        <div class="applicationStatistics-byBookName">
          <!--搜索-->
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">书    名：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model="searchParams.bookName"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
            </div>
          </div>
          <!--表格-->
          <div class="table-wrapper">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="xuhao"
                label="序号"
                align="center"
                width="68">
              </el-table-column>
              <el-table-column
                prop="bookName"
                label="书名">
              </el-table-column>
              <el-table-column
                prop="p1"
                label="主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p2"
                label="副主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p3"
                label="编委名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p3"
                label="数字编委名单"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="1"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="30"
              layout="total, sizes, prev, pager, next, jumper"
              :total="300">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按学校统计" name="school">
        <div class="applicationStatistics-bySchool">
          <!--搜索-->
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">学  校  名：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model="searchParams.bookName"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
            </div>
          </div>
          <!--表格-->
          <div class="table-wrapper">
            <el-table
              :data="tableData2"
              border
              style="width: 100%">
              <el-table-column
                prop="xuhao"
                label="序号"
                align="center"
                width="68">
              </el-table-column>
              <el-table-column
                prop="bookName"
                label="学校名称">
              </el-table-column>
              <el-table-column
                prop="p1"
                label="主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p2"
                label="副主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p3"
                label="编委名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="p3"
                label="数字编委名单"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="1"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="30"
              layout="total, sizes, prev, pager, next, jumper"
              :total="300">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from "../../../../../../static/echarts/echarts.common.min";
export default {
  data() {
    return {
      activeName: "school",
      searchParams: {
        bookName: ""
      },
      tableData2: [
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        }
      ],
      tableData: [
        {
          xuhao: 1,
          bookName: "医用高等数学",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "医学物理学",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "基础化学",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "系统解剖学",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "组织学与胚胎学",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        }
      ]
    };
  },
  methods: {
    /**
       * 获取表格数据
       */
    getTableData() {},
    /**
       * 点击tabs切换
       */
    handleTabsClick(tab, event) {}
  },
  mounted() {}
};
</script>

<style scoped>

</style>

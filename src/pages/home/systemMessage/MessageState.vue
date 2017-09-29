<template>
  <div class="messagestate">
    <el-row>
      <el-col :span="24">
        <el-col :span="8">
          <el-col :span="14" class="search-10">
            <el-input v-model="input" placeholder="请输入收件人或单位"></el-input>
          </el-col>
          <el-button class="btn" type="primary"  icon="search">搜索</el-button>
        </el-col>
        <el-col :span="4" class="msgradio">
          <el-radio-group v-model="radio">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">已读</el-radio>
            <el-radio :label="3">未读</el-radio>
          </el-radio-group>
        </el-col>
        <el-button class="btn pull-right" type="primary" icon="arrow-left" @click="back">返回</el-button>
      </el-col>
    </el-row>
    <div class="cutLine-dashed"></div>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          empty-text="暂无数据……"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            label="教师/学校"
            width="120"
            prop="Teacher"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="Company"
            label="单位"
            width="200">
          </el-table-column>
          <el-table-column
            prop="Fdate"
            label="发送时间"
          >
          </el-table-column>
          <el-table-column
            prop="Sdate"
            label="接收时间"
          >
          </el-table-column>
          <el-table-column
            prop="Mobile"
            label="联系方式"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            width="80"
            align="center"
          >
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>状态: {{ scope.row.State }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag :type="scope.row.State=='未读'?'danger':'success'">{{ scope.row.State }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination class="pull-right" v-show="tableData.length > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        input: '',
        radio: 1,
        currentPage: 4, // 分页当前页
        tableData: [{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '已读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '已读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        },{
          Teacher: '艳红',
          Company: '成都中医药大学',
          Fdate: '2017-09-06 00:43:30',
          Sdate: '2017-09-06 00:43:30',
          State: '未读',
          Mobile: '15882387792'
        }]
      }
    },
    methods:{
      // 返回上一级
      back() {
        this.$router.push('messagelist')
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    components: {
    }
  }
</script>

<style scoped="scoped">
.msgradio{
  height:36px;
  line-height:36px;
  margin:10px 0 0 10px;
}
</style>

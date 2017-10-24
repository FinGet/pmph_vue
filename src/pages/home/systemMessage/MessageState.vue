<template>
  <div class="messagestate">
    <el-row>
      <el-col :span="24">
        <el-col :span="8">
          <el-col :span="14" class="search-10">
            <el-input v-model="name" placeholder="请输入收件人或单位" @keyup.enter.native="search"></el-input>
          </el-col>
          <el-button class="btn" type="primary"  icon="search">搜索</el-button>
        </el-col>
        <el-col :span="5" class="msgradio">
          <el-radio-group v-model="isRead">
            <el-radio :label="2">全部</el-radio>
            <el-radio :label="1">已读</el-radio>
            <el-radio :label="0">未读</el-radio>
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
          empty-text="暂无数据"
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        input: '',
        isRead: 2,
        currentPage: 4, // 分页当前页
        tableData: [],
        msgId: '',
        pageNumber: 1,
        pageSize: 20,
        name: '',
        dataTotal: 0
      }
    },
    mounted() {
      //console.log(this.$route.query.id)
      // 获取当前消息id
      this.msgId = this.$route.query.msgId
      console.log(this.msgId)
      this.getMessageState()
    },
    methods:{
      /**
       * 初始化数据
       */
      getMessageState() {
        this.$axios.get("/messages/message/"+this.msgId+"/state", {
          params: {
            sessionId: this.$mySessionStorage.get('currentUser','json').userSessionId,
            name: this.name,
            msgId: this.msgId,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            isRead: this.isRead
          }
        }).then((response) => {
          let res = response.data
          this.dataTotal = res.data.total
          // console.log(res)
          if (res.code == '1') {
            this.tableData=res.data.rows
            // 将时间戳转为标准格式
            for (let i=0; i< this.tableData.length; i++) {
              this.tableData[i].sendTime = formatDate(this.tableData[i].sendTime)
            }
            // console.log(this.tableData)
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: '没有这条数据!',
                type: 'warning'
              });
            }
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      },
      /**
       * 返回上一级
       */
      back() {
        this.$router.push('messagelist')
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /**
      * 搜索
      */
      search() {
        this.getMessageState()
      },
      /**
       * 选择每页有多少条数据
       */
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getMessageState()
      },
      /**
       * 选择当前第几页
       */
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageNumber = val
        this.getMessageState()
      },
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

<template>
  <div class="groupmember">
    <el-row>
      <el-col :span="24">
        <div class="disinline pull-left">
          <el-input class="fileinput"
                    placeholder="请输入姓名"
                    icon="search"
                    :on-icon-click="Search"
          ></el-input>
        </div>
        <div class="pull-left marginT10 marginL10 textcolor">共有{{memberCount}}个成员</div>
        <div class="pull-right clearfix">
          <div class="disinline">
            <el-button type="warning" @click="disManage">取消管理员</el-button>
          </div>
          <div class="disinline">
            <el-button type="primary" @click="setManage">设为管理员</el-button>
          </div>
          <div class="disinline marginL10">
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              v-model="visible">
              <p>选中的成员确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false,deleted()">确定</el-button>
              </div>
            </el-popover>
            <el-button type="danger"  v-popover:popover :disabled="idSelected">删除</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="marginT10">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            label="身份"
            width="120">
            <template scope="scope">
              {{scope.row.rank=='1'?'创建人':scope.row.rank=='2'?'管理员':'成员'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="jobPos"
            label="职位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="工作单位"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination class="pull-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
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
      tableData:[
        {
          name: '吴可幽',
          userName:'wukeyou',
          rank: '1',
          jobPos:'副主编',
          address: '成都中医药大学'
        },
        {
          name: '李中山',
          userName:'lizhongshan',
          rank: '2',
          jobPos:'编委',
          address: '成都中医药大学'
        },
        {
          name: '李承叡',
          userName:'lichengrui',
          rank: '3',
          jobPos:'主编',
          address: '成都中医药大学'
        },
        {
          name: '袁扬',
          userName:'yuanyang',
          rank: '3',
          jobPos:'编委',
          address: '成都中医药大学'
        },{
          name: '赵杰',
          userName:'zhaojie',
          rank: '2',
          jobPos:'编委',
          address: '成都中医药大学'
        },
        {
          name: '赵羽泽',
          userName:'zhaoyuze',
          rank: '2',
          jobPos:'副主编',
          address: '成都中医药大学'
        }
      ],
      selections: {},
      visible: false,
      currentPage: 5
    }
  },
  computed: {
    memberCount() {
      if (this.tableData.length == 0) {
        return 0
      } else {
        return this.tableData.length
      }
    },
    idSelected() {
      if (this.selections.length > 0) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange (val) {
      this.selections = val
    },
    // 设置管理员
    setManage () {

    },
    // 取消管理员
    disManage(){

    },
    Search(){

    },
    // deleted
    deleted () {
      this.tableData.splice(this.selections,this.selections.length)
      this.$refs.multipleTable.clearSelection()
      this.$message({
        message: `恭喜你，成功删除数据`,
        type: 'success'
      });
    }
  }
}
</script>

<style>
  .groupmember{
    padding: 10px 30px;
  }
  .disinline{
    display: inline-block;
  }
  .textcolor{
    color: rgba(2, 2, 2, 0.29);
  }
</style>

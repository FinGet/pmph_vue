<template>
  <div class="message-list">
    <el-row>
      <el-col :span="12">
        <Search title="消息标题:"> </Search>
      </el-col>
     <div class="pull-right">
       <el-button class="btn" type="danger" icon="delete">批量删除</el-button>
       <el-button class="btn" type="info" icon="edit">
         <router-link :to="{ name: '编辑消息'}">发送新消息</router-link>
       </el-button>
     </div>
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
      @selection-change="handleSelectionChange"
      @cell-click="preview"
        >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="信息标题"
        width="400"
        prop="title"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="发送者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="发送时间"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            @click="handleReissue(scope.$index, scope.row)">补发</el-button>
          <el-button
            size="small"
            type="info"
            @click="handleState(scope.$index, scope.row)">消息状态</el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-col>
    </el-row>
    <el-pagination v-show="tableData.length > 0"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="currentPage"
     :page-sizes="[10, 20, 30, 40]"
     :page-size="100"
     layout="total, sizes, prev, pager, next, jumper"
     :total="400">
    </el-pagination>
    <!--预览弹窗-->
    <Preview-popup :close.sync="previewShow"></Preview-popup>
  </div>
</template>

<script>
  import Search from 'base/search'
  import PreviewPopup from 'components/PreviewPopup'
  export default {
    data() {
      return {
        previewShow:false,
        input:'',
        currentPage: 4, // 分页当前页
        tableData: [{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }, {
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        },{
          title: '国家卫生和计划生育委员会住院医师',
          name: '测试人员',
          date: '2017-09-06 00:43:30'
        }],
        multipleSelection: []
      }
    },

    methods: {
//      toggleSelection(rows) {
//        if (rows) {
//          rows.forEach(row => {
//            this.$refs.multipleTable.toggleRowSelection(row);
//          });
//        } else {
//          this.$refs.multipleTable.clearSelection();
//        }
//      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 点击修改
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 点击补发
      handleReissue(index, row) {
        console.log(index, row);
      },
      // 点击消息状态
      handleState(index, row) {
        this.$router.push('messagestate')  //将你的跳转写在这里。
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      preview(row, event, column){
        if(event.label==='信息标题'){
          this.previewShow=true;
        }
      }
    },
    components: {
      Search,
      PreviewPopup
    }
  }
</script>

<style scoped="scoped">
  .search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
</style>

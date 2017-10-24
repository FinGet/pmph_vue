<template>
  <div class="message-list">
    <el-row>
      <el-col :span="12">
        <div class="search-title">消息标题:</div>
        <el-col :span="6" class="search-10">
          <el-input v-model="title" placeholder="请输入搜索内容" @keyup.enter.native="search"></el-input>
        </el-col>
        <el-button class="btn" type="primary"  icon="search" @click="search">搜索</el-button>
      </el-col>
     <div class="pull-right">
       <el-popover
         ref="popover"
         placement="top"
         width="160"
         v-model="visible">
         <p>选中的文件确定删除吗？</p>
         <div style="text-align: right; margin: 0">
           <el-button size="mini" type="text" @click="visible = false">取消</el-button>
           <el-button type="primary" size="mini" @click="visible = false,delet()">确定</el-button>
         </div>
       </el-popover>
       <el-button class="btn" type="danger" icon="delete" :disabled="isSelected"  v-popover:popover>批量删除</el-button>
       <router-link :to="{ name: '编辑消息',query:{type:'add'}}">
       <el-button class="btn" type="primary" icon="edit">
         发送新消息
       </el-button>
       </router-link>
     </div>
    </el-row>
    <div class="cutLine-dashed"></div>
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        empty-text="暂无数据"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="信息标题"
          width="400"
          show-overflow-tooltip>
          <template scope="scope">
            <el-button type="text" @click="preview(scope.$index,scope.row)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="sendName"
          label="发送者"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送时间"
        >
        </el-table-column>
        <el-table-column
          prop="isWithdraw"
          label="状态"
        >
          <template scope="scope">
            {{scope.row.isWithdraw?'已撤回':'已发送'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="small"
              type="text"
              @click="handleReissue(scope.$index, scope.row)">补发</el-button>
            <el-button
              size="small"
              type="text"
              :disabled="scope.row.isWithdraw"
              @click="handleRecall(scope.$index, scope.row)">撤回</el-button>
            <el-button
              size="small"
              type="text"
              @click="handleState(scope.row.msgId, scope.row)">消息状态</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination class="pull-right"
                   v-if="dataTotal>pageSize"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="pageNumber"
     :page-sizes="[10, 20, 30, 40]"
     :page-size="pageSize"
     layout="total, sizes, prev, pager, next, jumper"
     :total="dataTotal">
    </el-pagination>
  </div>
</template>

<script>
  import {getLocalTime, formatDate} from '../../../../static/commonFun'
  export default {
    data() {
      return {
        visible: false,
        tableData: [],
        multipleSelection: [],
        pageNumber: 1,
        pageSize: 20,
        title: '',
        dataTotal: 0,
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.multipleSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    mounted() {
       this.getMessageList()
    },
    methods: {
      /**
       * 加载消息列表
       */
      getMessageList() {
        this.$axios.get("/messages/list/message", {
          params: {
            sessionId: this.$mySessionStorage.get('currentUser','json').userSessionId,
            title: this.title,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data
          this.dataTotal = res.data.total
          if (res.code == '1') {
            // 将时间戳转为标准格式
            for (let i=0; i< res.data.rows.length; i++) {
              res.data.rows[i].sendTime = formatDate(res.data.rows[i].sendTime)
            }

            this.tableData=res.data.rows
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: '没有数据!',
                type: 'warning'
              });
            }
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      },
      /**
       * 搜索
       */
      search() {
        this.getMessageList()
      },
      /**
       * 选择每页有多少条数据
       */
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getMessageList()
      },
      /**
       * 选择当前第几页
       */
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageNumber = val
        this.getMessageList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       /**
        * 点击修改
        */
      handleEdit(index, row) {
        this.$router.push({ name: '编辑消息',query:{type:'edit',messageId:row.msgId}});
      },
      /**
       * 撤回
       */
      handleRecall(index, row) {
        this.$axios.put('/messages/withdraw/message',this.$initPostData({
          msgId:row.msgId
        }))
          .then(response=>{
            let res = response.data;
            if(res.code==1){
                this.$message.success('成功撤销此消息');
                row.isWithdraw=true;
            }else{
                this.$message.error('撤销失败，请重试');
            }
          })
          .catch(e=>{
            this.$message.error('撤销失败，请重试');
          })
      },
      /**
       * 点击补发
       * 根据消息发送类型跳转到相应的页面
       *  @to-do 这里先假设sendType
       */
      handleReissue(index, row) {
        console.log(index, row);
        switch (row.sendType){
          case 1 :
            this.$router.push({name:'选择学校',parmas:{msgId:row.msgId},query:{type:'resend'}});
            break;
          case 2:
            this.$router.push({name:'选择学校',parmas:{msgId:row.msgId},query:{type:'resend'}});
            break;
          case 3:
            this.$router.push({name:'特定对象',query:{type:'resend'},parmas:{msgId:row.msgId}});
            break;
          case 4:
            this.$router.push({name:'教材报名者',query:{type:'resend'},params:{msgId:row.msgId}});
            break;
            dafault:
              this.$message({
                type: 'error',
                message: '补发出错'
              });
        }

      },
      /**
       * 点击消息状态
       * @param id
       * @param row
       */
      handleState(id, row) {
        console.log(id)
        this.$router.push({path:'messagestate', query: {msgId: id}})  //将你的跳转写在这里。
      },
      preview(index, row){
        this.$router.push({name:'系统消息详情', query: {msgId:row.msgId}})
      },
      /**
       * 批量删除
       */
      delet() {
        // console.log(1)
        // console.log(this.multipleSelection)
        var len = this.multipleSelection.length
        var arr = []
        for (var i = 0; i< len; i++) {
          arr.push(this.multipleSelection[i].msgId)
        }
        var msgId = arr.join()
        this.$axios.delete("/messages/delete/message/"+msgId).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code == '1') {
            this.tableData.splice(this.multipleSelection,len)
            this.$refs.multipleTable.clearSelection()
            this.$message({
              message: '恭喜你，删除成功！',
              type: 'success'
            });
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      }
    },
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
  table a{
    color: #337ab7;
  }
</style>

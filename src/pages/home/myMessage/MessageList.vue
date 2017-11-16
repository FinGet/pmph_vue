<template>
	<div>
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">标题：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.title"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">消息状态：<span></span></div>
        <div class="searchInput">
          <el-select  v-model="searchForm.isRead" placeholder="全部" @change="getTableData">
            <el-option
              v-for="(item,index) in stateOption"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="pull-right">
        <el-button type="danger" @click="deleteMsg" :disabled="!selectData.length">删除</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        ref="myMsgTable"
        border
        stripe
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="信息标题"
          show-overflow-tooltip>
          <template scope="scope">
            <el-button type="text" @click="gotoMsgDetaile(scope.row)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="senderName"
          label="发送者"
          width="160">
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
        >
          <template scope="scope">
            <el-tag type="success" v-if="scope.row.isRead">已读</el-tag>
            <el-tag type="danger" v-else>未读</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum > searchForm.pageSize"
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNumber"
        @current-change="getTableData"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[],
        selectData:[],
        searchForm:{
          title:'',
          isRead:'',
          userId:this.$getUserData().userInfo.id,
          userType:this.$getUserData().userInfo.loginType,
          pageNumber:1,
          pageSize:30,
        },
        stateOption:[{
          value:'',
          label:'全部'
        },{
          value:true,
          label:'已读'
        },{
          value:false,
          label:'未读'
        }],
        totalNum:0,
      }
		},
    methods:{
      /**
       * 获取消息列表数据
       */
      getTableData(){
        this.$axios.get('/pmpheep/messages/list/mymessage',{params:this.searchForm})
          .then(response=>{
            let res = response.data;
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.sendTime = this.$commonFun.formatDate(iterm.sendTime);
              });
              this.totalNum = res.data.total||0;
              this.tableData=res.data.rows;
            }else{
              this.$message.error('获取数据失败，请重试！');
            }
          })
          .catch(e=>{
            console.log(e)
            this.$message.error('获取数据失败，请重试！');
          })
      },
      /**
       * 表格复选框发生变化触发事件
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
      /**
       * 删除消息
       */
      deleteMsg(){
        var selectIds=[];
        this.selectData.forEach(iterm=>{
          selectIds.push(iterm.id);
        });
        this.$axios.put('/pmpheep/messages/delete/mymessage',this.$initPostData({
          ids:selectIds.join(','),
        }))
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              this.getTableData();
              this.$message.success('删除成功！');
            }else{
              this.$message.error('删除失败，请重试！');
            }
          }).catch((error) => {
          this.$message.success('删除失败，请重试！');
          console.log(error.msg)
        })
      },
      /**
       * 跳转到消息详情页面
       * @param row
       */
      gotoMsgDetaile(row){
        this.$router.push({name:'我的消息详情',query:{msgId:row.id}})
      }
    },
    created(){
		  this.getTableData();
    }
	}
</script>

<style scoped>

</style>

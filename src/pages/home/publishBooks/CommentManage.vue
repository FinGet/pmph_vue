<template>
	<div>
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">书籍名称/ISBN：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.name"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">消息状态：<span></span></div>
        <div class="searchInput">
          <el-select  v-model="searchForm.isAuth" placeholder="全部" @change="getTableData">
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
        <el-button type="danger" :disabled="!selectData.length" @click="deleteComment">删除</el-button>
        <el-button type="warning" :disabled="!selectData.length" @click="audit(false)">审核不通过</el-button>
        <el-button type="primary" :disabled="!selectData.length" @click="audit(true)">审核通过</el-button>
      </div>

      <!--表格-->
      <div class="table-wrapper">
        <el-table
          :data="tableData"
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
            prop="bookname"
            label="书籍名称">
          </el-table-column>
          <el-table-column
            prop="isbn"
            label="ISBN"
            width="210">
          </el-table-column>
          <el-table-column
            prop="writerName"
            label="评论人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="content"
            label="评论内容">
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="评论时间"
            width="168">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            width="80">
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="120">
            <template scope="scope">
              {{scope.row.isAuth?'审核通过':'审核不通过'}}
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[],
        selectData:[],
        searchForm:{
          name:'',
          isAuth:'',
          pageSize:30,
          pageNumber:1
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
       * 获取表格数据
       */
      getTableData(){
        this.$axios.get('/bookusercomment/list/comment',{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.gmtCreate = this.$commonFun.formatDate(iterm.gmtCreate)
              });
              this.totalNum = res.data.total;
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 表格复选框发生变化触发事件
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
      /**
       * 删除选中行
       */
      deleteComment(){
        this.$confirm("确定删除选中节点吗?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            let select = [];
            this.selectData.forEach(iterm=>{
              select.push(iterm.id);
            });
            this.$axios.delete('/bookusercomment/delete/comment',{params:{
              ids:select.join(',')
            }})
              .then(response=>{
                let res = response.data;
                if(res.code==1){
                  this.$message.success('删除成功!');
                  this.getTableData();
                }else{
                  this.$message.error('删除失败，请重试！');
                }
              })
              .catch(e=>{
                console.log(e);
              })
          })
      },
      /**
       * 点击审核通过或不通过按钮
       * @param boolean true为审核通过， false为审核不通过
       */
      audit(boolean){
        let url = '/bookusercomment/update/comment';
        let select = [];
        this.selectData.forEach(iterm=>{
          select.push(iterm.id);
        });
        this.$axios.put(url,this.$commonFun.initPostData({
          ids:select.join(','),
          sessionId:this.getUserData().sessionId,
          isAuth:!!boolean
        }))
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.$message.success('提交成功');
              this.getTableData();
            }else{
              this.$message.error('操作失败请重试！');
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('操作失败请重试！');
          })
      }
    },
    created(){
		  this.getTableData();
    },
	}
</script>

<style scoped>
  .searchBox-wrapper{
    width: 340px;
  }
  .searchBox-wrapper .searchName{
    width: 110px;
  }
  .searchBox-wrapper .searchInput{
    margin-left: 114px;
  }
  .searchBox-wrapper.searchBtn{
    width: 100px;
  }
</style>

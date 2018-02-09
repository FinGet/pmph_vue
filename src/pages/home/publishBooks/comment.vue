<template>
	<div class="clearfix page-commnet">



    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="短评管理">
        <TableShort :data="tableData" @selection-change="handleSelectionChange" @show-comment-detail="showCommentDetail">
          <div class="clearfix" slot="searchBox">
            <div class="searchBox-wrapper">
              <div class="searchName">书籍名称/ISBN：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" @keyup.enter.native="search" class="searchInputEle" v-model.trim="searchForm.name"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper">
              <div class="searchName">审核状态：<span></span></div>
              <div class="searchInput">
                <el-select  v-model="searchForm.isAuth" placeholder="全部" @change="search">
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
              <el-button  type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <!--操作按钮-->
            <div class="pull-right">
              <el-button type="danger" :disabled="!selectData.length" @click="deleteComment">删除</el-button>
              <el-button type="warning" :disabled="!selectData.length" @click="audit(0)">审核不通过</el-button>
              <el-button type="primary" :disabled="!selectData.length" @click="audit(1)">通过</el-button>
            </div>
          </div>

          <div slot="pagination"  class="pagination-wrapper">
            <el-pagination
              v-if="totalNum > searchForm.pageSize"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="searchForm.pageSize"
              :current-page="searchForm.pageNumber"
              @size-change="paginationSizeChange"
              @current-change="getTableData"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </TableShort>
      </el-tab-pane>
      <el-tab-pane label="长评管理">
        <TableLong :data="tableData" @selection-change="handleSelectionChange" @show-comment-detail="showCommentDetail">
          <div class="clearfix" slot="searchBox">
            <div class="searchBox-wrapper">
              <div class="searchName">书籍名称/ISBN：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" @keyup.enter.native="search" class="searchInputEle" v-model.trim="searchForm.name"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper">
              <div class="searchName">审核状态：<span></span></div>
              <div class="searchInput">
                <el-select  v-model="searchForm.isAuth" placeholder="全部" @change="search">
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
              <el-button  type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <!--操作按钮-->
            <div class="pull-right">
              <el-button type="danger" :disabled="!selectData.length" @click="deleteComment">删除</el-button>
              <el-button type="warning" :disabled="!selectData.length" @click="audit(0)">审核不通过</el-button>
              <el-button type="primary" :disabled="!selectData.length" @click="audit(1)">通过</el-button>
            </div>
          </div>

          <div slot="pagination"  class="pagination-wrapper">
            <el-pagination
              v-if="totalNum > searchForm.pageSize"
              :page-sizes="[30,50,100, 200, 300, 400]"
              :page-size="searchForm.pageSize"
              :current-page="searchForm.pageNumber"
              @size-change="paginationSizeChange"
              @current-change="getTableData"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </TableLong>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="评论详情"
      :visible.sync="commentDialogVisible">
      <span>{{comment.content}}</span>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog
      title=""
      size="large"
      :visible.sync="commentDialogVisible_long">
      <div>
        <h5 class="previewTitle text-center">{{comment.title}}</h5>
        <p class="senderInfo text-center paddingT10">
          <span class="marginR10">{{comment.writerName}}</span>
          <span>{{comment.gmtCreate}}</span>
        </p>
        <div class="comment-main paddingT20" v-html="comment.content"></div>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>


	</div>
</template>

<script>
  import TableLong from './_subpage/comment-long-table.vue'
  import TableShort from './_subpage/comment-short-table.vue'
	export default {
		data() {
			return {
        tableData:[],
        selectData:[],
        searchForm:{
          name:'',
          isAuth:'',
          pageSize:30,
          pageNumber:1,
          isLong:false,
        },
        stateOption:[{
          value:'',
          label:'全部'
        },{
          value:0,
          label:'待审核'
        },
          {
            value:1,
            label:'已通过'
          },
          {
            value:2,
            label:'不通过'
          }],
        totalNum:0,
        commentDialogVisible:false,
        commentDialogVisible_long:false,
        comment:{
          content:'',
          title:'',
        },
      }
		},
    created(){
      this.getTableData();
    },
    components:{
      TableLong,
      TableShort
    },
    methods:{
      /**
       * 获取表格数据
       */
      getTableData(){
        this.$axios.get('/pmpheep/bookusercomment/list',{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              let list = ['待审核','已通过','不通过']
              res.data.rows.map(iterm=>{
                iterm.gmtCreate = this.$commonFun.formatDate(iterm.gmtCreate);
                iterm.state=list[iterm.isAuth];
              });
              this.totalNum = res.data.total;
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      search(){
        this.searchForm.pageNumber=1;
        this.getTableData();
      },
      /**
       * 表格复选框发生变化触发事件
       */
      handleSelectionChange(val) {
        console.log(val)
        this.selectData = val;
      },
      /**
       * 删除选中行
       */
      deleteComment(){
        this.$confirm("确定删除所选评论？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            let select = [];
            this.selectData.forEach(iterm=>{
              select.push(iterm.id);
            });
            this.$axios.delete('/pmpheep/bookusercomment/delete',{params:{
              ids:select.join(',')
            }})
              .then(response=>{
                let res = response.data;
                if(res.code==1){
                  this.$message.success('删除成功!');
                  this.getTableData();
                }else{
                  this.$message.error(res.msg.msgTrim());
                }
              })
              .catch(e=>{
                console.log(e);
              })
          })
          .catch(e=>{})
      },
      /**
       * 点击审核通过或不通过按钮
       * @param num 1为审核通过， 0为审核不通过
       */
      audit(num){
        this.$confirm("确定审核通过所选评论？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            let url = '/pmpheep/bookusercomment/update';
            let select = [];
            this.selectData.forEach(iterm=>{
              select.push(iterm.id);
            });
            this.$axios.put(url,this.$commonFun.initPostData({
              ids:select.join(','),
              sessionId:this.$getUserData().sessionId,
              isAuth:num
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
          })
          .catch(e=>{})

      },
      /**
       * 显示评论详情
       * @param row
       */
      showCommentDetail(row){
        console.log(1,row)
        this.comment=row;
        if(this.searchForm.isLong){
          this.commentDialogVisible_long=true;
        }else{
          this.commentDialogVisible=true;
        }
      },
      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      paginationSizeChange(val){
        this.searchForm.pageSize=val;
        this.searchForm.pageNumber=1;
        this.getTableData();
      },
      /**
       * 切换标签页
       */
      tabClick(tab){
        let isLong = tab.label==='长评管理';
        this.searchForm.isLong=isLong;
        this.tableData = [];
        this.selectData = [];
        this.totalNum = 0;
        this.getTableData();
      }
    },
	}
</script>


<style scoped>
  .searchBox-wrapper{
    width: 340px;
  }
  .searchBox-wrapper.searchBtn{
    width: 94px;
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
  .previewTitle {
    color: #14232e;
    font-size: 26px;
    font-weight: 500;
  }
</style>

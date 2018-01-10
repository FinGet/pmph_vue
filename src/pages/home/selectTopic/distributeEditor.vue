<template>
  <div class="distribute_editor">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input" v-model="searchParams.name" placeholder="请输入选题名称"  @keyup.enter.native="search"></el-input>
       <span>提交日期：</span>
       <el-date-picker
            v-model="searchParams.data"
            class="input"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search()">搜索</el-button>
    </p>
    <el-table
    :data="tableData"
    style="width:100%"
    border
    class="table-wrapper"
    >
     <el-table-column
     label="选题名称"
     prop="bookName"
     >
        <template scope="scope">
         <p class="link" @click="$router.push({name:'选题受理',query:{id:scope.row.id,active:'second',type:'detail'}})">{{scope.row.bookName}}</p>
         </template>   
     </el-table-column>   
     <el-table-column
      label="作者"
      prop="realName"
      width="90"
     >
     </el-table-column> 
     <el-table-column
      label="预计交稿日期"
      prop="deadline"
      width="130"
     >
     </el-table-column> 
     <el-table-column
      label="图书类别"
      prop="typeName"
      width="100"
     >
     </el-table-column> 
     <el-table-column
      label="提交日期"
      prop="submitTime"
      width="120"
     >
     </el-table-column> 
     <el-table-column
      label="是否退回"
      prop="submission"
      width="120"
     >
     <template scope="scope">
      <el-tooltip class="item" effect="dark" content="退回原因" placement="top-start" v-if="scope.row.isRejectedByEditor">
       <span>已退回</span>
      </el-tooltip>
      <span v-else>未退回</span>
     </template>
     </el-table-column> 
     <el-table-column
      label="操作"
      width="210"
     >
     <template scope="scope">
       <el-button type="text" @click="allot(scope.row)">分配部门编辑</el-button>
       <span>|</span>
       <el-button type="text" @click="directorHandling(scope.row.id,'',scope.row.isRejectedByEditor,scope.row.reasonEditor)">退回分配人</el-button>
     </template>
     </el-table-column> 
    </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <!-- 选择编辑弹框 -->
    <el-dialog :visible.sync="dialogVisible" class="dialog"  size="tiny" title="选择编辑部">
      <p class="header_p">
          <span>编辑姓名：</span>
          <el-input class="input" placeholder="请输入编辑姓名" v-model="dialogParams.realName"></el-input>
          <el-button type="primary" icon="search" @click="diaSearch">搜索</el-button>
      </p>
      <el-table :data="dialogTableData"  border  class="table-wrapper">
          <el-table-column
          label="姓名"
          prop="realName"
          ></el-table-column>
          <el-table-column
          label="电话"
          prop="handPhone"
          ></el-table-column>
          <el-table-column
          label="操作"
          width="90"
          >
          <template scope="scope">
           <el-button type="text" @click="directorHandling(null,scope.row.id)">选择</el-button>  
          </template>
          </el-table-column>
      </el-table>
          <!--分页-->
    <div class="pagination-wrapper" style="overflow:hidden;">
      <el-pagination
        v-if="dialogPageTotal>dialogParams.pageSize"
        @size-change="dialogSizeChange"
        @current-change="dialogCurrentChange"
        :current-page="dialogParams.pageNumber"
        :page-sizes="[10,20,30,50]"
        :page-size="dialogParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dialogPageTotal">
      </el-pagination>
    </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      searchParams: {
				name:'',
        data: "",
        pageSize: 10,
        pageNumber: 1
      },
      pageTotal: 0,
      tableData: [],
      dialogParams: {
        departmentId:'',
        realName: "",
        pageSize: 10,
        pageNumber: 1
      },
      dialogPageTotal: 0,
      dialogVisible: false,
      dialogTableData: [
			],
      distributeParams:{
        id:'',
        editorId:'',
        isRejectedByDirector:'',
        reasonDirector:''
      },  
			id: '', // 选题申报id
			isRejectedByDirector: '', //是否被主任退回
			reasonDirector: '' // 主任退回原因
    };
	},
  props:['activeName'],
	created(){
		this.getTableData();
	},
  watch:{
   activeName(val){
     if(val=='second'){
       this.search();
     }
   }
  },
  methods: {
     /* 搜索按钮 */
     search(){
      this.searchParams.pageNumber=1; 
      this.getTableData();
     },
		/**获取表格数据 */
		getTableData(){
			this.$axios.get('/pmpheep/topic/listDirector',{
				params:{
					bookName: this.searchParams.name,
					sessionId: this.$getUserData().sessionId,
					submitTime: this.$commonFun.formatDate(this.searchParams.data),
					pageSize: this.searchParams.pageSize,
					pageNumber: this.searchParams.pageNumber
				}
			}).then(response => {
				let res = response.data;
				if (res.code == '1'){
					this.tableData = res.data.rows;
					this.tableData.forEach(item => {
							item.submitTime = this.$commonFun.formatDate(item.submitTime);                    
					})
					this.pageTotal = res.pageTotal;
				}
			})
		},
		/**获取部门编辑列表 */
		getListEditors(){
			this.dialogVisible = true;
			this.$axios.get('/pmpheep/topic/listEditors',{
				params:this.dialogParams
			}).then(response => {
				let res = response.data;
				if (res.code == '1') {
					this.dialogTableData = res.data.rows;
					this.dialogPageTotal = res.pageTotal;
				}
			})
		},
		/**分配编辑 */
		allot(obj){
      this.dialogParams.departmentId=obj.departmentId;
      this.getListEditors();
      this.distributeParams.id=obj.id;
      this.distributeParams.isRejectedByDirector=obj.isRejectedByDirector;
			this.dialogVisible = true;
		},
		/**分配部门编辑、退回运维人员 */
		directorHandling(id,editorId,isRejectedByDirector,reasonDirector){
			this.$axios.put('/pmpheep/topic/put/directorHandling',this.$initPostData({
				id: id || this.id,
				editorId: editorId,
				isRejectedByDirector: isRejectedByDirector || this.isRejectedByDirector,
				reasonDirector: reasonDirector || this.reasonDirector
			})).then(response => {
				let res = response.data;
				if (res.code == '1') {
					this.$message.success('操作成功！');
					this.getTableData();
				} else {
					this.$message.error(res.msg.msgTrim());
				}
			}).catch(err=>{
				this.$message.error('操作错误，请稍后再试！');
			})
		},
		/**搜索 */
		search(){
			this.searchParams.pageSize = 10;
			this.searchParams.pageNumber = 1;
			this.getTableData();
    },
    diaSearch(){
      this.dialogParams.pageSize = 10;
			this.dialogParams.pageNumber = 1;
			this.getListEditors();
    },
		/**分页查询 */
    handleSizeChange(val) {
			this.searchParams.pageSize = val;
			this.getTableData();
		},
    handleCurrentChange(val) {
			this.searchParams.pageNumber = val;
			this.getTableData();
		},
		/**分页查询 */
    dialogSizeChange(val) {
			this.dialogParams.pageSize = val;
			this.getListEditors();
		},
    dialogCurrentChange(val) {
			this.dialogParams.pageNumber = val;
			this.getListEditors();
		}
  }
};
</script>
<style >
.distribute_editor .header_p {
  overflow: hidden;
}
.distribute_editor .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.distribute_editor .dialog .el-dialog {
  min-width: 635px;
}
</style>

<template>
  <div class="acceptance">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input" v-model="searchParams.name" placeholder="请输入选题名称" @keyup.enter.native='search'></el-input>
       <span>提交日期：</span>
       <el-date-picker
            v-model="searchParams.data"
            class="input"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
         <p class="link" @click="$router.push({name:'选题受理',query:{id:scope.row.id,active:'third',type:'detail'}})">{{scope.row.bookName}}</p>
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
      label="操作"
      width="210"
     >
     <template scope="scope">
       <el-button type="text" :disabled="scope.row.isEditorHandling" @click="acceptance(scope.row.id,true)">受理</el-button>
       <span>|</span>
       <el-button type="text" :disabled="!scope.row.isEditorHandling" @click="$router.push({name:'选题受理',query:{id:scope.row.id,active:'third',type:'check'}})">审核</el-button>
       <span>|</span>
       <el-button type="text" :disabled="scope.row.isEditorHandling" @click="retire(scope.row.id)">退回分配人</el-button>
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
		<el-dialog title="退回原因" :visible.sync="dialogTableVisible" size="tiny">
			<el-input
				type="textarea"
				:rows="4"
				placeholder="请输入内容"
				v-model="reasonEditor">
			</el-input>
			<el-button class="pull-right marginB10 marginT10 marginL10" type="primary" @click="makeSure">确定</el-button>	
			<el-button class="pull-right marginB10 marginT10">取消</el-button>	
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
      pageTotal: 100,
      tableData: [
        {
					id:'1',
          bookName: "中医基础",
          writer: "张三一",
          expectData: "2018-6-30",
          bookCategory: "教材",
          submitData: "2017-5-21",
          submission: "指定编辑"
        },
        {
          name: "中医基础",
          writer: "李四",
          expectData: "2018-6-30",
          bookCategory: "教材",
          submitData: "2017-5-21",
          submission: "自由投稿"
        },
        {
          name: "中医基础",
          writer: "张三",
          expectData: "2018-6-30",
          bookCategory: "教材",
          submitData: "2017-5-21",
          submission: "指定编辑"
        },
        {
          name: "中医基础",
          writer: "李四",
          expectData: "2018-6-30",
          bookCategory: "教材",
          submitData: "2017-5-21",
          submission: "自由投稿"
        }
			],
			id: '', // 选题id
			dialogTableVisible: false,
			reasonEditor: '' // 部门编辑退回原因
    };
	},
  props:['activeName'],
  watch:{
   activeName(val){
   if(val=='third'){
     this.search();
   }
   }
  },
	created(){
		this.getTableData();
	},
  methods: {
		/**获取表格数据 */
		getTableData(){
			this.$axios.get('/pmpheep/topic/listEditor',{
				params:{
					pageSize: this.searchParams.pageSize,
					pageNumber: this.searchParams.pageNumber,
					sessionId: this.$getUserData().sessionId,
					bookName: this.searchParams.name,
					submitTime: this.searchParams.data
				}
			}).then(response => {
				let res = response.data;
				if (res.code == '1') {
					this.tableData = res.data.rows;
					this.pageTotal = res.pageTotal;
				}
			})
		},
		makeSure(){
			console.log(this.id);
			this.acceptanceApi(this.id,'',true,this.reasonEditor);
		},
		// 点击退回
		retire(id){
      this.reasonEditor='';
			this.dialogTableVisible = true;
			this.id = id;
			console.log(this.id);
		},
		acceptance(id,isEditorHandling){
			this.acceptanceApi(id,isEditorHandling,'','');
		},
		/**受理、退回分配人 */
		acceptanceApi(id,isEditorHandling,isRejectedByEditor,reasonEditor){
			this.$axios.put('/pmpheep/topic/put/editorHandling',this.$initPostData({
				id: id,
				isAccepted: isEditorHandling, // 受理
				isRejectedByEditor: isRejectedByEditor, // 退回
				reasonEditor: reasonEditor // 退回
			})).then((res) => {
				if (res.data.code == '1') {
          console.log('222222222');
					this.$message.success('操作成功！');
          this.getTableData();
          this.dialogTableVisible=false;
          if(isEditorHandling){

          }else{
            this.$emit('changeActive','second');
          }
				} else {
					this.$message.error(res.msg.msgTrim());
				}
			}).catch(err => {
			})
		},
		/**搜索 */
		search(){
			this.searchParams.pageNumber = 1;
			this.getTableData();
		},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style scoped>
.acceptance .header_p {
  overflow: hidden;
}
.acceptance .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

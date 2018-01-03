<template>
  <div class="acceptance">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input" v-model="searchParams.name" placeholder="请输入选题名称"></el-input>
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
         <p class="link">{{scope.row.bookName}}</p>
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
       <el-button type="text" @click="acceptance">受理</el-button>
       <span>|</span>
       <el-button type="text" @click="$router.push({name:'选题受理'})">审核</el-button>
       <span>|</span>
       <el-button type="text">退回分配人</el-button>
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
      ]
    };
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
					// this.tableData = res.data.rows;
					this.pageTotal = res.pageTotal;
				}
			})
		},
		/**受理 */
		acceptance(){

		},
		/**搜索 */
		search(){
			this.searchParams.pageSize = 10;
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

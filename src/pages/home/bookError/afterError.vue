<template>
  <div class="affter_error" style="height:100%;">
		<el-row>
            <div class="searchBox-wrapper">
                <div class="searchName">书名/ISBN:<span></span></div>
                <div class="searchInput">
                    <el-input v-model.trim="title" placeholder="请输入" @keyup.enter.native="search"></el-input>
                </div>
            </div>
            <div class="searchBox-wrapper searchBox-radio">
                <div class="searchName">是否回复:<span></span></div>
                <el-radio-group v-model="result" class="radio-group" @change="change">
									<el-radio :label="null">全部</el-radio>
									<el-radio :label="true">已回复</el-radio>
									<el-radio :label="false">未回复</el-radio>
								</el-radio-group>
            </div>
            <div class="searchBox-wrapper searchBtn">
                <el-button  type="primary"  icon="search" @click="search">搜索</el-button>
            </div>
						<div class="searchBox-wrapper searchBtn">
                <el-button  type="primary" @click="exportExcel">导出EXCEL</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="bookname" label="书名" >
                    </el-table-column>
                    <el-table-column prop="isbn" label="ISBN" >
                    </el-table-column>
                    <el-table-column prop="dpName" label="编辑部门">
                    </el-table-column>
                    <el-table-column prop="typeName" label="分类">
                    </el-table-column>
                    <el-table-column prop="realname" label="策划编辑">
                    </el-table-column>
                    <el-table-column prop="dutyName" label="责任编辑" >
                    </el-table-column>
                    <el-table-column prop="result" label="核查结果" width="95" align="center">
											<template scope="scope">
												<p v-if="scope.row.isEditorReplied">{{scope.row.resultString}}</p>
											</template>
                    </el-table-column>
										<el-table-column prop="content" label="纠错信息">
											<template scope="scope">
												<p>页码：{{scope.row.page}} 行数：{{scope.row.line}}</p>
											</template>
                    </el-table-column>
										<el-table-column prop="authorReply" label="主编回复"  align="center">
                    </el-table-column>
										<el-table-column label="是否回复" width="95" align="center">
											<template scope="scope">
												{{scope.row.isEditorRepliedString}}
											</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-pagination
        v-if="total>pageSize"
        class="pull-right marginT10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "", // 书名
      result: null, // 是否回复
      currentPage: 1, // 当前页
      pageSize: 20,
      pageNumber: 1,
      total: 0,
      tableData: [],
      startTime: "", // 开始时间
      endTime: "" // 结束时间
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      this.$axios
        .get("pmpheep/bookCorrection/listTrack", {
          params: {
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            bookname: this.title,
            isEditorReplied: this.result
          }
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1) {
            this.tableData = res.data.rows;
            this.total = res.data.total;
            this.tableData.forEach(item => {
              item.gmtCreate = this.$commonFun.formatDate(item.gmtCreate);
            });
          }
        });
		},
		/**导出excel */
		exportExcel(){
      console.log(this.title);
			let url = "/pmpheep/bookCorrectionTrack/exportExcel?bookname=" + this.title +'&isEditorReplied='+(this.result==null?'':this.result);
			this.$commonFun.downloadFile(url);
		},
    /** 搜索*/
    search() {
      this.pageSize = 20;
      this.pageNumber = 1;
      this.getBooks();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getBooks();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getBooks();
    },
    /** 切换检查结果 */
    change(val) {
      this.result = val;
      this.getBooks();
    }
  }
};
</script>
<style>
.search-title {
  margin: 10px 0 0 10px;
  font-size: 16px;
  float: left;
  height: 36px;
  line-height: 36px;
}
.searchBox-radio {
  width: 380px;
}
.radio-group {
  margin-top: 9px;
  margin-left: 5px;
}
.link {
  color: blue;
}
</style>

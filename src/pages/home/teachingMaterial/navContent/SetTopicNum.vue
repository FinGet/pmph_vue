<template>
	<div class="set-topic-num">
    <p class="page-title">设置选题号:</p>

    <div class="teachingMaterial-search clearfix">
      <!--&lt;!&ndash;书名选择框&ndash;&gt;-->
      <!--<div class="searchBox-wrapper">-->
        <!--<div class="searchName">书名：<span></span></div>-->
        <!--<div class="searchInput">-->
          <!--<el-input placeholder="请输入关键字" class="searchInputEle"></el-input>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;姓名搜索&ndash;&gt;-->
      <!--<div class="searchBox-wrapper searchBtn">-->
        <!--<el-button  type="primary" icon="search">搜索</el-button>-->
      <!--</div>-->

      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" >导入</el-button>
        <el-button type="primary" >导出</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="书序"
          prop="sort"
          width="120">
        </el-table-column>
        <el-table-column
          prop="textbookName"
          label="书籍名称">
        </el-table-column>
        <el-table-column
          prop="textbookRound"
          label="版次"
          width="180">
        </el-table-column>
        <el-table-column
          label="选题号">
          <template scope="scope">
            <div class="width200">
              <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model="scope.row.topicNumber"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        tableData:[],
        materialId:'',// 教材ID
        book:{
          id: '', // 书籍id
          materialId: '' ,//教材
          textbookName: '', // 书籍名称
          textbookRound: '', //书籍轮次
          sort: '', // 图书序号
          isPublished: false, // 是否发布
          topicNumber: '', // 选题号
        },
        topicTextbooks:[]
      }
		},
    created(){
      this.materialId = this.$route.params.materialId
      // console.log(this.materialId)
    },
    mounted(){
      this.getTableList()
    },
    methods:{
      /**
        获取初始化教材数据
       */
      getTableList(){
        this.$axios.get('/pmpheep/textBook/list/topics',{
          params:{
            materialId: this.materialId
          }
        }).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.tableData = res.data
            // console.log(this.tableData)
            this.tableData.sort(function(a,b){
              return a.sort - b.sort
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit(){
        // console.log(this.tableData)
        var re = /^[0-9]+[0-9]*]*$/
        for (var i = 0; i < this.tableData.length; i++) {
          for (var key in this.book) {
            this.book[key] = this.tableData[i][key]
          }
          if ( this.tableData[i].topicNumber && !re.test(this.tableData[i].topicNumber)) {
            this.$message.error('选题号只能为数字')
            return
          }
          // console.log(this.book)
          this.topicTextbooks.push(this.book)
          this.book={
            id: '', // 书籍id
            materialId: '' ,//教材
            textbookName: '', // 书籍名称
            textbookRound: '', //书籍轮次
            sort: '', // 图书序号
            isPublished: false, // 是否发布
            topicNumber: '', // 选题号
          }
        }
        // console.log(this.topicTextbooks)
        this.$confirm('确认提交选题号！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/pmpheep/textBook/add/topic',this.$initPostData({
            topicTextbooks: JSON.stringify(this.topicTextbooks)
          })).then(response => {
            let res = response.data
            if (res.code == 1) {
              this.$message.success('设置成功!');
              this.$router.go(-1)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }).catch(() => {});
      }
    }
	}
</script>

<style scoped>
.searchInputEle {
  padding: 3px 0;
}
</style>

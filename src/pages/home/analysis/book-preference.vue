<template>
	<div class="book-preference-page">
    <!--搜索-->
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">书籍名称/ISBN：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" v-model="searchForm.bookname"  @keyup.enter.native="search"></el-input>
        </div>
      </div>
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书籍类别：<span></span></div>
        <div class="searchInput">
          <el-cascader
            class="searchInputEle bookType"
            :options="bookTypeList"
            :props="{ label: 'typeName', value:'id', children: 'childrenMaterialTypeVO' }"
            :value="searchForm.typeId"
            @change="bookTypeChange"
            :change-on-select="true"
          ></el-cascader>
        </div>
      </div>
      <!--搜索-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search" @click="search">搜索</el-button>
      </div>
    </div>

    <!--图表-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="图书名称"  prop="bookname"></el-table-column>
        <el-table-column label="收藏次数"  prop="bookmarks" width="140" align="center"></el-table-column>
        <el-table-column label="浏览次数"  prop="clicks" width="140" align="center"></el-table-column>
        <el-table-column label="3以上星评价次数"  prop="count" width="160" align="center"></el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum > searchForm.pageSize"
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="searchForm.pageSize"
        :current-page.sync="searchForm.pageNumber"
        @size-change="paginationSizeChange"
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
			  api_book_list:'/pmpheep/baidu/list/bookPreference',
        api_book_types:'/pmpheep/books/list/materialType',
        tableData:[],
        searchForm:{
          pageSize:30,
          pageNumber:1,
          bookname:'',
          typeId:[],
        },
        totalNum:0,
        bookTypeList: [],
        bookTypeProps: {
          label: 'typeName',
          value:'path',
          children: 'childrenMaterialTypeVO'
        },
        bookTypeSelected:[],
      }
		},
    methods:{
      /**
       * 获取数据
       */
      getTableData(){
        let id = this.bookTypeSelected[this.bookTypeSelected.length-1];
        let path = '';

        this.$commonFun.recurveList(this.bookTypeList,'childrenMaterialTypeVO',(iterm)=>{
          if(id==iterm.id){
            path=iterm.path;
          }
        });
        this.$axios.get(this.api_book_list,{params:{
          pageSize:this.searchForm.pageSize,
          pageNumber:this.searchForm.pageNumber,
          bookname:this.searchForm.bookname,
          path:path,
          type:id,
        }})
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {
              this.totalNum = res.data.total
              this.tableData=res.data.rows;
            }else{
              self.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 搜索
       */
      search(){
        this.searchForm.pageNumber=1;
        this.getTableData()
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
       * 获取书籍类别树数据
       */
      getBookType(){
        this.$axios.get(this.api_book_types)
          .then((response)=>{
            var res = response.data;
            if(res.code==1){
              res.data.typeName='全部';
              res.data.path='';
              this.bookTypeList = res.data.childrenMaterialTypeVO;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 级联下拉值变化时触发此方法
       * @param res
       */
      bookTypeChange(res){
        this.bookTypeSelected=res;
      },
    },
    created(){
		  this.getTableData();
		  this.getBookType();

      if(window._hmt){
        _hmt.push(['_trackPageview', '/analysis/book-preference']);
      }
    }
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
  .powerSearch .searchName{
    width: 140px;
  }
  .powerSearch .searchBox-wrapper .searchInput{
    margin-left: 144px;
  }
  .searchBox-wrapper.lg{
    width: 500px;

  }
  .bookType{
    width: 100% !important;
    max-width: 100% !important;
  }
</style>

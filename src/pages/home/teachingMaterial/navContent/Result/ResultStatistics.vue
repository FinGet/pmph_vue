<template>
  <div class="applicationStatistics">
    
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="按书名统计" name="bookName">
        <div class="applicationStatistics-byBookName">
          <!--搜索-->
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">书    名：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model.trim="bookParams.bookName" @keyup.enter.native="getBooksTableData"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getBooksTableData">搜索</el-button>
            </div>
            <el-button type="primary" class="pull-right marginL10">
              <i class="fa fa-cloud-upload" aria-hidden="true"></i>
              导出
            </el-button>
          </div>
          <!--表格-->
          <div class="table-wrapper">
            <el-table
              :data="bookTableData"
              border
              style="width: 100%">
              <el-table-column
                prop="row"
                label="序号"
                align="center"
                width="68">
              </el-table-column>
              <el-table-column
                prop="bookName"
                label="书名">
              </el-table-column>
              <el-table-column
                prop="editorList"
                label="主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="subeditorList"
                label="副主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="editorialList"
                label="编委名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="isDigitalEditorList"
                label="数字编委名单"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="booksTotal>bookParams.pageSize"
              :page-sizes="[10,20,30, 40]"
              @size-change="handleBookSizeChange"
              @current-change="handleBookCurrentChange"
              :page-size="bookParams.pageSize"
              :current-page="bookParams.pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="booksTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按申报单位统计" name="school">
        <div class="applicationStatistics-bySchool">
          <!--搜索-->
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">单位名称：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model.trim="schoolParams.schoolName" @keyup.enter.native="getSchoolTableData"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getSchoolTableData">搜索</el-button>
            </div>
            <el-button type="primary" class="pull-right marginL10">
              <i class="fa fa-cloud-upload" aria-hidden="true"></i>
              导出
            </el-button>
            <el-button type="primary" class="pull-right"  @click="sortType=!sortType">{{!sortType?'按当选数排序':'按申报数排序'}}</el-button>
          </div>
          <!--表格-->
          <div class="table-wrapper">
            <el-table
              :data="schoolTableData"
              border
              style="width: 100%">
              <el-table-column
                prop="row"
                label="序号"
                align="center"
                width="68">
              </el-table-column>
              <el-table-column
                prop="schoolName"
                label="申报单位">
              </el-table-column>
              <el-table-column
                prop="editorList"
                label="主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="subeditorList"
                label="副主编名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="editorialList"
                label="编委名单"
                align="center">
              </el-table-column>
              <el-table-column
                prop="isDigitalEditorList"
                label="数字编委名单"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="schoolTotal>schoolParams.pageSize"
              @size-change="handleSchoolSizeChange"
              @current-change="handleSchoolCurrentChange"
              :page-sizes="[10,20,30,40]"
              :page-size="schoolParams.pageSize"
              :current-page="schoolParams.pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="schoolTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from "../../../../../../static/echarts/echarts.common.min";
export default {
  data() {
    return {
      activeName: "bookName",
      schoolResultUrl:'/pmpheep/decPosition/list',  //学校结果统计URL
      bookResultUrl: '/pmpheep/decPosition/list/bookList', // 书籍结果统计url
      sortType:true,   //排序方式 true 按当选数排序  false 按申报数排序
      bookParams: {
        bookName: "",
        pageNumber:1,
        pageSize:10,
        materialId:'',
      },
      schoolParams:{
        pageNumber:1,
        pageSize:10,
        materialId:'',
        schoolName:''
      },
      booksTotal:0, // 按书名统计 - 分页数据总数
      schoolTotal:0, // 按学校统计 - 分页数据总数
      schoolTableData: [
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        },
        {
          xuhao: 1,
          bookName: "三峡大学医学院",
          p1: "王磊,冀敏",
          p2: "李晓春,吴杰",
          p3: "陈月明,张延芳,辛学刚,吉强,刘东华,郭嘉泰,王章金,聂娅,杨中芹,王岚,盖志刚,王昌军,童家明,盖立平,莫华"
        }
      ],
      bookTableData: []
    };
  },
  watch:{
     sortType(){
       this.getSchoolTableData();
     }
  },
  created(){
    this.schoolParams.materialId=this.bookParams.materialId=this.$route.params.materialId;
    this.getSchoolTableData()
    this.getBooksTableData()
  },
  methods: {
    /**
       * 按学校统计获取表格数据
       */
    getSchoolTableData() {
      this.$axios.get(this.schoolResultUrl+(this.sortType?'/schoolListChosen':'/schoolListPreset'),{
       params:this.schoolParams
     }).then((res)=>{
       console.log(res);
       if(res.data.code==1){
          var resData = res.data.data;
          this.schoolTotal=resData.total;
          this.schoolTableData=resData.rows;
       }
     })
    },
    /**按数据统计获取表格数据 */
    getBooksTableData(){
      this.$axios.get(this.bookResultUrl,{
        params: this.bookParams
      }).then(response => {
        let res = response.data
        if(res.code==1){
          var resData = res.data.rows;
          this.booksTotal=res.data.total;
          this.bookTableData=resData;
       }
      })
    },
    handleBookSizeChange(val){
      this.bookParams.pageSize = val;
      this.getBooksTableData();
    },
    handleBookCurrentChange(val){
      this.bookParams.pageNumber = val;
      this.getBooksTableData();
    },
    handleSchoolSizeChange(val){
      this.schoolParams.pageSize = val;
      this.getSchoolTableData();
    },
    handleSchoolCurrentChange(val) {
      this.schoolParams.pageNumber = val;
      this.getSchoolTableData();
    },
    /**
       * 点击tabs切换
       */
    handleTabsClick(tab, event) {
       this.schoolParams.schoolName='';
       this.bookParams.bookName='';
    }
  },
  mounted() {}
};
</script>

<style scoped>

</style>

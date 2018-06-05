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
            <el-button type="primary" class="pull-right marginL10" @click="exportBookExcel">
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
                prop="subEditorList"
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
            <el-button type="primary" class="pull-right marginL10" @click="exportSchoolExcel">
              <i class="fa fa-cloud-upload" aria-hidden="true"></i>
              导出
            </el-button>
            <el-button type="primary" class="pull-right"  @click="sortType=!sortType">{{!sortType?'按当选数排序':'  按申报数排序'}}</el-button>
          </div>
          <!--表格-->
          <div class="table-wrapper">
            <el-table
              :data="schoolTableData"
              ref="table"

              border
              style="width: 100%">
              <!--<el-table-column-->
                <!--prop="row"-->
                <!--label="序号"-->
                <!--align="center"-->
                <!--width="68">-->
              <!--</el-table-column>-->
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="68"
                >
              </el-table-column>
              <el-table-column
                prop="schoolName"
                label="申报单位" >
                <!--<template scope="scope">-->
                <!--<div class="content-rowspan">-->
                  <!--<div v-for="value in scope.row.schoolName">{{ value.schoolName }}</div>-->
                <!--</div>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                prop="bookname"
                label="书籍名称" >
                <template scope="scope">
                  <div class="content-rowspan">
                    <div v-for="value in scope.row.bookname">{{ value.bookname }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="editorList"
                label="主编名单"
                align="center">
                <template scope="scope">
                  <div class="content-rowspan">
                    <div v-for="value in scope.row.editorList">{{ value.editorList }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="subEditorList"
                label="副主编名单"
                align="center">
                <template scope="scope">
                  <div class="content-rowspan">
                    <div v-for="value in scope.row.subEditorList">{{ value.subEditorList }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="editorialList"
                label="编委名单"
                align="center">
                <template scope="scope">
                  <div class="content-rowspan">
                    <div v-for="value in scope.row.editorialList">{{ value.editorialList }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="isDigitalEditorList"
                label="数字编委名单"
                align="center">
                <template scope="scope">
                  <div class="content-rowspan">
                    <div v-for="value in scope.row.isDigitalEditorList">{{ value.isDigitalEditorList }}</div>
                  </div>
                </template>
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
      rowlength:0,
      flag_schoolName:'',
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
      schoolTableData: [],
      bookTableData: []
    };
  },
  watch:{
     sortType(){
       this.getSchoolTableData();
     },
    schoolTableData:{
      //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      handler:function(newValue,oldVal){
       // debugger;
          // this.objectSpanMethod();
      },
      deep:true
    }
  },
  created(){
    this.schoolParams.materialId=this.bookParams.materialId=this.$route.params.materialId;

    this.getSchoolTableData()
    this.getBooksTableData()
    var _this = this;
    // this.$nextTick(setTimeout(function () {
    //   _this.objectSpanMethod();
    // },2000))

  },
  methods: {
    // 拿到数据 重新进行组装
    dataArray(data){
      let  schoolN = data.length>0?data[0].schoolName:"";
      let  returnData = [];
      let bookname_array = [];
      let editorList_array = [];
      let subEditorList_array = [];
      let editorialList_array = [];
      let isDigitalEditorList_array = [] ;
      for (let rowIndex = 0; rowIndex <= data.length; rowIndex++) {
        if(data.length<=0) break;
        if(rowIndex >= data.length){
          returnData.push({
            "schoolName":schoolN,
            "bookname":bookname_array,
            "editorList":editorList_array,
            "subEditorList": subEditorList_array,
            "editorialList":editorialList_array,
            "isDigitalEditorList":isDigitalEditorList_array
          });
          break;
        }
        let iterm = data[rowIndex];
        if(iterm.schoolName!=schoolN){
          returnData.push({
            "schoolName":schoolN,
            "bookname":bookname_array,
            "editorList":editorList_array,
            "subEditorList": subEditorList_array,
            "editorialList":editorialList_array,
            "isDigitalEditorList":isDigitalEditorList_array
          });
          bookname_array.length = 0;
          editorList_array.length = 0;
           subEditorList_array.length = 0;
           editorialList_array.length = 0;
           isDigitalEditorList_array.length = 0;
          schoolN = iterm.schoolName;
        }
        bookname_array.push({
          "bookname":iterm.bookname
        })
        editorList_array.push({
          "editorList":iterm.editorList,
        })
        subEditorList_array.push({
          "subEditorList":iterm.subEditorList,
        })
        editorialList_array.push({
          "editorialList":iterm.editorialList,
        })
        isDigitalEditorList_array.push({
          "isDigitalEditorList":iterm.isDigitalEditorList,
        })
      }
      return returnData;
    },
    objectSpanMethod() {
      let _this = this;
       // 此方法不可行 ，单元格删除时 再重新加载数据 单元格 数据会组合错误
        let tdArr = _this.$refs.table.$el.getElementsByClassName("el-table__body-wrapper")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        let m = 0;
        let rowspanIndex = 0;
        let schoolN = _this.schoolTableData[0].schoolName;
        if(!_this.$commonFun.Empty(tdArr)) {
          for (let rowIndex = 0; rowIndex <= _this.schoolTableData.length; rowIndex++) {
            let tableSN = rowIndex == _this.schoolTableData.length?"xxx":_this.schoolTableData[rowIndex].schoolName;
            if (tableSN != schoolN) {
              tdArr[rowspanIndex].getElementsByTagName("td")[1].setAttribute("rowspan", m);
              if (m > 1) {
                let delrowspanIndex = rowspanIndex + 1;
                for (let j = 0; j < m - 1; j++) {
                  tdArr[delrowspanIndex].deleteCell(1); //删除数据需要加一个钥匙
                  delrowspanIndex++;
                }

              }
              m = 0;
              rowspanIndex = rowIndex;
              schoolN = rowIndex == _this.schoolTableData.length?"xxx":_this.schoolTableData[rowIndex].schoolName;
            }
            m++;
          }
        }

    },
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
          this.schoolTableData=this.dataArray(resData.rows);
       }

     }).then(()=>{
        console.log(2222222222222222222);

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
       if(tab.name=="bookName"){
         this.getBooksTableData();
       }else{
         this.getSchoolTableData();
       }
    },
    /** 导出Excel */
    exportBookExcel(){
      let url = '/pmpheep/result/exportResultBook/?materialId='+ this.schoolParams.materialId + '&bookName=' + this.bookParams.bookName;
      // console.log(url)
      this.$commonFun.downloadFile(url);
    },
    exportSchoolExcel(){
      let url = '/pmpheep/result/exportResultSchool/?materialId='+ this.schoolParams.materialId + '&schoolName=' + this.schoolParams.schoolName + '&state=' + (this.sortType?1:2) ;
      // console.log(url)
      this.$commonFun.downloadFile(url);
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
  .content-rowspan div {
    padding-left: 13px;
    line-height: 46px;
    border-bottom: 1px solid #ECEDEE;
  }
  .content-rowspan div:last-child {
    border-bottom: 0;
  }
</style>

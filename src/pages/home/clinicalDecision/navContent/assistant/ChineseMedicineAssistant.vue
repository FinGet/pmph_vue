<template>
  <div class="material-result">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学科分类" name="first">1111
        <!--<div class="applicationStatistics-byBookName">
        &lt;!&ndash;搜索&ndash;&gt;
        <div class="clearfix">
          <div class="searchBox-wrapper">
            <div class="searchName">学科分类：<span></span></div>
            <div class="searchInput">
              <el-input placeholder="请输入" class="searchInputEle" v-model.trim="subject.typeName" @keyup.enter.native="getSubjectTableDataFun"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search" @click="getSubjectTableDataFun">搜索</el-button>
          </div>
          <el-button type="primary" class="pull-right" @click="exportSubjectExcel">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
            导入
          </el-button>
        </div>
        &lt;!&ndash;表格&ndash;&gt;
        <div class="table-wrapper">
          <el-table
            :data="subjectTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="typeName"
              label="学科分类">
            </el-table-column>
            <el-table-column
              prop="declarationsNum"
              label="申报人数"
              align="center"
              width="110">
            </el-table-column>
            <el-table-column
              prop="passNum"
              label="通过人数"
              align="center"
              width="120">
            </el-table-column>
          </el-table>
        </div>
        &lt;!&ndash;分页&ndash;&gt;
        <div class="pagination-wrapper">
          <el-pagination
            v-if="subjectTotal>subject.pageSize"
            @size-change="subjectSizeChange"
            @current-change="subjectCurrentChange"
            :page-sizes="[10,20,30, 50, 100]"
            :page-size="subject.pageSize"
            :current-page="subject.pageNumber"
            layout="total, sizes, prev, pager, next, jumper"
            :total="subjectTotal">
          </el-pagination>
        </div>
      </div>-->
      </el-tab-pane>
      <el-tab-pane label="内容分类" name="second">
        <!--<div class="applicationStatistics-byContent">
          &lt;!&ndash;搜索&ndash;&gt;
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">内容分类：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model.trim="content.typeName" @keyup.enter.native="getContentTableDataFun"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getContentTableDataFun">搜索</el-button>
            </div>
            <el-button type="primary" class="pull-right marginL10" @click="exportContentExcel">
              <i class="fa fa-cloud-upload" aria-hidden="true"></i>
              导出
            </el-button>
          </div>
          &lt;!&ndash;表格&ndash;&gt;
          <div class="table-wrapper">
            <el-table
              :data="contentTableData"
              border
              style="width: 100%">
              <el-table-column
                prop="typeName"
                label="内容分类">
              </el-table-column>
              <el-table-column
                prop="declarationsNum"
                label="申报人数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="passNum"
                label="通过人数"
                align="center"
                width="120">
              </el-table-column>
            </el-table>
          </div>
          &lt;!&ndash;分页&ndash;&gt;
          <div class="pagination-wrapper">
            <el-pagination
              v-if="contentTotal>content.pageSize"
              @size-change="contentSizeChange"
              @current-change="contentCurrentChange"
              :page-sizes="[10,20,30, 50,100]"
              :page-size="content.pageSize"
              :current-page="content.pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="contentTotal">
            </el-pagination>
          </div>

        </div>-->2222
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    props:['productType'],
    data() {
      return {
        activeName: 'second',
        contentSituationUrl:'/pmpheep/decPosition/list'   ,  //内容统计URL
        subjectSituationUrl:'/pmpheep/decPosition/list/subjectResults',   //学科统计URL
        stSubjects:[], // 申报情况统计 - 按学科统计 - 书籍
        stPresetPersons:[], // 申报情况统计 - 按学科统计 - 申报人数
        stChosenPersons:[], // 申报情况统计 - 按学科统计 - 通过人数

        stContents:[], // 申报情况统计 - 按内容统计 - 内容
        stContentPresetPersons:[], // 申报情况统计 - 按内容统计 - 申报人数
        stContentChosenPersons:[], // 申报情况统计 - 按内容统计 - 通过人数
        content:{
          pageNumber:1,
          pageSize:10,
          typeName:''
        },
        contentTotal:1,
        contentTableData:[],
        subject:{
          pageNumber:1,
          pageSize:10,
          typeName:''
        },
        subjectTotal:1,
        subjectTableData:[],

      };
    },methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getContentTableDataFun(){
        this.content.pageNumber=1;
        this.getContentTableData();
      },
      /* 获取内容申报情况统计数据 */
      getContentTableData(){
        this.$axios.get(this.contentSituationUrl,{
          params:this.content
        }).then((res)=>{
          if(res.data.code==1){
            var resData = res.data.data;
            this.contentTotal=resData.total;
            this.contentTableData=resData.rows;
          }
        })
      },

      getSubjectTableDataFun(){
        this.subject.pageNumber=1;
        this.getSubjectTableData();
      },
      /* 获取按学科统计申报情况 */
      getSubjectTableData(){
        this.$axios.get(this.subjectSituationUrl,{
          params:this.subject
        }).then((res)=>{
          console.log(res)
          console.log(this.subjectTableData)
          if(res.data.code==1){
            this.subjectTotal=res.data.data.total;
            this.subjectTableData=res.data.data.rows;
          }
        })
      },

      /* 分页切换 */
      contentSizeChange(val){
        this.content.pageSize=val;
        this.content.pageNumber=1;
        this.getContentTableData();
      },
      contentCurrentChange(val){
        this.content.pageNumber=val;
        this.getContentTableData();
      },
      subjectSizeChange(val){
        this.subject.pageSize=val;
        this.subject.pageNumber=1;
        this.getSubjectTableData();
      },
      subjectCurrentChange(val){
        this.subject.pageNumber=val;
        this.getSubjectTableData();
      },
      /**
       * 获取表格数据
       */
      getTableData() {},
      /**
       * 点击tabs切换
       */
      handleTabsClick(tab, event) {
        console.log(tab,event);
        this.subject.typeName='';
        this.content.typeName='';
        if(tab.name=='typeName'){
          this.getSubjectTableData();
        }else{
          this.getContentTableData();
        }
      },
      /** 导出Excel */
      exportSubjectExcel(){
        let url = '/pmpheep/result/exportSituationSubject/?productType='+ this.productType + '&typeName=' + this.subject.typeName;
        // console.log(url)
        this.$commonFun.downloadFile(url);
      },
      exportContentExcel(){
        let url = '/pmpheep/result/exportSituationConent/?productType='+ this.productType + '&typeName=' + this.contentParams.typeName  ;
        // console.log(url)
        this.$commonFun.downloadFile(url);
      }
    },
    components:{


    },
    created(){
      this.getContentTableData();
      this.getSubjectTableData();
    },
    mounted() {


    }
  }
</script>

<style scoped>
  .title {
    margin-bottom: 18px;
    margin-left: 20px;
    font-size: 15px;
    color: #8a8585;
  }
  .num-chart-iterm {
    display: inline-block;
    width: 180px;
  }
  .num-chart-iterm > div {
    margin: 0 auto;
    width: 104px;
    height: 62px;
    border-bottom: none !important;
    border-radius: 68px 68px 0 0;
    text-align: center;
    line-height: 20px;
  }
  .num-chart-iterm > div > span {
    font-size: 14px;
    font-weight: bold;
  }
  .num-chart-iterm > div > span.small {
    font-size: 18px;
  }
  .num-chart-iterm > p {
    background: #fff;
    border: 1px solid #ccc;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    width: 140px;
    margin: 0 auto;
    text-align: center;
  }
  .num-chart-iterm:nth-of-type(n + 1) > div {
    border: 8px solid #c24fb7;
    color: #c24fb7;
  }
  .num-chart-iterm:nth-of-type(n + 2) > div {
    border: 8px solid #ff9f40;
    color: #ff9f40;
  }
  .num-chart-iterm:nth-of-type(n + 3) > div {
    border: 8px solid #ff685f;
    color: #ff685f;
  }
  .num-chart-iterm:nth-of-type(n + 4) > div {
    border: 8px solid #25a3de;
    color: #25a3de;
  }
  .num-chart-iterm:nth-of-type(n + 5) > div {
    border: 8px solid #2dc183;
    color: #2dc183;
  }
  .num-chart-iterm:nth-of-type(n + 6) > div {
    border: 8px solid #357ab3;
    color: #357ab3;
  }

  .gray{
    color:#8a8585;
    font-weight: normal;
  }
  .marginspan{
    display: inline-block;
    margin-top: 27px;
  }
</style>

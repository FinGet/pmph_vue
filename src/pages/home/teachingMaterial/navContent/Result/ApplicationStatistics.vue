<template>
	<div class="applicationStatistics">
    <div class="total-chart paddingT30 paddingB30">
            <div class="num-chart-iterm">
              <div>
                <span>{{situationCount.schoolDeclarationCount}}</span>
              </div>
              <p>院校申报总数</p>
            </div>
            <div class="num-chart-iterm">
              <div>
                <span>{{situationCount.schoolDeclarationAverage}}</span>
              </div>
              <p>院校申报平均数</p>
            </div>
            <div class="num-chart-iterm">
              <div>
                <span>{{situationCount.editorCount}}</span>
              </div>
              <p>主编申报总数</p>
            </div>
            <div class="num-chart-iterm">
              <div>
                <span>{{situationCount.subEditorCount}}</span>
              </div>
              <p>副主编申报总数</p>
            </div>
            <div class="num-chart-iterm">
              <div>
                <span>{{situationCount.editorialCount}}</span>
              </div>
              <p>编委申报总数</p>
            </div>
          </div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="按书名统计" name="bookName">
        <div class="applicationStatistics-byBookName">
          <!--搜索-->
          <div class="clearfix">
            <div class="searchBox-wrapper">
              <div class="searchName">书    名：<span></span></div>
              <div class="searchInput">
                <el-input placeholder="请输入" class="searchInputEle" v-model.trim="bookParmas.bookName" @keyup.enter.native="getBookTableData"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper searchBtn">
              <el-button  type="primary" icon="search" @click="getBookTableData">搜索</el-button>
            </div>
            <el-button type="primary" class="pull-right">
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
                prop="presetPositionEditor"
                label="主编申报数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="presetPositionSubeditor"
                label="副主编申报数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="presetPositionEditorial"
                label="编委申报数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="chosenPositionEditor"
                label="主编当选数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="chosenPositionSubeditor"
                label="副主编当选数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="chosenPositionEditorial"
                label="编委当选数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="isDigitalEditor"
                label="数字编委当选数"
                align="center"
                width="136">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="bookTotal>bookParmas.pageSize"
              @size-change="bookSizeChange"
              @current-change="bookCurrentChange"
              :page-sizes="[10,20,30, 50, 100]"
              :page-size="bookParmas.pageSize"
              :current-page="bookParmas.pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="bookTotal">
            </el-pagination>
          </div>
          <div class="echart-wrapper" ref="echart_wrapper">
            <div id="echarts1" style="width: 100%;height:600px;" ref="echarts1"></div>
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
                prop="presetPositionEditor"
                label="主编申报数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="presetPositionSubeditor"
                label="副主编申报数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="presetPositionEditorial"
                label="编委申报数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="chosenPositionEditor"
                label="主编当选数"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="chosenPositionSubeditor"
                label="副主编当选数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="chosenPositionEditorial"
                label="编委当选数"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="isDigitalEditor"
                label="数字编委当选数"
                align="center"
                width="136">
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrapper">
            <el-pagination
              v-if="schoolTotal>schoolParams.pageSize"
              @size-change="schoolSizeChange"
              @current-change="schoolCurrentChange"
              :page-sizes="[10,20,30, 50,100]"
              :page-size="schoolParams.pageSize"
              :current-page="schoolParams.pageNumber"
              layout="total, sizes, prev, pager, next, jumper"
              :total="schoolTotal">
            </el-pagination>
          </div>
          <div class="echart-wrapper">
            <div id="echarts2" style="width: 100%;height:600px;" ref="echarts2"></div>
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
      totalChartUrl:'/pmpheep/decPosition/result/count',    //申报情况url
      schoolSituationUrl:'/pmpheep/decPosition/list'   ,  //学校统计URL
      bookSituationUrl:'/pmpheep/decPosition/list/bookResults',   //书名统计URL
      materialId:'',
      sortType:true,   //排序方式 true 按当选数排序  false 按申报数排序

      stBooks:[], // 申报情况统计 - 按书名统计 - 书籍
      stPresetPersons:[], // 申报情况统计 - 按书名统计 - 申报人数
      stChosenPersons:[], // 申报情况统计 - 按书名统计 - 当选人数

      stSchools:[], // 申报情况统计 - 按学校统计 - 学校
      stSchoolPresetPersons:[], // 申报情况统计 - 按学校统计 - 申报人数
      stSchoolChosenPersons:[], // 申报情况统计 - 按学校统计 - 当选人数

      schoolParams:{
        pageNumber:1,
        pageSize:10,
        materialId:'',
        schoolName:''
      },
      schoolTotal:1,
      schoolTableData:[],
      bookParmas:{
        pageNumber:1,
        pageSize:10,
        materialId:'',
        bookName:''
      },
      bookTotal:1,
      bookTableData:[],
      situationCount:{
            schoolDeclarationCount:0, //院校申报总数
            schoolDeclarationAverage:0, //院校申报平均数
            editorCount:0,          //主编申报总数
            subEditorCount:0,      //副主编申报总数
            editorialCount:0      //编委申报总数
      }
    };
  },
  created(){
    this.materialId=this.schoolParams.materialId=this.bookParmas.materialId=this.$route.params.materialId;
    this.getTotalChartData();
    this.getSchoolTableData();
    this.getBookTableData();
  },
  watch:{
     sortType(){
       this.getSchoolTableData();
      //  this.getSchoolEchart();
     }
  },
  methods: {
    /* 获取申报情况统计total */
    getTotalChartData(){
      this.$axios.get(this.totalChartUrl,{
        params:{
          materialId:this.materialId
        }
      }).then((res)=>{
        //console.log(res);
        if(res.data.code==1){
          this.situationCount=res.data.data;
        }
      })
    },
    /* 获取学校申报情况统计数据 */
    getSchoolTableData(){
     this.$axios.get(this.schoolSituationUrl+(this.sortType?'/schoolResultsChosen':'/schoolResultsPreset'),{
       params:this.schoolParams
     }).then((res)=>{
       if(res.data.code==1){
          var resData = res.data.data;
          this.schoolTotal=resData.total;
          this.schoolTableData=resData.rows;
       }
     })
    },
    /* 获取学校申报情况统计数据图表 */
    getSchoolEchart(){
      var myChart2 = echarts.init(this.$refs.echarts2);
     this.$axios.get(this.schoolSituationUrl+(this.sortType?'/schoolResultsChosen':'/schoolResultsPreset'),{
       params:{
          pageNumber:1,
          pageSize:20,
          materialId:this.schoolParams.materialId,
          schoolName:''
       }
     }).then((res)=>{
       if(res.data.code==1){
          var resData = res.data.data;
          resData.rows.forEach(item => {
            this.stSchools.push(item.schoolName)
            this.stSchoolPresetPersons.push(item.presetPersons)
            this.stSchoolChosenPersons.push(item.chosenPersons)
          })
          console.log(myChart2);
          myChart2.clear();
          myChart2.setOption({
            title: {
              show: "true",
              text: "申报人数统计图表"
            },
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ["申报人数", "当选人数"]
            },
            xAxis: [
              {
                name: "申报单位",
                type: "category",
                data: this.stSchools,
                axisPointer: {
                  type: "shadow"
                },
                axisLabel: {
                  interval: 0,
                  boundaryGap: [0, 0.01],
                  formatter: function(value) {
                    return value.split("").join("\n");
                  }
                }
              }
            ],
            grid: {
              left: "10%",
              bottom: "35%"
            },
            yAxis: [
              {
                type: "value",
                name: "申报人数",
                min: 0,
                minInterval: 1,
                axisLabel: {
                  formatter: "{value} 人"
                }
              },
              {
                type: "value",
                name: "当选人数",
                min: 0,
                minInterval: 1,
                axisLabel: {
                  formatter: "{value} 人"
                }
              }
            ],
            series: [
              {
                name: "申报人数",
                type: "bar",
                data: this.stSchoolPresetPersons
              },
              {
                name: "当选人数",
                type: "line",
                yAxisIndex: 1,
                data: this.stSchoolChosenPersons
              }
            ]
          })
          // console.log(this.stSchools,this.stSchoolPresetPersons,this.stSchoolChosenPersons);
       }
     })
    },
    /* 获取按书名统计申报情况 */
    getBookTableData(){
     this.$axios.get(this.bookSituationUrl,{
       params:this.bookParmas
     }).then((res)=>{
       console.log(res)
       console.log(this.bookTableData)
       if(res.data.code==1){
         this.bookTotal=res.data.data.total;
         this.bookTableData=res.data.data.rows;
       }
     })
    },
    /* 获取按书名统计申报情况图表 */
    getBookEchart(){
      var myChart = echarts.init(this.$refs.echarts1);
     this.$axios.get(this.bookSituationUrl,{
       params:{
         pageNumber:1,
          pageSize:20,
          materialId:this.bookParmas.materialId,
          schoolName:''
       }
     }).then((res)=>{
       if(res.data.code==1){
         res.data.data.rows.forEach(item => {
           this.stBooks.push(item.bookName); // 书籍
           this.stPresetPersons.push(item.presetPersons); // 申报人数
           this.stChosenPersons.push(item.chosenPersons); // 当选人数
         })
         myChart.setOption({
            title: {
              show: "true",
              text: "申报人数统计图表"
            },
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ["申报人数", "当选人数"]
            },
            xAxis: [
              {
                name: "书籍名称",
                type: "category",
                data: this.stBooks,
                axisPointer: {
                  type: "shadow"
                },
                axisLabel: {
                  interval: 0,
                  boundaryGap: [0, 0.01],
                  formatter: function(value) {
                    return value.split("").join("\n");
                  }
                }
              }
            ],
            grid: {
              left: "10%",
              bottom: "35%"
            },
            yAxis: [
              {
                type: "value",
                name: "申报人数",
                min: 0,
                minInterval:1,
                axisLabel: {
                  formatter: "{value} 人"
                }
              },
              {
                type: "value",
                name: "当选人数",
                min: 0,
                minInterval:1,
                axisLabel: {
                  formatter: "{value} 人"
                }
              }
            ],
            series: [
              {
                name: "申报人数",
                type: "bar",
                data: this.stPresetPersons
              },
              {
                name: "当选人数",
                type: "line",
                yAxisIndex: 1,
                data: this.stChosenPersons
              }
            ]
          })
       }
     })
    },
    /* 分页切换 */
    schoolSizeChange(val){
     this.schoolParams.pageSize=val;
     this.schoolParams.pageNumber=1;
     this.getSchoolTableData();
    },
    schoolCurrentChange(val){
      this.schoolParams.pageNumber=val;
      this.getSchoolTableData();
    },
    bookSizeChange(val){
      this.bookParmas.pageSize=val;
      this.bookParmas.pageNumber=1;
      this.getBookTableData();
    },
    bookCurrentChange(val){
      this.bookParmas.pageNumber=val;
      this.getBookTableData();
    },
    /**
       * 获取表格数据
       */
    getTableData() {},
    /**
       * 点击tabs切换
       */
    handleTabsClick(tab, event) {
     this.bookParmas.bookName='';
     this.schoolParams.schoolName=''; 
    }
  },
  mounted() {
    var echartWidth =
      (document.documentElement.clientWidth || document.body.clientWeight) -
      300;
    this.$refs.echarts1.style.width = echartWidth + "px";
    this.$refs.echarts2.style.width = echartWidth + "px";
    console.log(echartWidth);
    // 指定图表的配置项和数据
    this.getBookEchart();
    this.getSchoolEchart();
  }
};
</script>

<style scoped>
.num-chart-iterm {
  display: inline-block;
  width: 180px;
}
.num-chart-iterm > div {
  margin: 0 auto;
  width: 104px;
  height: 54px;
  border-bottom: none !important;
  border-radius: 68px 68px 0 0;
  text-align: center;
  line-height: 70px;
}
.num-chart-iterm > div > span {
  font-size: 22px;
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
.num-chart-iterm:nth-of-type(6n + 1) > div {
  border: 8px solid #c24fb7;
  color: #c24fb7;
}
.num-chart-iterm:nth-of-type(6n + 2) > div {
  border: 8px solid #ff9f40;
  color: #ff9f40;
}
.num-chart-iterm:nth-of-type(6n + 3) > div {
  border: 8px solid #ff685f;
  color: #ff685f;
}
.num-chart-iterm:nth-of-type(6n + 4) > div {
  border: 8px solid #25a3de;
  color: #25a3de;
}
.num-chart-iterm:nth-of-type(6n + 5) > div {
  border: 8px solid #2dc183;
  color: #2dc183;
}
.num-chart-iterm:nth-of-type(6n + 6) > div {
  border: 8px solid #357ab3;
  color: #357ab3;
}
.echart-wrapper {
  padding: 60px 0 0;
}
</style>

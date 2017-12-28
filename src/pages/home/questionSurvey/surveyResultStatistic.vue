<template>
  <div class="survery_result_statistic">
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         社交网站满意度问卷
       <span></span>
       </p>
       </div>
       <div style="width:100%;overflow:hidden;padding:0 20px;box-sizing:border-box;">
           <p class="header_p">
         <span>问卷切换：</span>
         <el-button  type="primary" @click="dialogVisible=true">选择调查问卷</el-button>
       </p>
     <!-- 导航切换 -->
         <el-tabs v-model="activeName" >
            <el-tab-pane label="数据统计" name="first" class="data_statistic">
                <ul>
                    <li>
                        <p class="question_p">1.您是否使用过xx社交网站？</p>
                         <el-table :data="tableData" border class="question_table">
                             <el-table-column label="选项" prop="option">   
                                 </el-table-column>
                             <el-table-column label="小计" prop="total">   
                                 </el-table-column>
                                 <el-table-column label="百分比" prop="percent">   
                                 </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <p class="question_p">2.您使用xx社交网站的目的是？</p>
                         <el-table :data="tableData1" border class="question_table">
                             <el-table-column label="选项" prop="option">   
                                 </el-table-column>
                             <el-table-column label="小计" prop="total">   
                                 </el-table-column>
                                 <el-table-column label="百分比" prop="percent">   
                                 </el-table-column>        
                         </el-table>
                    </li>
                     <li>
                        <p class="question_p">3.您是否使用过xx社交网站？</p>
                         <el-table :data="tableData" border class="question_table">
                             <el-table-column label="选项" prop="option">   
                                 </el-table-column>
                             <el-table-column label="小计" prop="total">   
                                 </el-table-column>
                                 <el-table-column label="百分比" prop="percent">   
                                 </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <p class="question_p">4.您使用xx社交网站的目的是？</p>
                         <el-table :data="tableData1" border class="question_table">
                             <el-table-column label="选项" prop="option">   
                                 </el-table-column>
                             <el-table-column label="小计" prop="total">   
                                 </el-table-column>
                                 <el-table-column label="百分比" prop="percent">   
                                 </el-table-column>        
                         </el-table>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="图表统计" name="second" class="chart_statistic">
                <ul>
                    <li>
                        <p class="question_p">1.您是否使用过xx社交网站？</p>
                        <div class="chart_box">
                            <div id="pieChart1" style="width:50%;height:300px;float:left;"></div>
                            <div id="barChart1" style="width:50%;height:300px;float:left;"></div>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
       </div>

       <!-- 切换问卷对话框 -->
       <el-dialog title="调查问卷" :visible.sync="dialogVisible"  class="select_dialog" >
         <div style="overflow:hidden;">
          <p class="header_p">
             <el-input placeholder="请输入问卷名称" class="input"></el-input>
             <el-button type="primary" icon="search" >搜索</el-button>
          </p>
          <el-table :data="dialogTableData" border class="table-wrapper">
            <el-table-column label="问卷名称" prop="name">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template scope="scope">
                   <el-button type="text">选择</el-button>
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
       </el-dialog>
  </div>
</template>
<script type="text/javascript">
import echarts from "../../../../static/echarts/echarts.common.min";
export default {
  data() {
    return {
      activeName: "first",
      dialogVisible:false,
      dialogTableData:[
          {
              name:'购物网用户满意度调查'
          },
          {
              name:'社交网站满意度调查'
          },
          {
              name:'数码家电产品满意度'
          },
          {
              name:'网购消费者的行为习惯调查'
          },
          {
              name:'购物网用户满意度调查'
          },
          {
              name:'社交网站满意度调查'
          },
          {
              name:'数码家电产品满意度'
          },
          {
              name:'网购消费者的行为习惯调查'
          },
      ],
      searchParams:{
        pageNumber:1,
        pageSize:10,
        
      },
      pageTotal:1000,
      tableData: [
        {
          option: "是",
          total: 10,
          percent: "50%"
        },
        {
          option: "否",
          total: 10,
          percent: "50%"
        }
      ],
      tableData1: [
        {
          option: "交友",
          total: 5,
          percent: "25%"
        },
        {
          option: "征婚",
          total: 5,
          percent: "25%"
        },
        {
          option: "找人聊天",
          total: 10,
          percent: "50%"
        }
      ]
    };
  },
  methods: {
    initChart() {
      console.log(1231);
      var myChart1 = echarts.init(document.getElementById("pieChart1"));
      var option1 = {
        title: {
          text: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["是", "否"]
        },
        series: [
          {
            name: "统计数据",
            type: "pie",
            radius: "80%",
            center: ["50%", "45%"],
            data: [{ value: 10, name: "是" }, { value: 10, name: "否" }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      var myChart2 = echarts.init(document.getElementById("barChart1"));
      var option2 = {
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          data: ["是", "否"]
        },
        xAxis:{
          data: ["是", "否"]
        },
        yAxis:{},
        series: [
          {
            name: "统计数据",
            type: "bar",
            barMaxWidth:50,
            data: [{ value: 10, name: "是" }, { value: 10, name: "否" }]
          }
        ]
      };
      myChart1.setOption(option1);
      console.log(myChart2);
      myChart2.setOption(option2);
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    closeDialog(done){
      done();
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
<style>
.survery_result_statistic {
  overflow: hidden;
  padding: 20px 0;
}
.survery_result_statistic .left_header_p {
  padding: 0 30px;
  line-height: 30px;
  margin-bottom: 20px;
  float: left;
  background-color: #12806b;
  color: #fff;
  position: relative;
  z-index: 1;
}
.survery_result_statistic .left_header_p span {
  height: 0px;
  display: block;
  width: 0px;
  background-color: #fff;
  border: 15px #fff solid;
  border-bottom-color: #fff;
  border-left-color: #12806b;
  border-right-color: #fff;
  position: absolute;
  z-index: 9;
  right: -25px;
  top: 0;
}
.survery_result_statistic .header_p {
  overflow: hidden;
  margin-bottom: 20px;
}
.survery_result_statistic .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.survery_result_statistic .data_statistic .question_p {
  line-height: 30px;
}
.survery_result_statistic .data_statistic .question_table {
  margin: 10px 0 20px 0;
}
.survery_result_statistic .chart_statistic .question_p {
  line-height: 30px;
}
.survery_result_statistic .chart_statistic .chart_box {
  margin: 10px 0 20px 0;
}
.survery_result_statistic .select_dialog .el-dialog{
  width:650px;
}
.survery_result_statistic .select_dialog .header_p{
  overflow: hidden;
  margin-bottom:20px;
}
.survery_result_statistic .select_dialog  .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

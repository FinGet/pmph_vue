<template>
  <div class="survery_result_detail">
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         问卷信息
       <span></span>
       </p>
       </div>
      <el-form :model="formTop" ref="formTop" label-width="120px" style="width:80%;">
        <el-form-item label="调查问卷名称：">
         求职调查
        </el-form-item>
        <el-form-item label="调查对象：">
         在校学生
        </el-form-item>
        <el-form-item label="调查概述：">
         <el-input type="textarea" :rows="3" ></el-input>
        </el-form-item>
        <el-form-item label="调查日期范围：">
         2017-8-1到2017-8-30
        </el-form-item>
        <el-form-item label="参与人数：">
         134
        </el-form-item>
        <el-form-item label="发起人：">
         张三
        </el-form-item>
        <el-form-item label="问卷地址：">
         http：//120.76.221.250/#/user/org/id=12
        </el-form-item>
      </el-form>
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         调查结果
       <span></span>
       </p>
       <p class="tips"><span>*</span> 温馨提示:为提升用户体验，填空题的结果不直接展示内容</p>
       </div>
       <div style="width:100%;overflow:hidden;padding:0 20px;box-sizing:border-box;">
         <el-tabs v-model="activeName" >
            <el-tab-pane label="数据统计" name="first" class="data_statistic">
                <ul class="option_ul">
                    <li>
                        <div class="question_p">
                          <p><span>内容类型：</span>多选题</p>
                          <p><span>顺序号：</span>1</p>
                          <p><span>内容标题：</span>你喜欢那种类型的小说？（可多选）</p>
                        </div>
                         <el-table :data="tableData" border class="question_table">
                           <el-table-column label="选项序号" width="100" prop="num">  
                           </el-table-column>
                           <el-table-column label="选项标题" prop="option">  
                           </el-table-column>
                           <el-table-column label="占比" prop="percent" width="90">   
                           </el-table-column>                           
                             <el-table-column label="统计次数" prop="total" width="100">   
                             </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <div class="question_p">
                          <p><span>内容类型：</span>多选题</p>
                          <p><span>顺序号：</span>1</p>
                          <p><span>内容标题：</span>你喜欢那种类型的小说？（可多选）</p>
                        </div>
                         <el-table :data="tableData" border class="question_table">
                           <el-table-column label="选项序号" width="100" prop="num">  
                           </el-table-column>
                           <el-table-column label="选项标题" prop="option">  
                           </el-table-column>
                           <el-table-column label="占比" prop="percent" width="90">   
                           </el-table-column>                           
                             <el-table-column label="统计次数" prop="total" width="100">   
                             </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <div class="question_p">
                          <p><span>内容类型：</span>多选题</p>
                          <p><span>顺序号：</span>1</p>
                          <p><span>内容标题：</span>你喜欢那种类型的小说？（可多选）</p>
                        </div>
                         <el-table :data="tableData" border class="question_table">
                           <el-table-column label="选项序号" width="100" prop="num">  
                           </el-table-column>
                           <el-table-column label="选项标题" prop="option">  
                           </el-table-column>
                           <el-table-column label="占比" prop="percent" width="90">   
                           </el-table-column>                           
                             <el-table-column label="统计次数" prop="total" width="100">   
                             </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <div class="question_p">
                          <p><span>内容类型：</span>多选题</p>
                          <p><span>顺序号：</span>1</p>
                          <p><span>内容标题：</span>你喜欢那种类型的小说？（可多选）</p>
                        </div>
                         <el-table :data="tableData" border class="question_table">
                           <el-table-column label="选项序号" width="100" prop="num">  
                           </el-table-column>
                           <el-table-column label="选项标题" prop="option">  
                           </el-table-column>
                           <el-table-column label="占比" prop="percent" width="90">   
                           </el-table-column>                           
                             <el-table-column label="统计次数" prop="total" width="100">   
                             </el-table-column>        
                         </el-table>
                    </li>
                    <li>
                        <div class="question_p">
                          <p><span>内容类型：</span>填空题</p>
                          <p><span>顺序号：</span>5</p>
                          <p><span>内容标题：</span>留下您的建议？</p>
                        </div>
                        <div class="question_p">
                          <p>
                            <span>统计结果：</span>
                            10987条
                            <el-button type="text" style="color:#337ab7;margin-left:20px;" @click="dialogVisible=true">查看调查结果</el-button>
                            <el-button type="text" style="color:#337ab7">导出结果查看</el-button>
                            </p>
                        </div> 
                    </li>
                </ul>
            </el-tab-pane>
<!--             <el-tab-pane label="图表统计" name="second" class="chart_statistic">
                <ul style="width:100%">
                    <li>
                        <p class="question_p">1.您是否使用过xx社交网站？</p>
                        <div class="chart_box">
                            <div id="pieChart1" style="width:50%;height:300px;float:left;"></div>
                            <div id="barChart1" style="width:50%;height:300px;float:left;"></div>
                        </div>
                    </li>
                </ul>
            </el-tab-pane> -->
        </el-tabs>
       </div>

       <!-- 切换问卷对话框 -->
       <el-dialog title="调查问卷" :visible.sync="dialogVisible"  class="select_dialog" >
         <div style="overflow:hidden;">
          <p class="header_p">
             <span>问题：</span>
             <span>留下您的建议？</span>
          </p>
          <el-table :data="dialogTableData" border class="table-wrapper">
            <el-table-column label="序号" prop="num" width="85">
            </el-table-column>
            <el-table-column label="调查结果" prop="name">
            </el-table-column>
            <el-table-column label="时间" prop="time" width="120">
            </el-table-column>
            <el-table-column label="填写人" prop="realname" width="90">
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
      formTop:{

      },
      dialogVisible:false,
      dialogTableData:[
          {
            num:1,
            name:'建议建议1',
            time:'2017-8-10',
            realname:'张三'
          },
          {
            num:2,
            name:'建议建议2',
            time:'2017-8-10',
            realname:'张三'
          },
          {
            num:3,
            name:'建议建议3',
            time:'2017-8-10',
            realname:'张三'
          },
          {
            num:4,
            name:'建议建议4',
            time:'2017-8-10',
            realname:'张三'
          },
          {
            num:5,
            name:'建议建议5',
            time:'2017-8-10',
            realname:'张三'
          },
          {
            num:6,
            name:'建议建议6',
            time:'2017-8-10',
            realname:'张三'
          },
      ],
      searchParams:{
        pageNumber:1,
        pageSize:10,
        
      },
      pageTotal:1000,
      tableData: [
        {
          num:1,
          option: "言情小说",
          total: 345,
          percent: "54.46%"
        },
        {
          num:2,
          option: "穿越小说",
          total: 234,
          percent: "38.3%"
        },
        {
          num:3,
          option: "古典小说",
          total: 20,
          percent: "3.73%"
        },
        {
          num:4,
          option: "科幻",
          total: 12,
          percent: "1.96%"
        },
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
      ],
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
    //this.initChart();
  }
};
</script>
<style>
.survery_result_detail {
  overflow: hidden;
  padding: 20px 0;
}
.survery_result_detail .left_header_p {
  padding: 0 30px;
  line-height: 30px;
  margin-bottom: 20px;
  float: left;
  background-color: #12806b;
  color: #fff;
  position: relative;
  z-index: 1;
}
.survery_result_detail .left_header_p span {
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
.survery_result_detail  .tips{
  margin-left:40px;
  color:#999;
  float:left;
  line-height: 30px;  
}
.survery_result_detail  .tips span{
  color:#ff4949;
}
.survery_result_detail .header_p {
  overflow: hidden;
  margin-bottom: 20px;
}
.survery_result_detail .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.survery_result_detail .data_statistic .question_p {
  line-height: 30px;
  overflow: hidden;
}
.survery_result_detail .data_statistic .question_p p{
  float: left;
  width:50%;

}

.survery_result_detail .data_statistic .option_ul li{
  box-sizing: border-box;
  padding-top:5px;
  padding-bottom:15px;
  border-bottom:1px dotted #ccc;
}
.survery_result_detail .data_statistic .question_table {
  margin: 10px 0 20px 0;
}
.survery_result_detail .chart_statistic .question_p {
  line-height: 30px;
}
.survery_result_detail .chart_statistic .chart_box {
  margin: 10px 0 20px 0;
}
.survery_result_detail .select_dialog .el-dialog{
  width:650px;
}
.survery_result_detail .select_dialog .header_p{
  overflow: hidden;
  margin-bottom:20px;
}
.survery_result_detail .select_dialog  .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

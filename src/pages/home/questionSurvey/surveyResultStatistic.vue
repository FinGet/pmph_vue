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
         <el-button  type="primary">选择调查问卷</el-button>
       </p>
     <!-- 导航切换 -->
         <el-tabs v-model="activeName" >
            <el-tab-pane label="数据统计" name="first" class="data_statistic">
                <ul>
                    <li>
                        <p class="question_p">1.您是否使用过xx社交网站？</p>
                         <el-table :data="tableData" border class="question_table">
                             <el-table-column label="选项">   
                                 </el-table-column>
                             <el-table-column label="小计">   
                                 </el-table-column>
                                 <el-table-column label="百分比">   
                                 </el-table-column>        
                         </el-table>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="图表统计" name="second"></el-tab-pane>
        </el-tabs>
       </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              activeName:'first',
              tableData:[]
            }
        }
    }
</script>
<style>
.survery_result_statistic {
  overflow: hidden;
  padding:20px 0;
}
.survery_result_statistic .left_header_p{
    padding:0 30px;
    line-height: 30px;
    margin-bottom:20px;
    float: left;
    background-color: #12806b;
    color:#fff;
    position: relative;
    z-index: 1;
}
.survery_result_statistic .left_header_p span{
    height:0px;
    display: block;
    width:0px;
    background-color: #fff;
    border:15px #fff solid;
    border-bottom-color:#fff;
    border-left-color:#12806b;
    border-right-color:#fff;
    position: absolute;
    z-index: 9;
    right: -25px;
    top:0;

}
.survery_result_statistic .header_p {
  overflow: hidden;
  margin-bottom:20px;

}
.survery_result_statistic .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.survery_result_statistic .data_statistic .question_p{
    line-height: 30px;
}
.survery_result_statistic .data_statistic .question_table{
    margin:10px 0 20px 0;;
}
</style>

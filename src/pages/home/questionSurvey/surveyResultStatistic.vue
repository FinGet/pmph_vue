<template>
  <div class="survey_result_statistic">
   <p class="header_p">
       <span>调查问卷名称：</span>
       <el-input class="input" placeholder="请输入调查问卷名称"></el-input>
       <el-button type="primary" icon="search">搜索</el-button>
   </p>
   <el-table :data="tableData" border class="table-wrapper">
       <el-table-column label="调查问卷名称" prop="surveyName">
       </el-table-column>
       <el-table-column label="调查概述" prop="note">
       </el-table-column>       
       <el-table-column label="调查开始日期" prop="startDate" width="120">
       </el-table-column>
       <el-table-column label="调查结束日期" prop="endDate" width="120">
       </el-table-column>
       <el-table-column label="调查对象" prop="surveyObj"  width="110">
       </el-table-column>
       <el-table-column label="参与人数" prop="putNum" width="100">
       </el-table-column>
       <el-table-column label="发起人" prop="startP" width="100">
       </el-table-column>
       <el-table-column label="操作" width="170">
         <template scope="scope">
           <el-button type="text" @click="$router.push({name:'结果明细'})">查看</el-button>
           <span>|</span>
           <el-button type="text">复制问卷地址</el-button>             
             </template>  
       </el-table-column>
   </el-table>
   <!-- 分页 -->
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
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              pageTotal:100,
              searchParams:{
                  pageSize:10,
                  pageNumber:1
              },
              tableData:[
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },
                  {
                     surveyName:'求职调查',
                     startDate:'2017-8-1',
                     endDate:'2017-8-31' ,
                     surveyObj:'在校学生',
                     note:'调查学生的职业规划',
                     putNum:200,
                     startP:'张三'
                  },

              ]
            }
        },
        methods:{
            handleSizeChange(){

            },
            handleCurrentChange(){

            }
        }
    }
</script>
<style>
.survey_result_statistic .header_p {
  overflow: hidden;
}
.survey_result_statistic .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

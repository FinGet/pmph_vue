<template>
  <div class="survey_model_set">
    <p class="header_p">
       <span>调查问卷名称：</span>
       <el-input class="input" placeholder="请输入调查问卷名称"></el-input>
       <span>创建日期：</span>
       <el-date-picker
            v-model="searchParams.startDate"
            class="input"
            type="date"
            placeholder="请选择开始日期">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
            v-model="searchParams.endDate"
            class="input"
            type="date"
            placeholder="请选择结束日期">
        </el-date-picker>
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button type="primary"  style="float:right" @click="$router.push({name:'新建调查问卷'})">添加问卷</el-button>
    </p>
    <el-table
    :data="tableData"
    style="width:100%"
    border
    class="table-wrapper"
    >
     <el-table-column
     label="调查问卷名称"
     prop="name"
     >  
     </el-table-column>
      <el-table-column
     label="调查对象"
     prop="surveyObj"
     width="100"
     >  
     </el-table-column>
     <el-table-column
     label="问卷制作人"
     prop="writer"
     width="110"
     >  
     </el-table-column> 
     <el-table-column
     label="问卷概述"
     prop="summary"
     >  
     </el-table-column> 
     <el-table-column
     label="创建日期"
     prop="createDate"
     width="120"
     >  
     </el-table-column>
     <el-table-column
      label="操作"
      width="210"
     >
     <template scope="scope">
       <el-button type="text" @click="$router.push({name:'新建调查问卷'})">修改</el-button>
       <span>|</span>
       <el-button type="text" @click="$router.push({name:'发起调查'})">发起调查</el-button>
       <span>|</span>
       <el-button type="text" @click="$router.push({name:'问卷模板新增'})">模板新建</el-button>
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
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                searchParams:{
                    startDate:'',
                    endDate:'',
                    pageSize:10,
                    pageNumber:1
                },
                pageTotal:100,
                tableData:[
                    {
                        name:'求职调查',
                        surveyObj:'在校学生',
                        writer:'张三',
                        summary:'调查学生的职业规划',
                        createDate:'2017-10-1'
                    },
                    {
                        name:'创业调查',
                        surveyObj:'在校老师',
                        writer:'李四',
                        summary:'调查学生的创业能力',
                        createDate:'2017-9-1'
                    },
                    {
                        name:'卫生情况调查',
                        surveyObj:'卫生院系',
                        writer:'王五',
                        summary:'调查卫生学校情况',
                        createDate:'2017-8-1'
                    },
                    {
                        name:'课外活动项目调查',
                        surveyObj:'在校学生',
                        writer:'赵六',
                        summary:'调查学生课外活动参与情况',
                        createDate:'2017-4-1'
                    },
                    {
                        name:'校园兴趣调查',
                        surveyObj:'在校学生',
                        writer:'张三',
                        summary:'调查学生的校园兴趣',
                        createDate:'2017-8-5'
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
<style scoped>
.survey_model_set .header_p {
  overflow: hidden;
}
.survey_model_set .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

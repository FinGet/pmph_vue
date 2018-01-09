<template>
  <div class="survey_model_set">
    <p class="header_p">
       <span>调查问卷名称：</span>
       <el-input class="input" v-model="searchParams.title"  placeholder="请输入调查问卷名称"></el-input>
       <span>创建日期：</span>
       <el-date-picker
            v-model="searchParams.startTime"
            class="input"
            type="date"
            @change="startDateChange"
            placeholder="请选择开始日期">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
            v-model="searchParams.endTime"
            class="input"
            type="date"
            @change="endDateChange"
            placeholder="请选择结束日期">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        <el-button type="primary"  style="float:right" @click="$router.push({name:'问卷模板新增',params:{type:'add'}})">添加问卷模板</el-button>
    </p>
    <el-table
    :data="tableData"
    style="width:100%"
    border
    class="table-wrapper"
    >
     <el-table-column
     label="调查问卷名称"
     prop="title"
     >  
     </el-table-column>
      <el-table-column
     label="调查对象"
     prop="surveyName"
     width="100"
     >  
     </el-table-column>
     <el-table-column
     label="问卷制作人"
     prop="username"
     width="110"
     >  
     </el-table-column> 
     <el-table-column
     label="问卷概述"
     prop="intro"
     >  
     </el-table-column> 
     <el-table-column
     label="创建日期"
     prop="gmtCreat"
     width="120"
     > 
     <template scope="scope">
         {{$commonFun.formatDate(scope.row.gmtCreate,'yyyy-MM-dd')}}
         </template> 
     </el-table-column>
     <el-table-column
      label="操作"
      width="150"
     >
     <template scope="scope">
       <el-button type="text" :disabled="scope.row.status!=0"  @click="updataTemplate(scope.row.templateId,scope.row.id)">修改</el-button>
       <span>|</span>
       <el-button type="text" @click="$router.push({name:'发起调查',params:{surveyId:scope.row.id}})">发起调查</el-button>
       <!-- <span>|</span>
       <el-button type="text" @click="$router.push({name:'问卷模板新增',params:{type:'add'}})">添加问卷</el-button> -->
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
                surveyLsitUrl:'/pmpheep/survey/list', //调查问卷列表url
                editTemplateUrl:'/pmpheep/survey/template/question/look', //获取修改信息url
                searchParams:{
                    title:'',
                    startTime:'',
                    endTime:'',
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
        created(){
         this.getSurveyList();
        },
        methods:{
            /* 获取问卷列表 */
            getSurveyList(){
              this.$axios.get(this.surveyLsitUrl,{
                  params:this.searchParams
              }).then((res)=>{
                  console.log(res);
                  if(res.data.code==1){
                      this.pageTotal=res.data.pageTotal;
                      this.tableData=res.data.data.rows;
                  }
              })
            },
            /* 搜索按钮 */
            search(){
              this.searchParams.pageNumber=1;
              this.getSurveyList();
            },
           /* 修改按钮 */
           updataTemplate(tid,sid){
            this.$axios.get(this.editTemplateUrl,{
                params:{
                    templateId:tid,
                    surveyId:sid
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                   this.$router.push({name:'问卷模板新增',params:{surveryData:res.data.data}}); 
                }
            })
           },
            startDateChange(val){
             this.searchParams.startTime=val;
            },
            endDateChange(val){
              this.searchParams.endTime=val;
            },
            /* 分页改变 */
            handleSizeChange(val){
              this.searchParams.pageSize=val;
              this.searchParams.pageNumber=1;
              this.getSurveyList();
            },
            handleCurrentChange(val){
                  this.searchParams.pageNumber=1;
              this.getSurveyList();
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

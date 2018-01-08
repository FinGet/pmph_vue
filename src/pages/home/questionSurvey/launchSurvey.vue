<template>
  <div class="launch_survey">
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         问卷信息
       <span></span>
       </p>
       </div>
       <div class="left_info_box">
       <el-form :model="leftFrom" label-width="120px" :rules="rules" ref="leftFrom" >
           <el-form-item label="开始日期：" prop="startTime">
            <el-date-picker
            v-model="leftFrom.startTime"
            type="date"
            placeholder="开始日期"
            style="width:100%"
            @change="startTimeChange"
            >
            </el-date-picker>
           </el-form-item>
           <el-form-item label="结束日期：" prop="endTime">
            <el-date-picker
            v-model="leftFrom.endTime"
            type="date"
            style="width:100%"
            placeholder="结束日期"
            @change="endTimeChange"
            >
            </el-date-picker>
           </el-form-item>
           <el-form-item label="学校列表：" prop="tableData">
             <el-table :data="leftFrom.tableData" border class="table-wrapper"  style="width:100%;">
                 <el-table-column label="学校名称" prop="orgName">
                     </el-table-column>
                  <el-table-column label="操作" width="90">
                     <template scope="scope">
                         <el-button type="text" @click="removeCheckedData(scope.$index)">移除</el-button>
                     </template>
                     </el-table-column>       
             </el-table> 
           </el-form-item>
           <el-form-item label="">
             <p style="margin-top:10px;">
             <el-button type="primary" icon="arrow-left">返回</el-button>
             <el-button type="primary" @click="submitSurvery">发起问卷调查</el-button>
             </p>
             </el-form-item> 
       </el-form>
       </div>
       <div class="right_table_box">
        <p class="header_p">
            <span>学校名称：</span>
            <el-input class="input" placeholder="请输入学校名称" v-model="searchParams.orgName" @keyup.enter.native="tableSearch"></el-input>
            <el-button type="primary" icon="search" @click="tableSearch">搜索</el-button>
            <el-button type="primary" @click="sureCheckedData">确认选择</el-button>
        </p>
        <el-table :data="rightTableData" class="table-wrapper" border @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="45">
             </el-table-column>
             <el-table-column label="学校名称" prop="orgName">
             </el-table-column>
             <el-table-column label="管理员姓名" prop="contactPerson" width="110">
             </el-table-column>
             <el-table-column label="手机" prop="contactPhone" width="125">
             </el-table-column>
        </el-table>
        <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.pageNumber"
        :page-sizes="[10,20,30,50,100]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>        
       </div>   
  </div>
</template>
<script type="text/javascript">
   export default{
       data(){
           return{
             tableDataUrl:'/pmpheep/orgs/list/org',  //机构列表url
             submitUrl:'/pmpheep/survey/target/send' ,  //发起问卷列表
            leftFrom:{
              startTime:'',
              tableData:[
              ],
              endTime:''
            },
            searchParams:{
              orgName:'',
              pageSize:10,
              pageNumber:1,

            },
            pageTotal:10,
            rightTableData:[
            ],
            checkedData:[],
            rules:{
              startTime:[
                { required: true, message: '开始日期不能为空', trigger: 'blur,change' },
              ],
              endTime:[
                { required: true, message: '结束日期不能为空', trigger: 'blur,change' },
              ],
              tableData:[
                { type:'array',required: true, message: '发送学校不能为空', trigger: 'blur,change' },
              ]
            }
           }
       },
       created(){
         this.getTableData();
       },
       methods:{
         /* 发起问卷 */
         submitSurvery(){
         this.$refs.leftFrom.validate((valid)=>{
           if(valid){
               this.$axios.post(this.submitUrl,{})
           }else{
             return false;
           }
         })
         },
          /* 获取机构信息列表 */
          getTableData(){
           this.$axios.get(this.tableDataUrl,{
             params:this.searchParams
           }).then((res)=>{
             console.log(res);
             if(res.data.code==1){
               this.pageTotal=res.data.data.pageTotal;
               this.rightTableData=res.data.data.rows;
             }
           })
          },
          /* 选中切换 */
          handleSelectionChange(val){
            this.checkedData=val;
          },
          /* 确认选中 */
          sureCheckedData(){
            for(var item in this.checkedData){
              var ready=true;
              for(var i in this.leftFrom.tableData){
                if(this.checkedData[item].id==this.leftFrom.tableData[i].id){
                  ready=false;
                  break;
                }
              }
              if(ready){
                this.leftFrom.tableData.push(this.checkedData[item]);
              }
            }
          },
          /* 移除 */
          removeCheckedData(val){
            console.log(val);
            this.leftFrom.tableData.splice(val,1);
          },
          /* table搜索 */
          tableSearch(){
           this.searchParams.pageNumber=1;
           this.getTableData();
          },
          startTimeChange(val){
           this.leftFrom.startTime=val;
          },
          endTimeChange(val){
           this.leftFrom.endTime=val;
          },
          handleSizeChange(val){
           this.searchParams.pageSize=val;
           this.searchParams.pageNumber=1;
           this.getTableData();
          },
          handleCurrentChange(val){
           this.searchParams.pageNumber=val;
           this.getTableData();
          }
       }
   } 
</script>
<style>
.launch_survey{
    overflow: hidden;
    padding:20px 0;
}
.launch_survey .left_header_p{
    padding:0 30px;
    line-height: 30px;
    float: left;
    background-color: #12806b;
    color:#fff;
    position: relative;
    z-index: 1;
}
.launch_survey .left_header_p span{
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
.launch_survey .left_info_box{
    width:35%;
    float:left;
    padding-right:40px;
    box-sizing: border-box;
    margin-top:20px;
}
.launch_survey .right_table_box{
    width:65%;
    float: left;
    border-left:1px dotted #dadada;
    min-height:650px;
    box-sizing: border-box;
    padding:0 20px;
}
.launch_survey .right_table_box .header_p {
  overflow: hidden;
}
.launch_survey .right_table_box .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.launch_survey .table-wrapper{
  margin-bottom:0;
}
</style>

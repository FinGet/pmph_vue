<template>
  <div class="launch_survey">
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         问卷信息
       <span></span>
       </p>
       </div>
       <div class="left_info_box">
       <el-form :model="leftFrom" label-width="120px" ref="leftFrom" >
           <el-form-item label="开始日期：">
            <el-date-picker
            v-model="leftFrom.startDate"
            type="date"
            placeholder="开始日期"
            style="width:100%"
            >
            </el-date-picker>
           </el-form-item>
           <el-form-item label="结束日期：">
            <el-date-picker
            v-model="leftFrom.endDate"
            type="date"
            style="width:100%"
            placeholder="结束日期"
            >
            </el-date-picker>
           </el-form-item>
           <el-form-item label="学校列表">
             <el-table :data="leftFrom.tableData" border class="table-wrapper"  style="width:100%;margin-bottom:20px;">
                 <el-table-column label="学校名称" prop="orgName">
                     </el-table-column>
                  <el-table-column label="操作" width="90">
                     <template scope="scope">
                         <el-button type="text">移除</el-button>
                     </template>
                     </el-table-column>       
             </el-table> 
             <el-button type="primary" icon="arrow-left">返回</el-button>
             <el-button type="primary">发起问卷调查</el-button>
           </el-form-item>
       </el-form>
       </div>
       <div class="right_table_box">
        <p class="header_p">
            <span>学校名称：</span>
            <el-input class="input" placeholder="请输入学校名称"></el-input>
            <el-button type="primary" icon="search">搜索</el-button>
            <el-button type="primary">确认选择</el-button>
        </p>
        <el-table :data="rightTableData" class="table-wrapper" border>
            <el-table-column
                type="selection"
                width="45">
             </el-table-column>
             <el-table-column label="学校名称" prop="orgName">
             </el-table-column>
             <el-table-column label="管理员姓名" prop="realname" width="110">
             </el-table-column>
             <el-table-column label="手机" prop="phone" width="125">
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
  </div>
</template>
<script type="text/javascript">
   export default{
       data(){
           return{
            leftFrom:{
              startDate:'',
              tableData:[
                  {
                    orgName:'浙江大学'  
                  },
                  {
                    orgName:'深圳大学'  
                  },
                  {
                    orgName:'上海交通大学'  
                  },
                  {
                    orgName:'职业技术学院'  
                  },
              ],
              endDate:''
            },
            searchParams:{
              pageSize:10,
              pageNumber:1,

            },
            pageTotal:100,
            rightTableData:[
                {
                  orgName:'宁波大学',
                  realname:'龚朝辉',
                  phone:'13958245575'  
                },
                {
                  orgName:'宁波大学',
                  realname:'龚朝辉',
                  phone:'13958245575'  
                },
                {
                  orgName:'宁波大学',
                  realname:'龚朝辉',
                  phone:'13958245575'  
                },
                {
                  orgName:'宁波大学',
                  realname:'龚朝辉',
                  phone:'13958245575'  
                },
                {
                  orgName:'宁波大学',
                  realname:'龚朝辉',
                  phone:'13958245575'  
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
</style>

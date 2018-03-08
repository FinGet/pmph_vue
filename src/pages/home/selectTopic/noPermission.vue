<template>
  <div class="no_permission">
    <p class="header_p">
       <span>选题名称：</span>
       <el-input class="input"  placeholder="请输入选题名称"></el-input>
       <span>提交日期：</span>
       <el-date-picker
            v-model="searchParams.date"
            class="input"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" icon="search">搜索</el-button>
    </p>
    <el-table
    :data="tableData"
    style="width:100%"
    border
    class="table-wrapper"
    >
     <el-table-column
     label="选题名称"
     prop="bookname"
     >
     </el-table-column>
     <el-table-column
      label="作者"
      prop="realName"
      width="100"
     >
     </el-table-column>
     <el-table-column
      label="预计交稿日期"
      prop="deadline"
      width="170"
     >
     </el-table-column>
     <el-table-column
      label="图书类别"
      prop="typeName"
      width="100"
     >
     </el-table-column>
     <el-table-column
      label="提交日期"
      prop="submitTime"
      width="170"
     >
     </el-table-column>
     <el-table-column
      label="操作"
      width="210"
     >
     </el-table-column>
    </el-table> 
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
           return{
               tableData:[],
               searchParams:{
                  data:''
               }
           } 
        }
    }
</script>
<style >
.no_permission .header_p {
  overflow: hidden;
}
.no_permission .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

<template>
  <div class="mic_video">
      <p class="header_p">
          <span>图书名称：</span>
          <el-input class="input" placeholder="请输入图书名称"></el-input>
          <span>状态：</span>
            <el-select v-model="searchParams.state" style="width:150px;margin-right:10px;" placeholder="请选择">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="已通过" value="2"></el-option>
              <el-option label="未通过" value="0"></el-option>
            </el-select>
            <span>上传时间：</span>
                <el-date-picker
                    v-model="searchParams.startDate"
                    type="date"
                    placeholder="选择日期"
                    >
                </el-date-picker>
                <span>—</span> 
                <el-date-picker
                    v-model="searchParams.endDate"
                    type="date"
                    placeholder="选择日期"
                    style="margin-right:10px;"
                    >
                </el-date-picker> 
          <el-button icon="search" type="primary">搜索</el-button>        
      </p>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width:100%">
          <el-table-column></el-table-column>
      </el-table>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              tableData:[],
              searchParams:{
                  state:'',
                  startDate:'',
                  endDate:''     
              }
            }
        }
    }
</script>
<style scoped>
.mic_video .header_p {
  overflow: hidden;
}
.mic_video .header_p .input {
  width: 190px;
  margin-right: 10px;
}
</style>

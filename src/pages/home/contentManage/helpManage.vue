<template>
  <div class="help_manage">
  <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
    <el-tab-pane label="常见问题" name="first">
     <p class="header_p">
         <span>问题标题：</span>
         <el-input class="input" placeholder="请输入问题标题"></el-input>
         <span>创建人：</span>
         <el-input class="input" placeholder="请输入创建人"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>

         <el-button type="primary" style="float:right">新增</el-button>
     </p>
     <!-- 列表 -->
     
    </el-tab-pane>
    <el-tab-pane label="操作手册上传" name="second">
        
    </el-tab-pane>
  </el-tabs>    
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
               activeName:'first',

            }
        },
        methods:{
          handleClick(tab, event){

          }  
        }
    }
</script>
<style scoped>
.help_manage .el-tabs{
   border:none;
   box-shadow: none; 
}
.help_manage .header_p {
  overflow: hidden;
  margin-bottom:5px;
}
.help_manage .header_p .input {
  width: 188px;
  margin-right: 10px;
}
</style>

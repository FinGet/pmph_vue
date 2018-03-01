<template>
  <div class="topic_check">
  <el-tabs v-model="activeName" type="border-card" >
    <el-tab-pane label="已提交的申报" name="first">
     <submit-apply :searchInput="searchInput"></submit-apply>
    </el-tab-pane>
    <el-tab-pane label="已完成的申报" name="second">
      <completed-apply :searchInput="searchInput"></completed-apply>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script type="text/javascript">
 import submitApply from './submitApply.vue';
 import completedApply from './completedApply.vue'
    export default{
       data(){
         return{
           activeName:'first',
           searchInput:''
         }
       },
       components:{
         submitApply,completedApply
       },
       created(){
         if(this.$route.params.activeIndex){
             this.activeName=this.$route.params.activeIndex;
         }
       }
    }
</script>
<style scoped>
.topic_check .el-tabs--border-card{
  border: 0;
  box-shadow: none;
}
</style>

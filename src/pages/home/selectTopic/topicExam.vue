<template>
  <div class="topic_exam">
  <el-tabs v-model="activeName" type="border-card" >
    <el-tab-pane label="转发部门" name="first">
      <forward-depart></forward-depart>
    </el-tab-pane>
    <el-tab-pane label="分配编辑" name="second">
      <distribute-editor></distribute-editor>
    </el-tab-pane>
    <el-tab-pane label="受理" name="third">
      <acceptance></acceptance>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script type="text/javascript">
import forwardDepart from './forwardDepart.vue'
import distributeEditor from './distributeEditor.vue'
import acceptance from './acceptance.vue'
 export default{
   data(){
     return{
      activeName:'first'
     }
   },
   computed:{
   },
   created(){
     this.activeName = this.$route.query.active || 'first';
   },
   components: {
     forwardDepart,distributeEditor,acceptance
   },
   methods:{

   }
 }
</script>
<style scoped>
.topic_exam .el-tabs--border-card{
  border: 0;
  box-shadow: none;
}
</style>

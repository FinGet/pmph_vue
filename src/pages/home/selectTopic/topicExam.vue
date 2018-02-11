<template>
  <div class="topic_exam">
  <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
    <el-tab-pane label="转发部门" name="first" v-if="Identity.isAdmin || Identity.isOpts">
      <forward-depart :activeName.sync='activeName' @changeActive='changeActive'></forward-depart>
    </el-tab-pane>
    <el-tab-pane label="分配编辑" name="second" v-if="Identity.isAdmin || Identity.isDirector">
      <distribute-editor :activeName.sync='activeName' @changeActive='changeActive'></distribute-editor>
    </el-tab-pane>
    <el-tab-pane label="受理" name="third" v-if="Identity.isAdmin || Identity.isEditor">
      <acceptance :activeName.sync='activeName' @changeActive='changeActive'></acceptance>
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
       activeName:'',        //不要改成计算属性  计算属性无法触发更改
       Identity:{}
     }
   },
   computed:{
   },
   created(){
     this.activeName = this.$route.query.active || 'first';
     this.identity();
   },
   watch:{
   },
   components: {
     forwardDepart,distributeEditor,acceptance
   },
   methods:{
    changeActive(val){
      this.activeName=val;
    },
    handleClick(tab, event){
      console.log(tab, event);
      this.activeName=tab.name;
      console.log(this.activeName);
    },
     identity(){
      this.$axios.get('/pmpheep/topic/identity').then(response=> {
        let res = response.data;
        if (res.code == '1') {
          this.Identity = res.data;
        if (this.Identity.isAdmin || this.Identity.isOpts) {
          this.activeName='first';
        } else if (this.Identity.isAdmin || this.Identity.isDirector) {
          this.activeName='second';
        } else if (this.Identity.isAdmin || this.Identity.isEditor) {
          this.activeName='third';
        }
        }
      })
     }
   }
 }
</script>
<style scoped>
.topic_exam .el-tabs--border-card{
  border: 0;
  box-shadow: none;
}
</style>

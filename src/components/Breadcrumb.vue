<template>
  <el-breadcrumb separator="/" class="my-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadData" v-if="item.meta.replaceName!=false" :to="{ name: item.meta.replaceName?item.meta.replaceName:item.name }" :key="index">{{breadName(item)}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
	export default {
		data() {
			return {
        breadData:[]
      }
		},
    computed:{
    },
    watch: {
      $route () {
        this.initBreadData();
      }
    },
    methods:{
      //面包屑
      initBreadData(){
       this.breadData=this.$router.currentRoute.matched;
      },
      breadName(item){
        if(item.name=='新建通知'){
           return this.$route.params.materialId=='new'?'新建通知':'修改通知';
        }else{
           
        }
        return item.meta.replaceName?item.meta.replaceName:item.name;
      }
    },
    created(){
      this.initBreadData();
    }
	}
</script>

<style scoped>
.my-breadcrumb{
  font-size: 16px;
  line-height: 38px;
}
</style>

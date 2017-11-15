<template>
  <el-breadcrumb separator="/" class="my-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadData" v-if="item.meta.replaceName!=false" :to="{ name: item.meta.replaceName?item.meta.replaceName:item.name }" :key="index">{{item.meta.replaceName?item.meta.replaceName:item.name}}</el-breadcrumb-item>
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

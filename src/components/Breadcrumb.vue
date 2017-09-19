<template>
  <el-breadcrumb separator="/" class="my-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadData" v-if="item.meta.replaceName!=false" :to="{ name: item.meta.replaceName?item.meta.replaceName:item.name }" :key="index">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
        breadData:[]
      }
		},
    computed:{
      ...mapGetters([
        'breadcrumb'
      ]),
    },
    watch: {
      $route () {
        this.initBreadData();
        this.$store.commit('BREADCRUM',{
          path:this.$route.path,
          name:this.$route.name,
          breadNumber:typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
        });
      }
    },
    methods:{
      initBreadData(){
       this.breadData=this.$router.currentRoute.matched;
      }
    },
    created(){
      console.log(this.$router);
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

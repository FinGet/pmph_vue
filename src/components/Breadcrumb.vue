<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(iterm, index) in breadcrumb"  :to="{ path: iterm.path }" :key="index">{{iterm.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import {mapGetters} from 'vuex'
	export default {
		data() {
			return {}
		},
    computed:{
      ...mapGetters([
        'breadcrumb'
      ]),
    },
    watch: {
      $route () {
        this.$store.commit('BREADCRUM',{
          path:this.$route.path,
          name:this.$route.name,
          breadNumber:typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
        });
      }
    },
    methods:{
      test(){
        console.log(this.breadcrumbData)
      }
    },
	}
</script>

<style scoped>

</style>

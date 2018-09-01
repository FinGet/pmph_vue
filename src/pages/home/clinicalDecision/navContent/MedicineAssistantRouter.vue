<template>
  <div class="">
      <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
      </div>
</template>
<style>

</style>

<script type="text/javascript">
    export default{
        data(){
            return{

            }
        },
      created() {
        this.$router.push({name:'临床决策专家申报列表',query:{clinicaltype:'2',queryName:'用药助手申报表'}});
        //this.$router.push({name:'临床决策专家申报',query:{clinicaltype:'2'}});
      }
    }
</script>

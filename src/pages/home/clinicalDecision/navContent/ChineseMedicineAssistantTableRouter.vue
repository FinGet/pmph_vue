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
        this.$router.push({name:'临床决策专家申报审核',query:{clinicalTabletype:'3',queryName:'中医助手申报表'}});
      }
    }
</script>

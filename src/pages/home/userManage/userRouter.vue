<template>
  <div class="user_router">
      <transition name="fade" mode="out-in">
      <router-view></router-view>
      </transition>
  </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        }
    }
</script>
<style>


</style>

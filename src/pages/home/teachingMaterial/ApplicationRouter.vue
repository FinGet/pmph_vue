<template>
  <div class="application_router">
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
        }
    }
</script>
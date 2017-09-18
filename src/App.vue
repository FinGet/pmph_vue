<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data: function (){
      return {
        active:true
      }
    },
    computed:{
      user:function () {
        return this.$store.getters.getUserData;
      }
    }
  }
</script>

<style>
  html,body{
    margin: 0;
    position: relative;
    height:100%;
  }
  #app {
    min-width: 1200px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>

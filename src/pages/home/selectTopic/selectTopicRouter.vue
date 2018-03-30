<template>
   <div class="select_topic_router">
       <transition name="fade" mode="out-in">
    <router-view></router-view>
      </transition>
   </div>
</template>
<script type="text/javascript">
    
</script>           
<style>
.top-nav {
  /* float: left; */
  width: 100%;
  position: relative;
  height: 43px;
  background-color: rgb(238, 241, 246);
  border: 1px solid rgb(209, 217, 229);
  border-top: 0;
  box-sizing: border-box;
}
.top-nav .header_title_tips {
  margin-bottom: 15px;
  /* float:left; */
  color: #fff;
  position: absolute;
  left: -9px;
  top: 8px;
}
.top-nav .header_title_tips p {
  /* float:left; */
  background-color: #12806b;
  font-size: 16px;
  padding: 2px 20px 2px 15px;
  max-width: 545px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.top-nav .header_title_tips .tips_icon {
  border: 4px solid #475669;
  position: absolute;
  left: 0;
  bottom: -8px;
  border-left-color: #fff;
  border-bottom-color: #fff;
}
.back {
  height: 42px;
  background-color: rgb(238, 241, 246);
  line-height: 42px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
}
</style>

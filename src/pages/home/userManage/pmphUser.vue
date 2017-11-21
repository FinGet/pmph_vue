<template>
  <div class="page-pmph-user">
    <user-pmph show_manage show_isDisabled show_nameShowMore></user-pmph>
  </div>
</template>
<script>
  import userPmph from 'components/user-pmph'
export default {
  data() {
    return {

    };
  },
  components:{
    userPmph
  },
};
</script>
<style>
.writer {
  width: 100%;
  box-sizing: border-box;
}
.writer .s-title {
  line-height: 36px;
  margin-right: 10px;
}
.tree-title {
  line-height: 36px;
  margin-bottom: 20px;
}
.marginTag {
  margin-left: 3px;
}
.name{
  cursor: pointer;
}
</style>

<template>
  <transition name="fade">
  <div tabindex="-1" class="message-box__wrapper" style="z-index: 2006;">
  <div v-if="show"   class="message-box">
    <div class="message-box__header">
      <div class="message-box__title">提示</div>
    </div>
    <!--<i class="iconhandle close" >警告</i>-->
    <div class="message-box__content">
      <div class="message-box__status icon-circle-cross"></div>
      <div class="message-box__message" style="margin-left: 50px;text-align: left;"> <p><slot></slot></p></div>
    </div>
    <div class="message-box__btns">
      <button type="button" class="button button--default button--primary " @click="close">
        <span>确定</span>
      </button>
    </div>

  </div>
  </div>
  </transition>
</template>
<script>
export default {
name: 'Alert',
  props: ['show'],
// props: {
// closable: {
// type: Boolean,
// default: true
// },
// show: {
// type: Boolean,
// default: true,
// twoWay: true
// },
// type: {
// type: String,
// default: 'info'
// }
// },
data() {
return {
//visible: this.show
};
},
methods: {
close() {
//this.visible = false;
//this.$emit('update:show', false);
this.$emit('close');
}
}
};
</script>

<style scoped>
  .message-box{
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fbfbfb;
    width: 420px;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .message-box__header {
    position: relative;
    padding: 10px 20px 0;
  }

  .message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333;
  }

  .message-box__content {
    padding: 15px 20px;
    color: rgb(72, 85, 106);
    font-size: 14px;
    position: relative;
  }

  .icon-circle-cross:before {
    content: "\E60B";
  }
  .message-box__status .icon-circle-cross {
    color: #ff4949;
  }
    .message-box__status {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 26px !important;
    }
    [class^="icon-"], [class*="icon-"] {
    font-family: 'element-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
  .message-box__btns{
    padding: 5px 20px 7px;
    text-align: right;
  }

  .el-message-box__btns button:nth-child(2) {
    margin-left: 10px;
  }

      .button--primary {
      color: #fff;
      background-color: #1ab194;
      border-color: #1ab194;
      }
      .button {
        min-width: 80px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid rgb(191, 201, 217);
      border-color: #2a3f54;
      color: #2a3f54;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 5px 15px;
      font-size: 14px;
      border-radius: 4px;
      }
  .message-box__wrapper {
    position: fixed;
    top: 0;
    /* bottom: 0; */
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 420px;
    border:1px solid #BABABA;
  }
  body{
    background: #808080;
  }

  .message-box__wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
</style>

/**
封装一个滚动插件，主要解决当前项目中美化滚动条的需求
@param autoresize 是否自动监听滚动区域宽高变化，默认是false,基于定时器每20ms刷新一次
@param scrollbar  是否显示滚动条，默认是false
@param scrollbarwidth 滚动条样式宽度
@param scrollbarcolor 滚动条颜色
*/
<template>
  <div class="beautyScroll" ref="beautyScroll">
    <div class="beautyScroll-inner" ref="beautyScrollInner" :style="{width:innerWidth?innerWidth+'px':'100%'}">
      <div ref="beautyScrollInnerDiv">
        <slot></slot>
      </div>
      <span class="beautyScroll-bar"
            ref="beautyScrollBar"
            v-if="scrollbar&&showScrollBar"
            :style="{
              width:scrollbarwidth+'px',
              height:scrollbarHeight+'px',
              top:scrollBarTop+'px',
              'border-radius': scrollbarwidth/2+'px',
              'background-color':scrollbarcolor
              }"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      autoresize:{
        type: Boolean,
        required: false
      },
      scrollbar:{
        type: Boolean,
        required: false
      },
      scrollbarwidth: {
        type:Number,
        default:6
      },
      scrollbarcolor:{
        type:String,
        default:'rgba(0,0,0,.2)'
      }
    },
    data() {
      return {
        innerWidth:undefined,
        showScrollBar:false,
        scrollbarHeight:0,
        scrollBarTop:0,
      }
    },
    mounted(){
      var _self = this;
      var beautyScrollInner = this.$refs.beautyScrollInner;
      //先初始化滚动区域的宽样式
      this.refresh();
      //监听窗口大小改变事件
      window.addEventListener("resize", this.refresh);
      //如果设置了自动监听resize事件
      if(this.autoresize){
        window.removeEventListener("resize", this.refresh);
        this.autoResize();
      }
      //如果组件传入scrollbar，则监听滚动事件
      if(this.scrollbar){
        beautyScrollInner.addEventListener("scroll",this.resetScrollBarPosition);
      }
    },
    methods:{
      /**
       * 提供一个render方法重新计算滚动条的位置和宽度
       */
      refresh(){
        var beautyScroll = this.$refs.beautyScroll;
        var beautyScrollInnerDiv = this.$refs.beautyScrollInnerDiv;
        //初始化beautyScroll-inner宽度，超出外层20px
        this.innerWidth = beautyScroll.clientWidth+20;
        //初始化滚动条高度
        this.scrollbarHeight = beautyScroll.clientHeight/beautyScrollInnerDiv.clientHeight*beautyScroll.clientHeight;
        this.showScrollBar = this.scrollbarHeight<beautyScroll.clientHeight?true:false;
      },
      /**
       * 自动初始化滚动条组件，每20ms刷新一次
       */
      autoResize(){
        var self = this;
        setInterval(() => {
          console.log('刷新了')
          self.refresh()
        }, 20);
      },
      /**
       * 该方法用于初始化scrollbar的height,top值,模拟滚动条
       */
      resetScrollBarPosition(){
        var beautyScrollInner =this.$refs.beautyScrollInner;
        var beautyScrollInner_h = beautyScrollInner.clientHeight;
        var beautyScrollInnerDiv_h = this.$refs.beautyScrollInnerDiv.clientHeight;
        var scrollTop = beautyScrollInner.scrollTop;
        this.scrollbarHeight = beautyScrollInner_h/beautyScrollInnerDiv_h*beautyScrollInner_h;
        this.scrollBarTop = Math.ceil(beautyScrollInner_h/beautyScrollInnerDiv_h*scrollTop);
      },
    }
  }
</script>

<style scoped>
  .beautyScroll{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .beautyScroll-inner{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .beautyScroll-bar{
    display: inline-block;
    position: absolute;
    top:0;
    right: 0;
  }
</style>

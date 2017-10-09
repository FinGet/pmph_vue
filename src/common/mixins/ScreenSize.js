module.exports={
  data(){
    return{
      //默认设为1366*768
      screenWidth:1366,
      screenHeight:768,
    }
  },
  computed:{
    screenWidth_lg(){
      return this.screenWidth >= 1580 ? true : false;
    },
    screenWidth_md(){
      return (this.screenWidth >= 1360 && this.screenWidth < 1580) ? true : false;
    },
    screenWidth_sm(){
      return this.screenWidth < 1360 ? true : false;
    }
  },
  mounted(){
    this.screenWidth = document.documentElement.clientWidth || document.body.clientWeight;
    this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    console.log('当前窗口大小为：'+this.screenWidth+' x '+this.screenHeight);
  }
}

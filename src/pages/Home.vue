<template>
  <div class="app-wrapper" :class="{sidebarFlod:!sidebarFlod}">
    <div class="sidebar-wrapper" @click="sidebarWrapperClick">
      <Side-bar :sidebarFlod="sidebarFlod"></Side-bar>
      <canvas id="cas"></canvas>
    </div>
    <div class="controlSideBarBtn" @click="toggleSideBarBtnFold">
      <span></span>
    </div>
    <div class="nav-top">
      <div class="nav-top-user">
        <Message-icon></Message-icon>
        <User></User>
      </div>
      <div class="breadcrumb-wrapper">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="app-main" ref="main">
      <div class="app-main-inner">

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div class="back_to_top" v-if="isShowBackTop"  @click="backToTop"></div>
    </div>
  </div>
</template>

<script>
  import SideBar from 'components/Side-bar'
  import MessageIcon from 'components/Message-icon'
  import User from 'components/User';
  import {mapGetters} from 'vuex'
  import Breadcrumb from 'components/Breadcrumb'

  export default {
    data() {
      return {
        isShowBackTop:false
      }
    },
    computed:{
      ...mapGetters([
        'sidebarFlod'
      ])
    },
    methods: {
      toggleSideBarBtnFold(){
        this.$store.commit("TOGGLE_SILDBAR");
      },
      sidebarWrapperClick(){
        if(!this.sidebarFlod){
          this.$store.commit("TOGGLE_SILDBAR");
        }
      },
      backToTop(){
        this.$refs['main'].scrollTop=0;
      },
      //回到顶部事件初始化
      initBackTop(){
        var _this=this;
        this.$refs['main'].onscroll=function(){
          //  console.log(_this.$refs['main'].scrollTop,_this.$refs['main'].offsetHeight);
          if(_this.$refs['main'].scrollTop>=_this.$refs['main'].offsetHeight){

            _this.isShowBackTop=true;
          }else{
            _this.isShowBackTop=false;
          }

        }
      }
    },
    components:{
      SideBar,
      User,
      MessageIcon,
      Breadcrumb,
    },
    created(){

    },
    mounted(){

      this.initBackTop();

      var canvas = document.getElementById("cas");
      var ctx = canvas.getContext("2d");

      resize();
      window.onresize = resize;

      function resize() {
        canvas.width = 200;
        canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }

      var RAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      // 鼠标活动时，获取鼠标坐标
      var warea = {x: null, y: null, max: 20000};
      window.onmousemove = function(e) {
        e = e || window.event;

        warea.x = e.clientX;
        warea.y = e.clientY;
      };
      window.onmouseout = function(e) {
        warea.x = null;
        warea.y = null;
      };

      // 添加粒子
      // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
      var dots = [];
      for (var i = 0; i < 25; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var xa = Math.random() * 2 - 1;
        var ya = Math.random() * 2 - 1;

        dots.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 8000
        })
      }

      // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
      setTimeout(function() {
        animate();
      }, 100);

      // 每一帧循环的逻辑
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
        var ndots = [warea].concat(dots);

        dots.forEach(function(dot) {

          // 粒子位移
          dot.x += dot.xa;
          dot.y += dot.ya;

          // 遇到边界将加速度反向
          dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
          dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

          // 绘制点
          ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

          // 循环比对粒子间的距离
          for (var i = 0; i < ndots.length; i++) {
            var d2 = ndots[i];

            if (dot === d2 || d2.x === null || d2.y === null) continue;

            var xc = dot.x - d2.x;
            var yc = dot.y - d2.y;

            // 两个粒子之间的距离
            var dis = xc * xc + yc * yc;

            // 距离比
            var ratio;

            // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
            if (dis < d2.max) {

              // 如果是鼠标，则让粒子向鼠标的位置移动
              if (d2 === warea && dis > (d2.max / 2)) {
                dot.x -= xc * 0.03;
                dot.y -= yc * 0.03;
              }

              // 计算距离比
              ratio = (d2.max - dis) / d2.max;

              // 画线
              ctx.beginPath();
              ctx.lineWidth = ratio / 2;
              ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(d2.x, d2.y);
              ctx.stroke();
            }
          }

          // 将已经计算过的粒子从数组中删除
          ndots.splice(ndots.indexOf(dot), 1);
        });

        RAF(animate);
      }
    },
  }
</script>

<style>
  .app-wrapper{
    position: relative;
    height: 100%;
  }

  .sidebar-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 200px;
    background-color: #2a3f54;
    z-index: 1001;
    overflow: hidden;
    transition: all .28s ease-out;
  }
  .app-main{
    position: relative;
    height: 100%;
    transition: all .28s ease-out;
    margin-left: 200px;
    margin-top: 38px;
    transition: all .3s;
    overflow: scroll;
  }
  .app-main .back_to_top{
    position: fixed;
    width:46px;
    height: 46px;
    right:30px;
    bottom:60px;
    background: url('../common/images/back_to_top.png')no-repeat 100%;
    background-position: 0px 0px;
    z-index: 999;
    transition: all .3s;
  }
  .app-main .back_to_top:hover{
    background-position: 0px -46px;
  }
  .app-main-inner{
    padding: 15px 20px;
    overflow: hidden;
  }
  .nav-top{
    height:38px;
    width: 100%;
    line-height: 38px;
    text-align: left;
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
    background-color: #ededed;

  }
  .nav-top-user{
    float: right;
    margin-right: 18px;
  }
  .breadcrumb-wrapper{
    display: inline-block;
    margin-left: 220px;
    transition: all 0.28s;
  }
  .app-wrapper.sidebarFlod .breadcrumb-wrapper{
    margin-left: 84px;
  }
  .controlSideBarBtn{
    position: fixed;
    bottom: 20px;
    left: 148px;
    padding: 5px;
    font-size: 0;
    z-index: 1003;
    transform: rotate(180deg);
    transition: all 0.28s;
    cursor: pointer;
    background-color: rgba(255,255,255,.3);
    background-position: center center;
    border-radius: 50%;
  }
  .controlSideBarBtn>span{
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 15px;
    background-image:url(../common/images/right_arrow.png) ;
    background-size: cover;

  }
  .controlSideBarBtn:hover{
    background-color: rgba(255,255,255,.5);
  }
  .app-wrapper.sidebarFlod .controlSideBarBtn{
    transform: rotate(-360deg);
    left: 12px;
    transition: all 0.28s;
  }
  .app-wrapper.sidebarFlod .app-main{
    margin-left: 64px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper{
    width: 64px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-submenu__title span{
    display: none;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-menu-item span{
    display: none;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper .el-submenu .el-menu{
    height: 0;
    overflow: hidden;
  }
  /*鼠标悬浮*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover{*/
  /*width: 200px;*/
  /*}*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover .el-submenu__title span{*/
  /*display: inline-block;*/
  /*}*/
  /*.app-wrapper.sidebarFlod .sidebar-wrapper:hover .el-submenu .el-menu{*/
  /*height: auto;*/
  /*overflow: auto;*/
  /*}*/
  /*鼠标悬浮end*/

  /*导航展开列样式*/
  .sidebar-wrapper li.el-submenu.is-opened{
    position: relative;
  }
  .sidebar-wrapper li.el-submenu:after{
    content: ' ';
    display: none;
    width: 8px;
    height:0;
    position: absolute;
    right: 0;
    top:0;
    background: #1abb9c;
    z-index: 1;
    transition: all .28s;
  }
  .sidebar-wrapper li.el-submenu.is-opened:after{
    display: inline-block;
    height:100%;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper li.el-submenu:after{
    right: 136px;
  }
  .app-wrapper.sidebarFlod .sidebar-wrapper:hover li.el-submenu:after{
    right: 0;
  }

  #cas{
    position: absolute;
    left: 0;
    top:0;
    width: 200px;
    height: 100%;
    z-index: 0;
  }
</style>

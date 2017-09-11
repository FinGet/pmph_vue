/**
  用户信息组件，展示用户头像，名称，身份
*/
<template>
  <div class="MemberHead">
    <div class="MemberHead-inner">
      <span class="MemberHeadImg">
        <img :src="data.image?data.image:defaultImage" alt="小组头像">
      </span>
      <div class="MemberHeadName">
        <span>{{data.name}}</span>
      </div>
      <span class="memberPermission"
            v-if="data.permission"
            :title="data.permission"
            :style="{color:data.permission=='创建者'?'#EF2F3E':'#5DBC3C'}"
      >
        <i class="fa fa-user fa-lg"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      data:{
        type:Object,
        default:() => {
          return {}
        }
      }
    },
    data(){
      return{
        defaultImage:'http://119.254.226.115/pmph_imesp/upload/sys_userext_avatar/1706/20170623191553876.png'
      }
    },
  }
</script>

<style scoped>
  .MemberHead{
    height: 58px;
    cursor: pointer;
  }
  .MemberHead:hover{
    background: #DDDDDE;
  }
  .MemberHead.active{
    background: #C8C6C6;
  }
  .MemberHead.firstIterm{
    background: rgb(219,217,216);
  }
  .MemberHead-inner{
    position: relative;
    padding: 5px 42px 5px 46px
  }
  .MemberHeadImg{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height:30px;
    overflow: hidden;
    border-radius: 50%;
  }
  .MemberHeadImg>img{
    display: block;
    width: 100%;
  }
  .MemberHeadName{
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .memberPermission{
    position: absolute;
    right: 14px;
    top: 16px;
  }
</style>

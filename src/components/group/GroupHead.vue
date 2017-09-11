/**
  小组信息组件，展示小组头像，名称，身份
*/
<template>
    <div class="groupHead">
      <div class="groupHead-inner">
        <span class="groupHeadImg">
          <img :src="data.image?data.image:defaultImage" alt="小组头像">
        </span>
        <div class="groupHeadName">
          <span>{{data.name}}</span>
        </div>
        <span class="lastMessageTime">{{data.lastMesTime}}</span>
      </div>
    </div>
</template>

<script>
    import {DEFAULT_USER_IMAGE} from 'common/config.js'
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
             defaultImage:DEFAULT_USER_IMAGE
          }
      },
    }
</script>

<style scoped>
.groupHead{
  height: 68px;
  border-radius: 4px;
}
.groupHead:hover{
  background: rgba(255,255,255,.15);
}
.groupHead.active{
  background: rgba(255,255,255,.2);
}
.groupHead.firstIterm{
  background: rgba(255,255,255,.1);
}
.groupHead-inner{
  position: relative;
  padding: 10px 32px 10px 68px;
}
.groupHeadImg{
  position: absolute;
  left: 10px;
  top: 8px;
  width: 50px;
  height:50px;
  overflow: hidden;
  border-radius: 50%;
}
.groupHeadImg>img{
  display: block;
  width: 100%;
}
.lastMessageTime{
  position: absolute;
  right: 4px;
  top:20px;
  width: 28px;
  height: 14px;
  font-size: 12px;
  color: rgba(255,255,255,.5);
}
  .groupHeadName{
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
</style>

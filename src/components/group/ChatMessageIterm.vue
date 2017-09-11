/**
*  小组聊天单条消息组件
*/
<template>
    <div class="messageIterm clearfix" :class="{'my-message':currentUserId===message.userId}">
      <div class="messageIterm-inner">
        <div class="messageUserHead text-center">
          <div>
            <img :src="message.header" alt="">
          </div>
          <transition name="el-fade-in-linear">
            <span v-if="currentUserId===message.userId">
              <i class="fa fa-trash-o fa-lg"></i>
            </span>
          </transition>
        </div>
        <div class="messageContainer">
          <p class="messageHeader">
            <span>{{message.username}}</span>
          </p>
          <div class="message">
            <span class="chat-arrow-icon"></span>
            <div v-html="message.messageData"></div>
            <span class="messageState"  v-if="state!==defaultState.completed">
              <i class="" v-if="state===defaultState.complete"></i>
              <i class="fa fa-spinner fa-spin" v-else-if="state===defaultState.loading"></i>
              <i class="fa fa-exclamation-circle color-error" v-else-if="state===defaultState.error"></i>
            </span>
            <span class="messageTime" v-else>{{message.time}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {DEFAULT_USER_IMAGE} from 'common/config.js'
    export default{
        props:{
          groupId:{
              type:String
          },
          currentUserId:{
                type:String,
            default:'123456'
          },
          isNew:{
            type:Boolean,
            default:false
          },
          message:{
            type:Object,
            default:()=>{
                return{
                  userId:'123456',
                  header:DEFAULT_USER_IMAGE,
                  username:'人卫社001号',
                  messageData:'这是个测试数据，01234，测试测试',
                  time:'2012-12-12 12:12:00'
                }
            }
          }
        },
        data(){
            return{
              defaultState:{
                completed:'completed',
                loading:'loading',
                error:'error',
              },
              state:'completed',//默认是已完成状态
            }
        },
        created(){
          //当组件创建完毕判断消息类型，如果是新增消息，则开始ajax请求
          if(!this.isNew){
            return;
          }
          let self = this;
          //state状态改为loading
          this.state = this.defaultState.loading;
          console.log(111);
          //ajax请求 （先模拟异步）
          setTimeout(function () {
            self.state = self.defaultState.completed;
          },2500);

        },
    }
</script>

<style scoped>
.messageIterm{
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
}
  .messageIterm-inner{
    width: 70%;
    max-width: 600px;
    position: relative;
    padding: 0 30px 0 50px;
  }
  .messageUserHead{
    position: absolute;
    top: 8px;
    left:0;
    width: 36px;
    z-index: 10;
  }
.messageUserHead>div{
  width: 36px;
  height:36px;
  border-radius: 50%;
  overflow: hidden;
}
.messageUserHead>div>img{
  display: block;
  width: 100%;
}
.messageUserHead>span{
  display: none;
  margin-top: 10px;
  cursor: pointer;
}
.messageIterm:hover .messageUserHead>span{
  display: inline-block;
}
  .messageHeader{
    font-size: 12px;
    color:#8c8c8c;
  }
  .messageHeader>span:first-child{
  }
  .message{
    position: relative;
    display: inline-block;
    max-width: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    background-color: #D4D9DD;
    border-radius: 6px;
  }
  .chat-arrow-icon{
    position: absolute;
    left: -30px;
    top:-5px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 15px solid #D4D9DD;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
.chat-arrow-icon:before{
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  padding: 10px;
  background-color: #F5F5F5;
  border-radius: 0 0 50% 65%;
  position: relative;
  z-index: 1;
  top: -15px;
  left: -4px;
}
.messageState{
  position: absolute;
  right: -20px;
  top: 10px;
  display: inline-block;
  width: 14px;
  height:14px;
}
.messageTime{
  position: absolute;
  width: 130px;
  right: -140px;
  bottom: 0;
  color:#c8c8c8;
}

  /*我的消息样式-右对齐*/
.messageIterm.my-message .messageIterm-inner{
  padding: 0 50px 0 30px;
  float: right;
}
.messageIterm.my-message  .messageUserHead{
  left: auto;
  right: 0;
}
.messageIterm.my-message .messageContainer{
  text-align: right;
}
.messageIterm.my-message .message>div{
  text-align: left;
}
.messageIterm.my-message .chat-arrow-icon{
  right: -30px;
  left: auto;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: #D4D9DD;
  border-right-color: transparent;
}
.messageIterm.my-message .chat-arrow-icon:before{
  background-color: #F5F5F5;
  border-radius: 0 0 50% 88%;
  top: -15px;
  right: 15px;
  left: auto;
  padding: 10px 8px;
}
.messageIterm.my-message .messageState{
  left: -20px;
}
.messageIterm.my-message .messageTime{
  left: -140px;
}
</style>

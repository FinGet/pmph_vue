/**
    聊天窗口主界面，包含消息展示区和输入消息
*/
<template>
	<div class="groupChat-wrapper">
    <div class="chatContainer" ref="chatContainer">
      <ChatMessageIterm
        v-for="(iterm,index) in messagesList"
        :message="iterm"
        :key="index"
        :isNew="!!iterm.isNew"
      >

      </ChatMessageIterm>
    </div>
    <div class="ChatInput" :class="{active:textAreaIsFocus}">
      <div class="ChatInputTool">
        <div>
          <span @click="showEmojiFunction"><i class="fa fa-smile-o fa-lg"></i></span>
          <span class="ChatInputFileBtn">
            <i class="fa fa-paperclip fa-lg" @click="sendMessage"></i>
            <input type="file">
          </span>
        </div>
        <div class="pull-right"></div>

        <!--emoji表情-->
        <transition name="fade" mode="">
          <div class="emojiBox" v-if="showEmoji" >
            <el-button
              class="pop-close"
              :plain="true"
              type="danger"
              size="mini"
              icon="close"
              @click="showEmoji = false"></el-button>
            <vue-emoji
              @select="selectEmoji">
            </vue-emoji>
          </div>
        </transition>
      </div>
      <div class="ChatInputTextArea">
        <textarea
          autofocus
          ref="textArea"
          v-model="editingTextarea"
          @keyup.enter="sendMessage"
          @focus="textAreaFocus"
          @blur="textAreaBlur"

        ></textarea>
        <el-button @click="sendMessage"  size="small" class="btn">发送(S)</el-button>
      </div>
    </div>
	</div>
</template>

<script>
  import vueEmoji from '@/base/emoji/emoji.vue'
  import { emoji } from '@/base/emoji/emoji-api.js'
  import ChatMessageIterm from './ChatMessageIterm.vue'
  import {getCursorPosition,setCursorPosition} from 'common/js/textarea.js'
  import {DEFAULT_USER_IMAGE} from 'common/config.js'
  import {getNowFormatDate} from 'common/js/time.js'
	export default {
		data() {
			return {
        editingTextarea:"",
        currientCursorposition:{text: "", start: 2, end: 2},//text是选中文案，start起始位置，end终点位置
        textAreaIsFocus:false,
        showEmoji:false,
        messagesList:[//消息列表
          {
            userId:'123476',
            header:DEFAULT_USER_IMAGE,
            username:'人卫社001号',
            messageData:'这是个测试数据，01234，测试测试',
            time:'2012-12-12 12:12:00'
          },
          {
            userId:'123756',
            header:DEFAULT_USER_IMAGE,
            username:'人卫社001号',
            messageData:'这是个测试数据，01234，测试测试',
            time:'2012-12-12 12:12:00'
          },
        ],
      }
		},
    methods:{
      sendMessage(){
        var self = this;
        var message = {
          type:'text',
          isNew:true,
          userId:'123456',
          header:DEFAULT_USER_IMAGE,
          username:'我的测试账号',
          messageData:'这是个测试数据，01234，测试测试',
          time:'2012-12-12 12:12:00'
        };

        message.time = getNowFormatDate();

        message.messageData = emoji(this.editingTextarea);
        if(!message.messageData){
            this.sendMessageIsEmpty();
            return;
        }
        this.messagesList.push(message);
        //发送完消息清空textarea
        this.editingTextarea = '';

        //to-do list 这部分后面需要重写，消息组件加载完成后再重置滚动条位置
        setTimeout(function () {
          //将聊天消息窗口滚动条滚动到底部
          self.scollBottom(self.$refs.chatContainer);
        },20)
      },
      textAreaFocus(){
          this.textAreaIsFocus=true;
        //        先重置当前选中位置
        this.resetCurrientCursorposition();
      },
      textAreaBlur(){
        this.textAreaIsFocus=false;
      },
      resetCurrientCursorposition(){
        var textarea = this.$refs.textArea;
        this.currientCursorposition = getCursorPosition(textarea);
      },
      showEmojiFunction(){
          this.showEmoji=!this.showEmoji;
      },
      selectEmoji(code){
        //        先重置当前选中位置
        this.resetCurrientCursorposition();
//          console.log(code)
//        关闭表情弹窗
        this.showEmoji=false;
        let newText = this.editingTextarea.substr(0,this.currientCursorposition.start);
        console.log(newText);
        newText += code;
        console.log(newText);
        newText += this.editingTextarea.substr(this.currientCursorposition.end,this.editingTextarea.length);
        this.editingTextarea=newText;
      },
      scollBottom(dom){//滚动到底部
        dom.scrollTop=dom.scrollHeight;
      },
      sendMessageIsEmpty(){
        console.log('消息不能为空');
      },
    },
    components:{
      vueEmoji,
      ChatMessageIterm
    }
	}
</script>

<style scoped>
.groupChat-wrapper{
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 145px;
}
.chatContainer{
  height: 100%;
  padding: 0 30px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.ChatInput{
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 144px;
  width: 100%;
  padding: 0 25px;
  border-top: 1px solid #E6E7E8;
  z-index:10;
}
.ChatInput.active{
  background: #fff;
}
.ChatInputTool{
  position: relative;
  height: 36px;
  line-height: 36px;
}
.ChatInputTool>div:first-child>span{
  margin-right: 10px;
  cursor: pointer;
}
.ChatInputTool .emojiBox{
  position: absolute;
  bottom: 36px;
}
.emojiBox .pop-close{
  position: absolute;
  border: none;
  color: #FF4949;
  right: 16px;
  top: 4px;
  z-index: 10;
}
  .ChatInputTextArea{
    box-sizing: border-box;
    position: relative;
    height: 108px;
    padding: 10px 0;
  }
  .ChatInputTextArea>textarea{
    display: block;
    width: 100%;
    border: none !important;
    outline: none !important;
    background: none;
    height: 58px;
    resize: none;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  .ChatInputTextArea>.btn{
    position: absolute;
    bottom: 10px;
    right: 0;
    margin: 0;
  }
  .ChatInputFileBtn{
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
.ChatInputFileBtn input{
  display: block;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height:100%;
  opacity:0;
  z-index: 1;
  cursor: pointer;
}
</style>

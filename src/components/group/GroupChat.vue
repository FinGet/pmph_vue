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
          <!--发送表情按钮-->
          <span @click="showEmojiFunction"><i class="fa fa-smile-o fa-lg"></i></span>
          <!--上传文件按钮-->
          <div class="ChatInputFileBtn">
            <i class="fa fa-paperclip fa-lg"></i>
            <input type="file" class="ChatInputFileBtn" @change="uploadFile" ref="fileInput">
          </div>
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
  import {getCursorPosition,setCursorPosition,getNowFormatDate} from '../../../static/commonFun.js'
  import {DEFAULT_USER_IMAGE} from 'common/config.js'
  import bus from 'common/eventBus/bus.js'
	export default {
    props:['currentGroup'],
		data() {
			return {
			  createTime:+(new Date()),
        filelist:[],
        editingTextarea:"",
        currientCursorposition:{text: "", start: 2, end: 2},//text是选中文案，start起始位置，end终点位置
        textAreaIsFocus:false,
        showEmoji:false,
        messagesList:[],
      }
		},
    methods:{
      sendMessage(){
        var message = {
          type:'message',
          isNew:true,
          userId:'123456',
          header:DEFAULT_USER_IMAGE,
          username:'我的测试账号',
          messageData:'这是个测试数据，01234，测试测试',
          time:'2012-12-12 12:12:00'
        };

        message.time = getNowFormatDate();

        message.messageData = emoji(this.editingTextarea.trim());
        if(!message.messageData){
            this.sendMessageIsEmpty();
            return;
        }
        this.messagesList.push(message);
        //发送完消息清空textarea
        this.editingTextarea = '';

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
      sendMessageIsEmpty(){
        console.log('消息不能为空');
      },
      /**
       * 当聊天窗口中上传文件组件上传成功后执行此回调
       */
      uploadFile(){
        let self= this;
        var filedata = this.$refs.fileInput.files[0];
        if(!filedata){
          return;
        }
        var formdata = new FormData();
        formdata.append('files',filedata);
        formdata.append('ids',[1234]);
        formdata.append('sessionId',this.getUserData().sessionId);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('/group/add/pmphgroupfile',formdata,config)
          .then((response) => {
            let res = response.data;
            if (res.code == '1') {

            }else{
              self.$message.error('上传文件失败，请重试');
            }
          })
          .catch((error) => {
            self.$message.error('上传文件失败，请重试');
          });
      },
      /**
       * 获取小组聊天历史消息
       * @param pageSize
       * @param pageNumber
       * @param callback
       */
      getHistoryMessage(pageSize=1,pageNumber=30,callback){
        this.$axios.get('/group/list/message',{params:{
          groupId:this.currentGroup.id,
          pageSize:pageSize,
          pageNumber:pageNumber,
          baseTime:parseInt(this.createTime)
        }})
          .then(response=>{
            let res = response.data;
            if (res.code == '1') {
              this.messagesList.unshift(res.data);
            }
          })
          .catch(e=>{

          })
      },
      /**
       *
       */
      handlerReceiveMessage(data){
        this.$message.success('成功收到消息');
        console.log(data);
      },
      /**
       * 开始监听webSocket推送的消息事件
       */
      startListenMessage(){
        bus.$on('ws:message',this.handlerReceiveMessage)
      }
    },
    components:{
      vueEmoji,
      ChatMessageIterm
    },
    created(){
      this.getHistoryMessage();
    },
    mounted(){
      this.startListenMessage();
    },
    watch:{
      messagesList(){
        setTimeout(()=> {
          //将聊天消息窗口滚动条滚动到底部
          this.$refs.chatContainer.scrollTop=this.$refs.chatContainer.scrollHeight;
        },20)
      }
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

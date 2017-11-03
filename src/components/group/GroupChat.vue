/**
    聊天窗口主界面，包含消息展示区和输入消息
*/
<template>
	<div class="groupChat-wrapper">
    <div class="chatContainer" ref="chatContainer">
      <div class="messageLoadingBox text-center paddingT10 paddingB10">
        <span v-if="messageLoading">
            <i class="fa fa-spinner fa-spin"></i>
            加载中...
        </span>
        <el-button type="text"
                   v-if="!messageLoading&&showLoadingmoreBtn"
                   @click="getMoreHistoryMessage"
        >点击查看更多消息</el-button>

        <span v-if="!messageLoading&&!showLoadingmoreBtn&&messagesList.length==0">
            历史消息为空
        </span>
      </div>
      <ChatMessageIterm
        v-for="(iterm,index) in messagesList"
        :message="iterm"
        :key="index"
        :isNew="!!iterm.isNew"
        :groupId="currentGroup.id"
        :currentUserId="currentUserdata.userInfo.id"
        :currentUserType="currentUserdata.userInfo.loginType"
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
          @input="changeTextarea"
          @keyup.enter="sendMessage"
          @focus="textAreaFocus"
          @blur="textAreaBlur"

        ></textarea>
        <p class="tip-text" v-if="250-editingTextarea.length<20">还可输入{{250-editingTextarea.length}}个字符</p>
        <el-button @click="sendMessage"  size="small" class="btn">发送(S)</el-button>
      </div>
    </div>
	</div>
</template>

<script>
  import vueEmoji from '@/base/emoji/emoji.vue'
  import { emoji } from '@/base/emoji/emoji-api.js'
  import ChatMessageIterm from './ChatMessageIterm.vue'
  import bus from 'common/eventBus/bus.js'
	export default {
    props:['currentGroup'],
		data() {
			return {
        messageLoading:true,
        showLoadingmoreBtn:true,
        isClickLoadingMore:false,
        filelist:[],
        editingTextarea:"",
        currientCursorposition:{text: "", start: 2, end: 2},//text是选中文案，start起始位置，end终点位置
        textAreaIsFocus:false,
        showEmoji:false,
        messagesList:[],
        getHistoryMesListForm:{
          pageSize:30,
          pageNumber:1,
          createTime:+(new Date()),
        },
      }
		},
    computed:{
      currentUserdata(){
        return this.$getUserData()
      },
      groupId(){
          return this.currentGroup.id;
      }
    },
    methods:{
      /**
       * 聊天窗口中发送一条普通消息，读取输入框中的内容发送出去
       */
      sendMessage(){
        let message = {
          type:'message',
          isNew:true,
          userId:this.currentUserdata.userInfo.id,
          userType:this.currentUserdata.userInfo.loginType,
          header:this.$config.BASE_URL+'image/'+this.currentUserdata.userInfo.avatar,
          username:this.currentUserdata.userInfo.username,
          messageData:undefined,
          time:this.$commonFun.getNowFormatDate()
        };

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
        this.currientCursorposition = this.$commonFun.getCursorPosition(textarea);
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
      /**
       * 点击发送按钮，当消息为空时触发此方法
       */
      sendMessageIsEmpty(){
        this.$message.error('消息不能为空');
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
        formdata.append('file',filedata);
        formdata.append('ids',this.currentGroup.id);
        formdata.append('sessionId',this.$getUserData().sessionId);
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
      getHistoryMessage(){
        var self = this;
        this.messageLoading=true;
        this.$axios.get('/group/list/message',{params:{
          groupId:this.currentGroup.id,
          pageSize:this.getHistoryMesListForm.pageSize,
          pageNumber:this.getHistoryMesListForm.pageNumber,
          baseTime:this.getHistoryMesListForm.createTime
        }})
          .then(response=>{
            let res = response.data;
            if (res.code == '1') {
              var tempList = []
              res.data.rows.forEach(iterm=>{
                let message = {
                  id:iterm.id,
                  type:iterm.userType?'message':'file',
                  isNew:false,
                  userId:iterm.userId,
                  userType:iterm.userType,
                  header:this.$config.BASE_URL+'image/'+iterm.avatar,
                  username:iterm.memberName,
                  messageData:iterm.msgContent,
                  time:this.$commonFun.formatDate(iterm.gmtCreate),
                };
                tempList.unshift(message)
              });
              tempList.forEach(iterm=>{
                self.messagesList.unshift(iterm);
              });
              this.showLoadingmoreBtn=!res.data.last;
            }
            this.messageLoading=false;
          })
          .catch(e=>{
            self.messageLoading=false;
          })
      },
      /**
       * 点击加载更多历史消息按钮，先将获取的页码参数加1，再执行getHistoryMessage方法
       */
      getMoreHistoryMessage(){
          this.isClickLoadingMore=true;
          this.getHistoryMesListForm.pageNumber++;
          this.getHistoryMessage();
      },
      /**
       * 处理接收到的消息事件
       * 处理条件：1、消息是小组消息，2、消息的小组id等于当前小组id，3、消息的userid不在不等于当前用户id
       */
      handlerReceiveMessage(data){
        console.log('小组聊天窗口成功收到消息',data);
        let message={};
        data=JSON.parse(data);
        if(data.msgType==3 && ((data.groupId==this.currentGroup.id && data.senderId!=this.currentUserdata.userInfo.id)||!!!data.senderType)){
          message = {
            id:data.id,
            type:data.senderType==0?'file':'message',
            isNew:false,
            userId:data.senderId,
            userType:data.senderType,
            header:this.$config.BASE_URL+'image/'+data.senderIcon,
            username:data.senderName,
            messageData:data.content,
            time:this.$commonFun.formatDate(data.time),
          };
          this.messagesList.push(message);
        }
      },
      /**
       * 当聊天输入框发生变化
       */
      changeTextarea(){
        if(this.editingTextarea.length>250){
          this.editingTextarea=this.editingTextarea.substring(0,250);
        }
      },
      /**
       * 开始监听webSocket推送的消息事件
       */
      startListenMessage(){
        bus.$on('ws:message',this.handlerReceiveMessage)
      },
      /**
       *  取消监听
       */
      removeListenMessage(){
        bus.$off('ws:message',this.handlerReceiveMessage)
      },

    },
    components:{
      vueEmoji,
      ChatMessageIterm
    },
    created(){
      if(this.groupId){
        this.getHistoryMessage();
      }
    },
    mounted(){
      this.startListenMessage();
    },
    watch:{
      messagesList(){
        if(this.isClickLoadingMore){
          this.isClickLoadingMore=false;
          return;
        }
        this.isClickLoadingMore=false;
        setTimeout(()=> {
          //将聊天消息窗口滚动条滚动到底部
          this.$refs.chatContainer.scrollTop=this.$refs.chatContainer.scrollHeight;
        },20)
      },
      groupId(){
        this.messagesList=[];
        this.getHistoryMesListForm.pageNumber=1;
        this.getHistoryMesListForm.createTime=+(new Date());
        this.getHistoryMessage();
      }
    },
    beforeDestroy(){
      this.removeListenMessage();
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
  box-sizing: border-box;
  height: 100%;
  width: 100%;
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
.messageLoadingBox{
  background: #f1f1f1;
}
  .tip-text{
    color: #ccc;
    margin-right: 90px;
    text-align: right;
    margin-top: 10px;
  }
</style>

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
          <my-upload
            v-if="!fileUploading"
            class="ChatInputFileBtn"
            ref="upload"
            :data="filePostData"
            action="/pmpheep/group/add/pmphGroupFile"
            :before-upload="beforeUploadFile"
            :on-success="uploadFileSuceess"
            :show-file-list="false">
            <i class="fa fa-paperclip fa-lg"></i>
          </my-upload>
          <i class="fa fa-spinner fa-pulse" v-else></i>
        </div>
        <div class="pull-right"></div>
      </div>
      <div class="ChatInputTextArea">
        <textarea
          autofocus
          ref="textArea"
          v-model="editingTextarea"
          @input="changeTextarea"
          @keyup.enter="sendMessage"

        ></textarea>
        <p class="tip-text" v-if="250-editingTextarea.length<20">还可输入{{250-editingTextarea.length}}个字符</p>
        <el-button @click="sendMessage"  size="small" class="btn">发送(S)</el-button>
      </div>
    </div>
	</div>
</template>

<script>
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
        fileUploading:false,
        supportWebsocket:true,
        startIntervalFetchMessagesList:true,
        timer:undefined,
      }
		},
    computed:{
      currentUserdata(){
        return this.$getUserData()
      },
      groupId(){
          return this.currentGroup.id;
      },
      filePostData(){
        let obj = {};
        obj.ids = this.currentGroup.id;
        obj.sessionId = this.$getUserData().sessionId;
        return obj;
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
          header:this.$config.DEFAULT_BASE_URL + this.currentUserdata.userInfo.avatar,
          username:this.currentUserdata.userInfo.username,
          messageData:undefined,
          time:this.$commonFun.getNowFormatDate()
        };

        message.messageData = this.editingTextarea.trim();
        if(!message.messageData){
            this.sendMessageIsEmpty();
            return;
        }
        this.messagesList.push(message);
        //发送完消息清空textarea
        this.editingTextarea = '';
        this.startIntervalFetchMessagesList=true;//发送完成就ie9下打开模拟websocket
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
      beforeUploadFile(file){
        let flag = true;
        let self= this;
        var filedata = file.raw;
        var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        if(!filedata||!ext){
          flag = false;
        }
        // 类型判断
        if(ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif'){
          this.$message.error("不可以上传可.exe|.bat|.com|.lnk|.pif等格式的可执行文件");
          flag = false;
        }
        //文件名不超过40个字符
        if(file.name.length>40){
          this.$message.error("文件名不能超过40个字符");
          flag = false;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size<1){
          this.$message.error("文件大小不能小于1bt");
          flag = false;
        }
        // 判断文件大小是否符合 文件不大于100M
        if(file.size/1024/1024 > 100){
          this.$message.error("文件大小不能超过100M！");
          flag = false;
        }
        console.log(flag)
        this.fileUploading=flag;
        return flag;
      },
      /**
       * 上传文件成功钩子函数
       * @param response
       * @param file
       * @param fileList
       */
      uploadFileSuceess(response, file, fileList){
        if (response.code == '1') {
          this.fileUploading=false;
        }else{
          this.$message.error(response.msg.msgTrim());
        }
      },
      /**
       * 获取小组聊天历史消息
       * @param  Boolean reset
       */
      getHistoryMessage(reset){
        var self = this;
        this.messageLoading=true;
        if(reset){
          this.getHistoryMesListForm.createTime = +(new Date());
        }
        this.$axios.get('/pmpheep/group/list/message',{params:{
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
                  header:this.$config.DEFAULT_BASE_URL+iterm.avatar,
                  username:iterm.memberName,
                  messageData:iterm.msgContent,
                  time:this.$commonFun.formatDate(iterm.gmtCreate),
                };
                tempList.unshift(message)
              });
              if(reset){
                self.messagesList=[];
              }
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
        this.startIntervalFetchMessagesList=false;//当在查看历史消息的时候，先停止ie9模拟请求
        this.isClickLoadingMore=true;
        this.getHistoryMesListForm.pageNumber++;
        this.getHistoryMessage();
      },
      /**
       * 处理接收到的消息事件
       * 处理条件：1、消息是小组消息，2、消息的小组id等于当前小组id，3、消息的userid不在不等于当前用户id
       */
      handlerReceiveMessage(data){
        let message={};
        data=JSON.parse(data);
        if(data.msgType==3 && ((data.groupId==this.currentGroup.id && data.senderId!=this.currentUserdata.userInfo.id)||!!!data.senderType)){
          message = {
            id:data.id,
            type:data.senderType==0?'file':'message',
            isNew:false,
            userId:data.senderId,
            userType:data.senderType,
            header:this.$config.DEFAULT_BASE_URL+data.senderIcon,
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
      /**
       * 模拟websocket定时请求消息列表
       */
      intervalFetchMessagesList(){
        if(this.startIntervalFetchMessagesList){
          this.getHistoryMesListForm.pageNumber=1;
          this.getHistoryMessage(true);
        }
      }

    },
    components:{
      ChatMessageIterm
    },
    created(){
      if(this.groupId){
        this.getHistoryMessage();
      }
    },
    mounted(){
      this.startListenMessage();
      this.supportWebsocket = window.WebSocket;
      if(!this.supportWebsocket){
        this.timer = setInterval(()=>{
          this.intervalFetchMessagesList();
        },30000)
      }
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
      clearInterval(this.timer);
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

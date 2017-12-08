<template>
  <el-dropdown v-if="receiveMessage.length" @command="handleCommand">
        <span class="el-dropdown-link" trigger="hover">

          <i class="fa fa-envelope-o fa-lg" @click="gotoMyMsgList"></i>
          <span class="mes-num" v-if="totalNum>0">{{totalNum}}</span>
        </span>
    <el-dropdown-menu slot="dropdown" class="msg-dropdown">
      <el-dropdown-item v-for="(iterm,index) in receiveMessage" :key="index" :command="iterm" v-if="index<4">
        <a class="message-iterm">
          <span class="image"><img :src="iterm.senderAvatar"></span>
          <span>
            <span>{{iterm.senderName}}</span>
            <span class="time">{{dateDiff(iterm.sendTime)}}</span>
          </span>
          <span class="message" v-html="iterm.title"></span>
          <span class="message" v-html="iterm.content"> </span>
        </a>
      </el-dropdown-item>
      <el-dropdown-item v-if="receiveMessage.length>3" class=" text-center">
        <el-button type="text" class="message-iterm" @click="gotoMyMsgList">
          <span class="message message-all">
            查看全部
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </el-button>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-button type="text" class="marginR30" @click="gotoMyMsgList" v-else>
    <i class="fa fa-envelope-o fa-lg"></i>
  </el-button>
</template>

<script>
  import bus from 'common/eventBus/bus.js'
	export default {
		data() {
			return {
			  receiveMessage:[],
        searchForm:{
          userId:this.$getUserData().userInfo.id,
          userType:this.$getUserData().userInfo.loginType,
          pageNumber:1,
          pageSize:5,
        },
        totalNum:0,
      }
		},
    methods:{
      /**
       * 获取未读消息
       */
      getMessageList(){
        this.$axios.get('/pmpheep/messages/list/myMessageIcon',{params:this.searchForm})
          .then(response=>{
            let res = response.data;
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.senderAvatar = this.$config.DEFAULT_BASE_URL+iterm.senderAvatar;
                iterm.title = iterm.title.length>18?iterm.title.substring(0,18)+'...':iterm.title;
                iterm.content=this.$commonFun.getHTMLText(iterm.content).substring(0,42)+'...';
              });
              this.receiveMessage=res.data.rows;
              this.totalNum = res.data.total;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
      /**
       * websocket 接收到消息处理
       * @param data
       */
	    handleReceiveMessage(data){
        console.log('message-icon收到消息',data)
	      var receiveData;
	      try{
          receiveData = JSON.parse(data);
        }catch(e){
	        console.log(e)
        }
        if(receiveData.msgType==3){
          return;
        }
        receiveData = receiveData||{};
        var messageObj = {
          senderId:receiveData.senderId,
          senderName:receiveData.senderName,
          senderAvatar:this.$config.DEFAULT_BASE_URL+receiveData.senderIcon,
          sendTime:receiveData.time,
          title:receiveData.title.length>18?receiveData.title.substring(0,18)+'...':receiveData.title,
          content:this.$commonFun.getHTMLText(receiveData.content).substring(0,42)+'...',
          id:receiveData.id,
        };
        this.receiveMessage.push(messageObj);
        this.totalNum++;
      },
      /**
       * 将时间戳转换所需的样式-'几分钟前'
       * @param time
       * @returns {*|string}
       */
      dateDiff(time){
	      return this.$commonFun.getDateDiff(time)
      },
      /**
       * 点击msg图标跳转到我的消息列表页面
       */
      gotoMyMsgList(){
        this.$router.push({name:'我的消息列表'})
      },
      /**
       * 点击消息事件
       * 点击后将该条消息移除
       * @param command
       */
      handleCommand(command) {
        var msgId = command.id;
        this.receiveMessage.splice(this.receiveMessage.indexOf(command),1);
        this.totalNum--;
        this.$router.push({name:'我的消息详情',query:{msgId:msgId}})
      }
    },
    created(){
		  this.getMessageList();
      bus.$on('mymessage:stateChange',this.getMessageList);
      bus.$on('ws:message',this.handleReceiveMessage);
    },
    beforeDestroy(){
      bus.$off('ws:message',this.handleReceiveMessage);
      bus.$off('mymessage:stateChange',this.getMessageList);
    }
	}
</script>

<style scoped>
.el-dropdown{
  padding-right: 32px;
  cursor: pointer;
}
  .mes-num{
    background: #1ABB9C!important;
    border: 1px solid #1ABB9C!important;
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    padding: 2px 6px;
    position: absolute;
    right: 18px;
    border-radius: 50%;
    top: 2px;
  }
.el-dropdown-menu{
  max-width: 290px;
}
.msg-dropdown{
  min-width: 280px;
}
.el-dropdown-menu__item:hover{
  background: none;
}
a.message-iterm{
  font-size: 12px;
  line-height: 1.42;
  color: #5A738E;
  display: block;
  padding: 4px 8px;
  background: #f7f7f7;
  margin: 8px 0;
}
a.message-iterm:hover {
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
}
.image>img {
  border-radius: 2px;
  -webkit-border-radius: 2px;
  float: left;
  margin-right: 10px;
  width: 28px;
  height:28px;
}
a .time {
  font-size: 11px;
  font-style: italic;
  font-weight: 700;
  position: absolute;
  right: 35px;
}
.message{
  display: block!important;
}
.message-all{
  text-align: center;
  font-weight: 700;
  padding: 8px 8px;
}

  .message-all{}
</style>

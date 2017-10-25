<template>
  <el-dropdown v-if="computedMessageList.length">
        <span class="el-dropdown-link" trigger="click">

          <i class="fa fa-envelope-o fa-lg"></i>
          <span class="mes-num" v-if="computedMessageList.length>0">{{computedMessageList.length}}</span>
        </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(iterm,index) in computedMessageList" :key="index">
        <a class="message-iterm">
          <span class="image"><img :src="iterm.senderIcon"></span>
          <span>
            <span>{{iterm.senderName}}</span>
            <span class="time">{{dateDiff(iterm.time)}}</span>
          </span>
          <span class="message" v-html="iterm.content">
          </span>
        </a>
      </el-dropdown-item>
      <el-dropdown-item v-if="computedMessageList.length>3">
        <a class="message-iterm">
          <span class="message message-all">
            查看全部
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-button type="text" class="marginR30" v-else>
    <i class="fa fa-envelope-o fa-lg"></i>
  </el-button>
</template>

<script>
  import bus from 'common/eventBus/bus.js'
  import {getDateDiff} from '../../static/commonFun'
  import {BASE_URL} from 'common/config.js'
	export default {
	  props:{
	    messageList:{
	      type:Array,
        default:()=>[]
      }
    },
		data() {
			return {
			  receiveMessage:[],
      }
		},
    computed:{
		  computedMessageList(){
		    var list = this.messageList.concat(this.receiveMessage);
		    return list;
      }
    },
    methods:{
      /**
       * websocket 接收到消息处理
       * @param data
       */
	    handleReceiveMessage(data){
	      console.log('收到webSocket消息：',data);
	      var receiveData;
	      try{
          receiveData = JSON.parse(data);
        }catch(e){
	        console.log(e)
        }
        receiveData = receiveData||{};
        var messageObj = {
          senderId:receiveData.senderId,
          senderName:receiveData.senderName,
          senderIcon:BASE_URL+'image/'+receiveData.senderIcon,
          time:receiveData.time,
          title:receiveData.title,
          content:receiveData.content,
          msgId:receiveData.id,
        };
        this.receiveMessage.push(messageObj);
        console.log(this.computedMessageList);
      },
      dateDiff(time){
	      return getDateDiff(time)
      }
    },
    created(){
      bus.$on('ws:message',this.handleReceiveMessage);
    },
    beforeDestroy(){
      bus.$off('ws:message',this.handleReceiveMessage);
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

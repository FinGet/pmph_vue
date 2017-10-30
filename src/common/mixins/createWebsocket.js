import bus from '../eventBus/bus'
import {BASE_WS_URL} from '../config';
export default {
  created() {
    if(!WebSocket){
      console.error('浏览器不支持websocket')
    };
    var userdata = this.$getUserData()
    var userType = userdata.userInfo.loginType || '1';
    var sessionid = userdata.sessionId || '';
    var socket = new WebSocket(BASE_WS_URL + 'websocket?userType=' + userType+'&sessionId='+sessionid);
    /**
     * websocket创建成功事件
     */
    socket.addEventListener('open', function (event) {
      console.log('websocket 连接成功');
      console.log(event);
    });
    /**
     * websocket error事件
     */
    socket.addEventListener('error', function (event) {
      console.log('websocket 连接失败');
      console.log(event);
    });
    /**
     * websocket close事件
     */
    socket.addEventListener('close', function (event) {
      console.log('websocket 连接关闭');
      console.log(event);
    });
    /**
     * 接收到消息用vue event bus抛出事件
     */
    socket.addEventListener('message', function (event) {
      console.log('websocket 收到消息');
      bus.$emit('ws:message', event.data);
    });
    /**
     * 监听发送消息事件
     */
    bus.$on('ws:send', function (data) {
      socket.send(JSON.stringify(data));
    });
    /**
     * 关闭websocket事件
     */
    bus.$on('ws:close', function () {
      socket.close();
    });
  },
  beforeDestroy(){
    bus.$emit('ws:close');
  },
};

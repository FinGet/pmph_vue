<template>
  <div class="message-preview">
    <message-detail :msgData="previewData" :fileLableKey="{name:'attachmentName',url:'attachment'}"></message-detail>
  </div>
</template>

<script>
  import messageDetail from 'components/message-detail'
  export default{
    data(){
      return {
        msgId:123,
        previewData:{
          title:'',
          content:'',
          senderName:'',
          sendTime:'',
          files:[]
        }
      }
    },
    components:{
      messageDetail
    },
    methods:{
      getMsgContent(){
        this.$axios.get('/pmpheep/messages/myMessageDetail',{params:{
          id:this.msgId
        }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              if(res.data.is_withdraw){//如果该条消息已被撤回，则弹窗提示
                this.msgIsWithdraw()
                return;
              }
              var tempObj = {
                title:'',
                content:'',
                senderName:'',
                sendTime:'',
                files:[]
              };
              tempObj.title = res.data.title;
              tempObj.content = res.data.content;
              tempObj.senderName = res.data.senderName;
              tempObj.sendTime = this.$commonFun.formatDate(res.data.sendTime);
              tempObj.files = res.data.messageAttachments||[];
              this.previewData = tempObj;
            }else{
              this.$confirm(res.msg.msgTrim(), "提示",{
              	confirmButtonText: "确定",
              	cancelButtonText: "取消",
              	showCancelButton: false,
              	type: "error"
              });
            }
          })
          .catch(e=>{
            this.$confirm('页面内容加载失败，请重试', "提示",{
            	confirmButtonText: "确定",
            	cancelButtonText: "取消",
            	showCancelButton: false,
            	type: "error"
            });
          })
      },
      msgIsWithdraw(){
        this.$confirm("该条消息已被撤回！", "提示",{
          confirmButtonText: "确定",
          type: "warning"
        })
          .then(()=>{
            this.$router.go(-1);
          })
          .catch(()=>{
            this.$router.go(-1);
          })
      },
    },
    created(){
      this.msgId=this.$route.query.msgId;
      this.getMsgContent();
    }
  }
</script>

<style scoped>
  /*预览弹窗样式*/
  .message-preview{
    max-width: 1060px;
    margin: 0 auto;
  }
  .previewTitle{
    color: #14232e;
    font-size: 26px;
    font-weight: 500;
  }
  .previewContent{
    margin-top: 36px;
  }
  .previewFile>a{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
</style>

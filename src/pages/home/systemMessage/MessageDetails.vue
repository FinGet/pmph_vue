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
          msgId:undefined,
          previewData:{
            title:'',
            content:'',
            senderName:'',
            sendTime:'',
            files:[]
          }
        }
      },
      methods:{
        getMsgContent(){
            if(!this.msgId){
              this.$message.error('未读取到消息id，请重试!');
            }
            this.$axios.get('/pmpheep/messages/message/content',{params:{
                userMsgId:this.msgId
              }})
              .then(response=>{
                let res = response.data
                if(res.code==1){
                  res.data.MessageAttachment.map(iterm=>{
                    iterm.attachment = this.$config.BASE_URL + iterm.attachment.substring(1)
                  })
                  this.previewData.title = res.data.title;
                  this.previewData.content = res.data.content;
                  this.previewData.senderName = res.data.senderName;
                  this.previewData.sendTime = this.$commonFun.formatDate(res.data.senderDate);
                  this.previewData.files = res.data.MessageAttachment||[];
                }else{
                    this.$message.error(res.msg.msgTrim());
                }
              })
              .catch(e=>{
                console.log(e);
                this.$message.error('页面内容加载失败，请重试!');
              })
        }
      },
      components:{
        messageDetail
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
  .fontSize-16{
    font-size: 16px;
  }
</style>

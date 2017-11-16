<template>
  <div class="message-preview paddingT20 paddingR20 paddingL20">
    <h5 class="previewTitle text-center">{{previewData.title}}</h5>
    <p class="senderInfo text-center paddingT10">
      <span class="marginR10">{{previewData.senderName}}</span>
      <span>{{previewData.sendTime}}</span>
    </p>
    <div class="previewContent paddingB20" v-html="previewData.content"></div>
    <!--附件-->
    <el-row v-if="previewData.files.length">
      <el-col :span="2" class="fontSize-16">
        附件 ：
      </el-col>
      <el-col :span="22">
        <div class="previewFile" title="预览界面不提供下载附件功能">
          <a v-for="(iterm,index) in previewData.files" :href="iterm.attachment" :key="iterm.id">{{iterm.attachmentName}}</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
    methods:{
      getMsgContent(){
        this.$axios.get('/pmpheep/messages/detail/mymessage',{params:{
          id:this.msgId
        }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              if(res.data.is_withdraw){//如果该条消息已被撤回，则弹窗提示
                this.msgIsWithdraw()
                return;
              }
              res.data.messageAttachments.map(iterm=>{
                iterm.attachment = this.$config.BASE_URL + iterm.attachment.substring(1)
              });
              this.previewData.title = res.data.title;
              this.previewData.content = res.data.content;
              this.previewData.senderName = res.data.senderName;
              this.previewData.sendTime = this.$commonFun.formatDate(res.data.sendTime);
              this.previewData.files = res.data.messageAttachments||[];
            }else{
              this.$message.error('页面内容加载失败，请重试');
            }
          })
          .catch(e=>{
            this.$message.error('页面内容加载失败，请重试');
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
  .fontSize-16{
    font-size: 16px;
  }
</style>

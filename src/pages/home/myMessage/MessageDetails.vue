<template>
  <div class="message-preview paddingR20 paddingL20">
    <h5 class="previewTitle text-center">{{previewData.title}}</h5>
    <div class="previewContent paddingB20" v-html="previewData.content"></div>
    <!--附件-->
    <el-row v-if="previewData.files.length">
      <el-col :span="2" class="fontSize-16">
        附件 ：
      </el-col>
      <el-col :span="22">
        <div class="previewFile" title="预览界面不提供下载附件功能">
          <span v-for="(iterm,index) in previewData.files" :key="index">{{iterm}}</span>
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
          files:[]
        }
      }
    },
    methods:{
      getMsgContent(){
        this.$axios.get('/mymessages/message/content',{params:{
          userMsgId:this.msgId
        }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              this.previewData.title = res.data.title;
              this.previewData.content = res.data.title;
              this.previewData.files = res.data.files||[];
            }else{
              this.$message.error('页面内容加载失败，请重试');
            }
          })
          .catch(e=>{
            this.$message.error('页面内容加载失败，请重试');
          })
      }
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
    margin-top: 48px;
  }
  .previewFile>span{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
  .fontSize-16{
    font-size: 16px;
  }
</style>

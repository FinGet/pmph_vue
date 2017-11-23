<template>
  <div class="presview-popup">
    <!--标题-->
    <div class="presview-popup-content text-center">
      <h5 class="previewTitle">{{presviewData.title}}</h5>

      <p class="">
        <span v-if="previewData.endTime">结束时间：{{previewData.endTime}}</span>
      </p>
    </div>

    <!--消息内容-->
    <div class="presview-popup-content">
      <div class="presview-popup-content-title">
        内容：
      </div>
      <div class="presview-popup-content-min margin-none">
        <div class="previewConten" v-html="presviewData.content"></div>
      </div>
    </div>

    <!--通知邮寄地址-->
    <div class="presview-popup-content">
      <div class="presview-popup-content-title">
        邮寄地址：
      </div>
      <div class="presview-popup-content-min margin-none">
        <div class="previewConten">{{presviewData.address}}</div>
      </div>
    </div>

    <!--通知联系人-->
    <div class="presview-popup-content">
      <div class="presview-popup-content-title">
        联系人：
      </div>
      <div class="presview-popup-content-min margin-none">
        <div class="previewConten">
          <p v-for="(iterm,index) in presviewData.linkmanList" :key="index">{{iterm}}</p>
        </div>
      </div>
    </div>

    <!--通知备注-->
    <div class="presview-popup-content">
      <div class="presview-popup-content-title">
        邮寄地址：
      </div>
      <div class="presview-popup-content-min margin-none">
        <div class="previewConten">{{presviewData.address}}</div>
      </div>
    </div>


    <!--附件-->
    <div class="presview-popup-content" v-if="presviewData.files.length">
      <div class="presview-popup-content-title justify-align">
        附件：<span></span>
      </div>
      <div class="presview-popup-content-min">
        <div class="previewFile" title="预览界面不提供下载附件功能" v-if="readOnly">
          <span v-for="(iterm,index) in presviewData.files">{{iterm[fileLableKey.name]}}</span>
        </div>
        <div class="previewFile" v-else>
          <a v-for="(iterm,index) in presviewData.files" :href="iterm[fileLableKey.url]" :key="iterm.id">{{iterm[fileLableKey.name]}}</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
	export default {
    props:{
      readOnly:{
        type: Boolean,
        required: false
      },
      presviewData:{//消息内容
        type:Object,
        default:function () {
          return {
            title:'',
            content:'',
            senderName:'',
            endTime:'',
            linkmanList:[],
            address:'',
            note:'',
            files:[]
          }
        }
      },
      fileLableKey:{
        type:Object,
        default:function () {
          return {
            name:'name',
            url:'url'
          }
        },
        required: false
      }
    },
    data() {
      return {}
    }
	}
</script>

<style scoped>
  /*预览弹窗样式*/
  .presview-popup{
    max-width: 1200px;
    margin: 0 auto;
  }
  .presview-popup img{
    max-width: 100%;
  }
  .previewTitle{
    color: #14232e;
    font-size: 26px;
    font-weight: 500;
  }
  .previewContent{

  }
  .previewFile a{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
  .previewFile span{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
  .presview-popup-content{
    margin-top: 20px;
  }
  .presview-popup-content.inline{
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  .presview-popup-content-title{
    width:74px;
    float: left;
  }
  .presview-popup-content-min{
    margin-left: 80px;
  }
  .presview-popup-content-min.margin-none{
    margin-left: 0;
  }
  .justify-align{
    line-height: 1.4;
  }
  .justify-align.lineheight-36{
    line-height: 36px;
  }
</style>

<template>
  <div class="material-notice">
    <p class="material-notice-title text-center">
      {{formData.title}}
    </p>
    <p class="material-notice-time text-center" v-if="materialData.materialName">截止日期：{{$commonFun.formatDate(materialData.materialName.deadline).split(' ')[0]}}</p>
    <div class="material-notice-conten paddingT30" v-html="formData.content"></div>
    <div class="material-notice-image text-center">
      <div class="material-notice-image-iterm" v-for="(iterm,index) in formData.image" :key="index"><img class="img" :src="iterm.attachment" alt=""></div>
    </div>
    <div class="clearfix" v-if="formData.files.length">
      <p class="width40 paddingR20 pull-left text-right">附件 : </p>
      <div class="marginL60 paddingT1">
        <p  v-for="(iterm,index) in formData.files" :key="index">
          <i class="fa fa-paperclip"></i>
          <a :href="iterm.attachment" class="link">{{iterm.attachmentName}}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      api_msg_detail:'/pmpheep/material/extra/detail',
      formData:{
        materialId:'',
        title:'',
        content:'',
        image:[],
        files:[],
      },
      materialData:{},
    }
  },
  methods:{
    /**
     * 获取通知内容
     */
    getNotice(){
      this.$axios.get(this.api_msg_detail,{params:{
        materialId: this.formData.materialId
      }}).then(response=> {
        let res = response.data
        if (res.code == '1') {
          let content = '';
          this.formData.title = res.data.materialName.materialName;
          //设置显示图片
          this.formData.image=res.data.materialNoticeAttachments?res.data.materialNoticeAttachments:[];
          //设置文件
          this.formData.files=res.data.materialNoteAttachments?res.data.materialNoteAttachments:[];
          res.data.materialContacts=res.data.materialContacts?res.data.materialContacts:[];
          if(res.data.content){
            content=res.data.content;
          }else{
            //简介
            content += `<p>简介：${res.data.materialExtra?res.data.materialExtra.notice:''}</p>`;
            content += `<p></p>`;
            //邮寄地址
            content += `<p>邮寄地址：${res.data.materialName.mailAddress}</p>`;
            content += `<p></p>`;
            //联系人
            let contactsHtml = '';
            for(let i = 0, len = res.data.materialContacts.length; i < len; i++){
              if(i==0){
                contactsHtml+=`<p>联&nbsp;系&nbsp;人：${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
              }else{
                contactsHtml+=`<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
              }
            }
            content+=contactsHtml;
            content += `<p></p>`;
            //备注
            content+=`<p>备注：${res.data.materialExtra?res.data.materialExtra.note:''}</p>`;
          }
          this.formData.content = content;

          this.materialData = res.data;
        }
      })
        .catch(e=>console.log(e))
    }
  },
  mounted() {
    console.log(this.$route);
      this.formData.materialId = this.$route.params.materialId;
      this.getNotice()
    }
}
</script>
<style scoped>
  .material-notice{
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 30px;
    color:#000;
  }
  .material-notice p,.fileLink p{min-height: 19px;margin: 5px 0;}
  .material-notice-title{
    font-size: 24px;
    color: #333333;
  }
  .material-notice-time{
    color: #bdbdbd;
    padding-top: 10px;
  }
  .material-notice p{
    margin: 5px 0;
    min-height: 19px;
  }
  .material-notice-image{
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;
  }
</style>

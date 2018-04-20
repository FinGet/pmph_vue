<template>
  <div>
       <el-dialog
     title=""
     :visible.sync="contentDetailVisible"
     size="large">
       <div style="padding:0 10%;">
        <h5 class="previewTitle text-center">{{contentDetailData.cmsContent.title}}</h5>
         <p class="senderInfo text-center paddingT10">
      <span class="marginR10">{{contentDetailData.listObj.categoryName}}</span>
      <span>{{$commonFun.formatDate(contentDetailData.listObj.authDate)?$commonFun.formatDate(contentDetailData.listObj.authDate):'2017-11-14 10:17:52'}}</span>
       </p>
       <el-form label-width="100px">
          <el-form-item label="摘要：">
             <p>{{contentDetailData.cmsContent.summary}}</p>
         </el-form-item>
         <el-form-item label="关键字：">
             {{contentDetailData.cmsContent.keyword}}
         </el-form-item>
         <el-form-item label="内容：">
           <div style="margin:0 auto;width:800px;">
             <p v-html="contentDetailData.content.content"></p>
           </div>
         </el-form-item>
         <el-form-item label="附件：">
              <p type="text" style="color:#337ab7" v-for="item in contentDetailData.cmsExtras" :key="item.id">{{item.attachmentName}}</p>
         </el-form-item>
       </el-form>
        </div>
        <div style="width:100%;overflow:hidden">
            <div class="center_box">
            <el-button type="primary">审核通过</el-button>
            <el-button type="danger">审核不通过</el-button>
            <el-button type="primary" @click="editContent(contentDetailData.listObj)">修改</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<style scoped>

</style>
<script type="text/javascript">
export default {
  data() {
    return {
     contentDetailVisible:false,
    };
  },
  props:["contentDetailData","showContentDetail","editContent"],
  computed:{
  },
  watch:{
    showContentDetail(val){
        this.contentDetailVisible=val;
    }
  },
  methods:{

  }
};
</script>

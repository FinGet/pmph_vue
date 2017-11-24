<template>
    <div class="info_detail">
        <el-form label-width="70px"  label-position="left">
            <el-form-item label="发布者：">
                <p class="grey_p">任旭</p>
                <div class="info_content">
                    <h3>{{materialName}}</h3>
                    <i>截止日期：2017年2月11日</i>
                    <span>邮寄地址：北京市朝阳区潘家园南里19号 人卫大厦B座，人民卫生出版社 继续教育部 海珊（收）邮编100021</span>
                    <p v-html="materialExtra.notice">
                    </p>
                    <img src="http://119.254.226.115/pmph_imesp/upload/notice_introduction/1709/20170914173421006.png" alt="">
                </div>
            </el-form-item>
            <el-form-item>
               <el-form-item label="联系人：" >
                <p class="grey_p" v-for="item in materialContacts" :key="item.id">{{item.contactUserName}}（电话：{{item.contactPhone}}，Email：{{item.contactEmail}}）</p>
            </el-form-item>
            </el-form-item>
            <el-form-item>
               <el-form-item label="备注：" >
                    <p class="grey_p" v-html="materialExtra.note"></p>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                 <el-form-item label="教材通知附件：" >
                    <p class="appendix_p" v-for="item in materialNoticeAttachments" :key="item.id">
                        <i class="fa fa-paperclip" aria-hidden="true"></i>
                        <a>{{item.attachmentName}}</a>
                    </p>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                 <el-form-item label="教材备注附件：" >
                    <p class="appendix_p" v-for="item in materialNoteAttachments" :key="item.id">
                        <i class="fa fa-paperclip" aria-hidden="true"></i>
                        <a>{{item.attachmentName}}</a>
                    </p>
                </el-form-item>
            </el-form-item>
        </el-form>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            materialId:'',
            materialName:'',
            materialContacts:[],
            materialExtra:{},
            materialNoteAttachments:[],
            materialNoticeAttachments:[]
        }
    },
    methods:{
        getNotice(){
            this.$axios.get('pmpheep/material/extra/detail',{
                params:{
                    materialId: this.materialId
                }
            }).then(response=> {
                let res = response.data
                if (res.code == '1') {
                    this.materialName = res.data.materialName
                    this.materialContacts = res.data.materialContacts
                    this.materialExtra = res.data.materialExtra
                    this.materialNoteAttachments = res.data.materialNoteAttachments
                    this.materialNoticeAttachments = res.data.materialNoticeAttachments
                }
            })
        }
    },
    mounted() {
        this.materialId = this.$route.query.materialId
        this.getNotice()
    }
}
</script>
<style scoped>
.info_detail {
    width: 100%;
    border: 1px solid #e8e8e8;
    padding: 20px 15px;
    color: #1e1e1e;
    box-sizing: border-box;
}

.info_detail .grey_p {
    color: #626262;
    line-height: 30px;
    box-sizing: border-box;
    padding-right:90px;
}

.info_detail .grey_p:first-child {
    margin-top: 3px;
}

.info_detail .appendix_p a {
    color: #2773c1;
    cursor: pointer;
    margin-left: 5px;
}

.info_content {
    text-align: center;
    padding: 0 70px 0 0px;
    box-sizing: border-box;
}

.info_content h3 {
    font-size: 24px;
    font-weight: normal;
}

.info_content i {
    font-style: normal;
    color: #828282;
    font-size: 14px;
    display: block;
    line-height: 1;
    margin-top: 20px;
}

.info_content span {
    color: #4f4f4f;
    font-size: 14px;
}

.info_content p {
    margin-top: 50px;
    text-align: left;
    line-height: 30px;
}

.info_content img {
    max-width: 500px;
}
</style>

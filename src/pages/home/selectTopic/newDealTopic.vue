<template>
    <div class="new_deal_topic">
    <div class="top-nav">
			<div class="header_title_tips">
        <p >选题申报查看</p>
        <div class="tips_icon"></div>
      </div>
      <div class="pull-right back" @click="goBack">  <i class="el-icon-arrow-left"></i> 返回</div>
		</div>

       <div class="table_box">
          <h3>图书选题申报表</h3>
          <p class="table_top_p">选题号：<span></span></p>
          <!-- 12格总共  每格宽度约等于 8.4% -->
          <table border="1">

              <tr>
                  <td width="8.4%" rowspan="4" >图书书稿情况</td>
                  <td width="8.4%" >选题名称</td>
                  <td colspan="5">{{data.bookname}}</td>
                  <td width="8.4%" >读者对象</td>
                  <td width="20%" colspan="2">{{data.readType}}</td>
              </tr>
              <tr>
                  <td width="8.4%">选题来源</td>
                  <td colspan="10">
               <el-checkbox-group v-model="data.sourceType" :disabled="true">
                    <el-checkbox label="社策划" :disabled="true"></el-checkbox>
                    <el-checkbox label="编辑策划" :disabled="true"></el-checkbox>
                    <el-checkbox label="修订" :disabled="true" ></el-checkbox>
                    <el-checkbox label="离退休编审策划" :disabled="true"></el-checkbox>
                    <el-checkbox label="专家推荐" :disabled="true"></el-checkbox>
                    <el-checkbox label="上级交办" :disabled="true"></el-checkbox>
                    <el-checkbox label="作者投稿" :disabled="true"></el-checkbox>
               </el-checkbox-group>
                  </td>
              </tr>
              <tr>
                  <td>估计字数</td>
                  <td width="8.4%">{{data.wordNumber}}</td>
                  <td width="8.4%">估计图数</td>
                  <td width="16.8%">{{data.pictureNumber}}</td>
                  <td width="8.4%">预计交稿时间</td>
                  <td>{{$commonFun.formatDate(data.deadline,'yyyy-MM-dd')}}</td>
                  <td width="8.4%">学科及专业</td>
                  <td colspan="2">{{data.subject}}</td>
              </tr>
              <tr>
                  <td>图书类别</td>
                  <td colspan="5">
                   <el-checkbox-group v-model="data.typeName" :disabled="true">
                      <el-checkbox label="专著" :disabled="true"></el-checkbox>
                      <el-checkbox label="基础理论" :disabled="true"></el-checkbox>
                      <el-checkbox label="教材" :disabled="true"></el-checkbox>
                      <el-checkbox label="论文集" :disabled="true"></el-checkbox>
                      <el-checkbox label="图谱" :disabled="true"></el-checkbox>
                      <el-checkbox label="科普" :disabled="true"></el-checkbox>
                      <el-checkbox label="应用技术" :disabled="true"></el-checkbox>
                      <el-checkbox label="教辅" :disabled="true"></el-checkbox>
                      <el-checkbox label="工具书" :disabled="true"></el-checkbox>
                      <el-checkbox label="其他" :disabled="true"></el-checkbox>
                   </el-checkbox-group>
                  </td>
                  <td>级别</td>
                  <td colspan="2">
                    <el-checkbox-group v-model="data.rankType">
                      <el-checkbox label="高" :disabled="true"></el-checkbox>
                      <el-checkbox label="中" :disabled="true"></el-checkbox>
                      <el-checkbox label="低" :disabled="true"></el-checkbox>
                    </el-checkbox-group>
                  </td>
              </tr>
              <tr>
                  <td rowspan="2">修订书稿</td>
                  <td>原书名</td>
                  <td colspan="5">{{data.revisionBookname}}</td>
                  <td>原编著者</td>
                  <td>{{data.revisionAuthor}}</td>
              </tr>
              <tr>
                  <td>上版出版时间</td>
                  <td colspan="3">{{$commonFun.formatDate(data.revisionPublishDate,'yyyy-MM-dd')}}</td>
                  <td>累计印数</td>
                  <td>{{data.revisionPrint}}</td>
                  <td>库存数</td>
                  <td>{{data.revisionStock}}</td>
              </tr>
              <tr>
                  <td rowspan="2">翻译书稿</td>
                  <td>译稿原文名</td>
                  <td colspan="8">{{data.originalBookname}}</td>
              </tr>
              <tr>
                  <td>原著者</td>
                  <td>{{data.originalAuthor}}</td>
                  <td>国籍</td>
                  <td>{{data.nation}}</td>
                  <td>原出版者</td>
                  <td>{{data.originalPublisher}}</td>
                  <td>出版年代及版次</td>
                  <td>{{data.edition}}</td>
              </tr>
              <tr>
                  <td rowspan="6">作(译)者简况</td>
                  <td>主编姓名</td>
                  <td>{{data.realname}}</td>
                  <td>性别</td>
                  <td width="12.6%">
                     <el-radio class="radio" v-model="data.sex" :label="0" :disabled="true">男</el-radio>
                     <el-radio class="radio" v-model="data.sex" :label="1" :disabled="true">女</el-radio>
                  </td>
                  <td>年龄</td>
                  <td>{{data.price}}</td>
                  <td>行政职务</td>
                  <td>{{data.position}}</td>
              </tr>
              <tr>
                  <td>专业职务</td>
                  <td colspan="5">
                   <el-checkbox-group v-model="data.positionProfessionName" :disabled="true">
                    <el-checkbox label="中科院院士" :disabled="true"></el-checkbox>
                    <el-checkbox label="工程院院士" :disabled="true"></el-checkbox>
                    <el-checkbox label="博导" :disabled="true"></el-checkbox>
                    <el-checkbox label="硕导" :disabled="true"></el-checkbox>
                    <el-checkbox label="男" :disabled="true"></el-checkbox>
                    <el-checkbox label="正高" :disabled="true"></el-checkbox>
                    <el-checkbox label="副高" :disabled="true"></el-checkbox>
                    <el-checkbox label="中级" :disabled="true"></el-checkbox>
                   </el-checkbox-group>
                  </td>
                  <td>学历</td>
                  <td>
                    <el-checkbox-group v-model="data.degreeName" :disabled="true">
                      <el-checkbox label="博士" :disabled="true"></el-checkbox>
                      <el-checkbox label="硕士" :disabled="true"></el-checkbox>
                      <el-checkbox label="学士" :disabled="true"></el-checkbox>
                      <el-checkbox label="其他" :disabled="true"></el-checkbox>
                    </el-checkbox-group>
                  </td>
              </tr>
              <tr>
                  <td>工作单位</td>
                  <td colspan="5">{{data.workplace}}</td>
                  <td>电话</td>
                  <td>{{data.phone}}</td>
              </tr>
              <tr>
                  <td>通讯地址</td>
                  <td colspan="3">{{data.address}}</td>
                  <td>邮编</td>
                  <td>{{data.postcode}}</td>
                  <td>e-mail</td>
                  <td>{{data.email}}</td>
              </tr>
              <tr height="150px">
                  <td >主要专业成就及学术地位</td>
                  <td colspan="7">{{topicExtra.achievement}}</td>
              </tr>
              <tr height="100px">
                  <td>写作、外语水平</td>
                  <td colspan="7">{{topicExtra.ability}}</td>
              </tr>
              <tr>
                  <td :rowspan="writerData.length==0?2:writerData.length+1">主要参编者</td>
                  <td>姓名</td>
                  <td>性别</td>
                  <td>年龄</td>
                  <td colspan="2">工作单位</td>
                  <td>电话</td>
                  <td >职务职称</td>
                  <td>学历</td>
              </tr>
              <tr height="36px" v-for="(item,index) in writerData" :key="index">
                  <td>{{item.realname}}</td>
                  <td>{{item.sex==0?'男':'女'}}</td>
                  <td>{{item.price}}</td>
                  <td colspan="2">{{item.workplace}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.position}}</td>
                  <td>{{keySwitchVale(item.degree)}}</td>
              </tr>
              <tr height="36px" v-if="writerData.length==0">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colspan="2"></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                 <td rowspan="6">读者情况及印制预测</td>
                 <td>预计读者及购买力</td>
                 <td colspan="3">{{data.readerQuantity}}</td>
                 <td>作者购书</td>
                 <td colspan="3">{{data.purchase}}</td>
              </tr>
              <tr>
                 <td>可能的宣传方式</td>
                 <td colspan="3">{{data.campaign}}</td>
                 <td>可能的销售渠道</td>
                 <td colspan="3">{{data.salesChannel}}</td>
              </tr>
              <tr>
                 <td>图书生命周期</td>
                 <td colspan="3">{{data.lifecycle}}</td>
                 <td>作者赞助</td>
                 <td colspan="3">{{data.sponsorship}}</td>
              </tr>
              <tr>
                 <td>印刷、用纸建议</td>
                 <td colspan="3">{{data.printAdvise}}</td>
                 <td>定价建议</td>
                 <td colspan="3">{{data.priceAdvise}}</td>
              </tr>
              <tr>
                 <td>预计印数</td>
                 <td colspan="3">{{data.printNumber}}</td>
                 <td>成本估算</td>
                 <td colspan="3">{{data.cost}}</td>
              </tr>
              <tr>
                 <td>保底印数</td>
                 <td colspan="3">{{data.minPrintNumber}}</td>
                 <td>效益估算</td>
                 <td colspan="3">{{data.benefit}}</td>
              </tr>
              <tr>
                  <td>选题理由出版价值</td>
                  <td colspan="8">{{topicExtra.reason}}</td>
              </tr>
              <tr>
                  <td>主要内容与特色</td>
                  <td colspan="8">{{topicExtra.score}}</td>
              </tr>
              <tr>
                  <td :rowspan="topicSimilarBooks.length==0?2:topicSimilarBooks.length+1">外设同类书情况</td>
                  <td>书名</td>
                  <td>版次</td>
                  <td>作者</td>
                  <td>出版单位</td>
                  <td>开本</td>
                  <td>印数</td>
                  <td>定价</td>
                  <td>出版时间</td>
              </tr>
              <tr height="36px" v-for="(item,index) in topicSimilarBooks" :key="index">
                  <td>{{item.bookname}}</td>
                  <td>{{item.edition}}</td>
                  <td>{{item.author}}</td>
                  <td>{{item.publisher}}</td>
                  <td>{{item.booksize}}</td>
                  <td>{{item.printNumber}}</td>
                  <td>{{item.price}}</td>
                  <td>{{$commonFun.formatDate(item.publishDate,'yyyy-MM-dd')}}</td>
              </tr>
              <tr height="36px" v-if="topicSimilarBooks.length==0" >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </table>
            <el-form label-width="140px" :model="data" :rules="formRules"  class="form_box">
                    <el-form-item
                    label="选题会审核意见："
                    prop="authFeedback"
                    >
                    <el-input type="textarea" v-if="type=='check'"  :rows="4" v-model="data.authFeedback"></el-input>
                    <p v-else>{{data.authFeedback}}</p>
                    </el-form-item>
        </el-form>
       </div>
   <div class="bottom_box marginB50">
       <el-button type="primary" icon="arrow-left" @click="goBack">返回</el-button>
       <!-- <el-button type="danger" v-if="type!='check'" :disabled="isAccepted || isEditorHandling">退回分配人</el-button> -->
       <el-button type="primary" v-if="type=='check'&&isDirectorHandling&&isEditorHandling" :disabled="!isAccepted" @click="check(3)">通过</el-button>
       <el-button type="danger" v-if="type=='check'&&isDirectorHandling&&isEditorHandling" :disabled="!isAccepted" @click="check(2)">不通过</el-button>
   </div>
    </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      id: "", // 教材申报id
      type: "", // detail 、 check
      active: "", // 从哪个页面跳过来的
      routerName: "",
      data: {},
      writerData: [],
      topicSimilarBooks:[],
      topicExtra:{}, // 选题申报额外信息
      //	authFeedback: '',  // 审核意见
      isDirectorHandling: true, //是否由主任受理
      isEditorHandling: true, //是否由编辑受理
      isAccepted: true ,//编辑是否接受办理
      formRules:{
        authFeedback:[
          {min:0,max:200,message:'审核意见不能超过200个字符',trigger:'change,blur'}
        ]
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.active = this.$route.query.active || "";
    this.routerName = this.$route.query.name || null;
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("/pmpheep/topic/get/topicText", {
          params: {
            id: this.id
          }
        })
        .then(response => {
          let res = response.data;
          if (res.code == "1") {
            this.isDirectorHandling = res.data.isDirectorHandling; //是否由主任受理
            this.isEditorHandling = res.data.isEditorHandling; //是否由编辑受理
            this.isAccepted = res.data.isAccepted; //编辑是否接受办理
            this.data = res.data;
            this.data.authFeedback?this.data.authFeedback:'';
            this.topicExtra = res.data.topicExtra || {};
            this.writerData = res.data.topicWriters;
            this.topicSimilarBooks=res.data.topicSimilarBooks;
            //this.data.sourceType=['社策划']
            console.log(this.data);
          }
        });
    },
    keySwitchVale(key){
      let ret = '';
        switch(key) {
          case 0:ret =  '博士';break;
          case 1:ret = '硕士';break;
          case 2:ret = '学士';break;
          case 3:ret = '其他';break;
          default: ret='';
        }
      return ret;

    },
    // 审核
    check(authProgress) {
      this.$axios
        .put(
          "/pmpheep/topic/put/editorHandling",
          this.$initPostData({
            id: this.id,
            authProgress: authProgress, // 审核进度
            authFeedback: this.data.authFeedback || ''
          })
        )
        .then(response => {
          let res = response.data;
          if (res.code == '1') {
            this.$message.success("操作成功！");
            this.goBack();
          } else {
            this.$confirm(res.msg.msgTrim(), "提示",{
            	confirmButtonText: "确定",
            	cancelButtonText: "取消",
            	showCancelButton: false,
            	type: "error"
            });
          }
        })
        .catch(err => {
          this.$confirm("操作错误，请稍后再试！", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
        });
    },
    /**返回上一级 */
    goBack() {
      this.$router.push({
        name: this.routerName ? this.routerName : "选题申报审核",
        query: { active: this.active }
      });
    },
    textSize(){
      var val = this.data.authFeedback;
      if (val.length > 200) {
        this.$confirm('审核意见不能超过200个字', "提示",{
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	showCancelButton: false,
        	type: "error"
        });
      }
    }
  }
};
</script>
<style>
  .new_deal_topic{
    width:100%;
  }
.top-nav {
  /* float: left; */
  width: 100%;
  position: relative;
  height: 43px;
  background-color: rgb(238, 241, 246);
  border: 1px solid rgb(209, 217, 229);
  border-top: 0;
  box-sizing: border-box;
}
.top-nav .header_title_tips {
  margin-bottom: 15px;
  /* float:left; */
  color: #fff;
  position: absolute;
  left: -9px;
  top: 8px;
}
.top-nav .header_title_tips p {
  /* float:left; */
  background-color: #12806b;
  font-size: 16px;
  padding: 2px 20px 2px 15px;
  max-width: 545px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.top-nav .header_title_tips .tips_icon {
  border: 4px solid #475669;
  position: absolute;
  left: 0;
  bottom: -8px;
  border-left-color: #fff;
  border-bottom-color: #fff;
}
.back {
  height: 42px;
  background-color: rgb(238, 241, 246);
  line-height: 42px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
}
.table_box{
    width:80%;
    margin-left:10%;
    padding:20px 0;
    box-sizing: border-box;
}
.table_box h3{
    text-align: center;
    font-size: 22px;
    font-weight: normal;
}
.table_box .table_top_p{
   text-align: right;
   padding-right:50px;
   box-sizing: border-box;
}
.table_box table{
    width:100%;
    margin:10px 0;
  overflow-x: hidden;
}
.table_box table td{
    border:1px solid rgb(209, 217, 229);
    padding:5px ;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    word-wrap:break-word;
    line-height: 26px;
    text-align: center;
}
.new_deal_topic .bottom_box {
  margin-left: 50%;
  float: left;
  transform: translateX(-50%);
}
</style>

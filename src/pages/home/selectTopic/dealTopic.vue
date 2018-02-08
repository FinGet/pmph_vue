<template>
  <div class="deal_topic">
    <div class="top-nav">
			<div class="header_title_tips">
        <p >选题申报查看</p>
        <div class="tips_icon"></div>
      </div>
      <div class="pull-right back" @click="goBack">  <i class="el-icon-arrow-left"></i> 返回</div>
		</div>


    <div style="overflow:hidden;" class="marginT10">
      <p class="left_header_p">
          图书书稿情况
          <span></span>
      </p>
    </div>
    <el-form label-width="150px" class="form_box">
       <el-form-item label-width="0">
          <div class="percent50">
                <el-form-item
                label="选题名称："
              >
              <p>{{data.bookname}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="读者对象："
              >
              <p>{{data.readType}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="选题来源："
              >
              <p>{{data.sourceType}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="预计交稿日期："
              >
              <p>{{data.deadline}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="预估字数："
              >
              <p>{{data.wordNumber}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="预估图数："
              >
              <p>{{data.pictureNumber}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="学科及专业："
              >
              <p>{{data.subject}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="图书类别："
              >
              <p>{{data.typeName}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="级别："
              >
              <p>{{data.rankType}}</p>
              </el-form-item>
          </div>
       </el-form-item>
   </el-form>

    <div style="overflow:hidden;" class="marginT10">
      <p class="left_header_p">
          结算信息
          <span></span>
      </p>
    </div>
    <el-form label-width="150px" class="form_box">
       <el-form-item label-width="0">
          <div class="percent50">
                <el-form-item
                label="银行账户："
              >
              <p>{{data.accountNumber}}</p>
              </el-form-item>
          </div>
       </el-form-item>
   </el-form>

    <div style="overflow:hidden;" class="marginT10">
      <p class="left_header_p">
          选题情况
          <span></span>
      </p>
    </div>
    <el-form label-width="150px" class="form_box">
       <el-form-item label-width="0">
          <div class="percent50">
                <el-form-item
                label="(一)选题理由："
              >
              <p>{{topicExtra.reason}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="(二)出版价值："
              >
              <p>{{topicExtra.price}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="(三)主要内容："
              >
              <p>{{topicExtra.score}}</p>
              </el-form-item>
          </div>
       </el-form-item>
   </el-form>

  <div style="overflow:hidden;" class="marginT10">
      <p class="left_header_p">
          读者情况及印刷预测
          <span></span>
      </p>
    </div>
    <el-form label-width="150px" class="form_box">
       <el-form-item label-width="0">
          <div class="percent50">
                <el-form-item
                label="作者购书："
              >
              <p>{{data.purchase}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="作者赞助："
              >
              <p>{{data.sponsorship}}</p>
              </el-form-item>
          </div>
       </el-form-item>
   </el-form>

    <div style="overflow:hidden;">
      <p class="left_header_p">
          翻译书稿
          <span></span>
      </p>
    </div>
    <el-form label-width="150px" class="form_box">
       <el-form-item label-width="0">
          <div class="percent50">
                <el-form-item
                label="译稿原书名："
              >
              <p>{{data.originalBookname}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="原编著者："
              >
              <p>{{data.originalAuthor}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="国籍："
              >
              <p>{{data.nation}}</p>
              </el-form-item>
          </div>
          <div class="percent50">
                <el-form-item
                label="出版年代及版次："
              >
              <p>{{data.edition}}</p>
              </el-form-item>
          </div>
       </el-form-item>
   </el-form>
   <el-form label-width="150px" class="form_box">
     <div style="overflow:hidden;">
        <p class="left_header_p">
            编者情况
            <span></span>
        </p>
      </div>
    <el-form-item label-width="50px">
      <el-table :data="writerData" border class="form_table">
        <el-table-column
        label="姓名"
        prop="realname"
        width="120"
        ></el-table-column>
        <el-table-column
        label="性别"
        prop="sex"
        width="85"
        >
        <template scope="scope">
            <span>{{scope.row.sex==0?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="年龄"
        prop="price"
        width="90"
        ></el-table-column>
        <el-table-column
        label="行政职务"
        prop="position"
        ></el-table-column>
        <el-table-column
        label="工作单位"
        prop="workplace"
        ></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item
    label="指定编辑："
    >
      <p>{{data.realname}}</p>
    </el-form-item>
    <el-form-item
    label="审核意见："
    >
      <el-input type="textarea" v-if="type=='check'" :rows="4" v-model="data.authFeedback"></el-input>
      <p v-else>{{data.authFeedback}}</p>
    </el-form-item>
   </el-form>
   <div class="bottom_box marginB50">
       <el-button type="primary" icon="arrow-left" @click="goBack">返回</el-button>
       <!-- <el-button type="danger" v-if="type!='check'" :disabled="isAccepted || isEditorHandling">退回分配人</el-button> -->
       <el-button type="primary" v-if="type=='check'&&isDirectorHandling&&isEditorHandling" :disabled="!isAccepted" @click="check(3)">通过并提交ERP</el-button>
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
      topicExtra:{}, // 选题申报额外信息
      //	authFeedback: '',  // 审核意见
      isDirectorHandling: true, //是否由主任受理
      isEditorHandling: true, //是否由编辑受理
      isAccepted: true //编辑是否接受办理
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
          }
        });
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
            this.$message.error(res.msg.msgTrim());
          }
        })
        .catch(err => {
          this.$message.error("操作错误，请稍后再试！");
        });
    },
    /**返回上一级 */
    goBack() {
      this.$router.push({
        name: this.routerName ? this.routerName : "选题申报审核",
        query: { active: this.active }
      });
    }
  }
};
</script>
<style scoped>
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
.deal_topic .left_header_p {
  padding: 0 30px;
  line-height: 30px;
  float: left;
  background-color: #12806b;
  color: #fff;
  position: relative;
  z-index: 1;
}
.deal_topic .left_header_p span {
  height: 0px;
  display: block;
  width: 0px;
  background-color: #fff;
  border: 15px #fff solid;
  border-bottom-color: #fff;
  border-left-color: #12806b;
  border-right-color: #fff;
  position: absolute;
  z-index: 9;
  right: -25px;
  top: 0;
}
.deal_topic .form_box {
  padding: 20px 100px 20px 0px;
}
.deal_topic .form_box .percent50 {
  width: 50%;
  float: left;
}
.deal_topic .form_box .form_table {
  margin-top: 20px;
  box-sizing: border-box;
}
.deal_topic .bottom_box {
  margin-left: 50%;
  float: left;
  transform: translateX(-50%);
}
</style>

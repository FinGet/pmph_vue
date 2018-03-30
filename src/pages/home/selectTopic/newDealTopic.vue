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
          <p class="table_top_p">选题号：<span>2312312</span></p>
          <!-- 12格总共  每格宽度约等于 8.4% -->
          <table border="1">
              
              <tr>
                  <td width="8.4%" rowspan="4" >图书书稿情况</td>
                  <td width="8.4%" >选题名称</td>
                  <td colspan="5"> </td>
                  <td width="8.4%" >读者对象</td>
                  <td width="20%" colspan="2"></td>
              </tr>
              <tr>
                  <td width="8.4%">选题来源</td>
                  <td colspan="10">
                    <el-checkbox >社策划</el-checkbox>
                    <el-checkbox >编辑策划</el-checkbox>
                    <el-checkbox >修订</el-checkbox>
                    <el-checkbox >离退休编审策划</el-checkbox>
                    <el-checkbox >专家推荐</el-checkbox>
                    <el-checkbox >上级交办</el-checkbox>
                    <el-checkbox >作者投稿</el-checkbox>
                  </td>
              </tr>
              <tr>
                  <td>估计字数</td>
                  <td></td>
                  <td width="8.4%">估计图数</td>
                  <td></td>
                  <td width="8.4%">预计交稿时间</td>
                  <td></td>
                  <td width="8.4%">学科及专业</td>
                  <td colspan="2"></td>
              </tr>
              <tr>
                  <td>图书类别</td>
                  <td colspan="5">
                      <el-checkbox >专著</el-checkbox>
                      <el-checkbox >基础理论</el-checkbox>
                      <el-checkbox >教材</el-checkbox>
                      <el-checkbox >论文集</el-checkbox>
                      <el-checkbox >图谱</el-checkbox>
                      <el-checkbox >科普</el-checkbox>
                      <el-checkbox >应用技术</el-checkbox>
                      <el-checkbox >教辅</el-checkbox>
                      <el-checkbox >工具书</el-checkbox>
                      <el-checkbox >其他</el-checkbox>
                  </td>
                  <td>级别</td>
                  <td colspan="2">
                      <el-checkbox >高</el-checkbox>
                      <el-checkbox >中</el-checkbox>
                      <el-checkbox >初</el-checkbox>
                  </td>
              </tr>
              <tr>
                  <td rowspan="2">修订书稿</td>
                  <td>原书名</td>
                  <td colspan="5"></td>
                  <td>原编著者</td>
                  <td></td>
              </tr>
              <tr>
                  <td>上版出版时间</td>
                  <td colspan="3"></td>
                  <td>累计印数</td>
                  <td></td>
                  <td>库存数</td>
                  <td></td>
              </tr>
              <tr>
                  <td rowspan="2">翻译书稿</td>
                  <td>译稿原文名</td>
                  <td colspan="8"></td>
              </tr>
              <tr>
                  <td>原著者</td>
                  <td></td>
                  <td>国籍</td>
                  <td></td>
                  <td>原出版者</td>
                  <td></td>
                  <td>出版年代及版次</td>
                  <td></td>
              </tr>
              <tr>
                  <td rowspan="6">作(译)者简况</td>
                  <td>主编姓名</td>
                  <td></td>
                  <td>性别</td>
                  <td width="12.6%">
                     <el-checkbox >男</el-checkbox>
                     <el-checkbox >女</el-checkbox> 
                  </td>
                  <td>年龄</td>
                  <td></td>
                  <td>行政职务</td>
                  <td></td>
              </tr>
              <tr>
                  <td>专业职务</td>
                  <td colspan="5">
                    <el-checkbox >中科院院士</el-checkbox>
                    <el-checkbox >工程院院士</el-checkbox>
                    <el-checkbox >博导</el-checkbox>
                    <el-checkbox >硕导</el-checkbox>
                    <el-checkbox >男</el-checkbox>
                    <el-checkbox >正高</el-checkbox>
                    <el-checkbox >副高</el-checkbox>
                    <el-checkbox >中级</el-checkbox>
                  </td>
                  <td>学历</td>
                  <td>
                      <el-checkbox >博士</el-checkbox>
                      <el-checkbox >硕士</el-checkbox>
                      <el-checkbox >学士</el-checkbox>
                      <el-checkbox >其他</el-checkbox>
                  </td>
              </tr>
              <tr>
                  <td>工作单位</td>
                  <td colspan="5"></td>
                  <td>电话</td>
                  <td></td>
              </tr>
              <tr>
                  <td>通讯地址</td>
                  <td colspan="3"></td>
                  <td>邮编</td>
                  <td></td>
                  <td>e-mail</td>
                  <td></td>
              </tr>
              <tr height="150px">
                  <td >主要专业成就及学术地位</td>
                  <td colspan="7"></td>
              </tr>
              <tr>
                  <td>写作、外语水平</td>
                  <td colspan="7"></td>
              </tr>
          </table>
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
    },
    textSize(){
      var val = this.data.authFeedback;
      if (val.length > 200) {
        this.$message.error('审核意见不能超过200个字');
      }
    }
  }
};
</script>
<style>
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
    margin-top:10px;
}
.table_box table td{
    border:1px solid rgb(209, 217, 229);
    padding:5px ;
    box-sizing: border-box;
    line-height: 26px;
    text-align: center;
}
</style>

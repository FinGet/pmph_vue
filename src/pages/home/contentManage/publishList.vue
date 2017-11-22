<template>
  <div class="publish_list" >
      <el-tabs type="border-card">
  <el-tab-pane label="内容">
      <p class="header_p">
           
          <el-input placeholder="输入文章标题" class="input" v-model.trim="searchTitle"></el-input>
          <span>审核状态：</span>
          <el-select v-model="selectValue" clearable  style="width:186px" class="input" placeholder="全部">
           <el-option
             v-for="item in selectOp"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             >
         </el-option>
         </el-select>
         <el-button type="primary" icon="search" @click="getPublicList()">搜索</el-button>
         <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容',query:{columnId:1}})">发布新内容</el-button>
      </p>
      <el-table :data="tableData" class="table-wrapper" border style="margin:15px 0;">
            <el-table-column
                label="文章标题"
                >
                <template scope="scope">
                    <el-button type="text" @click="contentDetail(scope.row)">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <!-- 管理员才予以显示 -->
            <el-table-column
                prop="username"
                label="作者"
                width="90"
                v-if="isAdmin"
                >
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="168"
                >
                <template scope="scope">
                    {{$commonFun.formatDate(scope.row.gmtCreate)}}
                </template>
            </el-table-column>
            <el-table-column
                label="审核时间"
                width="168"
                >
                <template scope="scope">
                    {{$commonFun.formatDate(scope.row.authDate)}}
                </template>
            </el-table-column>
            <el-table-column
                label="审核状态"
                width="110"
                >
                <template scope="scope">
                    <p v-if="scope.row.authStatus==0">待审核</p>
                    <p v-if="scope.row.authStatus==1">已退回</p>
                    <p v-if="scope.row.authStatus==2">已通过</p>
                </template>
            </el-table-column> 
            <el-table-column
                label="相关统计"
                width="190"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="赞" placement="bottom">
                        <i class="fa fa-thumbs-o-up table_i" >{{scope.row.likes}}</i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="阅" placement="bottom">
                        <i class="fa fa-book table_i">{{scope.row.clicks}}</i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="评" placement="bottom">
                        <i class="fa fa-comment table_i">{{scope.row.comments}}</i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="藏" placement="bottom">
                        <i class="fa fa-star-o table_i">{{scope.row.bookmarks}}</i>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="120"
                >
                <template scope="scope">
                    <!-- <el-button type="text" :disabled="scope.row.isPublished"  @click="publishContent(scope.row)">发布</el-button> -->
                    <el-button type="text" :disabled="scope.row.authStatus!=0" @click="editContent(scope.row)">修改</el-button>
                    <!-- <el-button type="text" @click="hideContent(scope.row)">隐藏</el-button> -->
                    <el-button type="text"@click="deleteContent(scope.row)">删除</el-button>
                </template>
            </el-table-column>

      </el-table>
      <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

    <!-- 文章查看界面 -->
    <el-dialog
     title=""
     :visible.sync="showContentDetail"
     size="large">
       <div style="padding:0 10%;">
        <h5 class="previewTitle text-center">{{contentDetailData.cmsContent.title}}</h5>
         <p class="senderInfo text-center paddingT10">
      <span class="marginR10">{{contentDetailData.listObj.categoryName}}</span>
      <span>{{contentDetailData.listObj.authDate?contentDetailData.listObj.authDate:'2017-11-14 10:17:52'}}</span>
       </p>
       <el-form label-width="55px">

         <el-form-item label="" label-width="0">
             <p v-html="contentDetailData.content.content"></p>
         </el-form-item>
         <el-form-item label="附件：">
              <a type="text" :href="'/pmpheep'+item.attachment" style="color:#337ab7" v-for="item in contentDetailData.cmsExtras" :key="item.id">{{item.attachmentName}}</a>
         </el-form-item>
       </el-form>
        </div>
        <div style="width:100%;overflow:hidden">
            <div class="center_box">
            <el-button type="primary":disabled="contentDetailData.listObj.authStatus!=0"  @click="examineContent(contentDetailData.listObj,2)" >通过</el-button>
            <el-button type="danger" :disabled="contentDetailData.listObj.authStatus!=0"  @click="examineContent(contentDetailData.listObj,1)" >退回</el-button>
            <el-button type="primary" :disabled="contentDetailData.listObj.authStatus!=0"  @click="editContent(contentDetailData.listObj)">修改</el-button>
            </div>
        </div>
    </el-dialog>
  </el-tab-pane>
  <el-tab-pane label="评论">
      <p class="header_p">
          <!-- <el-cascader
            :options="options"
            v-model="selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange"> -->
          </el-cascader>
          <span style="margin-left:10px;">文章标题：</span>
          <el-input placeholder="输入内容标题" class="input"></el-input>
          <span style="margin-left:10px;">姓名/账号：</span>
          <el-input placeholder="输入姓名/账号" class="input"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>

            <el-button type="danger" style="float:right;" :disabled="!isCommentSelected">批量删除</el-button>
      </p>
      <el-table :data="commentTableData" class="table-wrapper" @selection-change="commentSelectChange" border style="margin:15px 0;">
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                label="评论内容"
                >
                <template scope="scope">
                   <a href="">[{{scope.row.name}}]在[{{scope.row.title}}]下的评论</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="creatTime"
                label="创建时间"
                width="165"
                >
            </el-table-column>
            <el-table-column
                label="审核状态"
                width="110"
                >
                <template scope="scope">
                    <p v-if="scope.row.authStatus==0">待审核</p>
                    <p v-if="scope.row.authStatus==1">已退回</p>
                    <p v-if="scope.row.authStatus==2">已通过</p>
                </template>
            </el-table-column> 
            <el-table-column
                label="原文链接"
                width="95"
                >
                <template scope="scope">
                      <el-button type="text">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
                >
                <template scope="scope">
                    <el-button type="text">通过</el-button>
                    <!-- <el-button type="text">退回</el-button> -->
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>

      </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        @size-change="commentHandleSizeChange"
        @current-change="commentHandleCurrentChange"
        :current-page="comPageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="comPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="comDataTotal">
      </el-pagination>
    </div>
  </el-tab-pane>
</el-tabs>


  </div>
</template>
<style scoped>
.publish_list .header_p {
  overflow: hidden;
}
.publish_list .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.publish_list .table_i {
  margin-right: 10px;
}
.publish_list .grey_icon {
  color: #999;
  cursor: pointer;
}
.publish_list .active_green {
  color: #13ce66;
}
.publish_list .active_orange {
  color: rgb(254, 215, 79);
}
.publish_list .active_blue {
  color: #20a0ff;
}
.publish_list .active_red {
  color: #ff4949;
}
.publish_list .active_yellow {
  color: #f7ba2a;
}
.publish_list .active_hide {
  color: #58b7ff;
}
.previewTitle {
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.publish_list .center_box {
  float: left;
  margin-left: 50%;
  transform: translateX(-50%);
}
.publish_list .el-tabs--border-card {
  border: 0;
  box-shadow: none;
}
</style>
<script type="text/javascript">
export default {
  data() {
    return {
      publicListUrl: "/pmpheep/cms/contents", //获取列表url
      editContentUrl: "/pmpheep/cms/content/", //修改查询url
      deleteContentUrl: "/pmpheep/cms/content/", //删除内容url
      examineUrl: "/pmpheep/cms/content/check", //审核内容
      selectOp: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "已退回"
        },
        {
          value: 2,
          label: "已通过"
        }
      ],
      showContentDetail: false,
      contentDetailData: {
        cmsContent: "",
        cmsExtras: "",
        listObj: "",
        content: ""
      },
      tableData: [],
      isAdmin: false,
      selectValue: "",
      currentPage: 1,
      searchTitle: "",
      pageTotal: 100,
      pageSize: 10,
      /* 评论*/
      options: [],
      selectedOptions: [],
      commentTableData: [],
      comPageSize: 10,
      comDataTotal: 20,
      comPageNumber: 1,
      commentSelectData: []
    };
  },
  computed: {
    isCommentSelected() {
      if (this.commentSelectData.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    /* 获取内容列表 */
    getPublicList() {
      this.$axios
        .get(this.publicListUrl, {
          params: {
            title: this.searchTitle,
            authStatus: this.selectValue,
            sessionId: this.$getUserData().sessionId,
            pageSize: this.pageSize,
            pageNumber: this.currentPage
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.pageTotal = res.data.data.total;
            this.tableData = res.data.data.rows;
          }
        });
    },
    /* 初始化是否管理员 */
    initIsAdmin() {
      this.isAdmin = this.$getUserData().userInfo.isAdmin;
    },
    /* 查看详情 */
    contentDetail(obj) {
      this.$axios
        .get(this.editContentUrl + obj.id + "/detail", {})
        .then(res => {
          if (res.data.code == 1) {
            this.contentDetailData = res.data.data;
            this.contentDetailData.listObj = obj;
            this.showContentDetail = true;
            console.log(this.contentDetailData);
          }
        });
    },
    /* 发布内容 */
    publishContent(obj) {
      this.$axios
        .put("/pmpheep/cms/content/" + obj.id + "/publish")
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message.success("文章已发布");
            this.getPublicList();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    /* 修改内容 */
    editContent(obj) {
      this.$axios
        .get(this.editContentUrl + obj.id + "/search", {})
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$router.push({
              name: "添加内容",
              params: res.data.data,
              query: { type: "edit", columnId: 1 }
            });
          }
        });
    },
    /* 审核内容 */
    examineContent(obj, status) {
      console.log(obj);
      this.$confirm(status==2?"通过后不能修改，确定审核通过该文章？":"确定退回该文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .put(
              this.examineUrl,
              this.$commonFun.initPostData({
                id: obj.id,
                authStatus: status,
                sessionId: this.$getUserData().sessionId
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message.success("审核成功");
                this.showContentDetail = false;
                this.getPublicList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /* 删除内容 */
    deleteContent(obj) {
      this.$confirm("确定删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(this.deleteContentUrl + obj.id + "/delete")
            .then(res => {
              if (res.data.code == 1) {
                this.getPublicList();
                this.$message.success("删除操作成功");
              } else {
                this.$message.error(res.data.msg.msgTrim());
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getPublicList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPublicList();
    },
    commentSelectChange() {
      this.commentSelectData = val;
    },
    handleChange() {},
    commentHandleSizeChange() {},
    commentHandleCurrentChange() {}
  },
  created() {
    this.getPublicList();
    this.initIsAdmin();
  }
};
</script>


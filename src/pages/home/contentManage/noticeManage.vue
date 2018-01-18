<template>
  <div class="content_exam">
           <p class="header_p">
          <!-- <el-cascader
            :options="options"
            :props="defaultProp"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader> -->
          <span>标题：</span>
          <el-input placeholder="输入公告标题" v-model.trim="title" class="input" @keyup.enter.native="search"></el-input>
          <span>发布状态：</span>
          <el-select v-model="status" style="width:186px"   class="input" placeholder="全部">
           <el-option
             v-for="item in selectOp"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             >
         </el-option>
         </el-select>
         <el-button type="primary" icon="search" @click="search">搜索</el-button>

            <!-- <el-button type="danger" style="float:right;" :disabled="!isContentSelected" @click="batchRemove">批量删除</el-button> -->
            <!-- <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容',query:{columnId:3}})">新建公告</el-button> -->
      </p>
      <el-table :data="tableData" class="table-wrapper" @selection-change="contentSelectChange"  border style="margin:15px 0;">
            <el-table-column
                label="公告标题"
                >
                <template scope="scope">
                   <p class="link" @click="contentDetail(scope.row)">{{scope.row.title}}</p>
                </template>
            </el-table-column>
            <el-table-column 
            prop="username"  
            label="作者" 
            width="110">
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间"
                width="175"
                >
              <template scope="scope">
                   {{scope.row.gmtCreate}}
                </template>
            </el-table-column>
            <el-table-column
                label="发布状态"
                width="100"
                >
                <template scope="scope">
                   {{scope.row.isPublished?'已发布':'未发布'}}
                </template>
            </el-table-column>
            <el-table-column
                label="发布时间"
                width="175"
                >
            <template scope="scope">
                   {{$commonFun.formatDate(scope.row.authDate)}}
                </template>   
            </el-table-column>
            <!-- <el-table-column
                label="被查看次数"
                width="120"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="阅" placement="bottom">
                        <i class="fa fa-book table_i">{{scope.row.clicks}}</i>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <el-table-column
                label="操作"
                width="90"
                >
                <template scope="scope">
                   <!--  <el-button type="text" @click="isPass(scope.row.id,2)">通过</el-button>
                    <el-button type="text" @click="isPass(scope.row.id,1)">拒绝</el-button> -->
                    <el-button type="text" :disabled="scope.row.isPublished"  @click="editContent(scope.row)">修改</el-button>
                    <!-- <el-button type="text" @click="deleted(scope.row.id)">删除</el-button> -->
                </template>
            </el-table-column>

      </el-table>
      <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="conDataTotal>conPageSize"
        @size-change="contentHandleSizeChange"
        @current-change="contentHandleCurrentChange"
        :current-page="conPageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="conPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="conDataTotal">
      </el-pagination>
    </div>
       <!-- 内容详情查看界面 -->
         <el-dialog
     title=""
     :visible.sync="showContentDetail"
     size="large">
       <div style="padding:0 10%;">
        <h5 class="previewTitle text-center">{{contentDetailData.cmsContent.title}}</h5>
         <p class="senderInfo text-center paddingT10">
      <span class="marginR10">{{contentDetailData.listObj.categoryName}}</span>
      <span>{{contentDetailData.listObj.gmtCreate?contentDetailData.listObj.gmtCreate:'2017-11-14 10:17:52'}}</span>
       </p>
       <el-form label-width="55px" v-if="contentDetailData.content">
         <el-form-item label-width="0">
             <p v-html="contentDetailData.content.content"></p>
         </el-form-item>
         <p style="width:100%" v-for="item in contentDetailData.MaterialNoteAttachment" :key="item.id">
         <img :src="'/pmpheep/file/notice/download/'+item.attachment" alt="" style="margin-left:50%;transform:translateX(-50%);">
         </p>
         <el-form-item label="附件：">
              <p v-for="item in contentDetailData.cmsExtras" :key="item.id"><a type="text" :href="item.attachment" style="color:#337ab7" >{{item.attachmentName}}</a></p>
         </el-form-item>
       </el-form>
        </div>
        <div style="width:100%;overflow:hidden" class="marginT20">
            <div class="center_box">
            <el-button type="primary" :disabled="contentDetailData.listObj.isPublished"  @click="editContent(contentDetailData.listObj)">修改</el-button>
            <el-button type="primary" :disabled="contentDetailData.listObj.isPublished"  @click="publishSubmit">发布</el-button>
            </div>
        </div>
    </el-dialog>

  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      editContentUrl: "/pmpheep/cms/content/", //修改查询url
      publishedUrl:'/pmpheep/cms/notice/update', //发布url
      options: [],
      defaultProp: {
        label: "categoryName",
        value: "id"
      },
      selectOp: [
        {
        value:'',
        label:'全部'
      },
      {
        value:true,
        label:'已发布'
      },
      {
        value:false,
        label:'未发布'
      }
      ],
      tableData: [],
      selectedOptions: [],
      contentSelectData: [],
      commentSelectData: [],
      selectValue: "",
      conPageNumber: 1,
      conPageSize: 30,
      menuId: 3,
      comPageNumber: 1,
      comPageSize: 30,
      title: "",
      status: "",
      conDataTotal: 0,
      comDataTotal: 0,
      showContentDetail: false,
      contentDetailData: {
        cmsContent: "",
        cmsExtras: "",
        listObj: "",
        content: ""
      }
    };
  },
  computed: {
    isContentSelected() {
      if (this.contentSelectData.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    isCommentSelected() {
      if (this.commentSelectData.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getContentLists();
  },
  methods: {
    /**
     * 初始化内容列表
     */
    getContentLists() {
      this.$axios
        .get("/pmpheep/cms/notice", {
          params: {
            sessionId: this.$getUserData().sessionId,
            pageNumber: this.conPageNumber,
            pageSize: this.conPageSize,
            title: this.title,
            isPublished: this.status,
            categoryId: this.menuId
          }
        })
        .then(response => {
          console.log(response);
          let res = response.data;
          this.conDataTotal = res.data.total;
          if (res.code == "1") {
            for (let i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].gmtCreate = this.$commonFun.formatDate(
                res.data.rows[i].gmtCreate
              );
            }
            this.tableData = res.data.rows;
            // console.log(this.tableData)
          }
        })
        .catch(e => {
          // this.$message.error('内容列表请求失败，请重试');
        });
    },
    /**
     * 删除
     */
    deleted(id) {
      this.$confirm("确定删除该公告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/pmpheep/cms/notice/" + id + "/update")
            .then(response => {
              let res = response.data;
              if (res.code == "1") {
                this.$message.success("删除成功");
                this.getContentLists();
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch(e => {
              this.$message.error("请求失败，请重试");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 内容页搜索
     */
    search() {
      this.conPageNumber = 1;
      this.conPageSize = 30;
      this.getContentLists();
    },
    /* 内容table切换选项 */
    contentSelectChange(val) {
      this.contentSelectData = val;
    },
    /* 评论table切换选项 */
    commentSelectChange(val) {
      this.commentSelectData = val;
    },
    handleChange(value) {
      this.menuId = value[0];
      // console.log(this.menuId)
    },
    /**
     * 内容页分页
     * @param val
     */
    contentHandleSizeChange(val) {
      this.conPageSize = val;
      this.conPageNumber = 1;
      this.getContentLists();
    },
    contentHandleCurrentChange(val) {
      this.conPageNumber = val;
      this.getContentLists();
    },
    /* 发布 */
    publishSubmit(){
       this.$confirm('发布后不能修改，确定发布该公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      /* 接口字段复制 */
         var editData=this.contentDetailData;
         var obj={};
          for(var item in editData.cmsContent){
            if(item.indexOf('gmt')!=0){
                if(typeof editData.cmsContent[item]!='boolean'){
                 obj[item]=editData.cmsContent[item]==null?'':editData.cmsContent[item]+'';
            }else{
                obj[item]=editData.cmsContent[item]==null?'':editData.cmsContent[item];
            }
            } 
          }
         obj.categoryId=parseInt(obj.categoryId);
         obj.isPublished=true;
          obj.content=editData.content.content;
         obj.attachment=[];
         obj.file=[];
         obj.scheduledTime='';
      this.$axios.put(this.publishedUrl,this.$commonFun.initPostData(obj)).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                   this.$message.success("发布成功");
                   this.getContentLists();
                   this.showContentDetail=false;
                }else {
                this.$message.error(res.data.msg);
              }
            })    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });          
        });
    },    
    /* 查看详情 */
    contentDetail(obj) {
      this.$axios
        .get(this.editContentUrl + obj.id + "/detail", {})
        .then(res => {
          if (res.data.code == 1) {
            this.contentDetailData = res.data.data;
            this.contentDetailData.listObj = obj;
            console.log(this.contentDetailData);
          }
        });
      this.showContentDetail = true;
    },
    /* 修改内容 */
    editContent(obj) {
      this.$axios
        .get(this.editContentUrl + obj.id + "/detail", {})
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$router.push({
              name: "添加内容",
              params: res.data.data,
              query: { type: "edit", columnId: 3 }
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.content_exam .header_p {
  overflow: hidden;
}
.content_exam .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.content_exam .table_i {
  margin-right: 10px;
}
.content_exam .grey_icon {
  color: #999;
  cursor: pointer;
}
.content_exam .active_green {
  color: #13ce66;
}
.content_exam .active_orange {
  color: rgb(254, 215, 79);
}
.content_exam .active_blue {
  color: #20a0ff;
}
.content_exam .active_red {
  color: #ff4949;
}
.content_exam .active_yellow {
  color: #f7ba2a;
}
.content_exam .active_hide {
  color: #58b7ff;
}
.content_exam .el-tabs--border-card {
  border: 0;
  box-shadow: none;
}
.previewTitle {
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.content_exam .center_box {
  float: left;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>


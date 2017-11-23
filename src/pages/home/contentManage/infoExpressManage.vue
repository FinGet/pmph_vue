<template>
  <div class="out_content_manage">
           <p class="header_p">
           <!-- <el-cascader
            :options="options"
            :clearable="true"
            class="input"
            :props="defaultType"
            :change-on-select="true"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader> -->
          <span>标题：</span>
          <el-input placeholder="输入信息快报标题" class="input" v-model.trim="contentParams.title" @keyup.enter.native="getOutContentList"></el-input>
          <span>发布状态：</span>
          <el-select v-model="contentParams.isPublished" clearable  style="width:186px" class="input" placeholder="全部">
           <el-option
             v-for="item in selectOp"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             >
         </el-option>
         </el-select>
         <el-button type="primary" icon="search" @click="getOutContentList">搜索</el-button>
         <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容',query:{columnId:2}})">新建信息快报</el-button>
      </p>
      <el-table :data="tableData" class="table-wrapper" border style="margin:15px 0;">
            <el-table-column
                label="信息快报标题"
                >
                <template scope="scope">
                  <el-button type="text" @click="contentDetail(scope.row)">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="作者"
                width="90"
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
                label="发布状态"
                width="100"
                >
                <template scope="scope">
                   {{scope.row.isPublished?'已发布':'未发布'}}
                </template>
            </el-table-column>         
            <el-table-column
                label="发布时间"
                width="165"
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
                width="120"
                >
                <template scope="scope">
                    <el-button type="text" :disabled="scope.row.isPublished"  @click="editContent(scope.row)">修改</el-button>
                    <!-- <el-button type="text" @click="hideContent(scope.row)">隐藏</el-button> -->
                    <el-button type="text" @click="deleteContent(scope.row)">删除</el-button>
                </template>
            </el-table-column>

      </el-table>
      <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="contentParams.pageNumber"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="contentParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
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
      <span>{{contentDetailData.listObj.authDate?contentDetailData.listObj.authDate:'2017-11-14 10:17:52'}}</span>
       </p>
       <el-form label-width="55px">
         <el-form-item label-width="0">
             <p v-html="contentDetailData.content.content"></p>
         </el-form-item>
         <!-- <el-form-item label="附件：">
              <p type="text" style="color:#337ab7" v-for="item in contentDetailData.cmsExtras" :key="item.id">{{item.attachmentName}}</p>
         </el-form-item> -->
       </el-form>
        </div>
        <div style="width:100%;overflow:hidden">
            <div class="center_box">
            <el-button type="primary" :disabled="contentDetailData.listObj.isPublished"  @click="editContent(contentDetailData.listObj)">修改</el-button>  
            <el-button type="primary" :disabled="contentDetailData.listObj.isPublished" @click="publishSubmit">发布</el-button>  
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.out_content_manage .el-tabs--border-card {
  border: 0;
  box-shadow: none;
}
.out_content_manage .header_p {
  overflow: hidden;
}
.out_content_manage .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.out_content_manage .table_i {
  margin-right: 10px;
}
.out_content_manage .grey_icon {
  color: #999;
  cursor: pointer;
}
.out_content_manage .active_green {
  color: #13ce66;
}
.out_content_manage .active_orange {
  color: rgb(254, 215, 79);
}
.out_content_manage .active_blue {
  color: #20a0ff;
}
.out_content_manage .active_red {
  color: #ff4949;
}
.out_content_manage .active_yellow {
  color: #f7ba2a;
}
.out_content_manage .active_hide {
  color: #58b7ff;
}
.previewTitle {
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.out_content_manage .center_box {
  float: left;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
<script type="text/javascript">
export default {
  data() {
    return {
      outContentUrl: "/pmpheep/cms/letters", //内容列表url
      publishedUrl:'/pmpheep/cms/letters/update',  //发布url
      deleteInfoUrl: "/pmpheep/cms/letters/content/", //信息快报删除url
      contentParams: {
        categoryId: "",
        title: "",
        isPublished: "",
        pageSize: 30,
        pageNumber: 1
      },
      totalPage: 10,
      options: [],
      defaultType: {
        value: "id",
        label: "categoryName"
      },
      selectOp: [
      {
        value:true,
        label:'已发布'
      },
      {
        value:false,
        label:'未发布'
      }
      ],
      tableData: [
        {
          id: 1,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          name: "张武",
          isPublish: true,
          isExam: true,
          isTop: true,
          isHot: true,
          recommend: true,
          isHide: true
        }
      ],
      commentTableData: [
        {
          id: 1,
          name: "张武",
          title: "文章标题11",
          column: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        },
        {
          id: 2,
          name: "冯举",
          title: "文章标题22",
          column: "医学随笔",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        },
        {
          id: 3,
          name: "王五",
          title: "文章标题3",
          column: "通知公告",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        }
      ],
      showContentDetail: false,
      contentDetailData: {
        cmsContent: "",
        cmsExtras: "",
        listObj: "",
        content: ""
      }
    };
  },
  methods: {
    /* 获取内容列表 */
    getOutContentList() {
      this.contentParams.sessionId = this.$getUserData().sessionId;
      this.$axios
        .get(this.outContentUrl, {
          params: this.contentParams
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.rows;
            this.totalPage = res.data.data.total;
          }
        });
    },
    /* 发布 */
    publishSubmit(){
       this.$confirm('发布后不能修改，确定发布该快报?', '提示', {
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
                   this.getOutContentList();
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
        .get(this.outContentUrl + "/content/" + obj.id + "/detail", {})
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
        .get(this.outContentUrl + "/content/" + obj.id + "/detail", {})
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$router.push({
              name: "添加内容",
              params: res.data.data,
              query: { type: "edit", columnId: 2 }
            });
          }
        });
    },
    /* 删除内容 */
    deleteContent(obj) {
      this.$confirm("确定删除该条信息快报?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(this.deleteInfoUrl + obj.id + "/delete")
            .then(res => {
              if (res.data.code == 1) {
                this.getOutContentList();
                this.$message.success("内容已删除");
              } else {
                tthis.$message.error(res.data.msg);
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
    /* 栏目选项改变 */
    handleChange(value) {
      this.contentParams.categoryId = value[value.length - 1] + "";
    },
    handleSizeChange(val) {
      this.contentParams.pageSize = val;
      this.contentParams.pageNumber = 1;
      this.getOutContentList();
    },
    handleCurrentChange(val) {
      this.contentParams.pageNumber = val;
      this.getOutContentList();
    }
  },
  created() {
    this.getOutContentList();
  }
};
</script>


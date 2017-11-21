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
          <el-input placeholder="输入内容标题" v-model.trim="title" class="input"></el-input>
          <el-select v-model="status" style="width:186px" class="input" placeholder="选择筛选状态">
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
            <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容',query:{columnId:3}})">新建公告</el-button>
      </p>
      <el-table :data="tableData" class="table-wrapper" @selection-change="contentSelectChange"  border style="margin:15px 0;">
            <el-table-column
                prop="id"
                label="ID"
                width="70"
                >
            </el-table-column>
            <el-table-column
                label="内容标题"
                >
                <template scope="scope">
                   <el-button type="text" @click="contentDetail(scope.row)">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="作者" width="110">

            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间"
                width="175"
                >
            </el-table-column>
<!--             <el-table-column
                label="原文链接"
                width="95"
                >
                <template scope="scope">
                      <el-button type="text">查看</el-button>
                </template>
            </el-table-column> -->

            <el-table-column
                label="操作"
                width="120"
                >
                <template scope="scope">
                   <!--  <el-button type="text" @click="isPass(scope.row.id,2)">通过</el-button>
                    <el-button type="text" @click="isPass(scope.row.id,1)">拒绝</el-button> -->
                    <el-button type="text" @click="editContent(scope.row)">修改</el-button>
                    <el-button type="text" @click="deleted(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>

      </el-table>
      <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="conDataTotal>20"
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
             <p v-html="contentDetailData.content.content"></p>
         </el-form-item>
         <el-form-item label="附件：">
              <p type="text" style="color:#337ab7" v-for="item in contentDetailData.cmsExtras" :key="item.id">{{item.attachmentName}}</p>
         </el-form-item>
       </el-form>
        </div>
        <div style="width:100%;overflow:hidden">
            <div class="center_box">
            <el-button type="primary" @click="editContent(contentDetailData.listObj)">修改</el-button>
            </div>
        </div>
    </el-dialog>

  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      editContentUrl:'/pmpheep/cms/content/',    //修改查询url
      options: [],
      defaultProp:{
        label: 'categoryName',
        value: 'id'
      },
      selectOp: [
        {
          value: 0,
          label: "是否发布"
        },
        {
          value: 1,
          label: "是否审核"
        },
        {
          value: 2,
          label: "是否置顶"
        },
        {
          value: 3,
          label: "是否热门"
        },
        {
          value: 4,
          label: "是否推荐"
        },
        {
          value: 5,
          label: "是否隐藏"
        }
      ],
      tableData: [],
      selectedOptions: [],
      contentSelectData:[],
      commentSelectData:[],
      selectValue: "",
      conPageNumber: 1,
      conPageSize:20,
      menuId:3,
      comPageNumber: 1,
      comPageSize:20,
      title:'',
      status:'',
      conDataTotal: 0,
      comDataTotal: 0,
      showContentDetail:false,
      contentDetailData:{
         cmsContent:'',
         cmsExtras:'',
         listObj:'',
         content:'',
      },
    };
  },
  computed: {
      isContentSelected(){
       if(this.contentSelectData.length>0){
           return true ;
       }else{
           return false;
       }
      },
      isCommentSelected(){
      if(this.commentSelectData.length>0){
          return true ;
      }else{
          return false ;
      }
      }
  },
  mounted(){
    this.getContentLists()
  },
  methods: {
    /**
     * 初始化内容列表
     */
    getContentLists(){
      this.$axios.get("/pmpheep/cms/notice",{
        params:{
          sessionId: this.$getUserData().sessionId,
          pageNumber: this.conPageNumber,
          pageSize: this.conPageSize,
          title: this.title,
          status: this.status,
          categoryId:this.menuId
        }
      }).then((response) => {
        let res = response.data
        this.conDataTotal = res.data.total
        if (res.code == '1') {
          for (let i=0; i< res.data.rows.length; i++) {
            res.data.rows[i].gmtCreate = this.$commonFun.formatDate(res.data.rows[i].gmtCreate)
          }
          this.tableData = res.data.rows;
          // console.log(this.tableData)
        }
      }).catch(e=>{
       // this.$message.error('内容列表请求失败，请重试');
      })
    },
    /**
     * 删除
     */
    deleted(id){
      this.$axios.delete('/pmpheep/cms/notice/'+id+'/update').then(response => {
        let res = response.data
        if(res.code == '1') {
          this.$message.success('删除成功');
          this.getContentLists()
        }else{
          this.$message.error('删除失败');
        }
      }).catch(e=>{
        this.$message.error('请求失败，请重试');
      })
    },
    /**
     * 内容页搜索
     */
    search(){
      this.getContentLists()
    },
      /* 内容table切换选项 */
    contentSelectChange(val){
       this.contentSelectData=val;
    },
      /* 评论table切换选项 */
    commentSelectChange(val){
        this.commentSelectData=val;
    },
    handleChange(value) {
      this.menuId = value[0]
      // console.log(this.menuId)
    },
    /**
     * 内容页分页
     * @param val
     */
    contentHandleSizeChange(val) {
      this.conPageSize= val;
      this.conPageNumber=1;
      this.getContentLists()
    },
    contentHandleCurrentChange(val) {
      this.conPageNumber = val
      this.getContentLists()
    },
    /**
     * 评论页分页
     * @param val
     */
    commentHandleSizeChange(val) {

    },
    commentHandleCurrentChange(){

    },
          /* 查看详情 */
      contentDetail(obj){
         this.$axios.get(this.editContentUrl+obj.id+'/detail',{
          }).then((res)=>{
              if(res.data.code==1){
                this.contentDetailData=res.data.data;
                this.contentDetailData.listObj=obj;
                console.log(this.contentDetailData);
              }
          })
           this.showContentDetail=true;
      },
    /* 修改内容 */
    editContent(obj){
      this.$axios.get(this.editContentUrl+obj.id+'/detail',{
          }).then((res)=>{
              console.log(res);
              if(res.data.code==1){
                 this.$router.push({name:'添加内容',params:res.data.data,query:{type:'edit',columnId:3}});
              }
          })
    }      

  }
}
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
  .previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.content_exam .center_box{
    float:left;
 margin-left:50%;
 transform: translateX(-50%);
}
</style>


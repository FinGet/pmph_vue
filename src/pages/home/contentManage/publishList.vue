<template>
  <div class="publish_list" >
      <p class="header_p">

          <el-input placeholder="输入文章标题" class="input" v-model="searchTitle"></el-input>
          <el-select v-model="selectValue" style="width:186px" class="input" placeholder="选择筛选状态">
           <el-option
             v-for="item in selectOp"
             :key="item.value"
             :label="item.label"
             :value="item.value"       
             >
         </el-option>
         </el-select>
         <el-button type="primary" icon="search" @click="getPublicList()">搜索</el-button>
         <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容'})">发布新内容</el-button>
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
                label="状态"
                width="80"
                >
                <template scope="scope">
                    {{scope.row.isPublished?'已发布':'未发布'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="所属栏目"
                width="96"
                >
            </el-table-column>
            <el-table-column
                label="发布时间"
                width="165"
                >
                <template scope="scope">
                    {{$commonFun.formatDate(scope.row.authDate)}}
                </template>
            </el-table-column>
            <el-table-column
                label="相关统计"
                width="240"
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
                label="状态"
                width="114"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
                        <i class="fa fa-chevron-up table_i grey_icon" :class="{active_blue:scope.row.isStick}" ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="热门" placement="bottom">
                        <i class="fa fa-fire table_i grey_icon" :class="{active_red:scope.row.isHot}" ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="推荐" placement="bottom">
                        <i class="fa fa-star table_i grey_icon" :class="{active_yellow:scope.row.isPromote}" ></i>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="190"
                >
                <template scope="scope">
                    <el-button type="text" :disabled="scope.row.isPublished"  @click="publishContent(scope.row)">发布</el-button>
                    <el-button type="text" @click="editContent(scope.row)">修改</el-button>
                    <el-button type="text" @click="hideContent(scope.row)">隐藏</el-button>
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
            <el-button type="primary">审核通过</el-button>
            <el-button type="danger">审核不通过</el-button>
            <el-button type="primary" @click="editContent(contentDetailData.listObj)">修改</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.publish_list .header_p{
    overflow: hidden;
}
.publish_list .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.publish_list .table_i{
    margin-right:10px;
}
.publish_list .grey_icon{
  color:#999;
  cursor: pointer;
}
.publish_list .active_green{
 color:#13ce66;
}
.publish_list .active_orange{
  
   color:rgb(254,215,79);
}
.publish_list .active_blue{
  color:#20a0ff;
}
.publish_list .active_red{
color:#ff4949;
}
.publish_list .active_yellow{
color:#f7ba2a;
}
.publish_list .active_hide{
color:#58b7ff;
}
.previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.publish_list .center_box{
    float:left;
 margin-left:50%;
 transform: translateX(-50%);
}
</style>
<script type="text/javascript">
export default {
  data() {
    return {
       publicListUrl:'/cms/contents',   //获取列表url
       editContentUrl:'/cms/content/',    //修改查询url
       deleteContentUrl:'/cms/content/',   //删除内容url
      selectOp:[
         {
             value:0,
             label:'是否发布',
         },
         {
             value:1,
             label:'是否审核',
         },
         {
             value:2,
             label:'是否置顶',
         },
         {
             value:3,
             label:'是否热门',
         },
         {
             value:4,
             label:'是否推荐',
         },
         {
             value:5,
             label:'是否隐藏',
         },
      ],
      showContentDetail:false,
      contentDetailData:{
         cmsContent:'',
         cmsExtras:'',
         listObj:'',
         content:'',
      },
      tableData:[],
      isAdmin:false,
      selectValue:'',
      currentPage:1,
      searchTitle:'',
      pageTotal:100,
      pageSize:10

    };
  },
  methods: {
      /* 获取内容列表 */
      getPublicList(){
         this.$axios.get(this.publicListUrl,{
               params:{
                   title:this.searchTitle,
                   status:this.selectValue,
                   sessionId:this.$getUserData().sessionId,
                   pageSize:this.pageSize,
                   pageNumber:this.currentPage
               }
         }).then((res)=>{
            console.log(res);
            if (res.data.code==1) {
                this.pageTotal=res.data.data.total;
                this.tableData=res.data.data.rows;
            }
         })
      },
      /* 初始化是否管理员 */
      initIsAdmin(){
        this.isAdmin=this.$getUserData().userInfo.isAdmin;
      },
      /* 查看详情 */
      contentDetail(obj){        
         this.$axios.get(this.editContentUrl+obj.id,{
          }).then((res)=>{
              if(res.data.code==1){
                this.contentDetailData=res.data.data;
                this.contentDetailData.listObj=obj;
                console.log(this.contentDetailData);
              }
          })
           this.showContentDetail=true;
      },
      /* 发布内容 */
      publishContent(obj){
           this.$axios.put('/cms/content/'+obj.id+'/publish').then((res)=>{
              console.log(res);
              if(res.data.code==1){
                  this.$message.success("文章已发布");
                  this.getPublicList();
              }else{
                  this.$message.error(res.data.msg);
              }
           })
      },
      /* 修改内容 */
      editContent(obj){
          this.$axios.get(this.editContentUrl+obj.id,{
          }).then((res)=>{
              console.log(res);
              if(res.data.code==1){
                 this.$router.push({name:'添加内容',params:res.data.data,query:{type:'edit'}});
              }
          })    
      },
      /* 隐藏内容 */
      hideContent(obj){
         this.$axios.put('/cms/content/'+obj.id+'/hide').then((res)=>{
           if(res.data.code==1){
              this.$message.success('内容已隐藏');
              this.getPublicList();
           }else{
                  this.$message.error(res.data.msg);
              }
         })
      },
      /* 删除内容 */
      deleteContent(obj){
         this.$axios.delete(this.deleteContentUrl+obj.id).then((res)=>{
             if(res.data.code==1){
                 this.getPublicList();
                 this.$message.success('删除操作成功');
             }
         })
      },
    handleSizeChange(val){
     this.pageSize=val;
     this.currentPage=1;
     this.getPublicList();
    },
    handleCurrentChange(val){
         this.currentPage=val;
         this.getPublicList();
    }
  },
  created(){
      this.getPublicList();
      this.initIsAdmin();
  }
};
</script>


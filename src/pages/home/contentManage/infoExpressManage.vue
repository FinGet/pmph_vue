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
          <el-input placeholder="输入文章标题" class="input" v-model="contentParams.title"></el-input>
          <el-select v-model="contentParams.status" style="width:186px" class="input" placeholder="选择筛选状态">
           <el-option
             v-for="item in selectOp"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             >
         </el-option>
         </el-select>
         <el-button type="primary" icon="search">搜索</el-button>
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
            <el-table-column
                label="发布时间"
                width="165"
                >
                <template scope="scope">
                    {{$commonFun.formatDate(scope.row.authDate)}}
                </template>
            </el-table-column>
            <el-table-column
                label="被查看次数"
                width="110"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="阅" placement="bottom">
                        <i class="fa fa-book table_i">{{scope.row.clicks}}</i>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="作者"
                width="90"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
                >
                <template scope="scope">
                    <el-button type="text" @click="editContent(scope.row)">修改</el-button>
                    <el-button type="text" @click="hideContent(scope.row)">隐藏</el-button>
                    <el-button type="text" @click="deleteContent(scope.row)">删除</el-button>
                </template>
            </el-table-column>

      </el-table>
      <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
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
.previewTitle{
  color: #14232e;
  font-size: 26px;
  font-weight: 500;
}
.out_content_manage .center_box{
    float:left;
 margin-left:50%;
 transform: translateX(-50%);
}
</style>
<script type="text/javascript">
export default {
  data() {
    return {
      outContentUrl:'/pmpheep/cms/manage',  //内容列表url
      editContentUrl:'/pmpheep/cms/content/',    //修改查询url
      columnListUrl: "/pmpheep/cms/set", //栏目列表Url
      contentParams:{
          categoryId:'',
          title:'',
          status:'',
          pageSize:10,
          pageNumber:1
      },
      options: [],
      defaultType: {
        value: "id",
        label: "categoryName"
      },
      selectOp: [
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
        }
      ],
      tableData: [
        {
          id: 1,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          name:'张武',
          isPublish: true,
          isExam: true,
          isTop: true,
          isHot: true,
          recommend: true,
          isHide: true
        },
        {
          id: 2,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          name:'冯举',
          isPublish: true,
          isExam: false,
          isTop: true,
          isHot: true,
          recommend: true,
          isHide: false
        },
        {
          id: 3,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          isPublish: false,
          isExam: true,
          isTop: true,
          isHot: false,
          recommend: true,
          isHide: true
        },
        {
          id: 4,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          isPublish: true,
          isExam: true,
          isTop: false,
          isHot: true,
          recommend: false,
          isHide: true
        }
      ],
      commentTableData:[
          {
            id:1,
            name:'张武',
            title:'文章标题11',
            column:'信息快报',
            creatTime: "2017/10/23  03:47:00",
            link:''
          },
          {
            id:2,
            name:'冯举',
            title:'文章标题22',
            column:'医学随笔',
            creatTime: "2017/10/23  03:47:00",
            link:''
          },
          {
            id:3,
            name:'王五',
            title:'文章标题3',
            column:'通知公告',
            creatTime: "2017/10/23  03:47:00",
            link:''
          },
      ],
      currentPage: 1,
      showContentDetail:false,
      contentDetailData:{
         cmsContent:'',
         cmsExtras:'',
         listObj:'',
         content:'',
      },

    };
  },
  methods: {
    /* 获取内容列表 */
    getOutContentList(){
      this.contentParams.sessionId=this.$getUserData().sessionId;
     this.$axios.get(this.outContentUrl,{
       params:this.contentParams
     }).then((res)=>{
       console.log(res);
       if(res.data.code==1){
         this.tableData=res.data.data.rows;
       }
     })
    },
    /* 获得栏目列表 */
    getColumnList() {
      this.$axios
        .get(this.columnListUrl, {
          params: {
            categoryName: ""
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.options = res.data.data;
          }
        });
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
      this.$axios.put('/pmpheep/cms/manage/content/'+obj.id+'/hide').then((res)=>{
        console.log(res);
        if(res.data.code==1){
          this.getOutContentList();
          this.$message.success('内容已隐藏');
        }else{
          this.$message.eroor(res.data.msg);
        }
      })
     },
     /* 删除内容 */
     deleteContent(obj){
      this.$axios.delete('/pmpheep/cms/manage/content/'+obj.id).then((res)=>{
        if(res.data.code==1){
          this.getOutContentList();
          this.$message.success('内容已删除');
        }else{
          tthis.$message.error(res.data.msg);
        }
      })
     },
    /* 栏目选项改变 */
    handleChange(value){
      this.contentParams.categoryId = value[value.length - 1] + "";
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  },
  created(){
    this.getOutContentList();
   this.getColumnList();
  }
};
</script>


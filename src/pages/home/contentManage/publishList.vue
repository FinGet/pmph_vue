<template>
  <div class="publish_list">
      <p class="header_p">
          <!-- <el-cascader
            :options="options"
            v-model="selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader> -->
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
            <!-- <el-table-column
                prop="id"
                label="ID"
                width="60"
                >
            </el-table-column> -->
            <el-table-column
                label="文章标题"
                >
                <template scope="scope">
                   <a href="">{{scope.row.title}}</a>
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
                prop="creatTime"
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
                    <el-button type="text">发布</el-button>
                    <el-button type="text" @click="editContent(scope.row)">修改</el-button>
                    <el-button type="text">隐藏</el-button>
                    <el-button type="text">删除</el-button>
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
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
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
</style>
<script type="text/javascript">
export default {
  data() {
    return {
       publicListUrl:'/cms/contents',   //获取列表url
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
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
      tableData:[
          {
              id:1,
              title:'关于开展“精准扶贫示范企业”试点工作的通知',
              comment:'信息快报',
              creatTime:'2017/10/23  03:47:00',
              isPublish:true,
              isExam:true,
              isTop:true,
              isHot:true,
              recommend:true,
              isHide:true
          },
          {
              id:2,
              title:'关于开展“精准扶贫示范企业”试点工作的通知',
              comment:'信息快报',
              creatTime:'2017/10/23  03:47:00',
              isPublish:true,
              isExam:false,
              isTop:true,
              isHot:true,
              recommend:true,
              isHide:false
          },
          {
              id:3,
              title:'关于开展“精准扶贫示范企业”试点工作的通知',
              comment:'信息快报',
              creatTime:'2017/10/23  03:47:00',
              isPublish:false,
              isExam:true,
              isTop:true,
              isHot:false,
              recommend:true,
              isHide:true
          },
          {
              id:4,
              title:'关于开展“精准扶贫示范企业”试点工作的通知',
              comment:'信息快报',
              creatTime:'2017/10/23  03:47:00',
              isPublish:true,
              isExam:true,
              isTop:false,
              isHot:true,
              recommend:false,
              isHide:true
          },
      ],
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
      /* 修改内容 */
      editContent(obj){
          
          this.$router.push({name:'添加内容',params:obj,query:{type:'edit'}});
      },
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    }
  },
  created(){
      this.getPublicList();
      this.initIsAdmin();
  }
};
</script>


<template>
  <div class="out_content_manage">
      <el-tabs type="border-card">
  <el-tab-pane label="内容">
           <p class="header_p">
          <el-input placeholder="输入文章标题" class="input"></el-input>
          <el-input placeholder="输入内容" class="input"></el-input>
          <el-select v-model="selectValue" style="width:186px" class="input" placeholder="选择筛选状态">
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
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="50"
                >
            </el-table-column>
            <el-table-column
                label="文章标题"
                >
                <template scope="scope">
                   <a href="">{{scope.row.title}}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="comment"
                label="所属栏目"
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="creatTime"
                label="发布时间"
                width="165"
                >
            </el-table-column>
            <el-table-column
                label="相关统计"
                width="205"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="赞" placement="bottom">
                        <i class="fa fa-thumbs-o-up table_i" >10</i>
                    </el-tooltip> 
                    <el-tooltip class="item" effect="dark" content="阅" placement="bottom">
                        <i class="fa fa-book table_i">10</i>
                    </el-tooltip>  
                    <el-tooltip class="item" effect="dark" content="评" placement="bottom">
                        <i class="fa fa-comment table_i">10</i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="藏" placement="bottom">
                        <i class="fa fa-star-o table_i">10</i>
                    </el-tooltip>     
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="115"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
                        <i class="fa fa-chevron-up table_i grey_icon" :class="{active_blue:scope.row.isTop}" ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="热门" placement="bottom">
                        <i class="fa fa-fire table_i grey_icon" :class="{active_red:scope.row.isHot}" ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="推荐" placement="bottom">
                        <i class="fa fa-star table_i grey_icon" :class="{active_yellow:scope.row.recommend}" ></i>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="审核人"
                width="90"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
                >
                <template scope="scope">
                    <el-button type="text">修改</el-button>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </el-tab-pane>
  <el-tab-pane label="评论">
             <p class="header_p">
           <span>内容标题：</span>
          <el-input placeholder="输入内容" class="input"></el-input>
          <span>评论者账号：</span>
          <el-input placeholder="输入评论者账号" class="input"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>
         <el-button type="primary" style="float:right;" @click="$router.push({name:'添加内容'})">发布新内容</el-button>
      </p>
      <el-table :data="commentTableData" class="table-wrapper" border style="margin:15px 0;">
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="50"
                >
            </el-table-column>
            <el-table-column
                label="文章标题"
                >
                <template scope="scope">
                   <a href="">[{{scope.row.name}}]在[{{scope.row.title}}]下的评论</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="column"
                label="所属栏目"
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="creatTime"
                label="创建时间"
                width="165"
                >
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
                    <el-button type="text">修改</el-button>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </el-tab-pane>
</el-tabs>
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
</style>
<script type="text/javascript">
export default {
  data() {
    return {
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
      selectValue: "",
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
};
</script>


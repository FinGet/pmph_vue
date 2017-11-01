<template>
  <div class="content_exam">
      <el-tabs type="border-card">
  <el-tab-pane label="内容">
           <p class="header_p">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
          <el-input placeholder="输入内容标题" class="input"></el-input>
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
         
            <el-button type="danger" style="float:right;" :disabled="!isContentSelected">批量删除</el-button>
      </p>
      <el-table :data="tableData" class="table-wrapper" @selection-change="contentSelectChange"  border style="margin:15px 0;">
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
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
                    <el-button type="text">通过</el-button>
                    <el-button type="text">拒绝</el-button>
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
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
          <span style="margin-left:10px;">内容标题：</span>
          <el-input placeholder="输入内容标题" class="input"></el-input>
          <span style="margin-left:10px;">评论者账号：</span>
          <el-input placeholder="输入账号" class="input"></el-input>
         <el-button type="primary" icon="search">搜索</el-button>
         
            <el-button type="danger" style="float:right;" :disabled="!isCommentSelected">批量删除</el-button>
      </p>
      <el-table :data="commentTableData" class="table-wrapper" @selection-change="commentSelectChange" border style="margin:15px 0;">
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="70"
                >
            </el-table-column>
            <el-table-column
                label="评论内容"
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
                    <el-button type="text">通过</el-button>
                    <el-button type="text">拒绝</el-button>
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
      tableData: [
        {
          id: 1,
          title: "关于开展“精准扶贫示范企业”试点工作的通知",
          comment: "信息快报",
          creatTime: "2017/10/23  03:47:00",
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
      commentTableData: [
        {
          id: 1,
          name: "张三",
          title: "测试文章标题",
          column: "信息快报",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        },
        {
          id: 2,
          name: "李四",
          title: "测试文章标题1",
          column: "医学随笔",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        },
        {
          id: 3,
          name: "王五",
          title: "测试文章标题33",
          column: "通知公告",
          creatTime: "2017/10/23  03:47:00",
          link: ""
        }
      ],
      selectedOptions: [],
      contentSelectData:[],
      commentSelectData:[],
      selectValue: "",
      currentPage: 1
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
  methods: {
      /* 内容table切换选项 */
    contentSelectChange(val){
       this.contentSelectData=val;
      },
      /* 评论table切换选项 */
    commentSelectChange(val){
        this.commentSelectData=val;
    },
    handleChange(value) {
      console.log(value);
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
}
</script>


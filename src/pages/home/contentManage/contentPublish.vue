<template>
  <div class="content_publish">
      <p class="header_p">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :clearable="true"
            class="input"
            placeholder="请选择栏目"
            @change="handleChange">
          </el-cascader>
          <el-input placeholder="输入文章标题" class="input"></el-input>
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
         <el-dropdown trigger="click" style="float:right;margin-left:10px;">
            <el-button type="primary">
             批量操作<i class="el-icon-caret-bottom el-icon--right"></i>
             </el-button>
           <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量删除</el-dropdown-item>
            <el-dropdown-item>批量审核</el-dropdown-item>
            <el-dropdown-item>批量推荐</el-dropdown-item>
            <el-dropdown-item>批量置顶</el-dropdown-item>
            <el-dropdown-item>批量热门</el-dropdown-item>
            <el-dropdown-item>批量隐藏</el-dropdown-item>
            <el-dropdown-item>批量发布</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
         <el-button type="primary" style="float:right;">添加内容</el-button>
      </p>
      <el-table :data="tableData" class="table-wrapper" border style="margin:15px 0;">
            <el-table-column
                type="selection"
                width="55">
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
                label="创建时间"
                width="165"
                >
            </el-table-column>
            <el-table-column
                label="相关统计"
                >
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="赞" placement="bottom">
                        <i class="fa fa-thumbs-o-up table_i" >10</i>
                    </el-tooltip> 
                    <el-tooltip class="item" effect="dark" content="阅" placement="bottom">
                        <i class="fa fa-book table_i">10</i>
                    </el-tooltip>  
                    <el-tooltip class="item" effect="dark" content="评" placement="bottom">
                        <i class="fa fa-commen-o table_i">10</i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="藏" placement="bottom">
                        <i class="fa fa-star-o table_i">10</i>
                    </el-tooltip>     
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="140"
                >
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
  </div>
</template>
<style scoped>
.content_publish .header_p{
    overflow: hidden;
}
.content_publish .header_p .input {
  width: 217px;
  margin-right: 10px;
}
.content_publish .table_i{
    margin-right:10px;
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
              creatTime:'2017/10/23  03:47:00'
          }
      ],
      selectedOptions: [],
      selectValue:'',
      currentPage:1,

    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    }
  }
};
</script>


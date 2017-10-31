<template>
  <div class="column_set">
    <p class="header_p">
        栏目名称：
        <el-input placeholder="请输入栏目名称" class="input"></el-input>
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button type="primary" style="float:right">删除</el-button>
        <el-button type="primary" style="float:right" @click="dialogVisible = true">新增栏目</el-button>  
    </p>
    <el-table :data="tableData" border class="table-wrapper" style="margin:15px 0;">
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
          prop="name"
          label="栏目名称"
       >
       <template scope="scope">
            <p :style="'text-indent:'+(scope.row.level-1)+'em;'">{{scope.row.name}}</p>
       </template>
       </el-table-column>
       <el-table-column
          prop="sort"
          label="排序"
          width="90"
       >
       </el-table-column>
       <el-table-column
          label="操作"
          width="195"
       >
       <template scope="scope">
            <el-button type="text">增加子栏目</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
       </template>
       </el-table-column>
    </el-table>

    <!-- 新增/修改弹框 -->
    <el-dialog
        title="编辑栏目"
        :visible.sync="dialogVisible"
        size="tiny"
    >
     <el-form :model="dialogForm" label-width="135px">
      <el-form-item label="栏目名称：">
          <el-input placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item label="上级栏目：">
          <el-cascader
            :options="options"
            v-model="dialogForm.selectedOptions"
            :clearable="true"
            style="width:100%"
            placeholder="请选择分类"
            @change="handleChange">
          </el-cascader>
      </el-form-item>
      <el-form-item label="是否后台类别：">
          <el-radio-group v-model="dialogForm.isBack">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="后台操作权限：" v-if="dialogForm.isBack">
             <el-select v-model="dialogForm.operaAuth" multiple placeholder="请选择" style="width:100%">
                    <el-option
                    v-for="item in authOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="是否需要审核：">
          <el-radio-group v-model="dialogForm.isNeedExam">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="审核角色：" v-if="dialogForm.isNeedExam">
             <el-select v-model="dialogForm.examRoles" multiple placeholder="请选择" style="width:100%">
                    <el-option
                    v-for="item in authOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="是否教材通知：">
          <el-radio-group v-model="dialogForm.isBookNotice">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="所属教材：" v-if="dialogForm.isBookNotice">
             <el-select v-model="dialogForm.belongBook"  placeholder="请选择" style="width:100%">
                    <el-option
                        v-for="item in authOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="是否显示摘要：">
          <el-radio-group v-model="dialogForm.isShowRemark">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示关键字：">
          <el-radio-group v-model="dialogForm.isShowKeyWord">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示作者：">
          <el-radio-group v-model="dialogForm.isShowAuthor">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否允许评论：">
          <el-radio-group v-model="dialogForm.isAllowComment">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示点赞数：">
          <el-radio-group v-model="dialogForm.isShowStar">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示收藏数：">
          <el-radio-group v-model="dialogForm.isShowCollect">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
      </el-form-item>
     </el-form>
   <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "一级栏目",
          sort: 1,
          level: 1
        },
        {
          id: 2,
          name: "   二级栏目",
          sort: 2,
          level: 2
        },
        {
          id: 3,
          name: "   三级栏目",
          sort: 3,
          level: 3
        },
        {
          id: 4,
          name: "一级栏目",
          sort: 4,
          level: 1
        }
      ],
      dialogVisible:false,
      dialogForm:{
         selectedOptions:[],
         isBack:'',
         operaAuth:[],
         isNeedExam:'',
         examRoles:[],
         isBookNotice:'',
         isShowRemark:'',
         belongBook:'',
         isShowKeyWord:'',
         isShowAuthor:'',
         isAllowComment:'',
         isShowStar:'',
         isShowCollect:''


      },
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
      authOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    };
  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
  }
};
</script>
<style scoped>
.column_set .header_p {
  overflow: hidden;
}
.column_set .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

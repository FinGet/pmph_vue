<template>
  <div class="writer">
    <el-row>
      <el-col :span="6">
        <div class="tree-title">
          <p>所属组织：</p>
        </div>
        <el-tree :data="data"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 node-key="id"
                 :default-expanded-keys="[1]"
        ></el-tree>
      </el-col>
      <el-col :span="17" :offset="1">
        <el-col>
          <span class="pull-left s-title">账号/姓名:</span>
          <el-col :span="4">
            <el-input placeholder="请输入用户名"></el-input>
          </el-col>
          <el-button type="primary" icon="search" class="marginL10">搜索</el-button>
          <el-button type="primary" @click="add">增加</el-button>
        </el-col>
        <el-col class="table-wrapper">
          <el-table
            class="marginT10"
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="姓名"
              width="80"
              prop="name">
            </el-table-column>
            <el-table-column
              prop="username"
              label="账号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色名称"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
            >
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <div class="pagination-wrapper">
            <el-pagination
              class="pull-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    props:['tableData','Multichoice'],
    data(){
      return {
        multipleSelection: [],
        dialogVisible:false,
        currentPage: 1,
        radio:'',
        data: [{
          id: 1,
          label: '人民卫生出版社',
          children: [{
            label: '医学学术编辑中心（期刊编辑出版社）',
            children: [{
              label: '期刊编辑部'
            },{
              label: '期刊编辑一部'
            },{
              label: '期刊编辑二部'
            },{
              label: '期刊编辑三部'
            }]
          },{
            label: '人卫电子音像公司'
          },{
            label: '药学中心'
          },{
            label: '智慧数字中心'
          },{
            label: '研发中心'
          },{
            label: '医学教育中心(医学教育研究中心)',
            children: [{
              label: '职业教育部（护理教育部）'
            },{
              label: '高等医学教育部'
            },{
              label: '继续教育部'
            }]
          },{
            label: '国际中心'
          },{
            label: '总编辑总经理办公室'
          },{
            label: '人卫健康传播中心',
            children: [{
              label: '健康传播综合部'
            },{
              label: '预防医学编辑部'
            },{
              label: '《生活与健康》编辑部'
            }]
          },{
            label: '中医院中心'
          },{
            label: '出版社科室1'
          }]
        }],
        form: {
          username:'',
          name: '',
          phone:'',
          email:'',
          role:'',
          use:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      // 选中数据将选中的数据赋值给multipleSelection
      handleSelectionChange(val){
        this.multipleSelection = val
        if (!this.Multichoice) {
          if (this.multipleSelection.length>1) {
            this.$message({
              message: `只能选择一个人`,
              type: 'warning'
            });
            this.multipleSelection = []
            this.$refs.multipleTable.clearSelection()
          }
        }
      },
      add() {
        this.$emit('add',this.multipleSelection)
      },
      // clear
      clear() {
        // console.log(2)
        this.multipleSelection = []
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
</script>
<style>
  .writer{
    width: 100%;
    box-sizing: border-box;
  }
  .writer .s-title{
    line-height: 36px;
    margin-right: 10px;
  }
  .tree-title{
    line-height: 36px;
    margin-bottom: 20px;
  }
</style>

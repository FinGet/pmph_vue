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
          <span class="pull-left s-title">用户名:</span>
          <el-col :span="4">
            <el-input placeholder="请输入用户名"></el-input>
          </el-col>
          <span class="pull-left s-title marginL10">姓名:</span>
          <el-col :span="4">
            <el-input placeholder="请输入姓名"></el-input>
          </el-col>
          <el-button type="primary" icon="search" class="marginL10">搜索</el-button>
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
              label="姓名"
              width="80"
              prop="name">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色名称"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
            >
            </el-table-column>
            <el-table-column
              prop="use"
              label="启用"
              align="center"
              width="80"
            >
              <template scope="scope">
                {{scope.row.use? '启用' : '停用'}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button type="text" @click="dialogVisible = true,modify(scope.$index, tableData)">修改</el-button>
                <el-button type="text">登录</el-button>
              </template>
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
    <el-dialog title="修改" :visible.sync="dialogVisible" @close="resetForm('form')" size="tiny">
      <el-form ref="form" :model="form" label-width="100px" class="padding20">
        <el-form-item label="用户代码:"
                      prop="username"
                      :rules="[
                        { required: true, message: '用户代码不能为空'}
                      ]"
        >
          <el-input v-model="form.username" placeholder="请输入您的用户代码"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:"
                      prop="name"
                      :rules="[
                        { required: true, message: '用户名不能为空'}
                      ]">
          <el-input v-model="form.name" placeholder="请输入您的用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户手机:"
                      prop="phone"
                      :rules="[
                        { required: true, message: '手机不能为空'},
                        { type: 'number', message: '手机号码必须为数字值'}
                      ]"
        >
          <el-input v-model.number="form.phone" type="phone" placeholder="请输入您的手机"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:"
                      prop="email"
                      :rules="[
                        { required: true, message: '邮箱不能为空'}
                      ]"
        >
          <el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户角色:"
                      prop="role"
                      :rules="[
                        { required: true, message: '用户角色不能为空'}
                      ]">
          <el-input v-model="form.role" placeholder="请输入您的手机"></el-input>
        </el-form-item>
        <el-form-item label="启用:">
          <el-select v-model="form.use" placeholder="是否启用">
            <el-option label="启用" value="true"></el-option>
            <el-option label="停用" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        multipleSelection: [],
        dialogVisible:false,
        currentPage: 1,
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
        },
        tableData:[
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'李四',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'张三',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'王二',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:false
          },
          {
            name:'赵武',
            username:'zs',
            email:'123@qq.com',
            role:'主任项目编辑',
            phone:'1383838438',
            use:true
          }
        ]
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
      },
      // 点击修改
      modify(index, data) {
        //this.form = data[index]
        for (var key in data[index]){
          this.form[key] = data[index][key]
          if (this.form.use){
            this.form.use = "启用"
          } else {
            this.form.use = "停用"
          }
        }
      },
      // 保存修改
      save() {
        console.log(this.form)
        this.dialogVisible = false
        this.$message({
          message: '恭喜你，修改成功！',
          type: 'success'
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
  .writer{
    padding: 15px 20px;
    width: 100%;
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

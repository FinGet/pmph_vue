<template>
  <div class="writer">
    <el-row>
      <el-col :span="6">
        <div class="tree-title">
          <p>所属组织：</p>
        </div>
        <el-tree :data="treeData"
                 expand-on-click-node="false"
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
            <el-input placeholder="请输入用户名" v-model="name" @keyup.enter.native="search"></el-input>
          </el-col>
          <el-button type="primary" icon="search" class="marginL10" @click="search">搜索</el-button>
        </el-col>
        <el-col class="table-wrapper">
          <el-table
            class="marginT10"
            ref="multipleTable"
            :data="usersData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              label="姓名"
              width="80"
              prop="realname">
            </el-table-column>
            <el-table-column
              prop="username"
              label="账号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
            >
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
            >
            </el-table-column>
            <el-table-column
              prop="handphone"
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
                {{scope.row.isDisabled? '启用' : '停用'}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button type="text" @click="dialogVisible = true,modify(scope.$index, usersData)">修改</el-button>
                <el-button type="text">登录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col v-if="dataTotal>20">
          <div class="pagination-wrapper">
            <el-pagination
              class="pull-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataTotal">
            </el-pagination>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-dialog title="修改" :visible.sync="dialogVisible" @close="resetForm('form')" size="tiny">
      <el-form ref="form" :model="form" label-width="100px" class="padding20">
        <el-form-item label="用户账号:"
                      prop="username"
                      :rules="[
                        { required: true, message: '用户代码不能为空'}
                      ]"
        >
          <el-input v-model="form.username" placeholder="请输入您的用户代码"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:"
                      prop="realname"
                      :rules="[
                        { required: true, message: '用户名不能为空'}
                      ]">
          <el-input v-model="form.realname" placeholder="请输入您的用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户手机:"
                      prop="handphone"
                      :rules="[
                        { required: true, message: '手机不能为空'},
                        { type: 'number', message: '手机号码必须为数字值'}
                      ]"
        >
          <el-input v-model.number="form.handphone" type="phone" placeholder="请输入您的手机"></el-input>
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
                      prop="roleName"
                      :rules="[
                        { required: true, message: '用户角色不能为空'}
                      ]">
          <el-select v-model="form.roleName" multiple placeholder="请选择">
            <el-option
              v-for="item in rolenames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用:">
          <el-select v-model="form.isDisabled" placeholder="是否启用">
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
        // 分页 当前页
        currentPage: 1,
        // 左侧树结构
        treeData: [],
        // 修改弹窗 表单
        form: {
          id: '',
          departmentName: '',
          email: '',
          handphone: '',
          isDisabled: '',
          name: '',
          note: '',
          path: '',
          realname: '',
          roleName: '',
          sort: '',
          username: ''
        },
        // element
        defaultProps: {
          children: 'sonDepartment',
          label: 'dpName'
        },
        // 数据总数
        dataTotal:0,
        // 用户列表
        usersData:[],
        name: '',
        path: '',
        pageNumber: 1,
        pageSize: 20,
        rolenames: [
          {
            value: '选项1',
            label: '系统管理员'
          },
          {
            value: '选项2',
            label: '其他用户'
          },
          {
            value: '选项3',
            label: '主任'
          },
          {
            value: '选项4',
            label: '项目编辑'
          },
          {
            value: '选项5',
            label: '数字编辑'
          }
        ]
      }
    },
    mounted() {
      this.getTree()
      this.getUsers()
    },
    methods:{
      /**
       * 请求组织树
       */
      getTree() {
        this.$axios.get('users/pmph/list/pmphdepartment').then((response) => {
          let res = response.data
          // console.log(res)
          if (res.code == '1') {
            this.treeData.push(res.data)
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      },
      /**
       * 初始化用户
       */
      getUsers() {
        // var name = '', path = '',pageNumber = 1, pageSize = 20
        this.$axios.get('users/pmph/list/pmphuser', {
          params: {
            name: this.name,
            path: this.path,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data
          // console.log(res.data.rows)
          this.dataTotal = res.data.total
          // console.log(this.dataTotal)
          if (res.code == '1') {
            this.usersData=res.data.rows
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: '没有这条数据!',
                type: 'warning'
              });
            }
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      },
      /**
       * 搜索
       */
      search() {
        this.getUsers()
      },
      /**
       * 选择每页有多少条数据
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getUsers()
      },
      /**
       * 选择当前第几页
       */
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNumber = val
        this.getUsers()
      },
      /**
       * 选择部门
       */
      handleNodeClick(data) {
        console.log(data.path);
        this.path = data.path
        this.getUsers()
      },
      /**
       * 选中数据将选中的数据赋值给multipleSelection
       * @param val
       */
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      /**
       * 点击修改
       * @param index
       * @param data
       */
      modify(index, data) {
        //this.form = data[index]
        for (var key in data[index]){
          this.form[key] = data[index][key]
        }
        if (this.form.roleName == null) {
          this.form.roleName = []
        }
        if (this.form.isDisabled == 1){
          this.form.isDisabled = "启用"
        } else {
          this.form.isDisabled = "停用"
        }
        console.log(this.form)
      },
      /**
       * 保存修改
       */
      save() {
        console.log(this.form)
        var isDisabled = ''
        if (this.form.isDisabled == "启用"){
          isDisabled = 1
        } else {
          isDisabled = 0
        }
        this.$axios.put("/users/writer/update/pmphuserofback", {
          data: {
            username: this.form.username,
            id: this.form.id,
            roleName: this.form.roleName,
            realname: this.form.realname,
            email: this.form.email,
            handphone: this.form.handphone,
            isDisabled: isDisabled
          }
        }).then((response) => {
          let res = response.data
          if (res.code == 1) {
            console.log(res)
            this.dialogVisible = false
            this.$message({
              message: '恭喜你，修改成功！',
              type: 'success'
            });
          }
        })
      },
      /**
       * 重置表单
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields()
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

<template>
  <div class="orgUser">
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">账号/姓名：
          <span></span>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.name" @keyup.enter.native="refreshTableData"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">所属院校：
          <span></span>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.orgName" @keyup.enter.native="refreshTableData"></el-input>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">用户类型：
          <span></span>
        </div>
        <div class="searchInput">
          <el-select v-model="params.rank" placeholder="全部" @change="refreshTableData">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button type="primary" icon="search" @click="refreshTableData">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="pull-right">
        <el-button type="primary" @click="addBtn">增加</el-button>
      </div>
    </div>

    <!--表格-->
    <div class="table-wrapper">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="realname" label="姓名" width="110">
        </el-table-column>
        <el-table-column prop="username" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="orgName" label="所属院校">
        </el-table-column>
        <!--如果是大屏幕显示两列，小屏幕是将用户邮箱和手机两列合并-->
        <el-table-column v-if="screenWidth_lg" label="手机号" width="160">
          <template scope="scope">
            <i class="fa fa-phone fa-fw" v-if="scope.row.handphone"></i>
            {{scope.row.handphone}}
          </template>
        </el-table-column>
        <el-table-column v-if="screenWidth_lg" label="邮箱" width="180">
          <template scope="scope">
            <i class="fa fa-envelope fa-fw" v-if="scope.row.email"></i>
            {{scope.row.email}}
          </template>
        </el-table-column>

        <el-table-column v-if="!screenWidth_lg" label="联系方式" width="180">
          <template scope="scope">
            <p>
              <i class="fa fa-phone fa-fw" v-if="scope.row.handphone"></i>
              {{scope.row.handphone}}
            </p>
            <p>
              <i class="fa fa-envelope fa-fw" v-if="scope.row.email"></i>
              {{scope.row.email}}
            </p>
          </template>
        </el-table-column>

        <!--如果是大屏幕显示两列，小屏幕是将用户邮箱和手机两列合并-->
        <el-table-column v-if="screenWidth_lg_computed" prop="position" label="职务" width="120">
        </el-table-column>
        <el-table-column v-if="screenWidth_lg_computed" prop="title" label="职称" width="100">
        </el-table-column>

        <el-table-column v-if="!screenWidth_lg_computed" label="职务/职称" width="120">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="'职务:'+scope.row.position" placement="top">
              <p>
                <i class="fa fa-tags"></i>
                {{scope.row.position}}
              </p>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="'职称:'+scope.row.title" placement="top">
              <p>
                <i class="fa fa-graduation-cap"></i>
                {{scope.row.title}}
              </p>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="rankName" label="用户类型" width="120">
        </el-table-column>
        <el-table-column label="启用" width="80">
          <template scope="scope">
            {{scope.row.isDisabled?'未启用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template scope="scope">
            <el-button type="text" @click="eidtInfoBtn(scope.$index)">修改</el-button>
            <el-button type="text">登录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination v-if="totalPages>params.pageSize" :page-sizes="[30,50,100, 200, 300, 400]" :page-size="params.pageSize" :current-page.sync="params.pageNumber" @current-change="refreshTableData" layout="total, sizes, prev, pager, next, jumper" :total="totalPages">
      </el-pagination>
    </div>
    <!--增加新用户弹窗-->
    <el-dialog :title="isNew?'新增作家用户':'修改用户信息'" :visible.sync="dialogVisible" @close="closeDialog" size="tiny">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="padding20">
        <el-form-item label="用户代码：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="realname">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="用户手机：" prop="handphone">
          <el-input v-model="form.handphone"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="所属院校：" prop="orgId">
          <el-select v-model="form.orgId" filterable remote placeholder="请输入关键词搜索" loading-text="正在搜索..." :remote-method="searchOrgName" :loading="loading">
            <el-option v-for="item in OrgNameList" :key="item.id" :label="item.orgName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用：" prop="isDsabled">
          <el-radio-group v-model="form.isDsabled">
            <el-radio :label="false">启用</el-radio>
            <el-radio :label="true">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ScreenSize from 'common/mixins/ScreenSize.js';
export default {
  mixins: [ScreenSize],
  data() {
    return {
      screenWidth_lg_computed: true,
      isNew: true,
      //用户类型数据
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '教师用户'
      }, {
        value: '2',
        label: '作家用户'
      }, {
        value: '3',
        label: '专家用户'
      }],
      //表格数据
      tableData: [],
      //是否展开弹出层
      dialogVisible: false,
      //表单提交数据
      form: {
        id: '',
        realname: '',
        username: '',
        orgId: '',
        handphone: '',
        email: '',
        isDsabled: true,
        note: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户代码', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        ],
        handphone: [
          { required: true, message: '请输入用户手机号码', trigger: 'blur' },
        ],
        orgId: [
          { required: true, message: '请输入所属院校', trigger: 'blur' },
        ],
        isDsabled: [
          { type: 'boolean', required: true, message: '请选择是否启用', trigger: 'change' }
        ]
      },
      //搜索所属机构用户
      OrgNameList: [],
      loading: false,
      params: {
        pageSize: 30,
        pageNumber: 1,
        name: '',
        rank: '',
        orgName: ''
      },
      totalPages: 0,

    }
  },
  methods: {
    //点击新增按钮
    addBtn() {
      this.isNew = true;
      this.dialogVisible = true;
    },
    //点击修改按钮执行方法
    eidtInfoBtn(index) {
      this.isNew = false;
      this.OrgNameList = [{ id: this.tableData[index].orgId, orgName: this.tableData[index].orgName }];
      for (let key in this.form) {
        this.form[key] = this.tableData[index][key];
      }
      this.form.isDsabled = !!this.form.isDsabled;
      this.dialogVisible = true;
    },
    /**
     * 提交表单中搜索所属院校
     * @param query
     */
    searchOrgName(query) {
      var self = this;
      if (query == '') {
        self.OrgNameList = [];
        return;
      }

      this.loading = true;
      this.$axios.get('/orgs/list/orgByOrgName', {
        params: { orgName: query || '' }
      })
        .then(function(response) {
          self.loading = false;
          let res = response.data;
          let data = res.data;
          console.log(data);
          if (data.length > 0) {
            self.OrgNameList = data;
          } else {
            self.OrgNameList = []
          }
        })
        .catch(function(error) {
          self.loading = false;
          console.error(error);
        });
    },
    /**
     * 获取表格数据，
     * 提交的参数写在params里
     */
    refreshTableData() {
      var self = this;
      // 为给定 ID 的 user 创建请求
      this.$axios.get('/users/writer/list/writeruser', { params: this.params })
        .then(function(response) {
          let res = response.data;
          let data = res.data.rows;
          self.tableData = data;
          self.totalPages = res.data.total;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    /**
     * 修改新增弹出点击确认按钮时触发提交表单操作
     */
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.isNew) {
            this.addUser();
            return;
          }

          this.updateUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    /**
     * 新增用户
     */
    addUser() {
      var self = this;
      this.$axios({
        method: 'POST',
        url: '/users/writer/add/writeruserofback',
        data: this.$initPostData(this.form),
      })
        .then(function(response) {
          let res = response.data;
          let data = res.data.rows;
          //修改成功
          if (res.code === 1) {
            self.refreshTableData();
            self.dialogVisible = false;
            self.$message({
              type: 'success',
              message: '添加成功'
            });
          }
        })
        .catch(function(error) {
          self.$message({
            type: 'error',
            message: '添加失败，请重试'
          });
        });
    },
    /**
     * 更新用户
     */
    updateUser() {
      var self = this;
      this.$axios({
        method: 'PUT',
        url: '/users/writer/update/writeruserofback',
        data: this.$initPostData(this.form),
      })
        .then(function(response) {
          let res = response.data;
          //修改成功
          if (res.code === 1) {
            self.refreshTableData();
            self.dialogVisible = false;
            self.$message({
              type: 'success',
              message: '修改成功'
            });
          }
        })
        .catch(function(error) {
          self.$message({
            type: 'error',
            message: '修改失败，请重试'
          });
        });
    },
    /**
     * 重置form表单数据
     */
    resetForm() {
      this.$refs['ruleForm'].resetFields();
      console.log(this.form);
    },
    /**
     * 监听弹出层关闭事件
     */
    closeDialog() {
      this.resetForm();
    }
  },
  created() {
    this.refreshTableData();
  },
  mounted() {
    this.screenWidth_lg_computed = this.screenWidth_lg;

  }
}
</script>
<style>

</style>

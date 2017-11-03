<template>
  <div class="orgUser">
    <el-tabs type="border-card">
  <el-tab-pane label="机构用户">
       <div class="clearfix" >
    </div>
      <div class="clearfix">
        <div class="searchBox-wrapper">
          <div class="searchName">机构名称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.orgName" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper">
          <div class="searchName">机构代码：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.username" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper">
          <div class="searchName">管理员姓名：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.realname" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="refreshTableData">搜索</el-button>
        </div>
        <!--操作按钮-->
        <div class="pull-right">
          <el-button type="primary" @click="addBtn(false)">添加管理员</el-button>
          <el-button type="primary" @click="addBtn(true)">新建机构</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="table-wrapper">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="orgName"
            label="学校名称">
          </el-table-column>
          <el-table-column
            prop="username"
            label="机构代码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="realname"
            label="管理员姓名"
            width="110">
          </el-table-column>

          <!--如果是大屏幕显示两列，小屏幕是将用户邮箱和手机两列合并-->
          <el-table-column
            v-if="screenWidth_lg"
            label="手机号"
            width="160">
            <template scope="scope">
              <i class="fa fa-phone fa-fw" v-if="scope.row.handphone"></i>
              {{scope.row.handphone}}
            </template>
          </el-table-column>
          <el-table-column
            v-if="screenWidth_lg"
            label="邮箱"
            width="180">
            <template scope="scope">
              <i class="fa fa-envelope fa-fw" v-if="scope.row.email"></i>
              {{scope.row.email}}
            </template>
          </el-table-column>

          <el-table-column
            v-if="!screenWidth_lg"
            label="联系方式"
            width="180">
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
          <el-table-column
            v-if="screenWidth_lg_computed"
            prop="position"
            label="职务"
            width="100">
          </el-table-column>
          <el-table-column
            v-if="screenWidth_lg_computed"
            prop="title"
            label="职称"
            width="100">
          </el-table-column>

          <el-table-column
            v-if="!screenWidth_lg_computed"
            label="职务/职称"
            width="100">
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

          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="postcode"
            label="邮编"
            width="100">
          </el-table-column>
          <el-table-column
            label="启用"
            width="80">
            <template scope="scope">
              {{scope.row.isDisabled?'未启用':'启用'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button type="text" @click="eidtInfoBtn(scope.$index)">修改</el-button>
              <el-button type="text">登录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination v-if="totalPages>params.pageSize"
          :page-sizes="[30,50,100, 200, 300, 400]"
          :page-size="params.pageSize"
           :current-page.sync="params.pageNumber"
           @current-change="refreshTableData"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
      <!--增加新用户弹窗-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        @close="closeDialog"
        size="tiny">
        <el-form :model="form" :rules="rules" ref="ruleForm"  label-width="110px" class="padding20">
          <el-form-item label="机构代码：" prop="username" v-show="isAddSchool||!isNew">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名：" prop="realname" v-show="!isAddSchool||!isNew">
            <el-input v-model="form.realname"></el-input>
          </el-form-item>
          <el-form-item label="用户手机："  prop="handphone" v-show="!isAddSchool||!isNew">
            <el-input v-model="form.handphone"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱：" prop="email" v-show="!isAddSchool||!isNew">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="所属院校："  prop="orgId" v-show="isAddSchool||!isNew">
            <el-select
              v-model="form.orgId"
              filterable
              remote
              placeholder="请输入关键词"
              loading-text="正在搜索..."
              :remote-method="searchOrgName"
              :loading="loading">
              <el-option
                v-for="item in OrgNameList"
                :key="item.id"
                :label="item.orgName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用：" prop="isDisabled" v-show="isAddSchool||!isNew">
            <el-radio-group v-model="form.isDisabled">
              <el-radio :label="false">启用</el-radio>
              <el-radio :label="true">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" v-show="isAddSchool||!isNew">
            <el-input v-model="form.note"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
  </el-tab-pane>
  <el-tab-pane label="学校审核">
      <el-row>
			<el-col>
				<div class="searchBox-wrapper">
					<div class="searchName">管理员姓名:
						<span></span>
					</div>
					<div class="searchInput">
						<el-input placeholder="请输入" v-model="realname" @keyup.enter.native="search" class="searchInputEle"></el-input>
					</div>
				</div>
				<div class="searchBox-wrapper">
					<div class="searchName">学校名称：
						<span></span>
					</div>
					<div class="searchInput">
						<el-input placeholder="请输入" v-model="orgName" @keyup.enter.native="search" class="searchInputEle"></el-input>
					</div>
				</div>
				<div class="searchBox-wrapper">
					<div class="searchName">审核状态：
						<span></span>
					</div>
					<div class="searchInput">
						<el-select v-model="progress" placeholder="全部" clearable>
							<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="searchBox-wrapper searchBtn">
					<el-button type="primary" icon="search" @click="search">搜索</el-button>
				</div>
				<el-popover
					ref="popover1"
					placement="top"
					width="160"
					v-model="visible1">
					<p>确认审核</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
						<el-button type="primary" size="mini" @click="check(0)">确定</el-button>
					</div>
				</el-popover>
				<el-button class="pull-right marginL10" type="success" v-popover:popover1 :disabled="isSelected">审核</el-button>
				<el-popover
					ref="popover2"
					placement="top"
					width="160"
					v-model="visible2">
					<p>确认是否退回</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
						<el-button type="primary" size="mini" @click="check(2)">确定</el-button>
					</div>
				</el-popover>
				<el-button class="pull-right" type="danger" v-popover:popover2 :disabled="isSelected">退回</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table ref="multipleTable"
				:data="schoolTableData"
				border tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="管理员姓名" prop="realname" width="120">
					</el-table-column>
					<el-table-column prop="username" label="用户名" width="150">
					</el-table-column>
					<el-table-column prop="orgName" label="所属学校">
					</el-table-column>
					<el-table-column prop="handphone" label="手机">
					</el-table-column>
					<el-table-column prop="email" label="邮箱" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="position" label="职务">
					</el-table-column>
					<el-table-column prop="title" label="职称" width="80">
					</el-table-column>
					<el-table-column prop="address" label="地址" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="postcode" label="邮编" width="90">
					</el-table-column>
					<el-table-column label="委托书" width="110" align="center">
						<template scope="scope">
							<a href="javascript:;" v-if="scope.row.proxy" style="color:#0000ff;" @click="preview(scope.row.proxy)">预览</a>
							<el-tag type="danger" v-if="!scope.row.proxy">未上传</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="progress" label="审核标志" width="100" align="center">
						<template scope="scope">
							<el-tag type="success" v-if="scope.row.progress=='0'">已通过</el-tag>
							<el-tag type="warning" v-if="scope.row.progress=='1'">待审核</el-tag>
							<el-tag type="danger" v-if="scope.row.progress=='2'">已退回</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col>
				<el-pagination class="pull-right marginT10"
                       v-if="dataTotal>20"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dataTotal">
				</el-pagination>
			</el-col>
		</el-row>
		<el-dialog
			title="委托书"
			:visible.sync="schoolDialogVisible"
			size="small"
			top="5%"
			>
			<img :src="imgsrc" width="100%" alt="委托书">
		</el-dialog>
  </el-tab-pane>
</el-tabs>

  </div>
</template>
<script>
import ScreenSize from "common/mixins/ScreenSize.js";
export default {
  mixins: [ScreenSize],
  data() {
    return {
      screenWidth_lg_computed: true,
      isNew: true,
      isAddSchool:true,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "普通用户"
        },
        {
          value: "1",
          label: "教师用户"
        },
        {
          value: "2",
          label: "作家用户"
        },
        {
          value: "3",
          label: "专家用户"
        }
      ],
      state: [
				{
					value: '1',
					label: '待审核'
				},
				{
					value: '2',
					label: '已退回'
				},
				{
					value: '3',
					label: '已通过'
				}
			],
      selections:[],
      tableData: [],
      dialogVisible: false,
      form: {
        id: "",
        realname: "",
        username: "",
        orgId: "",
        handphone: "",
        email: "",
        isDisabled: true,
        note: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户代码", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        realname: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        email: [{ required: true, message: "请输入用户邮箱", trigger: "blur" }],
        handphone: [{ required: true, message: "请输入用户手机号码", trigger: "blur" }],
        orgId: [{ required: true, message: "请输入所属院校", trigger: "blur" }],
        isDsabled: [
          {
            type: "boolean",
            required: true,
            message: "请选择是否启用",
            trigger: "change"
          }
        ]
      },
      //搜索所属机构用户
      OrgNameList: [],
      loading: false,
      params: {
        pageSize: 30,
        pageNumber: 1,
        username: "",
        realname: "",
        orgName: ""
      },
      totalPages: 0,
      currentPage: 1,
			visible1: false,
			visible2: false,
			schoolDialogVisible: false,
			imgsrc:'',
			value: '全部',
			schoolTableData: [],
      dataTotal:0,
      orgName:'',
      realname:'',
      progress:'',
      pageSize:20,
      pageNumber:1
    };
  },
  computed:{
   dialogTitle(){
     return this.isNew?(this.isAddSchool?"新建院校":"添加管理员"):'修改用户信息';
   },
   isSelected() {
      if (this.selections.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //点击新增按钮
    addBtn(val) {
      this.isAddSchool=val;
      this.isNew = true;
      this.dialogVisible = true;
    },
    //点击修改按钮执行方法
    eidtInfoBtn(index) {
      this.isNew = false;
      this.OrgNameList = [
        {
          id: this.tableData[index].orgId,
          orgName: this.tableData[index].orgName
        }
      ];
      for (let key in this.form) {
        this.form[key] = this.tableData[index][key];
      }
      this.form.isDisabled = !!this.form.isDisabled;
      this.dialogVisible = true;
    },
    /* 列表选中切换 */
    handleSelectionChange(val) {
      this.selections = val;
      // console.log(val)
    },
    /**
           * 提交表单中搜索所属院校
           * @param query
           */
    searchOrgName(query) {
      var self = this;
      if (query == "") {
        self.OrgNameList = [];
        return;
      }

      this.loading = true;
      this.$axios
        .get("/orgs/list/orgByOrgName", {
          params: { orgName: query || "" }
        })
        .then(function(response) {
          self.loading = false;
          let res = response.data;
          let data = res.data;
          console.log(data);
          if (data.length > 0) {
            self.OrgNameList = data;
          } else {
            self.OrgNameList = [];
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
      this.$axios
        .get("/users/org/list/orguser", { params: this.params })
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.isNew) {
            this.addUser();
            return;
          }

          this.updateUser();
        } else {
          console.log("error submit!!");
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
        method: "POST",
        url: "/users/org/add/orguserofback",
        data: this.$initPostData(this.form)
      })
        .then(function(response) {
          let res = response.data;
          let data = res.data.rows;
          //修改成功
          if (res.code === 1) {
            self.refreshTableData();
            self.dialogVisible = false;
            self.$message({
              type: "success",
              message: "添加成功"
            });
          }
        })
        .catch(function(error) {
          self.$message({
            type: "error",
            message: "添加失败，请重试"
          });
        });
    },
    /**
           * 更新用户
           */
    updateUser() {
      var self = this;
      this.$axios({
        method: "PUT",
        url: "/users/org/update/orguserofback",
        data: this.$initPostData(this.form)
      })
        .then(function(response) {
          let res = response.data;
          //修改成功
          if (res.code === 1) {
            self.refreshTableData();
            self.dialogVisible = false;
            self.$message({
              type: "success",
              message: "修改成功"
            });
          }
        })
        .catch(function(error) {
          self.$message({
            type: "error",
            message: "修改失败，请重试"
          });
        });
    },
    /**
           * 重置form表单数据
           */
    resetForm() {

      this.$refs["ruleForm"].resetFields();
      console.log(this.form);
    },
    /**
           * 监听弹出层关闭事件
           */
    closeDialog() {
      this.resetForm();
    },
      /**
     * 请求初始化列表
     */
    getOrgsList() {
      this.$axios
        .get("/auth/orgs/list", {
          params: {
            orgName: this.orgName,
            realname: this.realname,
            progress: this.progress,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        })
        .then(response => {
          let res = response.data;
          if (res.code == "1") {
            this.dataTotal = res.data.total;
            console.log(res);
            this.schoolTableData = res.data.rows;
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: "没有数据!",
                type: "warning"
              });
            }
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    },
    /**
     * 搜索
     */
    search() {
      this.getOrgsList();
    },
    /**
		 *审核
		 */
    check(progress) {
      this.visible1 = false;
      this.visible2 = false;
      //console.log(this.selections)
      var orgUserIds = [];
      this.selections.forEach(item => {
        // console.log(item)
        orgUserIds.push(item.id);
        //console.log(orgUserIds)
      });
      this.$axios
        .put(
          "/auth/orgs/check",
          this.$initPostData({
            progress: progress,
            orgUserIds: orgUserIds
          })
        )
        .then(response => {
          let res = response.data;
          if (res.code == "1") {
            //console.log(res)
            this.getOrgsList();
            this.$message({
              showClose: true,
              message: "修改成功!",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    },
    /**@argument val 当选中项 */
    handleSelectionChange(val) {
      this.selections = val;
      // console.log(val)
    },
    /**@argument val pageSize */
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getOrgsList();
    },
    /**@argument val pageNumber */
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getOrgsList();
    },
    /**
		 * 预览教师资格证
		 * @argument index */
    preview(proxy) {
      this.$axios
        .get("/image/" + proxy)
        .then(response => {
          let res = response.data;
          if (res.code == "1") {
            this.dialogVisible = true;
            console.log(res);
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    }
  },
  created() {
    this.refreshTableData();
    this.getOrgsList();
  },
  mounted() {
    this.screenWidth_lg_computed = this.screenWidth_lg;
  }
};
</script>
<style scoped>
.orgUser .el-tabs--border-card{
  border:0;
  box-shadow: none;
}
</style>

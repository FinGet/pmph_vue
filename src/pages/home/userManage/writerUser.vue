<template>
  <div class="writerUser">
    <el-tabs type="border-card">
  <el-tab-pane label="作家用户">
       <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">账号/姓名：
          <span></span>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.name" @keyup.enter.native="refreshTableData"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper" >
        <div class="searchName">所属院校：
          <span></span>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.orgName" @keyup.enter.native="refreshTableData"></el-input>
        </div>
      </div>
            <div class="searchBox-wrapper">
         <!--申报职务搜索-->
        <div class="searchName">用户类型：
          <span></span>
        </div>
        <div class="searchInput">
          <el-select v-model="params.rank" placeholder="全部" @change="refreshTableData" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button type="primary" icon="search" @click="refreshTableData">搜索</el-button>
      </div>
              <!--操作按钮-->
      <div class="pull-right" style="margin-right:10px;">
        <el-button type="primary" @click="addBtn">增加</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table :data="tableData" border style="width: 100%" >
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
      <el-pagination
      v-if="totalPages>params.pageSize"
      :page-sizes="[30,50,100, 200, 300, 400]"
      :page-size="params.pageSize"
      :current-page.sync="params.pageNumber"
       @current-change="refreshTableData"
       layout="total, sizes, prev, pager, next, jumper"
       :total="totalPages">
      </el-pagination>
    </div>
    <!--增加新用户弹窗-->
    <el-dialog :title="isNew?'新增':'修改用户信息'" :visible.sync="dialogVisible" :before-close="closeDialog" size="tiny">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="padding20">
        <el-form-item label="用户代码：" prop="username">
          <el-input v-model="form.username" :disabled="!isNew"  placeholder="输入用户代码"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="realname">
          <el-input v-model="form.realname" placeholder="输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户手机：" prop="handphone" >
          <el-input v-model="form.handphone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="所属院校：" prop="orgId" required>
          <el-select v-model="form.orgId" filterable remote placeholder="请输入关键词搜索" loading-text="正在搜索..." :remote-method="searchOrgName" :loading="loading">
            <el-option v-for="item in OrgNameList" :key="item.id" :label="item.orgName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用：" prop="isDisabled">
          <el-radio-group v-model="form.isDisabled">
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
  </el-tab-pane>
  <el-tab-pane label="教师审核">
    	<div class="teacher_check">
		<el-row>
			<el-col>
				<div class="searchBox-wrapper">
					<div class="searchName">教师姓名：
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
				<el-button class="pull-right marginL10" type="success" @click="check(0)" :disabled="isSelected">批量审核</el-button>
				<el-button class="pull-right" type="danger"  @click="check(2)" :disabled="isSelected">批量退回</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table ref="multipleTable" :data="teachTableData" border tooltip-effect="dark" style="width: 100%;margin:10px 0;" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="教师姓名" prop="realname" width="120">
					</el-table-column>
					<el-table-column prop="username" label="用户名" width="150">
					</el-table-column>
					<el-table-column prop="idcard" label="身份证" width="190">
					</el-table-column>
					<el-table-column prop="orgName" label="所属学校">
					</el-table-column>
					<el-table-column prop="handphone" label="手机">
					</el-table-column>
					<el-table-column prop="email" label="邮箱" width="220" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="position" label="职务">
					</el-table-column>
					<el-table-column prop="title" label="职称" width="80">
					</el-table-column>
					<el-table-column label="教师资格证" width="110" align="center">
						<template scope="scope">
							<a href="javascript:;" v-if="scope.row.cert" style="color:#0000ff;" @click="preview(scope.row.cert)">预览</a>
							<el-tag type="danger" v-if="!scope.row.cert">未上传</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="progress" label="审核标志" width="100" align="center">
						<template scope="scope">
              <el-tag type="danger" v-if="scope.row.progress=='0'">未提交</el-tag>
							<el-tag type="warning" v-if="scope.row.progress=='1'">已提交</el-tag>
							<el-tag type="success" v-if="scope.row.progress=='3'">通过</el-tag>
							<el-tag type="danger" v-if="scope.row.progress=='2'">已退回</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col>
				<el-pagination class="pull-right marginT10"
                       v-if="dataTotal>pageSize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNumber"
                       :page-sizes="[10, 20, 30,50]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dataTotal">
				</el-pagination>
			</el-col>
		</el-row>
		<el-dialog
			title="教师资格证"
			:visible.sync="previewDialogVisible"
			size="small"
			top="5%"
			>
			<img :src="imgsrc" width="100%" alt="教师资格证">
		</el-dialog>
	</div>
  </el-tab-pane>
</el-tabs>

  </div>
</template>
<script>
import ScreenSize from "common/mixins/ScreenSize.js";
export default {
  mixins: [ScreenSize],
  data() {
    var departmentIdChecked=(rule, value, callback)=>{
         if(value){
            callback();
         }else{
           callback('请输入关键字搜索并选择一个部门');
         }
    }
    return {
      screenWidth_lg_computed: true,
      isNew: true,
      //用户类型数据
      options: [
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
          value: '0',
					label: '未提交'
        },
				{
					value: '1',
					label: '已提交'
				},
				{
					value: '2',
					label: '被退回'
				},
				{
					value: '3',
					label: '已通过'
				}
      ],
      //表格数据
      tableData: [],
      //是否展开弹出层
      dialogVisible: false,
      previewDialogVisible: false,
      //表单提交数据
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
          { min: 1, max: 20, message: "用户代码过长", trigger: "change,blur" }
        ],
        realname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 20, message: "用户名称过长", trigger: "change,blur" }
          ],
        email: [
          { min: 1, max: 40, message: "邮箱长度过长", trigger: "change,blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
          ],
        handphone: [
          {validator: this.$formCheckedRules.phoneNumberChecked,trigger: "blur"}
          ],
        orgId: [{ validator:departmentIdChecked, trigger: "blur" }],
        isDisabled: [
          {
            type: "boolean",
            required: true,
            message: "请选择是否启用",
            trigger: "change"
          }
        ],
        note:[
          {min:1,max:100,message:'备注不能超过100字符',trigger:'change,blur'}
        ]
      },
      //搜索所属机构用户
      OrgNameList: [],
      loading: false,
      params: {
        pageSize: 30,
        pageNumber: 1,
        name: "",
        rank: "",
        orgName: ""
      },
      totalPages: 0,

			visible1: false,
			visible2: false,
			selections:'',
			imgsrc:require('./jszgez.jpg'),
			teachTableData: [],
      orgName:  '',
      realname: '',
      progress: '',
      pageSize: 10,
      pageNumber: 1,
      dataTotal: 0
    };
  },
  computed:{
    isSelected() {
			if (this.selections.length > 0) {
				return false
			} else {
				return true
			}
		}
  },
  methods: {
    //点击新增按钮
    addBtn() {
      this.isNew = true;
      this.form={
        id: "",
        realname: "",
        username: "",
        orgId: "",
        handphone: "",
        email: "",
        isDisabled: true,
        note: ""
      }
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
        .get("/users/writer/list/writeruser", { params: this.params })
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
        url: "/users/writer/add/writeruserofback",
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
        url: "/users/writer/update/writeruserofback",
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
    closeDialog(done) {
      this.resetForm();
      done();
    },
    preview(cert) {
      this.$axios
        .get("/image/" + cert)
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
    },

    /**
     * 请求初始化列表
     */
    getWritersList() {
      this.$axios.get("/auth/writers/list",{
        params:{
          orgName:  this.orgName,
          realname: this.realname,
          progress: this.progress,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then((response) => {
        let res = response.data
        if (res.code == '1') {
          this.dataTotal = res.data.total
          // console.log(res)
          this.teachTableData = res.data.rows
          if (this.dataTotal == 0) {
            this.$message({
              showClose: true,
              message: '没有数据!',
              type: 'warning'
            });
          }
        }
      }).catch((error) => {
        console.log(error.msg)
      })
		},
		/**
		 *审核
		 */
		check(progress){
			this.visible1 = false
			this.visible2 = false
			//console.log(this.selections)
			var userIds = []
			this.selections.forEach(item => {
				// console.log(item)
				userIds.push(item.id)
				//console.log(orgUserIds)
			})
			this.$axios.put("/auth/writers/check",this.$initPostData({
				progress: progress,
				userIds: userIds
			})).then((response) => {
				let res = response.data
				if (res.code == "1") {
					//console.log(res)
					this.getWritersList()
					this.$message({
              showClose: true,
              message: '修改成功!',
              type: 'success'
            });
				}
			}).catch(error => {
				console.log(error.msg)
			})
		},
    /**
     * 搜索
     */
    search() {
      this.getWritersList()
    },
		/**@argument val 当选中项 */
		handleSelectionChange(val) {
			this.selections = val
		},
		handleSizeChange(val) {
      console.log('size',val);
      this.pageSize=val;
      this.pageNumber=1;
      this.getWritersList();
		},
		handleCurrentChange(val) {
       console.log("当前页",val);
      this.pageNumber=val;
      this.getWritersList(); 
		},
		/**
		 * 预览教师资格证
		 * @argument index */
		preview(cert) {
			this.$axios.get("/image/"+cert).then(response => {
				let res = response.data
				if (res.code == '1'){
					this.dialogVisible = true
					console.log(res)
				}
			}).catch((error) => {
        console.log(error.msg)
      })
		}
  },
  created() {
    this.refreshTableData();
    this.getWritersList();
  },
  mounted() {
    this.screenWidth_lg_computed = this.screenWidth_lg;
  }
};
</script>
<style scoped>
.writerUser .el-tabs--border-card{
  border:0;
  box-shadow: none;
}
</style>

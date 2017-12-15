<template>
  <div class="orgUser">
    <el-tabs type="border-card">
  <el-tab-pane label="机构用户">
       <div class="clearfix" >
    </div>
      <div class="clearfix">
        <div class="searchBox-wrapper">
          <div class="searchName">姓名/账号：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.name" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div>
        <!-- <div class="searchBox-wrapper">
          <div class="searchName">机构账号：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.username" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div> -->
        <div class="searchBox-wrapper">
          <div class="searchName">机构名称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="params.orgName" @keyup.enter.native="refreshTableData"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="searchOrg">搜索</el-button>
        </div>
        <!--操作按钮-->
        <div class="pull-right">
          <!-- <el-button type="primary" @click="addBtn(false)">添加管理员</el-button> -->
          <!-- <el-button type="primary" @click="setOrgsType">机构类型设置</el-button> -->
          <el-button type="primary" @click="addBtn(true)">新建机构用户</el-button>
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
            label="机构名称">
            <template scope="scope">
                    <a class="title" @click="showDetail(scope.$index)">{{scope.row.orgName}}</a>
                </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="机构账号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="orgTypeName"
            label="机构类型"
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
          <!-- <el-table-column
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
          </el-table-column> -->

          <!-- <el-table-column
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
          </el-table-column> -->

          <el-table-column
            prop="address"
            label="邮寄地址">
          </el-table-column>
          <!-- <el-table-column
            prop="postcode"
            label="邮编"
            width="100">
          </el-table-column> -->
          <el-table-column
            label="启用标识"
            width="100"
            align="center">
            <template scope="scope">
              {{scope.row.isDisabled?'禁用':'启用'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="110"
            align="center"
            >
            <template scope="scope">
              <el-button type="text" @click="eidtInfoBtn(scope.$index)">修改</el-button>
              <el-button type="text">登录</el-button>
              <!-- <el-button type="text">查看详情</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination v-if="totalPages>params.pageSize"
          :page-sizes="[10,20,30, 50, 100]"
          :page-size="params.pageSize"
           :current-page.sync="params.pageNumber"
           @size-change="orgHandleSizeChange"
           @current-change="orgHandleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
      <!--增加新用户弹窗-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :before-close="resetForm"
        size="tiny">
        <el-form :model="form" :rules="rules" ref="ruleForm"  label-width="110px" class="padding20">
          <el-form-item label="机构账号：" prop="username">
            <el-input v-model="form.username" :disabled="!isNew"></el-input>
          </el-form-item>
          <el-form-item label="机构名称：" prop="orgName">
            <el-input v-model="form.orgName"></el-input>
          </el-form-item>
          <el-form-item label="机构类型："  prop="orgTypeId">
            <el-select v-model="form.orgTypeId" placeholder="请选择院校类型">
              <el-option
                v-for="item in orgTypeList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员姓名：" prop="realname">
            <el-input v-model="form.realname"></el-input>
          </el-form-item>
          <el-form-item label="手机号："  prop="handphone" >
            <el-input v-model="form.handphone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email" >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="所属地区："  prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择">
            <el-option
              v-for="item in area"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="启用标识：" prop="isDisabled">
            <el-radio-group v-model="form.isDisabled">
              <el-radio :label="false">启用</el-radio>
              <el-radio :label="true">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" prop="note">
            <el-input v-model="form.note"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>

      </el-dialog>
      <!-- 查看详情 -->
      <el-dialog
        title="机构用户详情"
        :visible.sync="detailVisible"
        @close="clearDetailTable"
      >
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">机构名称：<span></span></div>
            <div class="info">{{detailData.orgName}}</div>
          </div>
          <div class="detail-info-item">
            <div class="title">机构账号：<span></span></div>
            <div class="info">{{detailData.username}}</div>
          </div>
        </div>
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">机构类型：<span></span></div>
            <div class="info">{{detailData.orgTypeName}}</div>
          </div>
          <div class="detail-info-item">
            <div class="title">管理员姓名：<span></span></div>
            <div class="info">{{detailData.realname}}</div>
          </div>
        </div>
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">职务：<span></span></div>
            <div class="info">{{detailData.position}}</div>
          </div>
          <div class="detail-info-item">
            <div class="title">职称：<span></span></div>
            <div class="info">{{detailData.title}}</div>
          </div>
        </div>
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">手机号：<span></span></div>
            <div class="info">{{detailData.handphone}}</div>
          </div>
          <div class="detail-info-item">
            <div class="title">邮箱：<span></span></div>
            <div class="info">{{detailData.email}}</div>
          </div>
        </div>
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">邮寄地址：<span></span></div>
            <div class="info">{{detailData.address}}</div>
          </div>
          <div class="detail-info-item">
            <div class="title">启用标识：<span></span></div>
            <div class="info">{{detailData.isDisabled?'禁用':'启用'}}</div>
          </div>
        </div>
        <div class="detail-info-box">
          <div class="detail-info-item">
            <div class="title">备注：<span></span></div>
            <div class="info">{{detailData.note}}</div>
          </div>
        </div>
      </el-dialog>
  </el-tab-pane>
  <!-- 学校审核 -->
  <el-tab-pane label="审核管理员">
      <el-row>
			<el-col>
				<div class="searchBox-wrapper">
					<div class="searchName">姓名/账号:
						<span></span>
					</div>
					<div class="searchInput">
						<el-input placeholder="请输入" v-model="realname" @keyup.enter.native="search" class="searchInputEle"></el-input>
					</div>
				</div>
				<div class="searchBox-wrapper">
					<div class="searchName">机构名称：
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
				<el-button class="pull-right marginL10" type="success" @click="check(1)" :disabled="isSelected">通过</el-button>
				<el-button class="pull-right" type="danger" @click="check(2)" :disabled="isSelected">退回</el-button>
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
          <el-table-column prop="orgName" label="机构名称">
					</el-table-column>
          <el-table-column prop="username" label="机构账号" width="100">
					</el-table-column>
					<el-table-column label="管理员姓名" prop="realname" width="110">
					</el-table-column>
          <el-table-column prop="position" label="职务">
					</el-table-column>
					<el-table-column prop="title" label="职称" width="80">
					</el-table-column>
					<el-table-column label="手机号" width="160">
            <template scope="scope">
              <i class="fa fa-phone fa-fw" v-if="scope.row.handphone"></i>
              {{scope.row.handphone}}
            </template>
          </el-table-column>
          <el-table-column label="邮箱">
            <template scope="scope">
              <i class="fa fa-envelope fa-fw" v-if="scope.row.email"></i>
              {{scope.row.email}}
            </template>
          </el-table-column>
					<el-table-column prop="address" label="邮寄地址" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="postcode" label="邮编" width="90">
					</el-table-column>
					<el-table-column label="委托书" width="110" align="center">
						<template scope="scope">
							<a href="javascript:;" v-if="scope.row.proxy&&scope.row.proxy!='DEFAULT'" style="color:#0000ff;" @click="preview(scope.row.proxy)">预览</a>
							<el-tag type="danger" v-if="!scope.row.proxy||scope.row.proxy=='DEFAULT'">未上传</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="progress" label="审核状态" width="100" align="center">
						<template scope="scope">
							<el-tag type="warning" v-if="scope.row.progress=='0'">待审核</el-tag>
							<el-tag type="success" v-if="scope.row.progress=='1'">已通过</el-tag>
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
                       :current-page="pageNumber"
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
      isNew: true, // 判断是否是新增
      // isAddSchool:true,
      area:[], // 所属地区
      // 用户类别
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
      // 审核状态
      state: [
				{
					value: '0',
					label: '待审核'
				},
				{
					value: '2',
					label: '已退回'
				},
				{
					value: '1',
					label: '已通过'
				}
			],
      selections:[], // 选中项
      tableData: [], // 机构用户数据
      dialogVisible: false, // 新增用户弹窗
      // 弹窗表单中间变量
      form: {
        id: "",
        realname: "",
        username: "",
        orgId: "",
        orgName: "",
        handphone: "",
        orgTypeId: "",
        // orgTypeName:"",
        email: "",
        areaId:'',
        isDisabled: true,
        note: ""
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: "请输入机构账号", trigger: "blur" },
          { pattern: /^[A-Za-z0-9]+$/, message: '只能输入英文和数字' },
          { min: 1, max: 20, message: "机构账号不能超过20个字符", trigger: "change,blur" }
        ],
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 1, max: 20, message: "机构名称不能超过20个字符", trigger: "change,blur" }
          ],
        email: [
          { min: 1, max: 40, message: "邮箱不能超过40个字符", trigger: "change,blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        realname:[
          { min: 1, max: 20, message: "管理员姓名不能超过20个字符", trigger: "change,blur" }
        ],
        handphone: [
          { pattern: /^1[34578]\d{9}$/, message: '手机号格式错误' }
        ],
        orgTypeId: [
            { required: true, message: '请选择院校类型', trigger: 'blur' },
        ],
        areaId: [{required: true, message: "请选择机构所属地区",trigger:"blur"}],
        isDisabled: [{type: "boolean",required: true,message: "请选择是否启用",trigger: "change"}],
        note:[
          {min:1,max:100,message:'备注不能超过100字符',trigger:'change,blur'}
        ]
      },
      //搜索所属机构用户
      OrgNameList: [],
      loading: false,
      // 机构用户 搜索，传输参数
      params: {
        pageSize: 10,
        pageNumber: 1,
        // username: "",
        orgName: "",
        name: ""
      },
      totalPages: 0,// 数据总量
			visible1: false,
      visible2: false,
			schoolDialogVisible: false,// 学校委托书弹窗
			imgsrc:'', // 委托书图片路径
      value: '全部',
			schoolTableData: [], // 审核管理员数据
      // 审核管理员
      dataTotal:0,
      orgName:'',
      realname:'',
      progress:'',
      pageSize:10,
      pageNumber:1,
      // 机构类型
      orgTypeList: [],
      // 新增机构类型弹窗表单
      // addOrgTypeForm:{
      //   typeName:'',
      //   sort:''
      // },
      detailVisible:false, // 查看详情弹窗
      detailData: {
        orgName:"",
        address:"",
        email:"",
        handphone:"",
        note:"",
        orgTypeName:"",
        realname:"",
        position:"",
        title:"",
        username:"",
        isDisabled: false
      } // 详情数据
    };
  },
  computed:{
   dialogTitle(){
     return this.isNew?"新建机构用户":'修改用户信息';
   },
   isSelected() {
      if (this.selections.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch:{
    dialogVisible(val){
      if(!val){
        this.closeDialog();
      }
    }
  },
  methods: {
    //点击新增按钮
    addBtn(val) {
      // this.isAddSchool=val;
      this.isNew = true;
      this.dialogVisible = true;
    },
    // 点击机构类型设置
    // setOrgsType(){
    //   this.dialogVisible2 = true;
    // },
    /**
       * 获取机构类型
       */
    getOrgTypeData(){
      this.$axios.get('/pmpheep/orgType/list/orgtype',{params: {typeName:''}})
        .then(response=>{
          let res = response.data;
          let data = res.data;
          if (res.code == 1) {
            data.map(iterm=>{
              iterm.id = iterm.id+'';
            });
            this.orgTypeList = data;
            if(this.orgTypeList.length>0){
              this.form.orgTypeId = this.orgTypeList[0].id;
            }
          } else {
            this.$message.error(res.msg.msgTrim());
          }
        })
        .catch(e=>{
          console.log(e);
          this.$message.error('获取机构类型数据失败');
        });
    },
    //点击修改按钮执行方法
    eidtInfoBtn(index) {
      this.isNew = false;
      for (let key in this.form) {
        this.form[key] = this.tableData[index][key];
      }
      // console.log(this.form.orgTypeId)
      // delete this.form.disabled;
      this.form.orgTypeId+='';
      this.form.areaId+='';
      // this.form.isDisabled = this.tableData[index].disabled;
      // console.log(this.form.isDisabled)
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
        .get("/pmpheep/orgs/list/orgByOrgName", {
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
        .get("/pmpheep/users/org/list/orgUser", { params: this.params })
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
       * 获取所属部门信息
       */
    getAreaData(){
      this.$axios.get('/pmpheep/area/areachirldren',{params: {parentId:0}})
        .then(response=>{
          let res = response.data;
          let data = res.data;
          if (res.code == 1) {
            data.map(iterm=>{
              iterm.id = iterm.id+'';
            });
            this.area = data;
            // console.log(this.area)
          } else {
            this.$message.error(res.msg.msgTrim());
          }
        })
        .catch(e=>{
          console.log(e);
          this.$message.error('获取机构类型数据失败');
        });
    },
    /**
           * 修改新增弹出点击确认按钮时触发提交表单操作
           */
    submit() {
      console.log(this.form.orgId)
      this.form.orgId += ''
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
      this.form.orgId -= 0
      this.$axios({
        method: "POST",
        url: "/pmpheep/users/org/add/orgAndUser",
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
          }else {
            self.$message.error(res.msg.msgTrim());
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
      this.form.orgId -= 0
      this.$axios({
        method: "put",
        url: "/pmpheep/users/org/updateUser",
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
          } else if (code === 3) {
            self.$message({
              type: "error",
              message: "机构账号不能修改"
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
    resetForm(done) {
      this.$refs.ruleForm.resetFields();
      done();
    },
    /**
     * 监听弹出层关闭事件
     */
    closeDialog() {
     this.form =  {
        id: "",
        realname: "",
        username: "",
        orgId: "",
        orgName: "",
        orgTypeId:"",
        // orgTypeName:'',
        areaId: "",
        handphone: "",
        email: "",
        isDisabled: true,
        note: ""
      }
    },
      /**
     * 请求初始化列表
     */
    getOrgsList() {
      this.$axios
        .get("/pmpheep/auth/orgList", {
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
      this.pageSize = 10;
      this.pageNumber = 1;
      this.getOrgsList();
    },
    searchOrg(){
      this.params.pageSize = 10;
      this.params.pageNumber = 1;
      this.refreshTableData()
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
      var title='';
      if(progress==1) {
        title = "是否确认通过?"
      } else {
        title = "是否确认退回?"
      }
      this.$confirm(title, "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
      this.$axios.put("/pmpheep/auth/orgCheck",
          this.$initPostData({
            progress: progress,
            orgUserIds: orgUserIds
          })
        )
        .then(response => {
          let res = response.data;
          console.log(res.code)
          if (res.code == "1") {
            //console.log(res)
            this.getOrgsList();
            this.$message({
              showClose: true,
              message: "审核成功!",
              type: "success"
            });
          }else if (res.code == '2') {
           this.$message({
              showClose: true,
              message: res.msg.msgTrim(),
              type: "warning"
            });
          }
          // console.log(res.code)
        })
        .catch(error => {
          console.log(error.msg);
        });
      })
    },
    /**@argument val 当选中项 */
    handleSelectionChange(val) {
      this.selections = val;
      // console.log(val)
    },
    orgHandleSizeChange(val){
     this.params.pageSize=val;
     this.params.pageNumber=1;
     this.refreshTableData();
    },
    orgHandleCurrentChange(val){
     this.params.pageNumber=val;
     this.refreshTableData();
    },
    /**@argument val pageSize */
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNumber=1;
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
        .get("/pmpheep/image/" + proxy)
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
     * 查看详情
     * @param index 索引
     */
    showDetail(index) {
      this.detailVisible = true;
      // this.detailData.push(this.tableData[index]);
      for (var key in this.detailData) {
        this.detailData[key] = this.tableData[index][key]
      }
    },
    /**
     * 弹窗关闭，清空详情表格
     */
    clearDetailTable(){
      this.detailData ={
        orgName:"",
        address:"",
        email:"",
        handphone:"",
        note:"",
        orgTypeName:"",
        realname:"",
        position:"",
        title:"",
        username:"",
        isDisabled: false
      }
    }
  },
  created() {
    this.refreshTableData();
    this.getOrgsList();
    this.getAreaData();
    this.getOrgTypeData();
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
.title{
  cursor: pointer;
}
/* .detail-info-box .detail-info-item>div{
  display: inline-block;
  font-size: 16px;
}
.detail-info-box .detail-info-item{
  display: inline-block;
  height: 36px;
  width: 50%;
  max-width: 410px;
  line-height: 36px;
  vertical-align: middle;
} */
.detail-info-box{
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
}
.detail-info-item{
  display: flex;
  align-items: flex-start;
  flex: 1;
}
.detail-info-item .title{
  width: 100px;
  text-align: justify;
}
.detail-info-item .info{
  flex: 1;
}
</style>

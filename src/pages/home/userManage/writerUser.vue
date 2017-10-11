<template>
  <div class="orgUser">
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">账号/姓名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.name"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">所属院校：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle" v-model="params.orgName"></el-input>
        </div>
      </div>
      <!--申报职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">用户类型：<span></span></div>
        <div class="searchInput">
          <el-select v-model="value" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="pull-right">
        <el-button type="primary" @click="addUser">增加</el-button>
      </div>
    </div>

    <!--表格-->
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="realname"
          label="姓名"
          width="110">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="所属院校">
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
          width="120">
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
          width="120">
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
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rankName"
          label="用户类型"
          width="120">
        </el-table-column>
        <el-table-column
          label="启用"
          width="80">
          <template scope="scope">
            {{!!scope.row.isDsabled?'启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="text" @click="eidtInfo(scope.$index)">修改</el-button>
            <el-button type="text">登录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <!--增加新用户弹窗-->
    <el-dialog
      :title="isNew?'新增作家用户':'修改用户信息'"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="form"  label-width="100px" class="padding20">
        <el-form-item label="用户代码：" required>
          <el-input v-model="form.usercode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" required>
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：" required>
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机：" required>
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属院校：" required>
          <el-select
            v-model="form.schoolname"
            filterable
            remote
            placeholder="请输入关键词"
            loading-text="正在搜索..."
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用：" required>
          <el-radio-group v-model="form.enabled">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import ScreenSize from 'common/mixins/ScreenSize.js';
  export default{
    mixins:[ScreenSize],
    data(){
      return {
        screenWidth_lg_computed:true,
        isNew:true,
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '普通用户'
        }, {
          value: '选项3',
          label: '教师用户'
        }, {
          value: '选项4',
          label: '作家用户'
        }, {
          value: '选项5',
          label: '专家用户'
        }],
        value: '选项1',

        tableData: [],
        dialogVisible:false,
        form:{
          schoolname:'',
          usercode:'',
          username:'',
          phone:'',
          email:'',
          role:null,
          position:'',
          zhicheng:'',
          address: '',
          postcode:'',
          enabled:'启用',
          organisation:'',
          remark:'',
        },
        options4: [],
        value9: [],
        list: [],
        loading: false,
        params:{
          pageSize:30,
          pageNumber:1,
          name:'',
          rank:'',
          orgName:''
        }
      }
    },
    methods:{
      addUser(){
        this.isNew=true;
        this.dialogVisible=true;
      },
      eidtInfo(index){
        this.isNew=false;

        for(let key in this.form){
          this.form[key] = this.tableData[index][key];
        }
        this.dialogVisible=true;
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4.splice(0);
            this.options4.push({value: '人卫社', label: '人卫社'});
            this.options4.push({value: '北京第四人民医院', label: '北京第四人民医院'});
          }, 1000);
        } else {
          this.options4 = [];
        }
      },
      getTableData(){
        var self= this;
        // 为给定 ID 的 user 创建请求
        this.$axios.get('writer/user/list/writeruser',{params:this.params})
          .then(function (response) {
            let res = response.data;
            let data = res.data.rows;
            self.tableData=data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    created(){
      this.getTableData();
    },
    mounted(){
      this.screenWidth_lg_computed = this.screenWidth_lg;

    }
  }
</script>
<style>


</style>

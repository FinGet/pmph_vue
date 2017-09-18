<template>
  <div class="orgUser">
    <div class="clearfix">
      <div class="searchBox-wrapper">
        <div class="searchName">用户名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">姓名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">所属院校：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
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
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          width="110">
        </el-table-column>
        <el-table-column
          prop="usercode"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="schoolname"
          label="所属院校">
        </el-table-column>
        <el-table-column
          label="手机号"
          width="150">
          <template scope="scope">
            <i class="fa fa-phone fa-fw" v-if="scope.row.phone"></i>
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="180">
          <template scope="scope">
            <i class="fa fa-envelope fa-fw" v-if="scope.row.phone"></i>
            {{scope.row.email}}
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职务"
          width="100">
        </el-table-column>
        <el-table-column
          prop="zhicheng"
          label="职称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="usertype"
          label="用户类型"
          :filters="[{ text: '普通用户', value: 1 }, { text: '教师用户', value: 2 }, { text: '作家用户', value: 3 }, { text: '专家用户', value: 4 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          :formatter="formatter"
          width="120">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="启用"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="text">修改</el-button>
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
      title="新增机构用户"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="form"  label-width="100px" class="padding20">
        <el-form-item label="用户代码：">
          <el-input v-model="form.usercode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱：">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机：">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属组织：">
          <el-select v-model="form.usercode" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用：">
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    data(){
      return {
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

        tableData: [{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:1,
          enabled:true,
        },{
          schoolname:'安徽医学高等专科学校',
          usercode:'xxxx001',
          username:'人卫社01',
          phone:'18600000011',
          email:'eassss@sina.com',
          position:'副科长',
          zhicheng:'教员',
          address: '上海市普陀区金沙江路 1518 弄',
          usertype:2,
          enabled:true,
        },],
        dialogVisible:false,
        form:{
          schoolname:'',
          usercode:'',
          username:'',
          phone:'',
          email:'',
          position:'',
          zhicheng:'',
          address: '',
          postcode:'',
          enabled:true,
          organisation:'',
          remark:'',
        }
      }
    },
    methods:{
      addUser(){
        this.dialogVisible=true;
      },
      formatter(row, column) {
        var type = row.usertype;
        var typeText = ['普通用户', '教师用户', '作家用户', '专家用户'];
        return typeText[type];
      },
      filterTag(value, row) {
        if(value==0){
          return true;
        }
        return row.usertype === value;
      }
    }
  }
</script>
<style>


</style>

<template>
  <div class="orgUser">
    <div>
      <div class="searchBox-wrapper">
        <div class="searchName">学校名称：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">机构代码：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper">
        <div class="searchName">管理员姓名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="请输入" class="searchInputEle"></el-input>
        </div>
      </div>
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">搜索</el-button>
      </div>
    </div>
    <!--操作按钮-->
    <div class="operation-wrapper">
      <el-button type="primary">增加</el-button>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="schoolname"
          label="学校名称">
        </el-table-column>
        <el-table-column
          prop="usercode"
          label="机构代码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="管理员姓名"
          width="110">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="140">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
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
          prop="postcode"
          label="邮编"
          width="100">
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
          postcode:'000000',
          enabled:true,
        },]
      }
    }
  }
</script>
<style>


</style>

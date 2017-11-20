/**
封装一个社内用户组件
*/
<template>
  <div>
    <el-row>
      <!--左侧树状图-->
      <el-col :span="6">
        <p class="page-title">社内部门：</p>
        <!--社内部门树状图-->
        <pmph-tree @node-click="handleNodeClick" ref="pmphTree"></pmph-tree>
      </el-col>
      <!--右侧表格信息-->
      <el-col :span="17" :offset="1">
        <!--搜索+操作按钮-->
        <div class="clearfix">
          <div class="searchBox-wrapper">
            <div class="searchName">院校名称：<span></span></div>
            <div class="searchInput">
              <el-input placeholder="请输入" class="searchInputEle"  @keyup.native.enter="_getTableData" v-model.trim="searchForm.name"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search" @click="_getTableData">搜索</el-button>
          </div>

          <!--操作按钮-->
          <div class="operation-wrapper">
            <!--提供自定义按钮卡槽-->
            <slot></slot>
          </div>
        </div>

        <!--表格-->
        <div class="table-wrapper">
          <el-table
            ref="table"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              label="姓名"
              width="120"
              prop="realname">
              <template scope="scope">
                <el-button type="text" @click="">{{scope.row.realname}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="username"
              label="账号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              label="角色名称">
              <template scope="scope">
                <el-tag class="marginTag" v-for="(item,index) in scope.row.pmphRoles" :key="index" type="primary">{{item.roleName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="handphone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="use"
              label="启用标识"
              align="center"
              width="100">
              <template scope="scope">
                {{scope.row.isDisabled? '停用' : '启用'}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template scope="scope">
                <el-button type="text" @click="">修改</el-button>
                <el-button type="text">登录</el-button>
                <!-- <el-button type="text">查看详情</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--分页-->
        <div class="pagination-wrapper">
          <el-pagination
            v-if="dataTotal > searchForm.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchForm.pageNumber"
            :page-sizes="[10,20,30,50,100]"
            :page-size="searchForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--弹窗-->

  </div>
</template>

<script>
  import pmphTree from 'components/pmph-tree';
  export default {
    data() {
      return {
        searchForm:{
          name:'',
          path:'',
          departmentId:'',
          pageNumber:1,
          pageSize:30
        },
        dataTotal:0,
        tableData:[],
        selectData:[],
      }
    },
    methods:{
      /**
       * 获取当前用户表格数据
       */
      _getTableData(){

      },
      /**
       * 监听点击社内部门树状图节点时触发
       * @param data 当前点击节点数据
       */
      _handleNodeClick(data){

      },
      /**
       * 选择每页有多少条数据
       */
      handleSizeChange(val) {
        this.searchForm.pageSize = val;
        this.searchForm.pageNumber = 1;
        this._getTableData();
      },
      /**
       * 选择当前第几页
       */
      handleCurrentChange(val) {
        this.searchForm.pageNumber = val;
        this._getTableData();
      },
      /**
       * 选中数据将选中的数据赋值给multipleSelection
       * @param val
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
    },
    components:{
      pmphTree
    },
  }
</script>

<style scoped>

</style>

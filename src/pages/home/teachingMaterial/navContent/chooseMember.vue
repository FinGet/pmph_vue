<template>
    <div class="chooseMember">
      <el-row>
        <el-col :span="24">
          <el-col>
            <div class="search-title">姓名:</div>
            <el-col :span="4" class="search-10">
              <el-input v-model="input" placeholder="请输入姓名"></el-input>
            </el-col>
            <!--<div class="search-title">申报职位:</div>-->
            <!--<el-col :span="4" class="search-10">-->
              <!--<el-select v-model="value" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->
            <el-button class="btn" type="primary"  icon="search">搜索</el-button>
          </el-col>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            stripe
            tooltip-effect="dark"
            max-height="750"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column label="申报账号"
            prop="id">
            </el-table-column>
            <el-table-column label="出生年月"
                             prop="age">
            </el-table-column>
            <el-table-column
              label="姓名"
            >
              <template scope="scope">
                <el-tooltip :content="scope.row.sex === 0? '男' : '女'" placement="top-start">
                  <p>{{scope.row.name}} <i class="fa" :class="scope.row.sex === 0? 'fa-mars' : 'fa-venus'"></i></p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="申报单位/工作单位"
            >
              <template scope="scope">
                <el-tooltip :content="'申报单位:'+scope.row.applicationOrganization" placement="top-start">
                  <p><i class="fa fa-university fa-fw"></i> {{scope.row.applicationOrganization}}</p>
                </el-tooltip>
                <el-tooltip :content="'工作单位:'+scope.row.workOrganization" placement="top-start">
                  <p><i class="fa fa-briefcase fa-fw"></i> {{scope.row.workOrganization}}</p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="职务/职称"
            >
              <template scope="scope">
                <el-tooltip class="item" effect="dark" :content="'职务:'+scope.row.duty" placement="top">
                  <p>
                    <i class="fa fa-tags"></i>
                    {{scope.row.duty}}
                  </p>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="'职称:'+scope.row.jobTitle" placement="top">
                  <p>
                    <i class="fa fa-graduation-cap"></i>
                    {{scope.row.jobTitle}}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="联系方式"
            >
              <template scope="scope">
                <el-tooltip class="item" effect="dark" :content="'电话:'+scope.row.phone" placement="top">
                  <p>
                    <i class="fa fa-phone fw"></i>
                    {{scope.row.phone}}
                  </p>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="'邮箱:'+scope.row.email" placement="top">
                  <p>
                    <i class="fa fa-envelope fw"></i>
                    {{scope.row.email}}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="是否编委"
              width="100"
              align="center"
            >
              <template scope="scope">
                <el-checkbox v-model="scope.row.isMember" @change="change(scope.$index)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        input:'',
//        options: [{
//          value: '选项1',
//          label: '全部'
//        }, {
//          value: '选项2',
//          label: '主编'
//        }, {
//          value: '选项3',
//          label: '副主编'
//        },{
//          value: '选项4',
//          label: '编委'
//        }],
//        value: '全部',
        tableData:[
          {
            id:'zhangsan',
            name: '张三',
            age:'1965-06-03',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            phone:'1383838438',
            email:'123321@qq.com',
            isMember:false,
          },
          {
            id:'zhangsan',
            name: '张三',
            age:'1965-06-03',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            phone:'1383838438',
            email:'123321@qq.com',
            isMember:false,
          },
          {
            id:'zhangsan',
            name: '张三',
            age:'1965-06-03',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            phone:'1383838438',
            email:'123321@qq.com',
            isMember:false,
          },
          {
            id:'zhangsan',
            name: '张三',
            age:'1965-06-03',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            phone:'1383838438',
            email:'123321@qq.com',
            isMember:false,
          },
          {
            id:'zhangsan',
            name: '张三',
            age:'1965-06-03',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            phone:'1383838438',
            email:'123321@qq.com',
            isMember:false,
          }
        ]
      }
    },
    methods:{
      handleSelectionChange() {

      },
      // 搜索
      Search(){
      },
    }
  }
</script>

<style>
  .search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
</style>

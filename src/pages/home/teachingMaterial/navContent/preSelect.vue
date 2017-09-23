<template>
    <div class="chooseMember">
      <el-row>
        <el-col>
          <p class="bookTitle">医学心理学与精神病学（第4版）</p>
        </el-col>
      </el-row>
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
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              v-model="visible">
              <p>是否确认提交？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
            </el-popover>
            <el-button v-if="edit" class="btn pull-right" type="primary" v-popover:popover>提交</el-button>
            <el-button v-if="!edit" class="btn pull-right" type="primary">确认</el-button>
            <el-button v-if="edit" class="btn pull-right" type="warning">重置</el-button>
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
            <el-table-column
              label="姓名"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              label="性别"
            >
              <template scope="scope">
                <p>{{scope.row.sex === 0? '男' : '女'}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="工作单位"
            >
              <template scope="scope">
                <p><i class="fa fa-briefcase fa-fw"></i> {{scope.row.workOrganization}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="申报单位"
            >
              <template scope="scope">
                <p><i class="fa fa-university fa-fw"></i> {{scope.row.applicationOrganization}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="职务/职称"
            >
              <template scope="scope">
                <el-tooltip class="item" effect="dark" :content="'职务:'+scope.row.applicationOrganization" placement="top">
                  <p>
                    <i class="fa fa-tags"></i>
                    {{scope.row.position}}
                  </p>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="'职称:'+scope.row.applicationOrganization" placement="top">
                  <p>
                    <i class="fa fa-graduation-cap"></i>
                    {{scope.row.professionalTitle}}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="申请职位"
                             prop="jobApplication"
            >
            </el-table-column>
            <el-table-column
              label="学校审核"
              width="100"
              align="center"
            >
              <template scope="scope">
                <el-tooltip :content="'状态:'+scope.row.schoolSaudit" placement="top-start">
                  <el-tag :type="scope.row.schoolSaudit==='未审核'?'danger':'success'">{{ scope.row.schoolSaudit }}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="出版社审核"
              width="130"
              align="center"
            >
              <template scope="scope">
                <el-tooltip :content="'状态:'+scope.row.pressAudit" placement="top-start">
                  <el-tag :type="scope.row.pressAudit==='未收到纸质表'?'danger':'success'">{{ scope.row.pressAudit }}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              v-if="edit"
              label="是否进入编委预选名单"
              align="center"
            >
              <template scope="scope">
                <el-checkbox v-model="scope.row.isJoinMember"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!edit"
              label="是否主编"
              align="center"
            >
              <template scope="scope">
                <el-tag :type="scope.row.isChiefEditor==='是'?'success':'danger'">{{ scope.row.isChiefEditor}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!edit"
              label="是否副主编"
              align="center"
            >
              <template scope="scope">
                <el-tag :type="scope.row.isSubeditor==='是'?'success':'danger'">{{ scope.row.isSubeditor}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!edit"
              label="是否编委"
              align="center"
            >
              <template scope="scope">
                <el-tag :type="scope.row.isMember==='编委'?'success':'danger'">{{ scope.row.isMember}}</el-tag>
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
        visible:false,
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
        edit:'',
        tableData:[
          {
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            position:'无',
            professionalTitle:'教授',
            jobApplication:'编委',
            schoolSaudit:'已审核',
            pressAudit:'已收到纸质表',
            isJoinMember:false,
            isChiefEditor:'是',
            isSubeditor:'是',
            isMember:'编委'
          },
          {
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'教授',
            jobApplication:'编委',
            schoolSaudit:'已审核',
            pressAudit:'已收到纸质表',
            isJoinMember:false,
            isChiefEditor:'是',
            isSubeditor:'是',
            isMember:'编委'
          },
          {
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'教授',
            jobApplication:'编委',
            schoolSaudit:'未审核',
            pressAudit:'已收到纸质表',
            isJoinMember:false,
            isChiefEditor:'是',
            isSubeditor:'是',
            isMember:'编委'
          },
          {
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'教授',
            jobApplication:'编委',
            schoolSaudit:'已审核',
            pressAudit:'已收到纸质表',
            isJoinMember:false,
            isChiefEditor:'是',
            isSubeditor:'是',
            isMember:'编委'
          }
        ]
      }
    },
    created(){
      // console.log(this.edit)
      if(this.$route.query.edit===1) {
        this.edit=true
      }else {
        this.edit=false
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

<template>
    <div class="teachMaterial">
      <div class="history" ref="history">
        <div class="history-icon" @click="showHistory"></div>
        <div class="history-list" ref="historyList">
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </div>
      <el-row>
        <el-col :span="24">
          <el-col :span="18">
            <el-col>
              <div class="search-title">姓名:</div>
              <el-col :span="4" class="search-10">
                <el-input v-model="input" placeholder="请输入姓名"></el-input>
              </el-col>
              <div class="search-title">申报职位:</div>
              <el-col :span="4" class="search-10">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-button class="btn" type="primary"  icon="search">搜索</el-button>
              <div class="pull-right">
                <el-button class="btn" type="primary" >拟定编委</el-button>
                <el-button class="btn" type="danger" @click="Ldelet" :disabled="isSelected">移除</el-button>
                <el-button class="btn" type="primary" >增加候选人</el-button>
              </div>
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
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="申报账号"
                prop="number"
               >
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
                prop="birthday"
                label="出生年月"
                >
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
                    <el-tooltip :content="'职务:'+scope.row.duty" placement="top-start">
                      <p><i class="fa fa-tags fa-fw"></i> {{scope.row.duty}}</p>
                    </el-tooltip>
                    <el-tooltip :content="'职称:'+scope.row.jobTitle" placement="top-start">
                      <p><i class="fa fa-graduation-cap fa-fw"></i> {{scope.row.jobTitle}}</p>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  label="联系方式"
                  width="200"
                >
                  <template scope="scope">
                    <p><i class="fa fa-phone fa-fw"></i> {{scope.row.mobile}}</p>
                    <p><i class="fa fa-envelope fa-fw"></i> {{scope.row.email}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                >
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="add(scope.$index)">添加</el-button>
                  </template>
                </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="5" class="pull-right">
            <el-col>
              <el-col :span="10" class="search-10">
                <el-input class="fileinput"
                          v-model="input"
                          placeholder="请输入内容"
                          icon="search"
                          :on-icon-click="Search"
                ></el-input>
              </el-col>
              <el-button class="btn" type="primary">保存</el-button>
              <el-button class="btn" type="primary">导出</el-button>
            </el-col>
            <el-table
              :data="tableData1"
              border
              stripe
              max-height="750"
              style="width: 100%">
              <el-table-column
                label="姓名">
                <template scope="scope">
                  <el-tooltip placement="top-start">
                    <div slot="content">申报单位:{{scope.row.applicationOrganization}}<br/>工作单位:{{scope.row.workOrganization}}
                      <br/>职务:{{scope.row.duty}}<br/>职称:{{scope.row.jobTitle}}<br/>电话:{{scope.row.mobile}}<br/>邮箱:{{scope.row.email}}
                    </div>
                    <p>{{scope.row.name}} <i class="fa" :class="scope.row.sex === 0? 'fa-mars' : 'fa-venus'"></i></p>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="delet(scope.$index)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        input:'',
        input1:'',
        showhistory: false,
        multipleSelection: [],
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '主编'
        }, {
          value: '选项3',
          label: '副主编'
        },{
          value: '选项4',
          label: '编委'
        }],
        value: '全部',
        tableData:[
          {
            number:'zhangsan',
            name: '张三',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'lisi',
            name: '李四',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'xiaohong',
            name: '小红',
            sex:1,
            birthday: '1965-06-02',
            applicationOrganization:'成都医科大学',
            workOrganization:'成都医科大学',
            duty: '主任',
            jobTitle: '副教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'wangmazi',
            name: '王麻子',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'wangjie',
            name: '王姐',
            sex:1,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'zhangsan',
              name: '张三',
              sex:0,
              birthday: '1965-06-02',
              applicationOrganization:'四川大学',
              workOrganization:'成都医科大学',
              duty: '无',
              jobTitle: '教授',
              mobile: '1344444444',
              email: '123321@qq.com'
          },
          {
            number:'lisi',
              name: '李四',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'xiaohong',
              name: '小红',
            sex:1,
            birthday: '1965-06-02',
            applicationOrganization:'成都医科大学',
            workOrganization:'成都医科大学',
            duty: '主任',
            jobTitle: '副教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'wangmazi',
              name: '王麻子',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          },
          {
            number:'wangjie',
              name: '王姐',
            sex:1,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          }
        ],
        tableData1:[
          {
            number:'zhangsan',
            name: '张三',
            sex:0,
            birthday: '1965-06-02',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            mobile: '1344444444',
            email: '123321@qq.com'
          }
        ]
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.multipleSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods:{
      // 点击添加
      add(index) {
        this.tableData1.push(this.tableData[index])
        this.$message({
          message: '已成功添加！',
          type: 'success'
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 右边表格移除
      delet(index) {
        this.tableData1.splice(index,1)
        this.$message({
          message: '已成功移除！',
          type: 'success'
        });
      },
      // 左边表格移除
      Ldelet(){
        this.tableData.splice(this.multipleSelection,this.multipleSelection.length)
        this.$refs.multipleTable.clearSelection()
      },
      Search(){
      },
      // 展示历史记录
      showHistory() {
        if(!this.showhistory){
          this.$refs.history.style.right = 0
          this.showhistory = !this.showhistory
        }else{
          this.$refs.history.style.right = `-500px`
          this.showhistory = !this.showhistory
        }
      }
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
  .history{
    position: fixed;
    right:-500px;
    top:50%;
    z-index: 1000;
    width: 500px;
    height: 600px;
    margin-top: -300px;
    /*border:1px solid rgba(42,63,84,.7);*/
    transition: all .28s;
    /*overflow: hidden;*/
  }
  .history-list{
    width: 500px;
    height: 600px;
    background: rgba(42,63,84,.3);
    overflow-y: scroll;
  }
  .history-icon{
    position: absolute;
    left: -17px;
    top:300px;
    margin-top: -57px;
    width: 17px;
    height: 115px;
    cursor: pointer;
    background: url("../../../../common/images/history-icon.png");
  }
</style>

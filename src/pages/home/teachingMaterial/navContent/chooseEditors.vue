<template>
    <div class="teachMaterial">
      <div class="history" ref="history">
        <div class="history-icon" @click="showHistory"></div>
        <div class="history-list" ref="historyList">
        </div>
      </div>
      <el-row>
        <el-col :span="24">
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
            <el-button class="pull-right" type="primary">确认</el-button>
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
            >
              <template scope="scope">
                <el-tooltip :content="scope.row.sex === 0? '男' : '女'" placement="top-start">
                  <p>{{scope.row.name}} <i class="fa" :class="scope.row.sex === 0? 'fa-mars' : 'fa-venus'"></i></p>
                </el-tooltip>
              </template>
            </el-table-column>
              <el-table-column
                label="申报单位"
              >
                <template scope="scope">
                  <el-tooltip :content="'申报单位:'+scope.row.applicationOrganization" placement="top-start">
                    <p><i class="fa fa-university fa-fw"></i> {{scope.row.applicationOrganization}}</p>
                  </el-tooltip>
                </template>
              </el-table-column>
            <el-table-column
              label="工作单位"
            >
              <template scope="scope">
                <el-tooltip :content="'工作单位:'+scope.row.workOrganization" placement="top-start">
                  <p><i class="fa fa-briefcase fa-fw"></i> {{scope.row.workOrganization}}</p>
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
              label="是否主编"
              width="100"
              align="center"
            >
              <template scope="scope">
                <el-checkbox v-model="scope.row.isChiefEditor"  @change="changeChiefEditor(scope.$index)"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="排位"
                             width="80"
                             align="center">
              <template scope="scope">
                <el-input v-model="scope.row.chiefEditorNo" :disabled="!scope.row.isChiefEditor" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="是否副主编"
              width="120"
              align="center">
              <template scope="scope">
                <el-checkbox v-model="scope.row.isSubeditor"  @change="changeSubeditor(scope.$index)"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="排位"
                             width="80"
                             align="center">
              <template scope="scope">
                <el-input v-model="scope.row.subeditorNo" :disabled="!scope.row.isSubeditor" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="是否编委"
              width="120"
              align="center">
              <template scope="scope">
                <el-checkbox v-model="scope.row.isMember"></el-checkbox>
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
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'已审核',
            pressAudit:'已收到纸质表',
            isChiefEditor:false,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:'',
            isMember:true

          },
          {
            name: '李四',
            sex:1,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'已审核',
            pressAudit:'未收到纸质表',
            isChiefEditor:false,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:''
          },
          {
            name: '王二',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'未审核',
            pressAudit:'已收到纸质表',
            isChiefEditor:true,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:''
          },
          {
            name: '张三',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'已审核',
            pressAudit:'已收到纸质表',
            isChiefEditor:false,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:''
          },
          {
            name: '李四',
            sex:1,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'已审核',
            pressAudit:'未收到纸质表',
            isChiefEditor:false,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:''
          },
          {
            name: '王二',
            sex:0,
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            duty: '无',
            jobTitle: '教授',
            jobApplication:'主编',
            schoolSaudit:'未审核',
            pressAudit:'已收到纸质表',
            isChiefEditor:true,
            chiefEditorNo:'',
            isSubeditor:false,
            subeditorNo:''
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 搜索
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
      },
//      change(index,val1,val2) {
//        console.log(this.tableData[index].isChiefEditor,this.tableData[index].isSubeditor)
////        this.tableData[index].isChiefEditor = !this.tableData[index].isChiefEditor
////        this.tableData[index].isSubeditor = !this.tableData[index].isSubeditor
////        if(this.tableData[index].isChiefEditor){
////          this.tableData[index].isSubeditor = false
////          this.tableData[index].isChiefEditor = true
////        }else {
////          this.tableData[index].isSubeditor = true
////          this.tableData[index].isChiefEditor = false
////        }
//      }
      // checkbox实现单选功能
      changeSubeditor(index) {
        if (this.tableData[index].isChiefEditor){
          this.tableData[index].isChiefEditor = false
        }
      },
      changeChiefEditor(index) {
        if (this.tableData[index].isSubeditor){
          this.tableData[index].isSubeditor = false
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

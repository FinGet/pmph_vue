<template>
    <div class="teachMaterial">
      <p class="bookTitle">医学心理学与精神病学（第4版）</p>

      <div class="teachingMaterial-search clearfix">
        <!--姓名搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">姓名：<span></span></div>
          <div class="searchInput">
            <el-input v-model="input" placeholder="请输入姓名"></el-input>
          </div>
        </div>
        <!--申报职位搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">申报职位：<span></span></div>
          <div class="searchInput">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>

        <div class="operation-wrapper">
          <el-button type="primary" @click="dialogVisible = true"> 查看历史记录 </el-button>
          <el-button type="primary">确认</el-button>
          <el-button type="warning">重置</el-button>
        </div>
      </div>

      <div class="table-wrapper">
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
              label="申报单位"
            >
              <template scope="scope">
                <p><i class="fa fa-university fa-fw"></i> {{scope.row.applicationOrganization}}</p>
              </template>
            </el-table-column>
          <el-table-column
            label="工作单位"
          >
            <template scope="scope">
              <p><i class="fa fa-briefcase fa-fw"></i> {{scope.row.workOrganization}}</p>
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
              <el-checkbox v-model="scope.row.isChiefEditor"  @change="changeChiefEditor(scope.$index)"
                           :disabled="!scope.row.edit||$route.query.type=='pres'"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="排位"
                           width="80"
                           align="center">
            <template scope="scope">
              <el-input v-model="scope.row.chiefEditorNo" :disabled="!scope.row.isChiefEditor||!scope.row.edit||$route.query.type=='pres'" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="是否副主编"
            width="120"
            align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.isSubeditor"  @change="changeSubeditor(scope.$index)"
                           :disabled="!scope.row.edit||$route.query.type=='pres'"></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="排位"
                           width="80"
                           align="center">
            <template scope="scope">
              <el-input v-model="scope.row.subeditorNo" :disabled="!scope.row.isSubeditor||!scope.row.edit||$route.query.type=='pres'" size="mini"></el-input>
            </template>
          </el-table-column>

          <el-table-column
            v-if="level<2"
            label="是否编委"
            width="120"
            align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.isMember" @change="changeMember(scope.$index)" :disabled="!scope.row.edit||$route.query.type=='chief'"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <el-dialog
        title="修改记录"
        :visible.sync="dialogVisible">
        <div class="history-box"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        dialogVisible:false,
        level:undefined,
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
            isMember:false

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
            subeditorNo:'',
            isMember:false
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
            subeditorNo:'',
            isMember:false
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
            subeditorNo:'',
            isMember:false
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
            subeditorNo:'',
            isMember:false
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
    created(){
      this.level = this.$route.query.level;
      this.level = this.level?parseInt(this.level):1;

      let type = this.$route.query.type;

      if(type=='pres'){
        this.tableData.map(iterm=>{
          if(iterm.isChiefEditor||iterm.isSubeditor){
            iterm.edit=false;
          }else{
            iterm.edit=true;
          }
        })
      }
      if(type=='chief'){
        this.tableData.map(iterm=>{
          if(iterm.isMember){
            iterm.edit=false;
          }else{
            iterm.edit=true;
          }
        })
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
      // checkbox实现单选功能
      changeSubeditor(index) {
        if (this.tableData[index].isSubeditor){
          this.tableData[index].isChiefEditor = false
          this.tableData[index].isMember = false
        }
      },
      changeChiefEditor(index) {
        if (this.tableData[index].isChiefEditor){
          this.tableData[index].isSubeditor = false
          this.tableData[index].isMember = false
        }
      },
      changeMember(index) {
        if (this.tableData[index].isMember){
          this.tableData[index].isSubeditor = false
          this.tableData[index].isChiefEditor = false
        }
      }
    }
  }
</script>

<style>
  .bookTitle{
    margin: 10px 0 20px;
    font-size: 16px;
    height:36px;
    line-height: 36px;
  }
  .history-box{
    min-height: 400px;
  }
</style>

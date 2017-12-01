<template>
  <div class="teachingMaterial bookSelect">
    <div class="teachingMaterial-search clearfix">
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书名：<span></span></div>
        <div class="searchInput">
          <el-select v-model="booksChooseValue5" multiple placeholder="全部">
            <el-option
              v-for="item in booksChooseOptions"
              :key="item.textBookId"
              :label="item.textbookName"
              :value="item.textBookId">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--进度搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">进度：<span></span></div>
        <div class="searchInput">
          <el-select v-model="currentState" placeholder="全部">
            <el-option
              v-for="item in currentStateList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--姓名搜索-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" :disabled="!hasAccess(6)" @click="isForceEnd">{{forceEnd?'恢复':'强制结束'}}</el-button>
        <el-button type="primary" :disabled="isSelected || !hasAccess(3) || forceEnd" @click="showDialog(1)">批量通过</el-button>
        <el-button type="primary" :disabled="isSelected || !hasAccess(3) || forceEnd" @click="showDialog(0)">批量结果公布</el-button>
        <el-button type="primary">批量导出Excel</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        border
        @selection-change="handleSelectionChange"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="书序"
          width="68">
        </el-table-column>
        <el-table-column
          prop="textbookRound"
          label="版次"
          width="68">
        </el-table-column>
        <el-table-column
          label="书名">
          <template scope="scope">
            {{scope.row.textbookName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="applyNum"
          label="申报数"
          width="80">
        </el-table-column>
        <!--主任 start-->
        <el-table-column
          label="策划编辑"
          width="106">
          <template scope="scope">
            <p v-if="!scope.row.planningEditorName">
              待分配
              <el-tooltip class="item" effect="dark" content="点击选择策划编辑" placement="top">
                <el-button type="text" :disabled="!hasAccess(1) || forceEnd">
                  <i class="fa fa-pencil fa-fw" @click="showEditor(scope.row)"></i>
                </el-button>
              </el-tooltip>
            </p>
            <p v-else>
              {{scope.row.planningEditorName}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="遴选主编/副主编" width="170">
          <template scope="scope">
            <span v-if="scope.row.editorsAndAssociateEditors">{{scope.row.editorsAndAssociateEditors}}</span>
            <span v-else>待遴选</span>
            <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top" v-if="scope.row.state!=2">
              <router-link v-if="!forceEnd" :to="{name:'遴选主编/副主编',query:{bookid:scope.row.textBookId}}">
                <el-button type="text" :disabled="!hasAccess(2)||forceEnd">
                  <i class="fa fa-pencil fa-fw"></i>
                </el-button>
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          label="遴选编委" width="170">
          <template scope="scope">
            <span v-if="scope.row.bianWeis">{{scope.row.bianWeis}}</span>
            <span v-else>待遴选</span>
            <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top" v-if="scope.row.state!=2">
              <router-link v-if="!forceEnd" :to="{name:'遴选主编/副主编',query:{bookid:scope.row.textBookId}}">
                <el-button type="text" :disabled="!hasAccess(3)||forceEnd">
                  <i class="fa fa-pencil fa-fw"></i>
                </el-button>
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--主任 end-->

        <el-table-column
          label="操作">
          <template scope="scope">
            <!-- <el-button type="text" :disabled="true" v-if="scope.row.state==0||scope.row.state==2||scope.row.state>4">名单确认</el-button> -->
            <el-button type="text" :disabled=" forceEnd || scope.row.isLocked || !hasAccess(3)"  @click="showDialog(1,scope.row)">名单确认</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" @click="showDialog(0,scope.row)" :disabled=" forceEnd || scope.row. isPublished || !hasAccess(4)">最终结果公布</el-button>
            <!-- <el-button type="text" :disabled="forceEnd" v-else  v-if="(scope.row.state!=0&&scope.row.state!=2)&&scope.row.state<5">最终结果公布</el-button> -->
            <span class="vertical-line"></span>
            <el-button type="text">导出Excel</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" :disabled="!hasAccess(5) || forceEnd" @click="showGroup(scope.row.id)">创建小组</el-button>
            <!-- <el-button type="text" :disabled="forceEnd" >创建小组</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum>30"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNumber"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <p v-html="dialogContent"></p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="makeSure">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="分配策划编辑" :visible.sync="chooseVisiable2" size="large" top="5%">
      <!-- <Departments ref="department" @add="add" :tableData="proptableData,Multichoice"></Departments>
       -->
       <user-pmph @selection-change="selectChange" ref="userPmph" select radio>
         <div class="operation-wrapper">
           <el-button type="primary" @click="updateEditor">确认</el-button>  
         </div>
       </user-pmph>
    </el-dialog>

    <!-- 小组名单确认 -->
    <el-dialog title="确认小组名单" :visible.sync="groupVisiable" top="5%">
      <el-table
        :data="groupData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <div class="pull-right marginT10 marginB10">
        <el-button @click="groupVisiable=false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>  
    </el-dialog>  
  </div>
</template>
<script type="text/javascript">
  // import Departments from 'components/departments'
  import userPmph from 'components/user-pmph'
  export default{
    data(){
      return{
        api_position_list:'/pmpheep/position/list',
        searchForm:{
          pageNumber:1,
          pageSize:30,
          materialId:'',
          state:'',
          textBookIds: '',
        },
        tableData: [],
        forceEnd:false,
        booksChooseValue5:'',
        booksChooseOptions: [],
        currentState:0,
        currentStateList:[{
          value:0,
          label:'全部'
        },{
          value:1,
          label:'名单未确认'
        },{
          value:2,
          label:'名单已确认'
        },{
          value:3,
          label:'结果已公布'
        },{
          value:4,
          label:'强制结束'
        }],
        dialogVisible:false,
        chooseVisiable2:false,
        groupVisiable: false, // 小组名单
        Multichoice:'', // 是否可以多选，传递给Departments子组件
        dialogContent:'',
        totalNum: 0,
        selectedIds:'',
        method:'',
        currentId: '',
        planningEditor: '',
        selectedBookId:'',
        groupData: [] // 小组名单
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.selectedIds.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods:{
      /**
       * 显示出取人弹出框，
       * @param type 0代表通过按钮，1代表点击结果公布按钮
       * @param data 数据，当为空时代表批量导出或公布
       */
      showDialog(type,data){
        var html = '';
        if(data) {
          this.currentId = data.textBookId
        }
        if(type==1){
          this.method = 'pass'
          html = `您要通过${data?'《'+data.textbookName+'》':'所有选中'}的名单吗？<br/>名单通过后，除您以外的其他编辑和主编将无法继续变动名单`
        }else{
          this.method = 'result'
          html = `您要公布${data?'《'+data.textbookName+'》':'所有选中'}的遴选结果吗？<br/>结果公布后您仍然可以修改名单并再次公布`
        }
        this.dialogContent = html;

        this.dialogVisible=!this.dialogVisible;
      },
      add(){
        this.chooseVisiable2=false;
      },

      /**
       * 获取表格数据
       */
      getTableData(){
        // console.log(this.searchForm)
        this.$axios.get(this.api_position_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.totalNum = res.data.total;
              res.data.rows.map(iterm=>{
                iterm.actualDeadline = this.$commonFun.formatDate(iterm.actualDeadline).split(' ')[0];
                iterm.deadline = this.$commonFun.formatDate(iterm.deadline).split(' ')[0];
              });
              this.tableData = res.data.rows;
              this.booksChooseOptions = res.data.rows
              this.forceEnd = this.tableData[0].forceEnd
            } else if (res.code == 2) {
              this.$message.error(res.msg.msgTrim())
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 搜索
       */
      search(){
        let arr = []
        for (var item of this.booksChooseValue5) {
          arr.push(item)
        }
        this.searchForm.textBookIds = '['+arr.toString()+']'
        this.searchForm.state = this.currentState
        this.getTableData()
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.searchForm.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.searchForm.pageNumber = val
        this.search()
      },
      /**强制结束 */
      isForceEnd(){
        this.forceEnd=!this.forceEnd
        this.$axios.put('/pmpheep/position/updateMaterial',this.$initPostData({
          id: this.searchForm.materialId,
          isForceEnd: this.forceEnd
        })).then(response => {
          let res = response.data
          if(res.code == 1){
            if(this.forceEnd) {
              this.$message.success('已强制结束')
            } else {
              this.$message.success('已恢复')
            }
            this.getTableData()
          }
        })
      },
      handleSelectionChange(val){
        let arr = []
        val.forEach(item => {
          arr.push(item.textBookId)
        })
        this.selectedIds = arr.toString()
      },
      /**
       * 批量通过
       */
      pass(ids){
        this.putApi('/pmpheep/position/updateTextbook',ids)        
      },
      showEditor(data){
        this.chooseVisiable2 = true
        this.selectedBookId = data.textBookId
      },
      /**
       * 分配策划编辑
       */
      updateEditor(){
        this.$axios.put('/pmpheep/textBook/updateEditor',this.$initPostData({
          id: this.selectedBookId,
          planningEditor: this.planningEditor
        })).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.$message.success('操作成功')
            this.chooseVisiable2 = false
            this.getTableData()
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      },
      /**
       * 最终结果公布
      */
      result(ids){
        this.putApi('/pmpheep/position/updateResult',ids)
      },
      /**
       * 弹窗确认触发的方法判断
       */
      makeSure(){
        if (this.method == 'pass') {
          this.pass(this.currentId)
        } else if(this.method == 'result') {
          this.result(this.currentId)
        }
      },
      putApi(url,ids){
        this.$axios.put(url,this.$initPostData({
          ids: ids || this.selectedIds
        })).then(response => {
          let res = response.data
          if(res.code == 1){
            this.dialogVisible = false
            this.$message.success('操作成功')
          } else if(res.code == 3){
            this.$message.success(res.msg.msgTrim())
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      },
      /**@augments index
       * 权限判断
       */
      hasAccess(index){
        return this.$commonFun.materialPower(index);
      },
      /* 选中社内用户*/
      selectChange(val){
        console.log(val)
        this.planningEditor = val[0].id
        console.log(this.planningEditor)
      },
      /**显示小组名单 */
      showGroup(id){
        this.groupVisiable = true
        this.$axios.get('/pmpheep/position/editorList',{
          params:{
            textbookId: id,
            pageSize: 20,
            pageNumber: 1
          }
        }).then(response => {
          let res = response.data
          if (res.code == 1) {
            
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      },
      /**提交小组名单 */
      submitGroup(){
        this.$axios.get('',{
          params:{
            
          }
        }).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.groupVisiable = false
            this.$router.push({name: '小组管理'})
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      }
    },
    created(){
      this.searchForm.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.materialId){
        this.$router.push({name:'通知列表'});
      }
      this.getTableData();
    },
    components:{
      userPmph
    }
  }
</script>
<style>
  .scopeSpan1{
    display: inline-block;
    vertical-align: middle;
  }
  .scopeSpan2{
    display: inline-block;
    vertical-align: middle;
    max-width: 110px;
    padding: 0 0 0 10px;
    text-align: center;
  }
  .scopeSpan3{
    display: inline-block;
    vertical-align: middle;
  }
</style>

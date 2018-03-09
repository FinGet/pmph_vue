<template>
  <div class="teachingMaterial bookSelect">
    <div class="teachingMaterial-search clearfix">
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书名：<span></span></div>
        <div class="searchInput">
          <!-- <el-select v-model="booksChooseValue5" multiple filterable loading-text="正在搜索..."
            remote
            :remote-method="getBooks" :loading="loading" placeholder="全部">
            <el-option
              v-for="item in booksChooseOptions"
              :key="item.textBookId"
              :label="item.textbookName"
              :value="item.textBookId">
            </el-option>
          </el-select> -->
          <!-- <el-input placeholder="请输入" v-model="searchForm.bookName" @keyup.enter.native="search"></el-input> -->
          <el-autocomplete
            class="inline-input input"
            :props="defaultProp"
            v-model="searchForm.bookName"
            :fetch-suggestions="querySearch"
            placeholder="请输入"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </div>
      <!--进度搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">进度：<span></span></div>
        <div class="searchInput">
          <el-select v-model="searchForm.state" placeholder="全部" @change="search">
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
        <el-button :type="forceEnd?'primary':'danger'" :disabled="allTextbookPublished || !hasPower(7,tableData)" @click="isForceEnd">{{forceEnd?'恢复':'强制结束'}}</el-button>
        <el-button type="primary" :disabled="selected.length===0" @click="exportEditor">主编/副主编批量导出</el-button>
        <el-button type="primary" v-if="materialInfo.role==2||materialInfo.role==1" :disabled="forceEnd || isSelected || allTextbookPublished" @click="pushAllChecked()">批量发布主编/副主编</el-button>
        <el-button type="primary" v-else :disabled="isPublished || forceEnd || !hasPower(2,selected)" @click="pushAllChecked()">批量发布主编/副主编</el-button>
        <el-button type="primary" :disabled="isLocked || !hasPower(4,selected) || forceEnd" @click="showDialog(1)">批量名单确认</el-button>
        <el-button type="primary" :disabled=" !hasPower(5,selected) || forceEnd" @click="showDialog(0,null,isLocked)">批量结果公布</el-button>
        <el-button type="primary" :disabled="isSelected" @click="exportExcel()">批量导出名单</el-button>
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
            <p>
              <span v-if="!scope.row.planningEditorName">待分配</span>
              <span v-else>
                {{scope.row.planningEditorName}}
              </span>
              <el-button type="text" v-if="!(!hasAccess(1,scope.row.myPower) || forceEnd || scope.row.allTextbookPublished ||
                (scope.row.isLocked&&materialInfo.role!==2&&materialInfo.role!==1))" @click="showEditor(scope.row)">
                <i class="fa fa-pencil fa-fw"></i>
              </el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="遴选主编/副主编" min-width="170">
          <template scope="scope">
            <span v-if="scope.row.editorsAndAssociateEditors" v-html="scope.row.editorsAndAssociateEditors"></span>
            <span v-else>待遴选</span>
            <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.textBookId,bookname:scope.row.textbookName,type:'zb',
              q:scope.row.myPower,opt:(((scope.row.isLocked&&materialInfo.role!==2&&materialInfo.role!==1)||scope.row.allTextbookPublished||forceEnd)?'view':'edit'),isChiefPublished:scope.row.isChiefPublished}}">
              <el-button type="text">
                <i v-if="(forceEnd||(scope.row.isLocked&&materialInfo.role!==2&&materialInfo.role!==1)||!hasAccess(2,scope.row.myPower)||scope.row.allTextbookPublished)" class="fa fa-eye fa-fw"></i>
                <i v-else class="fa fa-pencil fa-fw"></i>
              </el-button>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column
          label="遴选编委" min-width="170">
          <template scope="scope">
            <span v-if="scope.row.bianWeis" v-html="scope.row.bianWeis"></span>
            <span v-else>待遴选</span>
            <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.textBookId,type:'bw',bookname:scope.row.textbookName,q:scope.row.myPower,
            opt:(((scope.row.isLocked&&materialInfo.role!==2&&materialInfo.role!==1)||scope.row.allTextbookPublished||forceEnd)?'view':'edit'),isChiefPublished:scope.row.isChiefPublished}}">
              <el-button type="text">
                <i v-if="(forceEnd||(scope.row.isLocked&&materialInfo.role!==2&&materialInfo.role!==1)||!hasAccess(3,scope.row.myPower)||scope.row.allTextbookPublished)" class="fa fa-eye fa-fw"></i>
                <i v-else class="fa fa-pencil fa-fw"></i>
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <!--主任 end-->

        <el-table-column
          label="操作" min-width="170">
          <template scope="scope">
            <!-- <el-button type="text" :disabled="true" v-if="scope.row.state==0||scope.row.state==2||scope.row.state>4">名单确认</el-button> -->
            <el-button type="text" :disabled=" forceEnd || !hasAccess(4,scope.row.myPower) || scope.row.allTextbookPublished || scope.row.isPublished ||
             scope.row.isLocked"  @click="showDialog(1,scope.row)">{{scope.row.isLocked?'已确认':'名单确认'}}</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" @click="showDialog(0,scope.row,scope.row.isLocked)" :disabled=" forceEnd || (scope.row.isPublished && !scope.row.repub) ||
             !hasAccess(5,scope.row.myPower) || scope.row.allTextbookPublished">
              {{(scope.row.isPublished && !scope.row.repub)?'已公布':(scope.row.isPublished && scope.row.repub)?'再次公布':'最终结果公布'}}</el-button>
            <!-- <el-button type="text" :disabled="forceEnd" v-else  v-if="(scope.row.state!=0&&scope.row.state!=2)&&scope.row.state<5">最终结果公布</el-button> -->
            <span class="vertical-line"></span>
            <el-button type="text" @click="exportExcel(scope.row.textBookId)">导出名单</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" :disabled="!hasAccess(6,scope.row.myPower) || forceEnd" @click="showGroup(scope.row.textBookId,scope.row.groupId)">
              {{scope.row.groupId==null?'创建小组':'更新成员'}}</el-button>
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
        :page-sizes="[10,20,30,40]"
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

    <el-dialog title="分配策划编辑" :visible.sync="chooseVisiable2" @close="cleartable" size="large" top="5%">
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
          prop="realname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="工作单位">
        </el-table-column>
        <!-- <el-table-column
          prop="presetPosition"
          label="申报职位">
          <template scope="scope">
            <p></p>
          </template>
        </el-table-column> -->
        <el-table-column
          label="遴选职位">
          <template scope="scope">
            <p>
              {{positionList[scope.row.chosenPosition]}}
              </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="presetPosition"
          label="是否数字编委">
          <template scope="scope">
            <p>{{scope.row.isDigitalEditor?'是':'否'}}</p>
          </template>
        </el-table-column> -->
        <el-table-column
          prop=""
          width="80"
          align="center"
          label="操作">
          <template scope="scope">
            <el-button type="text"  class="delete"  @click="deleteMember(scope.$index,groupData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pull-right marginT10 marginB10">
        <el-button @click="groupVisiable=false">取消</el-button>
        <el-button type="primary" @click="submitGroup">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  // import Departments from 'components/departments'
  import userPmph from 'components/user-pmph'
  import bus from 'common/eventBus/bus.js'
  export default{
    props:['materialInfo'],
    data(){
      return{
        api_position_list:'/pmpheep/position/list',
        api_pushAll_check:'/pmpheep/declaration/batchPublishEditor',    //批量发布主编副主编url
        searchForm:{
          pageNumber:1,
          pageSize:30,
          materialId:'',
          state:'',
          textBookIds: '',
          bookName:''
        },
        tableData: [],
        forceEnd:false, // 是否强制结束
        booksChooseValue5:'',
        booksChooseOptions: [],
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
        }],
        dialogVisible:false,
        chooseVisiable2:false,
        groupVisiable: false, // 小组名单
        Multichoice:'', // 是否可以多选，传递给Departments子组件
        dialogContent:'',
        totalNum: 0,
        selectedIds:'', // 选择项的ids
        materialId:'', // 教材id
        selected:'', // 选中项
        method:'',
        currentId: '', // 当前id
        planningEditor: '',
        selectedBookId:'',
        groupData: [], // 小组名单
//        myPower:'', // 权限码
        defaultProp:{
          value: 'textbookName',
          label: 'textbookName'
        },
        bookNames:[],
        allTextbookPublished: false, // 是否所有书籍都公布
        positionList:['','编委','副主编','副主编，编委','主编','主编，编委','主编，副主编','主编，副主编，编委','数字编委','编委，数字编委','副主编，数字编委','副主编，编委，数字编委','主编，数字编委','主编，编委，数字编委','主编，副主编，数字编委','主编，副主编，编委，数字编委'],
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来是否可以点击
       * @returns {boolean}
       */
       isSelected() {
        if (this.selected.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      isPublished() {
        let arr = [];
        if (this.selected.length > 0){
          this.selected.forEach(item => {
            arr.push(item.isPublished);
          });
          return arr.some(x=>{
            return x == true;
          })
        } else {
          console.log(3);
          return true;
        }
      },
      isLocked() {
        let arr = [];
        if (this.selected.length > 0){
          this.selected.forEach(item => {
            console.log(item.isLocked);
            arr.push(item.isLocked);
          });
          return arr.some(x=>{
            return x == true;
          })
        } else {
          console.log(3);
          return true;
        }
      }
    },
    methods:{
      /**
       * 显示出取人弹出框，
       * @param type 0代表通过按钮，1代表点击结果公布按钮
       * @param data 数据，当为空时代表批量导出或公布
       */
      showDialog(type,data,isLocked){
        var html = '';
        if(data) {
          this.currentId = data.textBookId
        }
        if(type==1){
          this.method = 'pass'
          html = `您要通过${data?'《'+data.textbookName+'》':'所有选中'}的名单吗？<br/>名单确认后，只有当前教材指定的主任可以修改`
        }else{
          if (isLocked) {
            this.method = 'result'
            html = `您要公布${data?'《'+data.textbookName+'》':'所有选中'}的遴选结果吗？<br/>结果公布后，只有当前教材指定的主任可以修改名单并再次公布`
          } else {
            this.$message.error('还未进行名单确认，不能公布！');
            return;
          }
        }
        this.dialogContent = html;

        this.dialogVisible=!this.dialogVisible;
      },
      add(){
        this.chooseVisiable2=false;
      },
      /**获取书籍名称 */
      getBookName(){
         this.$axios.get('/pmpheep/position/getTextbookName',{params:{
           materialId:this.searchForm.materialId
         }}).then(response=>{
            var res = response.data;
            if(res.code==1){
              this.bookNames = res.data;
            } else if (res.code == 2) {
              this.$message.error(res.msg.msgTrim())
            }
          })
          .catch(e=>{
            console.log(e);
          })
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
              if(this.tableData.length){
                this.forceEnd = this.tableData[0].forceEnd;
                this.allTextbookPublished = this.tableData[0].allTextbookPublished;
                console.log(this.allTextbookPublished);
                this.myPower = this.tableData[0].myPower;
              }
            } else if (res.code == 2) {
              this.$message.error(res.msg.msgTrim())
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**远程搜索 */
      querySearch(queryString,cb){
        var restaurants = this.bookNames;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.textbookName.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      /**选中远程搜索项，则触发搜索 */
      handleSelect(item) {
       this.getTableData();
      },
      /**
       * 搜索
       */
      search(){
        this.searchForm.pageSize = 30;
        this.searchForm.pageNumber = 1;
        this.getTableData();
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.searchForm.pageSize = val;
        console.log(this.searchForm.pageSize);
        this.getTableData();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.searchForm.pageNumber = val
        this.getTableData();
      },
      /**强制结束 */
      isForceEnd(){
        var title = ''
        if (!this.forceEnd) {
          title =  '确定结束本教材的遴选？'
        } else {
          title = '确定恢复本教材的遴选'
        }
        this.$confirm(title,"提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
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
              bus.$emit('material:update-info');
            }
          })
        })

      },
      handleSelectionChange(val){
        let arr = []
        val.forEach(item => {
          arr.push(item.textBookId)
        })
        this.selectedIds = arr.toString();
        this.selected = val;
      },
      /* 批量发布主编副主编*/
      pushAllChecked(){
        this.$confirm('确定批量发布主编/副主编?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
            this.$axios.put(this.api_pushAll_check,this.$commonFun.initPostData({
              textbookIds:this.selectedIds
            }))
            .then((res)=>{
              console.log(res);
              if(res.data.code==1){
                      this.$message.success('发布成功');
              }else{
                 this.$message.error(res.data.msg.msgTrim());
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
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
          ids: ids || this.selectedIds,
          materialId: this.materialId
        })).then(response => {
          let res = response.data
          if(res.code == 1){
            this.dialogVisible = false
            this.$message.success('操作成功')
            this.getTableData()
            //更新教材信息
            bus.$emit('material:update-info');
          } else{
            this.$message.error(res.msg.msgTrim())
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      },
      /**@augments index
       * 权限判断
       */
      hasAccess(index,list){
        return this.$commonFun.materialPower(index,list);
      },
      hasPower(index,data){
        var arr = [];
        var list = '';
        if (data.length > 0){
          data.forEach(item => {
            arr.push(item.myPower);
          });
          arr.forEach(item => {
            if (item[index] == 1) {
              list = item;
            }
          });
          if (list == '') {
            return false;
          } else {
            return this.$commonFun.materialPower(index,list);
          }
        } else {
          return false;
        }
      },
      /* 选中社内用户*/
      selectChange(val){
        console.log(val)
        if (val[0]) {
          this.planningEditor = val[0].id
        }
        console.log(this.planningEditor)
      },
      /** 清空 选中项 */
      cleartable(){
        this.$refs.userPmph.clear()
      },
      /**显示小组名单 */
      showGroup(id,type){
        this.currentId = id
        if(!type){
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
              this.groupData = res.data.rows
            }
          }).catch(err => {
            this.$message.error('操作失败，请稍后再试')
          })
        } else {
          this.addEditor();
        }
        // console.log(id)

      },
      /**提交小组名单 */
      submitGroup(){
        if(this.groupData.length==0){
          this.$message.error('小组名单不能为空');
          return ;
        }
        this.groupData.forEach(item => {
          item.isWriter = true
        })
        this.$axios.post('/pmpheep/group/addEditorGroup',this.$initPostData({
          textbookId: this.currentId,
          pmphGroupMembers: JSON.stringify(this.groupData),
          sessionId: this.$getUserData().sessionId
        })).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.groupVisiable = false
            this.$router.push({name: '小组管理'})
          }
        }).catch(err => {
          this.$message.error('操作失败，请稍后再试')
        })
      },
      /**更新小组 */
      addEditor(){
        this.$axios.post('/pmpheep/group/addEditors',this.$initPostData({
          textbookId: this.currentId,
          // pmphGroupMembers: JSON.stringify(this.groupData),
          sessionId: this.$getUserData().sessionId
        })).then(response => {
          let res = response.data;
          if (res.code == 1) {
            this.$message.success('更新成功！');
          }else {
            this.$message.error(res.msg.msgTrim());
          }
        })
      },
      /** 导出Excel */
      exportExcel(id){
        // console.log(id,this.selectedIds)
        let url = '/pmpheep/chosenPosition/exportExcel/?textbookIds='+ (id || this.selectedIds);
        // console.log(url)
        this.$commonFun.downloadFile(url);
      },
      /**批量导出主编 */
      exportEditor(){
        let url = '/pmpheep/position/exportEditors/?textbookIds=' + this.selectedIds;
        // console.log(url)
        this.$commonFun.downloadFile(url);
      },
      /**删除成员 */
      deleteMember(index, rows){
        rows.splice(index, 1);
      }
    },
    created(){
      // console.log(this.materialInfo);
      this.searchForm.materialId = this.$route.params.materialId;
      this.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.materialId){
        this.$router.push({name:'通知列表'});
      }
      this.getTableData();
      this.getBookName();

      if(window._hmt){
        _hmt.push(['_trackPageview', '/material-application/1v3']);
      }
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
  .delete{
    color:red;
  }
  .input{
    width: 100%;
  }
</style>

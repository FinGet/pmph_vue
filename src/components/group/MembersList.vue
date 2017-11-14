/*成员列表组件*/
<template>
  <div class="memberlist-wrpper">
    <div class="meberlist-inner">
      <div class="head-title">
        <p>
          小组成员
          <!--<span class="pull-right" @click="settingClick">-->
          <!--<i class="fa fa-cog fa-lg"></i>-->
          <!--</span>-->
        </p>
      </div>
      <div class="meberlist">
        <beauty-scroll ref="beautyScroll">
          <div class="MemberHead" v-for="(item,index) in memberListData" :key="item.id">
            <div class="MemberHead-inner">
              <span class="MemberHeadImg">
                <img :src="item.avatar?$config.DEFAULT_BASE_URL+item.avatar:defaultImage" alt="小组头像">
              </span>
              <div class="MemberHeadName">
                <span>{{item.displayName}}</span>
              </div>
              <span class="memberPermission" :style="{color:item.isFounder?'#FAB727':'#67BB4C'}">
                <el-tooltip class="item" effect="dark" content="创建者" placement="top" v-if="item.isFounder">
                  <i class="fa fa-user fa-lg"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="管理员" placement="top" v-if="item.isAdmin">
                  <i class="fa fa-user fa-lg"></i>
                </el-tooltip>
              </span>
            </div>
          </div>
        </beauty-scroll>
      </div>
      <transition name="el-fade-in">
        <div class="addMemberWrapper text-center" v-if="crurrentMemberInfo.isFounder||crurrentMemberInfo.isSystemAdmin||crurrentMemberInfo.isAdmin">
          <el-button type="text" icon="plus" @click="addNewMember" class="button">
            新增成员
          </el-button>
        </div>
      </transition>
    </div>

    <!--新增成员弹窗-->
    <el-dialog :visible.sync="dialogVisible" size="large" top="30px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="作家用户" name="first">
          <div class="tabsContainer">

            <div class="searchBox-wrapper">
              <span>账号/姓名：</span>
              <div>
                <el-input placeholder="请输入内容" v-model="writerParams.name" class="searchInputEle"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper">
              <span>所属院校：</span>
              <div>
                <el-input placeholder="请输入内容" v-model="writerParams.orgName" class="searchInputEle"></el-input>
              </div>
            </div>
            <div class="searchBox-wrapper">
              <span>用户类型：</span>
              <div>
                <el-select v-model="writerParams.rank" placeholder="请选择" @change="getWriterUserList">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="searchBtn-wrapper text-right">
              <el-button type="primary" icon="search" @click="getWriterUserList">搜索</el-button>
            </div>
            <div class="tableContainer groupmanageTable">
              <el-table ref="writerUserTable"
              :data="writerTableData"
              border tooltip-effect="dark"
              @selection-change="writerCheckChange"
              style="width: 100%;margin-bottom:20px;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="realname" label="姓名">
                </el-table-column>
                <el-table-column prop="username" label="账号">
                </el-table-column>
                <el-table-column prop="position" label="遴选职位">
                </el-table-column>
                <el-table-column prop="orgName" label="所属院校" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pull-right"
              :page-sizes="[10, 20,30, 50, 100]"
              :current-page.sync="writerParams.pageNumber"
              @size-change="writerSizeChange"
              @current-change="writerCurrentChange"
              v-if="writerPageTotal>writerParams.pageSize"
              :page-size="writerParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="writerPageTotal">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社内用户" name="second">
          <el-row>
            <el-col :span="6">
              <el-tree
              :data="treeData"
              :highlight-current='true'
              :props="defaultProps"
              @node-click="handleNodeClick"
              node-key="id"
              :default-expanded-keys="[92]"></el-tree>
            </el-col>
            <el-col :span="17" :offset="1">
              <el-col class="marginB10">
                <span class="pull-left s-title">账号/姓名:</span>
                <el-col :span="4">
                  <el-input placeholder="请输入" v-model="searchVal"></el-input>
                </el-col>
                <el-button type="primary" icon="search" class="marginL10" @click="getClubUserData">搜索</el-button>
              </el-col>
              <el-table ref="multipleTable"
              :data="usersData"
              border tooltip-effect="dark"
              @selection-change="clubUserSelectChange"
               style="width: 100%;margin-bottom:20px;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="姓名" width="110" prop="realname">
                </el-table-column>
                <el-table-column prop="username" label="账号" width="120">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role" label="角色名称">
                </el-table-column>
                <el-table-column prop="handphone" label="手机号">
                </el-table-column>
              </el-table>
              <el-pagination class="pull-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNumber"
              :page-sizes="[10, 20,30, 50, 100]"
              v-if="dataTotal>pageSize"
              :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="dataTotal">
              </el-pagination>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAddDialog" >添加成员</el-button>
      </span>
    </el-dialog>

    <!-- 再次确认弹框 -->
     <el-dialog :visible.sync="againDialogVisible" size="tiny" top="30px" >
          <el-table
          border
          :data="addTableData"
          style="width:100%;"
          >
          <el-table-column
        prop="realname"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="realname"
        label="是否作家用户"
        >
        <template scope="scope">
          {{scope.row.isWriter?"是":"否"}}
          </template>
      </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
       <el-button @click="againDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewSubmit">确 定</el-button>
  </div>
     </el-dialog>
  </div>
</template>

<script>
import beautyScroll from 'components/beautyScroll.vue';
import bus from 'common/eventBus/bus.js'
export default {
  props: ['groupId','refreshMember','crurrentMemberInfo'],
  data() {
    return {
      dialogVisible: false,
      groupMemberUrl: '/group/list/pmphgroupmember',  //获取小组成员url
      writerUserUrl: '/users/writer/list/writeruser',  //获取作家用户url
      clubUserUrl:'users/pmph/list/pmphuser',  //获取社内用户url
      clubTreeUrl:'users/pmph/list/pmphdepartment',//获取社内用户成员树url
      addMemberUrl:'/group/add/pmphgroupmember',  //添加小组成员url
      writerParams: {
        orgName: '',
        name: '',
        rank: '',
        pageSize: 10,
        pageNumber: 1
      },
      writerPageTotal:0,
      addMemberArr:[],
      defaultImage: this.$config.DEFAULT_USER_IMAGE,
      memberListData: [],
      /**
       * 新增小组成员的弹窗数据
       */
      activeName: 'first',
      writerTableData: [],
      selectValue: '',
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '教师用户'
      }, {
        value: '2',
        label: '作家用户'
      }, {
        value: '3',
        label: '专家用户'
      }],
      defaultProps: {
        children: 'sonDepartment',
        label: 'dpName'
      },
      treeData:[],
      searchVal:'',
      path:'',
      departmentId:'',
      pageNumber:1,
      pageSize:10,
      dataTotal:0,
      usersData:[],
      againDialogVisible:false,     //再次确认弹窗
      addWriterData:[],
      addClubData:[],
      addTableData:[],
    }
  },
  methods: {
    /* 获取小组成员列表 */
    getGroupMember(val){
        var _this = this;

      this.$axios.get(this.groupMemberUrl, {
        params: {
          groupId: val,
          sessionId: this.$getUserData().sessionId
        }
      }).then(function(res) {
        if (res.data.code == 1) {
          _this.memberListData = res.data.data;
          _this.$emit('getGroupMemberList',res.data.data);
        }
      })
    },
    /* 获取作家用户列表 */
    getWriterUserList() {
       var _this = this;
      this.$axios.get(this.writerUserUrl, {
        params: this.writerParams
      }).then(function(res) {
        if(res.data.code==1){
          _this.writerTableData=res.data.data.rows;
          _this.writerPageTotal= res.data.data.total;
        }
      })
    },
    /* 切换作家用户选中状态时 */
    writerCheckChange(arr){
      var _this=this;
      this.addWriterData=[];
       arr.forEach(function(item){
         item.isWriter=true;
         _this.addWriterData.push(item);
       })
    },
    /* 切换社内用户选中状态 */
    clubUserSelectChange(arr){
      var _this=this;
      this.addClubData=[];
      arr.forEach(function(item){
         _this.addClubData.push(item);
       })
    },
    showAddDialog(){
     this.addTableData=this.addWriterData.concat(this.addClubData);
     this.againDialogVisible=true;
    },
    /* 添加小组成员 */
    addNewSubmit(){
     var subArr=[];
     this.addTableData.forEach(function(item){
        var obj=new Object();
           obj.userId=item.id;
           obj.isWriter=item.isWriter?item.isWriter:false;
           subArr.push(obj);
     })
     this.$axios({
       method:'POST',
       url:this.addMemberUrl,
       data:this.$initPostData({
       groupId:this.groupId,
       pmphGroupMembers:JSON.stringify(subArr),
       sessionId:this.$getUserData().sessionId,
     })
     }
       ).then((res)=>{
          if(res.data.code==1){
               this.getGroupMember(this.groupId);
               this.againDialogVisible=false;
               this.dialogVisible=false;
               this.$emit('refreshMange');
               this.$message.success('添加成功');
          }else{
            this.$message.error('添加失败');
          }
     })
    },
    /* 获取社内用户列表 */
    getClubUserData(){
     this.$axios.get(this.clubUserUrl, {
          params: {
            name: this.searchVal,
            path: this.path,
            departmentId:this.departmentId,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data
          this.dataTotal = res.data.total
          if (res.code == '1') {
            this.usersData=res.data.rows
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: '没有这条数据!',
                type: 'warning'
              });
            }
          }
        }).catch((error) => {
        })
    },
    /* 获取社内用户树列表 */
    getTreeData(){
     this.$axios.get(this.clubTreeUrl).then((response) => {
          let res = response.data
          console.log(res);
          if (res.code == '1') {
            this.treeData = res.data.sonDepartment;
            console.log(this.treeData);
          }
        }).catch((error) => {
        })
    },
    /* 社内用户树点击操作 */
    handleNodeClick(data) {
      console.log(data);
      console.log(data.path);
      this.path = data.path;
      this.departmentId=data.id;
        if (data.path == '0') {
          this.path = ''
        }
        this.pageSize=10;
         this.pageNumber=1;
      this.getClubUserData();
    },
    /* 社内用户切换分页条数 */
    handleSizeChange(val) {
      this.pageSize=val;
      this.pageNumber=1;
      this.getClubUserData();
    },
    /* 作家用户切换分页条数 */
    writerSizeChange(val){

      this.writerParams.pageSize=val;
      this.writerParams.pageNumber=1;
      this.getWriterUserList();
    },
    /* 作家用户切换当前页数 */
    writerCurrentChange(val){
      this.writerParams.pageNumber=val;
      this.getWriterUserList();
    },
    /* 社内用户切换当前页数 */
    handleCurrentChange(val) {
      this.pageNumber=val;
      this.getClubUserData();
    },
    /* 点击新增成员按钮 */
    addNewMember(){
     this.dialogVisible=true;
     this.getWriterUserList();
    this.getClubUserData();
    this.getTreeData();
    },
    /**
     *  当页面左侧导航区域展开和收起时执行此方法
     */
    handleSideBarFlod(){
      this.$refs.beautyScroll.refresh(280);
    }
  },
  components: {
    beautyScroll
  },
  watch: {

    /* 监测小组id的变化 */
    groupId(newVal, old) {
      this.getGroupMember(newVal);
    },
    refreshMember(){
      this.getGroupMember(this.groupId);
    }
  },
  created(){
    if(this.groupId){
      this.getGroupMember(this.groupId);
    }

  },
  mounted(){
    /**
     * 当左侧导航栏收起或展开式要重新刷新beautyScroll
     */
    bus.$on('side-bar:flod_unflod',this.handleSideBarFlod)
  },
}
</script>

<style scoped>
.memberlist-wrpper {
  height: 100%;
  padding-top: 77px;
  overflow: hidden;
  box-sizing: border-box;
}

.meberlist-inner {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding: 42px 0;
  border-top: 1px solid #e6e7e8;
  border-left: 1px solid #e6e7e8;
}

.head-title {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 10px 10px;
}

.head-title i {
  cursor: pointer;
}

.addMemberWrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  color: #fff;
  border-top: 1px solid #c8c8c8;
  background-color: #e9e9e9;
  z-index: 10;
}

.meberlist {
  height: 100%;
}

.meberlist>div {
  box-sizing: border-box;
  position: relative;
  padding-left: 0;
}

.memberSetting>div {
  padding-left: 30px;
}

.meberlist-checkBox {
  position: absolute;
  top: 50%;
  left: 10px;
  margin-top: -12px;
}


/*成员*/

.MemberHead {
  height: 48px;
  cursor: pointer;
}

.MemberHead:hover {
  /*background: #DDDDDE;*/
}

.MemberHead.active {
  background: #C8C6C6;
}

.MemberHead.firstIterm {
  background: rgb(219, 217, 216);
}

.MemberHead-inner {
  position: relative;
  padding: 5px 42px 5px 46px
}

.MemberHeadImg {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
}

.MemberHeadImg>img {
  display: block;
  width: 100%;
}

.MemberHeadName {
  font-size: 14px;
  line-height: 38px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.memberPermission {
  position: absolute;
  right: 14px;
  top: 16px;
}


/*新增成员弹窗样式*/

.btn-wrapper {
  margin-top: 20px;
}

.tabsContainer el-input {
  display: inline-block;
}

.searchBox-wrapper {
  box-sizing: border-box;
  display: inline-block;
  max-width: 320px;
  padding: 0 10px;
  margin-bottom: 6px;
}

.searchBox-wrapper>span {
  float: left;
  line-height: 36px;
  width: 90px;
  vertical-align: middle;
}

.searchBox-wrapper>div {
  margin-left: 90px;
  box-sizing: border-box;
}

.searchBtn-wrapper {
  margin-bottom: 16px;
}

.s-title {
  line-height: 36px;
  margin-right: 10px;
}
</style>

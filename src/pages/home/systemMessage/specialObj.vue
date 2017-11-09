<template>
  <div class="special_obj">
    <!--操作按钮-->
    <div class="operation-wrapper">
      <el-button type="primary" @click="back">返回编辑</el-button>
      <span class="green inline-block marginR10">已选中<span>{{hasSelect.length}}</span>个人</span>
      <el-button type="primary" @click="send" :disabled="clubSelectData.length==0&&writerSelectData.length==0&&orgSelectData.length==0">发送</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="社内用户" name="first">
        <el-row>
          <el-col :span="6">
            <el-tree :data="treeData"
                     :props="defaultProps"
                     :highlight-current='true'
                     @node-click="handleNodeClick"
                     node-key="id"
                     :default-expanded-keys="[1]"
            ></el-tree>
          </el-col>
          <el-col :span="17" :offset="1">
            <el-col class="marginB10">
              <span class="pull-left s-title">账号/姓名:</span>
              <el-col :span="4">
                <el-input placeholder="请输入" v-model="clubUserParams.name"></el-input>
              </el-col>
              <el-button type="primary" icon="search" class="marginL10" @click="getClubUserData">搜索</el-button>
            </el-col>
            <el-table
              ref="multipleTable"
              :data="clubUsersData"
              border
              @selection-change="clubSelectChange"
              tooltip-effect="dark"
              style="width: 100%;margin-bottom:20px;"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="姓名"
                width="120"
                prop="realname">
              </el-table-column>
              <el-table-column
                prop="username"
                label="账号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="角色名称"
              >
              </el-table-column>
              <el-table-column
                prop="handphone"
                label="手机号"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              @size-change="clubSizeChange"
              @current-change="clubCurrentChange"
              :current-page="clubUserParams.pageNumber"
              :page-sizes="[10, 20, 30, 50, 100]"
              v-if="clubDataTotal>clubUserParams.pageSize"
              :page-size="clubUserParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="clubDataTotal">
            </el-pagination>
          </el-col>
        </el-row>

      </el-tab-pane>


      <el-tab-pane label="作家用户" name="two">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>账号/姓名：</span>
            <div>
              <el-input placeholder="请输入内容" v-model="writerUserParams.name" class="searchInputEle "></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>所属院校：</span>
            <div>
              <el-input placeholder="请输入内容" v-model="writerUserParams.orgName" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>用户类型：</span>
            <div>
              <el-select v-model="writerUserParams.rank" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search" @click="getWriterUserData">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="writerTableData"
              border
              @selection-change="writerSelectChange"
              tooltip-effect="dark"
              style="width: 100%;margin-bottom:20px;">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="username"
                label="账号">
              </el-table-column>
              <el-table-column
                prop="position"
                label="遴选职位">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="工作单位"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              @size-change='writerSizeChange'
              @current-change="writerCurrentChange"
              :current-page="writerUserParams.pageNumber"
              v-if="writerPageTotal>writerUserParams.pageSize"
              :page-sizes="[10,20, 30, 50, 100]"
              :page-size="writerUserParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="writerPageTotal">
            </el-pagination>

          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="机构用户" name="three">
        <div class="tabsContainer">
          <div class="searchBox-wrapper">
            <span>学校名称：</span>
            <div>
              <el-input placeholder="请输入内容" v-model="orgUserParams.orgName" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>机构代码：</span>
            <div>
              <el-input placeholder="请输入内容" v-model="orgUserParams.username" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper">
            <span>管理员姓名：</span>
            <div>
              <el-input placeholder="请输入内容" v-model="orgUserParams.realname" class="searchInputEle"></el-input>
            </div>
          </div>
          <div class="searchBtn-wrapper">
            <el-button  type="primary" icon="search" @click="getOrgUserData">搜索</el-button>
          </div>
          <div class="tableContainer groupmanageTable">
            <el-table
              ref="multipleTable"
              :data="orgTableData"
              border
              tooltip-effect="dark"
              @selection-change="orgSelectChange"
              style="width: 100%;margin-bottom:20px;">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="学校名称">
              </el-table-column>
              <el-table-column
                prop="username"
                label="机构代码">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="管理员姓名">
              </el-table-column>
            </el-table>
             <el-pagination
              class="pull-right"
              @size-change="orgSizeChange"
              @current-change="orgCurrentChange"
              :current-page.sync="orgUserParams.pageNumber"
              v-if="orgPageTotal>orgUserParams.pageSize"
              :page-sizes="[10,20, 30, 50, 100]"
              :page-size="orgUserParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="orgPageTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clubTreeUrl: "users/pmph/list/pmphdepartment", //获取社内用户成员树url
      clubUserUrl: "users/pmph/list/pmphuser", //获取社内用户url
      writerUserUrl: '/users/writer/list/writeruser',  //获取作家用户url
      orgUserUrl:'/users/org/list/orguser',  //获取机构用户url
      clubUserParams: {
        name: "",
        path: "",
        departmentId: '' ,
        pageNumber: 1,
        pageSize: 10,
      },
      clubDataTotal: 1,
      clubUsersData: [],
      clubSelectData:[], //社内用户选中
      writerSelectData:[],//作家用户选择
      orgSelectData:[], //机构用户选中
      hasSelect: [], //已选中人员数据列表
      writerUserParams:{
        name:'',
        orgName:'',
        rank:'',
        pageSize:10,
        pageNumber:1
        },
      writerTableData:[],
      writerPageTotal:0,
      orgUserParams:{
        username:'',
        orgName:'',
        realname:'',
        pageSize:10,
        pageNumber:1
      },
      orgTableData:[],
      orgPageTotal:0,
      activeName: "first",
      selectValue: "",
      options:[{
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
      treeData: [],
      tableData2: [],
      //点击发送时所带参数
      formdata:{
        title:'',
        content:'',
        file:'',
        sendType:3,
        orgIds:'',
        userIds:'',
        bookIds:'',
      },
      type:'new',
      reissueFormData:{
        id:'',
        title:'',
        content:'',
        file:'',
        sendType:3,
        orgIds:'',
        userIds:'',
        bookIds:'',
      },
    };
  },
  methods: {
    send() {
      var self = this;
      var userList = [];
      var url = this.type=='reissue'?'/messages/message/again':'/messages/message/new';
      var data = this.type=='reissue'?this.reissueFormData:this.formdata;
      /**
       * 这里先写死，社内用户的userType=1,作家用户的userType=2,机构用户的userType=3
       * */
      this.clubSelectData.forEach(iterm=>{
        userList.push('1_'+iterm.id)
      });
      this.writerSelectData.forEach(iterm=>{
        userList.push('2_'+iterm.id)
      });
      this.orgSelectData.forEach(iterm=>{
        userList.push('3_'+iterm.id)
      });

      data.userIds=userList.join(',');
      data['sessionId']=this.$getUserData().sessionId;
      // console.log(this.formdata)
      this.$axios.post(url,this.$initPostData(data))
        .then(function (response) {
          let res = response.data;
          if(res.code===1){
            self.$message.success('发布成功！');
            self.$router.push({name: '消息列表'});
          }
        })
        .catch(function (error) {
          self.$message({
            type:'error',
            message:'发布失败，请重试'
          });
        });
    },

    /* 获取社内用户树列表 */
    getTreeData() {
      this.$axios
        .get(this.clubTreeUrl)
        .then(response => {
          let res = response.data;
          if (res.code == "1") {
            this.treeData = res.data.sonDepartment;
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    },
    /* 获取社内用户列表 */
    getClubUserData() {
      this.$axios
        .get(this.clubUserUrl, {
          params: this.clubUserParams
        })
        .then(response => {
          let res = response.data;
          this.clubDataTotal = res.data.total;
          if (res.code == "1") {
            this.clubUsersData = res.data.rows;
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: "没有这条数据!",
                type: "warning"
              });
            }
          }
        })
        .catch(error => {
          console.log(error.msg);
        });
    },
    /* 获取作家用户列表 */
    getWriterUserData(){
      this.$axios.get(this.writerUserUrl, {
        params: this.writerUserParams
      }).then((res)=> {
        if(res.data.code==1){
          this.writerTableData=res.data.data.rows;
          this.writerPageTotal= res.data.data.total;
        }
      })
    },
    /* 获取机构用户列表 */
    getOrgUserData(){
       var self= this;
            // 为给定 ID 的 user 创建请求
            this.$axios.get(this.orgUserUrl,{params:this.orgUserParams})
              .then((response)=> {
                console.log(response);
                let res = response.data;
                let data = res.data.rows;
                this.orgTableData=data;
                this.orgPageTotal = res.data.total;
              })
              .catch( (error)=> {
                console.error(error);
              });
    },
    /* 点击社内用户树 */
    handleNodeClick(data) {
      console.log(data);
      this.clubUserParams.path = data.path;
      if (data.path == "0") {
        this.clubUserParams.path = "";
      }
      this.clubUserParams.departmentId = data.id;
      this.clubUserParams.pageNumber = 1,
      this.clubUserParams.pageSize = 10,
      this.getClubUserData();
    },
    /* 社内用户分页size改变 */
    clubSizeChange(el) {
      this.clubUserParams.pageSize = el;
      this.clubUserParams.pageNumber = 1;
      this.getClubUserData();
    },
    /* 社内用户点击分页 */
    clubCurrentChange(el) {
      this.clubUserParams.pageNumber = el;
      this.getClubUserData();
    },
    /* 作家用户分页size改变 */
    writerSizeChange(el){
       this.writerUserParams.pageSize=el;
       this.writerUserParams.pageNumber=1;
       this.getWriterUserData();
    },
    /* 作家用户点击分页 */
    writerCurrentChange(el){
       this.writerUserParams.pageNumber=el;
       this.getWriterUserData();
    },
    /* 机构用户size改变 */
    orgSizeChange(el){
       this.orgUserParams.pageSize=el;
       this.orgUserParams.pageNumber=1;
       this.getOrgUserData();
    },
    /* 机构用户点击分页 */
    orgCurrentChange(el){
       this.orgUserParams.pageNumber=el;
       this.getOrgUserData();
    },
    /* 社内用户选择项改变 */
    clubSelectChange(el) {
      console.log(el);
      this.clubSelectData=[];
      this.clubSelectData=el;
      this.mergeSelectData();
    },
    /* 作家用户选择项改变 */
    writerSelectChange(el){
    console.log(el);
    this.writerSelectData=[];
    this.writerSelectData=el;
    this.mergeSelectData();
    },
    /* 机构用户选择改变 */
    orgSelectChange(el){
      console.log(el);
       this.orgSelectData=[];
       this.orgSelectData=el;
       this.mergeSelectData();
    },
    /* 合并用户已选项 */
    mergeSelectData(){
      this.hasSelect=[];
      this.hasSelect=this.clubSelectData.concat(this.writerSelectData.concat(this.orgSelectData));
    },
    back(){
      this.$router.go(-1)
    }
  },
  created() {
    this.getTreeData();
    this.getClubUserData();
    this.getWriterUserData();
    this.getOrgUserData();

    //初始化编辑消息页面带过来的参数
    var routerParams = this.$route.params;
    var routerQuery = this.$route.query;
    console.log(routerParams);
    if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
      this.$message.error('页面未收到发送消息内容');
      this.$router.push({name: '编辑消息'});
    }
    if(routerQuery.type=='reissue'){
      this.type = routerQuery.type;
      this.reissueFormData.id=routerParams.msgId;
      this.reissueFormData.title=routerParams.title;
      this.reissueFormData.sendType = routerParams.sendType;
    }else{
      this.formdata.title=routerParams.title;
      this.formdata.content=routerParams.content;
      this.formdata.sendType = routerParams.sendType;
      let filePath = [];
      routerParams.filePathList.forEach(iterm=>{
        filePath.push(iterm.path);
      });
      this.formdata.file=filePath.join(',');
    }

  }
};
</script>

<style scoped>
.teach_applicant {
  position: relative;
}
.operation-wrapper {
  position: absolute;
  right: 60px;
  z-index: 1000;
}

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
.searchBox-wrapper > span {
  float: left;
  line-height: 36px;
  width: 90px;
  vertical-align: middle;
}
.searchBox-wrapper > div {
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


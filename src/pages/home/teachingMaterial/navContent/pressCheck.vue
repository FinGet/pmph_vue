<template>
  <div class="teachingMaterial publisherAudit">
    <div class="teachingMaterial-search clearfix" :class="{powerSearch:powerSearch}">
      <div v-if="!powerSearch">
        <!--书名选择框-->
        <div class="searchBox-wrapper lg">
          <div class="searchName">书名：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchParams.textBookids" @change="getTableData" multiple placeholder="请选择">
              <el-option
                v-for="item in booksChooseOptions"
                :key="item.id"
                :label="item.textbookName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">账号/姓名：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.realname" @keyup.enter.native="getTableData"></el-input>
          </div>
        </div>
        <!--职务搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职务：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.position" @keyup.enter.native="getTableData"></el-input>
          </div>
        </div>
        <!--职称搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.title" @keyup.enter.native="getTableData"></el-input>
          </div>
        </div>
        <!--工作单位搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">工作单位：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.orgName" @keyup.enter.native="getTableData"></el-input>
          </div>
        </div>
        <!--申报单位搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">申报单位：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.unitName" @keyup.enter.native="getTableData"></el-input>
          </div>
        </div>
        <!--申报职务搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">申报职务：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchParams.positionType" placeholder="请选择" @change="getTableData">
              <el-option
                v-for="item in positionValue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--学校审核搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">学校审核：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchParams.onlineProgress" placeholder="请选择" @change="getTableData">
              <el-option
                v-for="item in onlineProgressList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--纸质表搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">纸质表：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchParams.offlineProgress" placeholder="请选择" @change="getTableData">
              <el-option
                v-for="item in offlineProgressList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
        <!--操作按钮-->
        <div class="operation-wrapper">
          <el-button type="primary">导出Word</el-button>
          <el-button type="primary">导出Excel</el-button>
        </div>
      </div>
      <!--高级搜索-->
      <div v-else>
        <div class="searchBox-wrapper powerSearch" :class="{lg : powerSearchValue===1}">
          <el-select v-model="powerSearchValue" class="searchName" placeholder="请选择">
            <el-option
              v-for="item in powerSearchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchInput">
            <el-select v-model="searchParams.textBookids" @change="getTableData" multiple placeholder="请选择" v-if="powerSearchValue===1">
              <el-option
                v-for="item in booksChooseOptions"
                :key="item.id"
                :label="item.textbookName"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="searchParams.offlineProgress" placeholder="请选择" @change="getTableData" v-else-if="powerSearchValue===6">
              <el-option
                v-for="item in positionValue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="searchParams.onlineProgress" placeholder="请选择" @change="getTableData" v-else-if="powerSearchValue===7">
              <el-option
                v-for="item in onlineProgressList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="searchParams.offlineProgress" placeholder="请选择" @change="getTableData" v-else-if="powerSearchValue===8">
              <el-option
                v-for="item in offlineProgressList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.realname" @keyup.enter.native="getTableData" v-else-if="powerSearchValue===0"></el-input>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.unitName" @keyup.enter.native="getTableData" v-else-if="powerSearchValue===2"></el-input>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.position" @keyup.enter.native="getTableData" v-else-if="powerSearchValue===3"></el-input>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.title" @keyup.enter.native="getTableData" v-else-if="powerSearchValue===4"></el-input>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.orgName" @keyup.enter.native="getTableData" v-else-if="powerSearchValue===5"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">高级搜索</el-button>
        </div>
        <!--操作按钮-->
        <div class="operation-wrapper">
          <el-button type="primary">导出World</el-button>
          <el-button type="primary">导出Excel</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="姓名"
          min-width="100"
        >
          <template scope="scope">
            <router-link :to="{name:'专家信息',query: { declarationId: scope.row.id }}" class="table-link">{{scope.row.realname}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          min-width="120">
          <template scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>

        <el-table-column label="申报单位/工作单位" min-width="120">
          <template scope="scope">
            <p><i class="fa fa-university"></i>{{scope.row.unitName}}</p>
            <p><i class="fa fa-briefcase"></i>{{scope.row.orgName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="职务/职称" min-width="120" >
          <template scope="scope">
            <p><i class="fa fa-tags"></i>{{scope.row.position}}</p>
            <p><i class="fa fa-graduation-cap"></i>{{scope.row.title}}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" min-width="160">
          <template scope="scope">
            <p v-if="scope.row.handphone"><i class="fa fa-phone fa-fw"></i>{{scope.row.handphone}}</p>
            <p v-if="scope.row.email"><i class="fa fa-envelope fa-fw"></i>{{scope.row.email}}</p>
          </template>
        </el-table-column>
        <el-table-column label="所选书籍与职务" min-width="220">
          <template scope="scope">
            <p v-html="scope.row.chooseBooksAndPostions"></p>
          </template>
        </el-table-column>
        <el-table-column label="学校审核">
          <template scope="scope">
            <p>{{scope.row.onlineProgress==1?'待审核':'已审核'}}</p>
          </template>
        </el-table-column>
        <el-table-column label="出版社审核">
          <template scope="scope">
            <p type="text" v-if="scope.row.offlineProgress==0" class="link" @click="confirmPaperList(scope.row)">确认收到纸质表</p>

            <p v-else>{{scope.row.offlineProgress==1?'已退回纸质表':'已收到纸质表'}}</p>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum>searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="getTableData"
        :current-page.sync="searchParams.pageNumber"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        api_confirm_paper:'/pmpheep/declaration/list/declaration/confirmPaperList',
        api_declaration_list:'/pmpheep/declaration/list/declaration',
        api_book_list:'/pmpheep/textBook/list',
        powerSearch:true,
        powerSearchList:[
          {
            value:0,
            label:'账号/姓名'
          },
          {
            value:1,
            label:'书名'
          },{
            value:2,
            label:'申报单位'
          },{
            value:3,
            label:'职务'
          },{
            value:4,
            label:'职称'
          },{
            value:5,
            label:'工作单位'
          },{
            value:6,
            label:'申报职务'
          },{
            value:7,
            label:'学校审核'
          },{
            value:8,
            label:'出版社审核'
          },

        ],
        powerSearchValue:2,
        positionValue:[{
          value:'',
          label:'全部'
        },{
          value:1,
          label:'主编'
        },{
          value:2,
          label:'副主编'
        },{
          value:3,
          label:'编委'
        }],
        booksChooseOptions: [],
        onlineProgressList:[{
          value: '',
          label: '全部'
        }, {
          value: 1,
          label: '待审核'
        }, {
          value: 3,
          label: '已审核'
        }],
        offlineProgressList:[{
          value: '',
          label: '全部'
        }, {
          value: 0,
          label: '未收到纸质表'
        }, {
          value: 2,
          label: '已收到纸质表'
        }],
        searchParams:{
          pageNumber:1,
          pageSize:30,
          materialId:'',
          textBookids:[],
          realname:'',
          position:'',
          title:'',
          orgName:'',
          unitName:'',
          positionType:'',
          onlineProgress:'',
          offlineProgress:'',
        },
        tableData: [],
        totalNum:0,
      }
    },
    methods:{
      /**
       * 此方法用于展开与收起高级搜索区域
       */
      toggleSearchType(){
        this.powerSearch=!this.powerSearch;
      },
      /**
       * 获取表格数据
       */
      getTableData(){
        console.log(this.searchParams.textBookids.toString())
        this.$axios.get(this.api_declaration_list,{params:{
          pageNumber:this.searchParams.pageNumber,
          pageSize:this.searchParams.pageSize,
          materialId:this.searchParams.materialId,
          textBookids:'['+this.searchParams.textBookids.join(',')+']',
          realname:this.searchParams.realname,
          position:this.searchParams.position,
          title:this.searchParams.title,
          orgName:this.searchParams.orgName,
          unitName:this.searchParams.unitName,
          positionType:this.searchParams.positionType,
          onlineProgress:this.searchParams.onlineProgress,
          offlineProgress:this.searchParams.offlineProgress,
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.totalNum = res.data.total;
              res.data.rows.map(iterm=>{

              });
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 获取当前教材下所有书籍
       * @param val
       */
      getBookList(){
        this.$axios.get(this.api_book_list,{params:{
          materialId:this.searchParams.materialId
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.booksChooseOptions = res.data;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },

      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      handleSizeChange(val){
        this.searchParams.pageSize=val;
        this.searchParams.pageNumber=1;
        this.getTableData();
      },

      /**
       * 确认收到纸质表
       */
      confirmPaperList(row){
        console.log(row)
        this.$confirm("确定收到纸质表？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.get(this.api_confirm_paper,{params:{
              id:row.id,
              offlineProgress:2,
              materialId:this.searchParams.materialId,
            }})
              .then(response=>{
                var res = response.data;
                if(res.code==1){
                  this.$message.success('已确认！')
                  row.offlineProgress=2;
                }else{
                  this.$message.error(res.msg.msgTrim())
                }
              })
              .catch(e=>{
                console.log(e);
              })
          })
          .catch(e=>{})
      },
    },
    created(){
      this.searchParams.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchParams.materialId){
        this.$router.push({name:'通知列表'});
      }
      this.getTableData();
      this.getBookList();
    },
  }
</script>

<style scoped>
  .searchBox-wrapper.powerSearch .searchName{
    width: 130px;
  }
  .searchBox-wrapper.powerSearch .searchInput{
    margin-left: 134px;
  }
</style>

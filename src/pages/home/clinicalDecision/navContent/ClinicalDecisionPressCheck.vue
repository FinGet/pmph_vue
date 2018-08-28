<template>
  <div class="teachingMaterial publisherAudit">
    <div class="teachingMaterial-search clearfix" :class="{powerSearch:powerSearch}">
      <div v-if="!powerSearch">

        <!--姓名搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">账号/姓名：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.realname" @keyup.enter.native="handleSearchCLick"></el-input>
          </div>
        </div>
        <!--职务搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职务：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.position" @keyup.enter.native="handleSearchCLick"></el-input>
          </div>
        </div>
        <!--职称搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.title" @keyup.enter.native="handleSearchCLick"></el-input>
          </div>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="handleSearchCLick">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
        <!--操作按钮-->
        <div class="operation-wrapper">
          <el-button type="primary" :disabled="!tableData.length" @click="exportExcel">导出Excel</el-button>
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
          <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.realname" @keyup.enter.native="handleSearchCLick" v-if="powerSearchValue===0"></el-input>
          <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.position" @keyup.enter.native="handleSearchCLick" v-else-if="powerSearchValue===3"></el-input>
          <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.title" @keyup.enter.native="handleSearchCLick" v-else-if="powerSearchValue===4"></el-input>
        </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="handleSearchCLick">搜索</el-button>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">高级搜索</el-button>
        </div>
        <!--操作按钮-->
        <div class="operation-wrapper">
          <el-button type="primary" :disabled="!tableData.length" @click="exportExcel">导出Excel</el-button>
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
          min-width="80"
        >
          <template scope="scope">
            <el-button type="text" @click="linkToExpertInfo(scope.row.id)">{{scope.row.realname}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          min-width="110">
          <template scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <!--<el-table-column label="学科分类" min-width="160">
          <template scope="scope">
            <p v-for="(item, index) in scope.row.productSubjectTypeList" :key="index"><i class="fa fa-tags"></i>{{item.type_name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="内容分类" min-width="160">
          <template scope="scope">
            <p v-for="(item, index) in scope.row.productContentTypeList" :key="index"><i class="fa fa-bullseye"></i>{{item.type_name}}</p>
          </template>
        </el-table-column>-->


        <el-table-column label="申报单位/工作单位" min-width="160">
          <template scope="scope">
            <p><i class="fa fa-briefcase"></i>{{scope.row.unitName}}</p>
            <p><i class="fa fa-university"></i>{{scope.row.org_name}}</p>

          </template>
        </el-table-column>
        <el-table-column label="职务/职称" min-width="100" >
          <template scope="scope">
            <p><i class="fa fa-tags"></i>{{scope.row.position}}</p>
            <p><i class="fa fa-graduation-cap"></i>{{scope.row.title}}</p>
          </template>
        </el-table-column>

        <el-table-column label="审核状态" min-width="100">
          <template scope="scope">
            <p>{{scope.row.org_id==0&&scope.row.online_progress==1?"待出版社审核":(scope.row.org_id==0&&scope.row.online_progress==3?"出版社已审核":stateList[scope.row.online_progress])}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" min-width="100">
          <template scope="scope">
            <p>{{$commonFun.formatDate(scope.row.commit_date)}}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" min-width="120">
          <template scope="scope">
            <p v-if="scope.row.handphone"><i class="fa fa-phone fa-fw"></i>{{scope.row.handphone}}</p>
            <p v-if="scope.row.email"><i class="fa fa-envelope fa-fw"></i>{{scope.row.email}}</p>
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

    <el-dialog
      title="正在导出..."
      :visible.sync="exportDialog"
      size="tiny"
      :close-on-click-modal="false"
      :before-close="exportDialogClose">
      <div class="paddingT50 paddingB50">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="exportLoading" status="success"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import bus from 'common/eventBus/bus.js'
  export default {
    props:['productType'],
    data() {
      return {
        powerSearch:true,
        powerSearchValue:0,
        tableData: [],
        totalNum:0,
        exportDialog:false,
        exportLoading:0,
        exportLoadingTimerHandle:undefined,
        api_clinicalDecision_list:'/pmpheep/expertation/list',
        api_export_excel:'/pmpheep/expertation/exportExpertation',
        stateList:['未提交','待学校审核','被学校退回','学校已审核','待学校审核','被出版社退回'],
        searchParams:{
          pageNumber:1,
          pageSize:20,
          realname:'',
          position:'',
          title:'',
        },
        powerSearchList:[
          {
            value:0,
            label:'账号/姓名'
          },
          {
            value:3,
            label:'职务'
          },{
            value:4,
            label:'职称'
          }
        ],
        noWatchFirst:false,//做浏览记录 第一次watch不生效
      }
    },
    watch:{
     powerSearchValue(val){
       if(this.noWatchFirst){
           this.cleanSearchInput();
        }
        this.noWatchFirst=true;
     }
    },
    methods:{
      /**
       * 跳转到专家信息页面
       * @param id
       */
      linkToExpertInfo(id){
       /* var searParams = {};
        searParams = { clinicalDecisionId: id };
        this.$router.push({
          name:'临床决策专家信息',
          query: searParams
        })*/
        this.$emit('toExpertInfoData',id);
      },

      /**
       * 此方法用于展开与收起高级搜索区域
       */
      toggleSearchType(){
        this.powerSearch=!this.powerSearch;
        this.cleanSearchInput();
      },
      cleanSearchInput() {
        var pageNumber = this.searchParams.pageNumber;
        var pageSize = this.searchParams.pageSize;
        this.searchParams = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          realname: '',
          position: '',
          title: '',

        }
      },
      /**
       * 点击搜索按钮
       * @param val
       */
      handleSearchCLick(){
        if(this.searchParams.pageNumber==1){
          this.getTableData();
        }else{
          this.searchParams.pageNumber=1;
        }
      },
      /**
       * 获取表格数据
       */
      getTableData(){
        this.$axios.get(this.api_clinicalDecision_list,{params:{
            pageNumber:this.searchParams.pageNumber,
            pageSize:this.searchParams.pageSize,
            realname:this.searchParams.realname,
            position:this.searchParams.position,
            title:this.searchParams.title,
            expert_type:this.productType,
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
            ////console.log(e);
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
       * 导出excel
       */
      exportExcel(){
        if(this.exportDialog){
          this.$message.warning('已有文件正在导出，请稍后再试！');
          return;
        }
        this.exportDialog=true;
        this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.bort();
        this.exportLoadingTimerHandle = this.$commonFun.perfectAnimate(0,100,6000,(val)=>{
          this.exportLoading = val;
          if(this.exportLoading==100){
            this.exportDialog=false;
          }
        });

        let params = {
          realname:this.searchParams.realname,
          position:this.searchParams.position,
          title:this.searchParams.title,
          expert_type:this.productType,
        };
        let excelUrl = this.api_export_excel;
        for(let key in params){
          excelUrl+=((excelUrl.includes('?')?'&':'?')+key+'='+params[key]);
        }
        this.$commonFun.downloadFile(excelUrl);
      },
      /**
       * 导出进度条关闭前
       */
      exportDialogClose(done){
        this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.bort();
        clearInterval(this.handleExportWordtimer)
        done();
      },

    },
    created() {
      this.getTableData();
    }
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

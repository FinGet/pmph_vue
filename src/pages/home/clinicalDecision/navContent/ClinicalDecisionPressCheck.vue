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


        <div class="searchBox-wrapper">
          <div class="searchName">职称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.title" @keyup.enter.native="handleSearchCLick"></el-input>
          </div>
        </div>

        <!--学校审核状态-->
        <!--<div class="searchBox-wrapper" style="width: 350px;">
          <div class="searchName" style="width: 120px">学校审核状态：<span></span></div>
          <div class="searchInput" style="margin-left: 124px;">
            <el-select v-model="searchParams.schoolStauts" @change="handleSearchCLick"  placeholder="请选择" >
              <el-option
                v-for="item in schoolStauts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        &lt;!&ndash;出版社审核状态&ndash;&gt;
        <div class="searchBox-wrapper" style="width: 350px;">
          <div class="searchName" style="width: 120px">出版社审核状态：<span></span></div>
          <div class="searchInput" style="margin-left: 124px;">
            <el-select v-model="searchParams.pmphStauts" @change="handleSearchCLick"  placeholder="请选择" >
              <el-option
                v-for="item in pmphStauts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>-->

        <div class="searchBox-wrapper" style="width:550px;">
          <div class="searchName">提交时间：<span></span></div>
          <div class="searchInput">
            <el-date-picker
              v-model="startCommitDate"
              type="datetime"
              placeholder="选择提交开始时间"
            >
            </el-date-picker>
            <el-date-picker
              v-model="endCommitDate"
              type="datetime"
              placeholder="选择提交结束时间"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="searchBox-wrapper">
          <div class="searchName">手机号：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchParams.handphone" @keyup.enter.native="handleSearchCLick"></el-input>
          </div>
        </div>

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
            <!--<el-select v-model="searchParams.schoolStauts" @change="handleSearchCLick"  placeholder="请选择" v-if="powerSearchValue===5">
              <el-option
                v-for="item in schoolStauts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchParams.pmphStauts" @change="handleSearchCLick"  placeholder="请选择" v-if="powerSearchValue===6">
              <el-option
                v-for="item in pmphStauts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
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
        <el-table-column label="联系方式" width="100">
          <template scope="scope">
            <p v-if="scope.row.handphone"><i class="fa fa-phone fa-fw"></i>{{scope.row.handphone}}</p>
            <p v-if="scope.row.email"><i class="fa fa-envelope fa-fw"></i>{{scope.row.email}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="100">
          <template scope="scope">
            <p>{{$commonFun.formatDate(scope.row.commit_date)}}</p>
          </template>
        </el-table-column>
        <!--<el-table-column label="学校审核/出版社审核">
          <template scope="scope">
            <p><i class="fa fa-briefcase"></i>{{scope.row.org_id==0?'':stateSchoolList[scope.row.online_progress]}}</p>
            <p><i class="fa fa-university"></i>{{scope.row.org_id==0&&scope.row.online_progress==1?"待出版社审核":(scope.row.org_id==0&&scope.row.online_progress==3?"出版社已审核":(scope.row.org_id==0&&scope.row.online_progress==2?"被出版社退回":stateList[scope.row.online_progress]))}}</p>
          </template>
        </el-table-column>-->
        <el-table-column label="审核状态" min-width="100">
          <template scope="scope">
            <p>{{scope.row.org_id==0&&scope.row.online_progress==1?"待出版社审核":(scope.row.org_id==0&&scope.row.online_progress==3?"出版社已审核":stateList[scope.row.online_progress])}}</p>
          </template>
        </el-table-column>

    <!--    <el-table-column label="出版社审核" width="90">
          <template scope="scope">

          </template>
        </el-table-column>-->

        <!--<el-table-column label="结果公布" width="100">
          <template scope="scope">
            <p>{{scope.row.isFinalResult?'已公布':'未公布'}}</p>
          </template>
        </el-table-column>-->


        <el-table-column label="扫描附件" width="100">
          <template scope="scope">
            <p><a href="javascript:void(0)" @click="downloadImage(scope.row.unit_advise)" style="margin-top:10px;color: #70BBC2;cursor: pointer;text-decoration: underline;" >{{scope.row.syllabus_name}}</a></p>
          </template>
        </el-table-column>

        <!--<el-table-column label="操作" >
          <template scope="scope">
            <el-button type="text" @click="pressCheckOpt(scope.row.online_progress==6)" >{{(scope.row.online_progress==6)?"审核通过":"取消通过"}}</el-button>
            <span class="vertical-line"></span>
            <el-button type="text"   >{{"最终结果公布"}}</el-button>
          </template>
        </el-table-column>-->
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
        //stateSchoolList:['未提交','待学校审核','被学校退回','学校已审核','待学校审核','','',''],
        //stateList:['未提交','','','待出版社审核','出版社退回给学校','被出版社退回','出版社审核通过','出版社审核未通过'],
        stateList:['未提交','待学校审核','被学校退回','学校已审核','待学校审核','被出版社退回'],
        searchParams:{
          pageNumber:1,
          pageSize:20,
          realname:'',
          position:'',
          title:'',
          // schoolStauts:'',
          // pmphStauts:'',
          handphone:''
        },
        startCommitDate:'',
        endCommitDate:'',
        /*schoolStauts:[{
          value:'0',
          label:'学校待审核'
        },{
          value:'1',
          label:'学校审核通过'
        },{
          value:'2',
          label:'学校已退回'
        }],
        pmphStauts:[{
          value:'0',
          label:'出版社待审核'
        },{
          value:'1',
          label:'出版社审核通过'
        },{
          value:'2',
          label:'出版社退回给个人'
        },{
          value:'3',
          label:'出版社退回给学校'
        },{
          value:'4',
          label:'出版社审核未通过'
        }/!*,{
          value:3,
          label:'出版社遴选通过'
        }*!/],*/
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
         /* ,{
            value:5,
            label:'学校审核状态'
          },{
            value:6,
            label:'出版社审核状态'
          }*/
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
       *下载扫描附件
       * */
      downloadImage(url){
        this.$commonFun.downloadFile('/pmpheep/file/download/'+url);
      },
      pressCheckOpt(flag){

      },
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
          realname:'',
          position:'',
          title:'',
          // schoolStauts:'',
          // pmphStauts:'',
          handphone:''

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
            startCommitDate:this.$commonFun.formatDate(+new Date(this.startCommitDate)),
            endCommitDate:this.$commonFun.formatDate(+new Date(this.endCommitDate)),
            //schoolStauts:this.searchParams.schoolStauts,
            //pmphStauts:this.searchParams.pmphStauts,
            handphone:this.searchParams.handphone,

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

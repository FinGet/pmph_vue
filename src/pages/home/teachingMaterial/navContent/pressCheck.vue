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
          <el-button type="primary" :disabled="!tableData.length" @click="exportWordGetId">导出Word</el-button>
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
            <el-select v-model="searchParams.textBookids" @change="getTableData" multiple placeholder="请选择" v-if="powerSearchValue===1">
              <el-option
                v-for="item in booksChooseOptions"
                :key="item.id"
                :label="item.textbookName"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="searchParams.positionType" placeholder="请选择" @change="getTableData" v-else-if="powerSearchValue===6">
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
          <el-button type="primary" :disabled="!tableData.length" @click="exportWordGetId">导出Word</el-button>
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
            <router-link :to="{name:'专家信息',query: { declarationId: scope.row.id }}" class="table-link">{{scope.row.realname}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          min-width="110">
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
            <p type="text" v-if="scope.row.offlineProgress==0&&!(materialInfo.isForceEnd||materialInfo.isAllTextbookPublished)" class="link" @click="confirmPaperList(scope.row)">确认收到纸质表</p>

            <p v-else>{{offlineProgress[scope.row.offlineProgress]}}</p>

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

    <div>
      <el-dialog
        title="正在导出..."
        :visible.sync="exportDialog"
        size="tiny"
        :before-close="handleExportDialogClose">
        <div class="paddingT50 paddingB50">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="exportLoading" status="success"></el-progress>
        </div>
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
          <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        <!--</span>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    props:['materialInfo'],
    data() {
      return {
        api_confirm_paper:'/pmpheep/declaration/list/declaration/confirmPaperList',
        api_declaration_list:'/pmpheep/declaration/list/declaration',
        api_book_list:'/pmpheep/textBook/list',
        api_export_excel:'/pmpheep/excel/declaration',
        api_export_word_getid:'/pmpheep/word/identification',
        api_export_word_start:'/pmpheep/word/declaration',
        api_export_word_progress:'/pmpheep/word/progress',
        api_export_word_download:'/pmpheep/zip/download',
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
        offlineProgress:['未收到纸质表','已退回纸质表','已收到纸质表'],
        searchParams:{
          pageNumber:1,
          pageSize:20,
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
        exportDialog:false,
        exportLoading:0,
        exportLoadingTimerHandle:undefined,
      }
    },
    watch:{
     powerSearchValue(val){
       this.cleanSearchInput();
     }
    },
    methods:{
      /**
       * 此方法用于展开与收起高级搜索区域
       */
      toggleSearchType(){
        this.powerSearch=!this.powerSearch;
        this.cleanSearchInput();
      },
      /* 清空搜索框 */
      cleanSearchInput(){
        var pageNumber=this.searchParams.pageNumber;
        var pageSize=this.searchParams.pageSize;
        var materialId=this.searchParams.materialId;
       this.searchParams={
          pageNumber:pageNumber,
          pageSize:pageSize,
          materialId:materialId,
          textBookids:[],
          realname:'',
          position:'',
          title:'',
          orgName:'',
          unitName:'',
          positionType:'',
          onlineProgress:'',
          offlineProgress:'',
        }

      },
      /**
       * 获取表格数据
       */
      getTableData(){
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
          materialId:this.searchParams.materialId,
          textBookids:this.searchParams.textBookids.join(','),
          realname:this.searchParams.realname,
          position:this.searchParams.position,
          title:this.searchParams.title,
          orgName:this.searchParams.orgName,
          unitName:this.searchParams.unitName,
          positionType:this.searchParams.positionType,
          onlineProgress:this.searchParams.onlineProgress,
          offlineProgress:this.searchParams.offlineProgress,
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
      handleExportDialogClose(done){
        done();
      },
      /**
       * 下载
       */
      exportWordGetId(){
        if(this.exportDialog){
          this.$message.warning('已有文件正在导出，请稍后再试！');
          return;
        }

        this.$axios.get(this.api_export_word_getid)
          .then(response=>{
            var res = response.data;
            this.exportWordStart(res);
            this.exportWordProgress(res);
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('导出失败，请重试！')
          })
      },
      exportWordStart(id){
        this.exportDialog=true;
        this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.bort();
        this.exportLoadingTimerHandle = this.$commonFun.perfectAnimate(0,100,60000,(val)=>{
          this.exportLoading = val;
          if(this.exportLoading==100){
            this.exportDialog=false;
          }
        },true);
        this.$axios.get(this.api_export_word_start,{params:{
          materialId:this.searchParams.materialId,
          textBookids:this.searchParams.textBookids.join(','),
          realname:this.searchParams.realname,
          position:this.searchParams.position,
          title:this.searchParams.title,
          orgName:this.searchParams.orgName,
          unitName:this.searchParams.unitName,
          positionType:this.searchParams.positionType,
          onlineProgress:this.searchParams.onlineProgress,
          offlineProgress:this.searchParams.offlineProgress,
          id:id,
        }})
          .then(response=>{

          })
          .catch(e=>{
            console.log(e);
            this.$message.error('导出失败，请重试！')
          })
      },
      exportWordProgress(id){
        var timeout = 3*60*1000;//设置3分钟超时
        var useTime = 0;
        var timer = setInterval(()=>{
          useTime+=1000;
          this.$axios.get(this.api_export_word_progress,{params:{
            id:id
          }})
            .then(response=>{
              var res = response.data;
              if(res){
                clearInterval(timer);
                this.exportWordDownload(id);
              }
            })
            .catch(e=>{
              console.log(e);
              if(this.exportDialog){
                this.$message.error('导出失败，请重试！');
                clearInterval(timer);
                this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.end();
              }
            })
          //超时提醒
            if(useTime>timeout){
              this.$message.error('导出请求超时，请重试！');
              clearInterval(timer);
              this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.end();
            }
        },1000)

      },
      exportWordDownload(id){
        let url = this.api_export_word_download+'?id='+id;
        this.$commonFun.downloadFile(url);
        this.exportLoadingTimerHandle&&this.exportLoadingTimerHandle.end();

      }
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

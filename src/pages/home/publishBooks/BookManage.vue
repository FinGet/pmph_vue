
<template>
	<div class="bookManage">
    <div class="clearfix" :class="{powerSearch:powerSearch}">
      <!--高级搜索-->
      <div  v-if="powerSearch">
        <div class="searchBox-wrapper powerSearch" :class="{lg:powerSearchValue===2}">
          <el-select v-model="powerSearchValue" @change="powerSearchTypeChange" class="searchName" placeholder="请选择">
            <el-option
              v-for="item in powerSearchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" @change="search" placeholder="请选择" v-if="powerSearchValue===3">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isPromote" @change="search" placeholder="请选择" v-else-if="powerSearchValue===4">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isOnSale" placeholder="请选择" @change="search" v-else-if="powerSearchValue===5">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-cascader
              class="searchInputEle bookType"
              v-else-if="powerSearchValue===2"
              :options="bookTypeList"
              :props="{ label: 'typeName', value:'id', children: 'childrenMaterialTypeVO' }"
              :value="searchForm.typeId"
              @change="bookTypeChange"
              :change-on-select="true"
            ></el-cascader>
            <el-input placeholder="请输入" class="searchInputEle" v-model.trim="searchForm.name" @keyup.enter.native="search" v-else-if="powerSearchValue===1"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">高级搜索</el-button>
        </div>
      </div>
      <div v-else>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">书籍名称/ISBN：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"  @keyup.enter.native="search" v-model.trim="searchForm.name"></el-input>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper lg">
          <div class="searchName">书籍类别：<span></span></div>
          <div class="searchInput">
            <el-cascader
              class="searchInputEle bookType"
              :options="bookTypeList"
              :props="{ label: 'typeName', value:'id', children: 'childrenMaterialTypeVO' }"
              :value="searchForm.typeId"
              @change="bookTypeChange"
              :change-on-select="true"
            ></el-cascader>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">是否新书推荐：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" placeholder="请选择" @change="search">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">是否重磅推荐：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchForm.isPromote" placeholder="请选择" @change="search">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">是否上架：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchForm.isOnSale" placeholder="请选择" @change="search">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--搜索按钮-->
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
      </div>
      <div class="operation-wrapper">
        <el-tooltip class="item" effect="dark" content="请按照模板格式上传!" placement="top">
          <my-upload
            class="ChatInputFileBtn"
            ref="upload"
            :action="api_upload"
            :before-upload="beforeUploadFile"
            :on-success="upLoadFileSuccess"
            :on-error="uploadError"
            :show-file-list="false">
            <el-button type="primary" :disabled="uploadLoading"  :loading="uploadLoading">{{uploadLoading?'正在上传解析中...':'配套图书导入'}}</el-button>
          </my-upload>
        </el-tooltip>
        <el-button type="primary"><a href="/static/配套图书导入模版.xls">配套图书导入模板下载</a></el-button>
        <el-button type="primary" @click="syncBook(1)" :disabled="isUpload">{{isUpload?'正在同步中...':'图书全量同步'}}<i v-if="isUpload" class="fa fa-spinner fa-pulse loading"></i></el-button>
        <el-button type="primary" @click="syncBook(2)" :disabled="isUpload">{{isUpload?'正在同步中...':'图书增量同步'}}<i v-if="isUpload" class="fa fa-spinner fa-pulse loading"></i></el-button>
        <el-button type="primary" :disabled="!selectData.length" @click="bulkEditInfo">批量修改</el-button>
      </div>
    </div>
    <div class="table-wrapper clearfix">
      <el-table
        :data="tableData"
        ref="myMsgTable"
        border
        @row-click="bookClick"
        stripe
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="bookname"
          label="书籍名称">
        </el-table-column>
        <el-table-column
          prop="isbn"
          label="ISBN"
          width="210">
        </el-table-column>
        <el-table-column
          label="是否新书推荐"
          width="120">
          <template scope="scope">
            {{scope.row.isNew?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否重磅推荐"
          width="120">
          <template scope="scope">
            {{scope.row.isPromote?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="是否上架"
          width="100">
          <template scope="scope">
            {{scope.row.isOnSale?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="书籍类别"
          width="200">
          <template scope="scope">
            {{scope.row.typeName}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button type="text" @click="editInfo(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteBook(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="totalNum > searchForm.pageSize"
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="searchForm.pageSize"
        :current-page.sync="searchForm.pageNumber"
        @size-change="paginationSizeChange"
        @current-change="getTableData"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>

    <!--弹窗-->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      size="tiny">
      <div>
        <el-form ref="form" :model="form" label-width="140px" class="form">
          <el-form-item label="是否新书推荐：" required>
            <el-radio-group v-model="form.isNew">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否重点推荐：" required>
            <el-radio-group v-model="form.isPromote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架：" required>
            <el-radio-group v-model="form.isOnSale">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--没有书签字段，暂时先去掉-->
          <!--<el-form-item label="标签：">-->
            <!--<el-select v-model="form.tags" multiple placeholder="请选择" class="searchInputEle bookType">-->
              <!--<el-option-->
                <!--v-for="item in tagsList"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="书籍类别：" required>
            <el-cascader
              class="searchInputEle bookType"
              :options="bookTypeList"
              :props="{ label: 'typeName', value:'id', children: 'childrenMaterialTypeVO' }"
              :value="form.typeId"
              @change="bookTypeChange_form"
              :change-on-select="true"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所属教材">
            <el-select v-model="form.materialId" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in materialList"
                :key="item.id"
                :label="item.materialName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 同步弹窗 -->
    <!--<el-dialog-->
    <!--title="图书同步"-->
      <!--:visible.sync="bookSyncVisible"-->
      <!--size="small">-->
      <!--<div>-->
        <!--<p style="margin-bottom:10px;">-->
          <!--<el-button type="primary" style="margin-right:10px">上传书目录</el-button>-->
          <!--请按照模板格式上传：-->
          <!--<el-button type="text" style="color:#337ab7">模板下载.xlsx</el-button>-->
        <!--</p>-->
        <!--<p style="margin-bottom:10px;color:#FF4949">（* ）Excel文档格式请按照模板格式，否则将导致导入失败，请确认后再操作！</p>-->

        <!--<el-table :data="bookSyncData" border style="margin-bottom:10px">-->
         <!--<el-table-column label="本版号">-->

         <!--</el-table-column>-->
         <!--<el-table-column label="书名">-->

         <!--</el-table-column>-->
         <!--<el-table-column label="作者" width="110">-->

         <!--</el-table-column>-->
        <!--</el-table>-->

        <!--<el-button type="primary">开始同步</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
        api_upload: '/pmpheep/books/bookExcel',
			  form:{
			    bookId:'',
          isNew:true,
          isPromote:true,
          isOnSale:true,
          typeId:[],
          materialId:'',
        },
        bookSyncVisible:false,
        bookSyncData:[],
			  searchForm:{
          name:'',
          typeId:[],
          isNew:'',
          isPromote:'',
          isOnSale:'',
          pageSize:30,
          pageNumber:1
        },
        totalNum:0,
        dialogVisible:false,
        powerSearch:true,
        powerSearchValue:1,
        powerSearchList:[
          {value:1,
            label:'书籍名称/ISBN'},
          {value:2,
            label:'书籍类别'},
          {value:3,
            label:'是否新书推荐'},
          {value:4,
            label:'是否重磅推荐'},
          {value:5,
            label:'是否上架'
          }],
        tagsList:[{
          value: '1',
          label: '心理学'
        }, {
          value: '2',
          label: '护理'
        }, {
          value: '3',
          label: '临床'
        }],
        FilterNameList:[{
          value:'',
          label:'全部'
        },{
          value:true,
          label:'是'
        },{
          value:false,
          label:'否'
        }],
        tableData:[],
        selectData:[],
        bookTypeList: [],
        bookTypeProps: {
          label: 'typeName',
          value:'path',
          children: 'childrenMaterialTypeVO'
        },
        bookTypeSelected:[],
        materialList:[],
        uploadLoading:false,
        isUpload: false, // 是否同步
        isAllUpload: false, // 全部同步
        isSomeUpload: false // 增量同步
      }
		},
    methods:{
      /**
       * 获取表格数据
       */
      getTableData(){
        let id = this.bookTypeSelected[this.bookTypeSelected.length-1];
        let path = '';

        this.$commonFun.recurveList(this.bookTypeList,'childrenMaterialTypeVO',(iterm)=>{
            if(id==iterm.id){
                path=iterm.path;
            }
        })
        this.$axios.get('/pmpheep/books/list',{params:{
          name:this.searchForm.name,
          path:path,
          type:id,
          isNew:this.searchForm.isNew,
          isPromote:this.searchForm.isPromote,
          isOnSale:this.searchForm.isOnSale,
          pageSize:this.searchForm.pageSize,
          pageNumber:this.searchForm.pageNumber
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.totalNum = res.data.total;
              res.data.rows.map(iterm=>{
                  iterm.path = iterm.path + '-' + iterm.type;
                  iterm.isbn = iterm.isbn?iterm.isbn.replace('ISBN ',''):'';
              });
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      search(){
        this.searchForm.pageNumber=1;
        this.getTableData();
      },
      /**
       * 获取书籍类别树数据
       */
      getBookType(){
        console.log(111);
        this.$axios.get('/pmpheep/books/list/materialType')
          .then((response)=>{
            var res = response.data;
            if(res.code==1){
              res.data.typeName='全部';
              res.data.path='';
              this.bookTypeList = res.data.childrenMaterialTypeVO;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 点击展开收起高级搜索文字按钮
       */
      toggleSearchType(){
        //表单重置
        this.searchForm.name='';
        this.searchForm.typeId=[];
        this.searchForm.isNew='';
        this.searchForm.isPromote='';
        this.searchForm.isOnSale='';

        this.bookTypeSelected=[];
        this.powerSearch=!this.powerSearch;
      },
      /**
       * 表格复选框发生变化触发事件
       */
      handleSelectionChange(val) {
        this.selectData = val;
      },
      /**
       * 点击表格中的修改按钮
       * @param row
       */
      editInfo(row){
        var typelist = []
        this.form.bookId = row.id;
        this.form.isNew = row.isNew;
        this.form.isOnSale = row.isOnSale;
        this.form.isPromote = row.isPromote;
        this.form.materialId = row.materialId;
        typelist = row.path?row.path.split('-'):[];
        typelist.forEach((t,i)=>{
          typelist[i]=parseInt(t);
        });
        this.form.typeId = typelist;
        console.log(this.form.typeId);
        this.dialogVisible=true;
      },
      /**
       * 批量修改
       */
      bulkEditInfo(){
        this.dialogVisible=true;
        var ids = [];
        this.selectData.forEach(iterm=>{
          ids.push(iterm.id);
        })
        this.form.bookId = ids.join(',');
        this.form.isNew = true;
        this.form.isOnSale = true;
        this.form.isPromote = true;
        this.form.typeId = [];
      },
      /**
       * 级联下拉值变化时触发此方法
       * @param res
       */
      bookTypeChange(res){
        this.bookTypeSelected=res;
      },
      bookTypeChange_form(res){
        this.form.typeId=res;
      },
      /**
       * update
       */
      update(){
        if(!this.form.typeId.length){
            this.$message.error('请选择书籍类别！');
            return;
        }
        let type = this.form.typeId[this.form.typeId.length-1];
        type=type?type:0;
        this.$axios.put('/pmpheep/books/update',this.$commonFun.initPostData({
          ids:this.form.bookId,
          isNew:this.form.isNew,
          isPromote:this.form.isPromote,
          isOnSale:this.form.isOnSale,
          type:type,
          materialId:this.form.materialId||'',
        }))
          .then(response=>{
            let res = response.data;
            if(res.code==1){
              this.$message.success('修改成功');
              this.dialogVisible=false;
              this.getTableData();
            }else{
              this.$message.error('修改失败，请重试！');
            }
          })
          .catch(e=>{
            console.log(e);
            this.$message.error('修改失败，请重试！');
          })
      },
      /**
       *
       * @param row
       */
      deleteBook(row){
        this.$confirm("确定删除该图书?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.$axios.delete('/pmpheep/books/delete',{params:{
              id:row.id
            }})
              .then(response=>{
                let res = response.data;
                if(res.code==1){
                  this.$message.success('删除成功');
                  this.getTableData();
                }else{
                  this.$message.error('删除失败，请重试！');
                }
              })
              .catch(e=>{
                console.log(e);
                this.$message.error('删除失败，请重试！');
              })
          })
          .catch(e=>{})

      },
      /**
       * 分页每页显示条数发生改变
       * @param val
       */
      paginationSizeChange(val){
        this.searchForm.pageSize=val;
        this.searchForm.pageNumber=1;
        this.getTableData();
      },
      /**
       * 高级搜索切换搜索条件时
       */
      powerSearchTypeChange(val){
        this.searchForm.name='';
        this.searchForm.typeId=[];
        this.searchForm.isNew='';
        this.searchForm.isPromote='';
        this.searchForm.isOnSale='';
      },
      /**
       *
       * @param row
       */
      bookClick(row){
        console.log(row);
        _hmt.push(['_trackPageview', '/book/'+row.bookname]);
        _hmt.push(['_trackEvent’', 'book', 'pageView', row.bookname])
      },
      /**
       * 获取教材列表
       */
      getMaterialList(){
        this.$axios.get('/pmpheep/material/published')
          .then((response)=>{
            var res = response.data;
            if(res.code==1){
              this.materialList = res.data;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 当上传按钮添加excel
       * @param file
       */
      beforeUploadFile(file){
        let flag = true;

        var filedata = file.raw;
        var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        // 类型判断
        if(!(ext=='xls'||ext=='xlsx')){
          this.$message.error("请按照模板格式的文档上传文件");
          return;
        }
        //文件名不超过40个字符
        if(file.name.length>40){
          this.$message.error("文件名不能超过40个字符");
          return;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size<1){
          this.$message.error("文件大小不能小于1bt");
          return;
        }
        // 判断文件大小是否符合 文件不大于100M
        if(file.size/1024/1024 > 100){
          this.$message.error("文件大小不能超过100M！");
          return;
        }

        this.uploadLoading=flag;
        return flag;
      },
      /**
       * 上传文件请求成功的回调
       */
      upLoadFileSuccess(res, file, fileList){
        if (res.code == '1') {
          this.$message.success('上传成功!');
        }else{
          this.$message.error(res.msg.msgTrim());
        }
        this.uploadLoading = false;
      },
      /**
       * 上传文件请求失败的回调
       */
      uploadError(err, file, fileList){
        console.log(err);
        this.$message.error(err.msg.msgTrim());
        this.uploadLoading = false;
      },
      /**
       * 图书同步
       * @param type 1 - 全量同步 2- 增量同步
       */
      syncBook(type) {
        this.isUpload = true;
        this.syncProgress();
        this.$axios.get('/pmpheep/books/allsynchronization',{
          params: {
            type : type
          }
        }).then(response => {
          let res = response.data;
          if (res.code == 1) {
          } else {
            this.$message.error(res.msg.msgTrim());
          }
        }).catch(error => {
          this.$message.error('同步同步错误，请稍后再试!');
        })
      },
      syncProgress(){
        this.progress();
        this.isUpload = true;
        var timeout = 3*60*1000;//设置3分钟超时
        var useTime = 0;
        this.handleExportWordtimer = setInterval(()=>{
          useTime+=30000;
          this.$axios.get('/pmpheep/books/isEnd')
            .then(response=>{
              let res = response.data;
              if(res.code==1){
                clearInterval(this.handleExportWordtimer);
                if (res.data == 0) {
                  this.isUpload = false;
                }
              }
            })
            .catch(e=>{
              console.log(e);
              if(this.isUpload){
                this.$message.error('导出失败，请重试！');
                clearInterval(this.handleExportWordtimer);
              }
            })
          //超时提醒
          if(useTime>timeout){
            this.$message.error('导出请求超时，请重试！');
            clearInterval(this.handleExportWordtimer);
          }
        },30000)
      },
      progress(){
        this.$axios.get('/pmpheep/books/isEnd')
          .then(response=>{
            let res = response.data;
            if(res.code==1){
              if (res.data == 0) {
                this.isUpload = false;
              }
            }
          })
          .catch(e=>{
            console.log(e);
            if(this.isUpload){
              this.$message.error('导出失败，请重试！');
            }
          })
      }
    },
    created(){
		  this.getTableData();
		  this.getBookType();
      this.getMaterialList();
      this.progress();
		  if(window._hmt){
        _hmt.push(['_trackPageview', '/index']);
      }
    },
	}
</script>

<style scoped>
  .searchBox-wrapper{
      width: 340px;
    }
  .searchBox-wrapper .searchName{
    width: 110px;
  }
  .searchBox-wrapper .searchInput{
    margin-left: 114px;
  }
  .searchBox-wrapper.searchBtn{
    width: 100px;
  }
  .powerSearch .searchName{
    width: 140px;
  }
  .powerSearch .searchBox-wrapper .searchInput{
    margin-left: 144px;
  }
  .searchBox-wrapper.lg{
    width: 500px;

  }
  .bookType{
    width: 100% !important;
    max-width: 100% !important;
  }
  .form .bookType{
    width: 100% !important;
    max-width: 320px !important;
  }
  .ChatInputFileBtn{
    position: relative;
    top: 13px;
    margin-right: 10px;
  }
</style>

/**
封装选择学校组件，提供操作按钮卡槽slot，和获取选中学校方法getSelectData,
卡槽：操作按钮区域
props: default-history-id 默认选中的历史记录
方法：getSelectData 获取选中学校
事件：selectChange 当所选学校发生变化  参数 function(list){} 参数形式[{},{}]
*/
<template>
  <div class="query">
    <!--操作按钮区-->
    <div class="query-operation paddingR20">
      <!--操作按钮-->
      <div class="operation-wrapper">
        <slot></slot>
      </div>
    </div>

    <!--快速选择区域-->
    <div class="fastQuery">
      <!--选择区域-->
      <div class="clearfix">
        <div class="justify-align">
          学校导入：&nbsp;&nbsp;
        </div>
        <div>
        <span class="grey_span lineheight-36 fastQuery_r_text">
          请按照模板格式上传（
          <a class="grey_button link" href="/static/学校导入Excel模板.xlsx">模板下载.xls</a>
          ）：
        </span><span class="grey_span lineheight-36 fastQuery_r_text" v-if="!$commonFun.Empty(uploadFileName)">{{uploadFileName}}</span>
          <my-upload
            class="ChatInputFileBtn lineheight-36 inline-block"
            ref="upload"
            :action="api_upload"
            :before-upload="beforeUploadFile"
            :on-success="upLoadFileSuccess"
            :on-error="uploadError"
            :show-file-list="false">
            <el-button size="small" type="primary" :disabled="uploadLoading"  :loading="uploadLoading">{{uploadLoading?'正在上传解析中...':'点击上传'}}</el-button>
          </my-upload>
        </div>
      </div>

      <div class="clearfix">
        <div class="justify-align">
          快速选择：&nbsp;&nbsp;
        </div>
        <div>
          <el-button type="default" size="small" @click="dialogVisible=true" icon="plus" v-if="historyData.length==0">历史教材通知</el-button>
          <el-tag v-else
                  v-for="(tag,index) in historyData"
                  :key="index"
                  :closable="true"
                  @close="handleHistoryTagClose(tag)"
                  :type="tag.type"
          >
            {{tag.productName}}
          </el-tag>
        </div>
      </div>

      <!--选择区域-->
      <div class="clearfix">
        <div class="justify-align">
          区 域：&nbsp;&nbsp;
        </div>
        <div>
          <el-select v-model="select_provinces" multiple  placeholder="全部" class="select_provinces">
            <el-option
              v-for="(item,index) in area_school"
              :key="index"
              :label="item.province"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--选择机构类型-->
      <div class="clearfix marginB20">
        <div class="justify-align">
          机构类型：&nbsp;&nbsp;
        </div>
        <div>
          <el-checkbox class="marginR30"
                       :indeterminate="select_orgType.isIndeterminate"
                       v-model="select_orgType.checkAll"
                       @change="_checkAllTypeChange()">
            全部
          </el-checkbox>
          <span class="vertical-line"></span>
          <el-checkbox-group v-model="select_orgType.types" class="inline-block marginL20">
            <el-checkbox v-for="iterm in orgTypeList" :label="iterm.id" :key="iterm.id"  @change="_handleCheckedTypeChange()">{{iterm.name}}</el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" style="margin-left:20px;" @click="execlChooseOrg">导出所选院校</el-button>
         <el-button type="primary" style="margin-left:20px;" @click="$commonFun.downloadFile('/pmpheep/excel/allOrg');">导出所有院校</el-button>
        </div>
      </div>

      <!--<div class="queryTips text-center">* 如无工作单位请联系教务处进行认证</div>-->
    </div>
    <!--地区详情区域-->
    <div class="border-T paddingT20">
      <div class="control-area clearfix paddingB20">
        <div class="pull-left">
          <el-button  type="primary" size="small" @click="_checkedAll">全选</el-button>
          <el-button  type="primary" size="small" @click="_un_checkedAll">清空</el-button>

          <div class="searchBox-wrapper">
            <div class="searchInput">
              <el-input placeholder="请输入搜索关键字" class="searchInputEle" @keyup.enter.native="_goToSearchPosition" v-model="searchName" @change="_searchOnPage"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search" @click="_goToSearchPosition">搜索</el-button>
          </div>
        </div>
        <div class="pull-right">
          <el-button  type="primary" size="small" @click="_sortByArea">按省市排序</el-button>
          <el-button  type="primary" size="small" @click="_sortByOrg">按学校和医院拼音排序</el-button>
        </div>
      </div>
      <div class="area-list"
           v-for="(item,index) in area_school"
           :key="index"
           :class="'area'+item.id"
           v-if="(select_provinces.includes(item.id))||select_provinces.length==0">
        <div>
          <el-checkbox
            :indeterminate="item.isIndeterminate"
            v-model="item.checkAll"
            @change="_checkAllChange(item)">
            <span v-html="item.province"></span>
          </el-checkbox>
        </div>
        <div class="choose-school-list">
          <el-checkbox-group v-model="item.checkedSchools"  @change="_handleCheckedSchoolChange(item)">
            <el-checkbox
              v-for="(city,index) in item.schoolList"
              :label="city.id"
              :key="index"
              v-if="select_orgType.types.includes(city.type)"><span v-html="city.name"></span></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <!--选择历史书籍弹窗-->
    <el-dialog
      title="选择历史书籍通知"
      :visible.sync="dialogVisible">
      <div class="table-wrapper">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label="序号"
            width="80">
            <template scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="通知名称">
          </el-table-column>
          <el-table-column
            prop="orgCounts"
            label="发布机构数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="通知创建日期"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template scope="scope">
              <el-button type="text" @click="_chooseHistory(scope.$index,scope.row.id)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pull-right marginB10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>

    <el-dialog
      title="导入选题"
      :visible.sync="importExcelInfoView"
      size="tiny">
      <div class="text-center">
        <div class="paddingT20 inline-block  text-left margin-auto">
          <div class="width100 inline-block">
            <el-progress type="circle" width="100" :percentage="100" class="inline-block" :status="importExcelInfo.error?'exception':'success'"></el-progress>
          </div>
          <br>
          <div class="paddingT10 text-left inline-block">
            <div class="importExcelInfoView-list">
              <div class="importExcelInfoView-title">导入总数: <span></span></div>
              <p class="inline-block fontBold fontsize-lg">{{importExcelInfo.all}}</p>
            </div>
            <div class="importExcelInfoView-list">
              <div class="importExcelInfoView-title">导入成功: <span></span></div>
              <p class="inline-block fontBold green fontsize-lg">{{importExcelInfo.success}}</p>
            </div>
            <div class="importExcelInfoView-list">
              <div class="importExcelInfoView-title">导入失败: <span></span></div>
              <p class="inline-block fontBold error fontsize-lg">{{importExcelInfo.error}}</p>
            </div>

            <div class="importExcelInfoView-list" v-if="importExcelInfo.error">
              <div class="fontsize-lg importExcelInfoView-title">失败信息：</div>
              <ul class="inline-block">
                <li v-for="(item,index) in importExcelInfo.errorData" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importExcelInfoView = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      defaultHistoryId:{
        required: false
      },
    },
    data() {
      return {
        api_upload:'/pmpheep/orgs/orgExport',
        sortArea:-1,
        sortOrg:-1,
        select_provinces:[],
        orgTypeList:[{
          id:2,
          name:'本科'
        },{
          id:1,
          name:'医院'
        },{
          id:3,
          name:'职教'
        },{
          id:4,
          name:'本科&职教'
        }],
        select_orgType:{
          checkAll:true,
          isIndeterminate:false,
          types:[1,2,3,4],
        },
        area_school:[],
        dialogVisible:false,
        historyData:[],
        tableData:[],
        searchName:'',
        searchResultFirstId:undefined,
        currentPage:1,
        pageSize:20,
        total: 0,
        productId: '',
        uploadLoading:false,
        uploadFileName:'',
        importExcelInfo:{
          all:0,
          success:0,
          error:0,
          errorData:[],
        },
        importExcelInfoView:false,
      };
    },
    computed:{
      /**
       * 已选中学校列表
       */
      hasCheckedOrgList(){
        let list = [];
        this.area_school.forEach((iterm,index)=>{
          if(this.select_provinces.length==0 || this.select_provinces.includes(iterm.id)){
            iterm.schoolList.forEach((t,i)=>{
              if(iterm.checkedSchools.includes(t.id)&&(this.select_orgType.types.includes(t.type))){
                list.push(t);
              }
            })
          }
        });
        return list;
      }
    },
    methods: {
      /**
        加载历史教材通知
       */
      _getHistory(){
        this.$axios.get('/pmpheep/product/history',{
          params:{
            pageSize : this.pageSize,
            pageNumber: this.currentPage
          }
        }).then(response=>{
          let res = response.data
          if (res.code =="1") {
            this.total = res.data.total
            this.tableData = res.data.rows
            res.data.rows.map(item=>{
                item.gmtCreate=this.$commonFun.formatDate(item.gmtCreate);
            });
            // console.log(this.tableData)
          }
        })
      },
      /**
       * 加载学校列表
       */
      _getSchools() {
        var schoolName = []
        var schoolType = []
        var schoolId = []
        this.$axios.get("/pmpheep/messages/clinicalmessage/sendObject",{
          params:{
            sendType: 1,
            pageSize: 20,
            pageNumber: 1,
            productId: '',
            userNameOrUserCode: '',
            orgName: '',
            productName: ''
          }
        }).then((response) => {
          let res = response.data
          if (res.code == '1') {
            var tempList=[];
            res.data.orgVo.forEach(iterm=>{
              let tempObj = {};
              tempObj.id=iterm.areaId;
              tempObj.province = iterm.areaName;
              tempObj.isIndeterminate = false;
              tempObj.checkAll = false;
              tempObj.checkedSchools = [];
              tempObj.schoolList =[];
              let tempType = iterm.orgTypeId.split(',');
              let tempName = iterm.orgName.split(',');
              iterm.id.split(',').forEach((t,i)=>{
                tempObj.schoolList.push({
                  id:t,
                  type:parseInt(tempType[i]),
                  name:tempName[i]
                })
              });
              tempList.push(tempObj);
            });
            this.area_school= tempList;
            //如果有设置默认选中的历史记录id则执行查询选中
            if(this.defaultHistoryId){
              this._getHistorySchools(this.defaultHistoryId);
            }
          }
        })
      },
      /**
       * 加载历史学校列表
       */
      _getHistorySchools(id) {
        var schoolName = []
        var schoolType = []
        var schoolId = []
        this.$axios.get("/pmpheep/messages/clinicalmessage/sendObject",{
          params:{
            sendType: 1,
            pageSize: 20,
            pageNumber: 1,
            productId: id?id:this.productId,
            userNameOrUserCode: '',
            orgName: '',
            materialName: ''
          }
        }).then((response) => {
          let res = response.data
          if (res.code == '1') {
            res.data.orgVo.forEach(item=>{
              this.area_school.forEach(item1=>{
                if (item.areaId == item1.id) {
                  var checkedId = item.id.split(',')
                  item1.checkedSchools = checkedId
                  //设置地区省份选中状态
                  item1.checkAll = item1.checkedSchools.length === item1.schoolList.length;
                  item1.isIndeterminate = item1.checkedSchools.length > 0 && item1.checkedSchools.length < item1.schoolList.length;
                }
              })
            })
          }
        })
      },
      /**
       * 点击快速选择历史弹窗中的选择按钮
       * @param tableIndex 选中表格数据的index值
       */
      _chooseHistory(tableIndex,id){
        this.historyData = [this.tableData[tableIndex]]
        this.dialogVisible=false;
        this.productId = id;
        this._getHistorySchools()
      },
      /**
       * 关闭已选择历史记录时触发此方法
       * @param tag 该标签数据
       */
      handleHistoryTagClose(tag){
        this.historyData=[];
        // 清空已选中学校
        this.area_school.map(item=>{
          item.checkedSchools = []
        })
      },
      /**
       * 当省份复选框发生变化
       * @param iterm
       */
      _checkAllChange(iterm){
        console.log(iterm);
        var index = this.area_school.indexOf(iterm);
        this.area_school[index].checkedSchools=[];
        if(this.area_school[index].checkAll){
          this.area_school[index].schoolList.forEach(t => {
            if(this.select_orgType.types.includes(t.type)){
              this.area_school[index].checkedSchools.push(t.id);
            }
          })
        }
        this.area_school[index].isIndeterminate=false;
      },
      /**
       * 学校复选框发生变化时
       * @param iterm
       */
      _handleCheckedSchoolChange(iterm){
        var index = this.area_school.indexOf(iterm);
        let checkedCount = this.area_school[index].checkedSchools.length;
        this.area_school[index].checkAll = checkedCount === this.area_school[index].schoolList.length;
        this.area_school[index].isIndeterminate = checkedCount > 0 && checkedCount < this.area_school[index].schoolList.length;
      },

      /**
       * 当机构类型复选框发生变化
       * @param iterm
       */
      _checkAllTypeChange(iterm){
        let list = [];
        this.select_orgType.types.splice(0);
        if(this.select_orgType.checkAll){
          this.orgTypeList.forEach(t => {
            this.select_orgType.types.push(t.id);
          })
        }
        this.select_orgType.isIndeterminate=false;
      },
      /**
       * 机构类型复选框发生变化时
       * @param iterm
       */
      _handleCheckedTypeChange(iterm){
        let checkedCount = this.select_orgType.types.length;
        this.select_orgType.checkAll = checkedCount == this.orgTypeList.length;
        this.select_orgType.isIndeterminate = checkedCount > 0 && checkedCount < this.orgTypeList.length;

        console.log(this.select_orgType.types);
      },
      /**
       * 点击全选按钮
       */
      _checkedAll(){
        this.area_school.forEach((iterm,index)=>{
          iterm.checkAll=true;
          iterm.checkedSchools=[];
          if(this.select_provinces.length==0||this.select_provinces.includes(iterm.id)){
            iterm.schoolList.forEach((t,i)=>{
              if(this.select_orgType.types.includes(t.type)){
                iterm.checkedSchools.push(t.id);
              }
            })
          }
          iterm.isIndeterminate=false;
        })
      },

      execlChooseOrg(){
        let orgIds=[] ;
        let orgList = this.getSelectData();
        orgList.forEach((iterm,index)=>{
          orgIds.push(iterm.id);
        })

          let url = '/pmpheep/excel/allOrg?chooseOrg='+orgIds;
        this.$commonFun.downloadFile(url)
      },
      /**
       * 点击清空按钮
       */
      _un_checkedAll(){
        this.area_school.forEach((iterm,index)=>{
          iterm.checkAll=false;
          iterm.checkedSchools=[];
          iterm.isIndeterminate=false;
        })
      },
      /**
       * 按区域拼音排序
       */
      _sortByArea(){
        this.sortArea = this.sortArea*(-1);
        this.area_school.sort((x,y)=>{
          let temp = x['province'].localeCompare(y['province'],"zh");
          return temp==0?0:(temp>0?this.sortArea:this.sortArea*(-1));
        });
        console.log(this.area_school)
      },
      /**
       * 按机构名称拼音排序
       */
      _sortByOrg(){
        this.sortOrg = this.sortOrg*(-1);
        this.area_school.forEach(iterm=>{
          iterm.schoolList.sort((x,y)=>{
            let temp = x['name'].localeCompare(y['name'],"zh");
            return temp==0?0:(temp>0?this.sortOrg:this.sortOrg*(-1));
          })
        })
      },
      /**
       * 点击搜索
       */
      _searchOnPage(){
        var highLightHtml=`<span class="bg-yellow">${this.searchName}</span>`;
        this.searchResultFirstId=undefined;
        this.area_school.forEach((iterm,i)=>{
          iterm.schoolList.forEach((t,j)=>{
            t.name=this.$commonFun.getHTMLText(t.name);
            if(t.name.includes(this.searchName)){
              if(!this.searchResultFirstId){
                this.searchResultFirstId=iterm.id;
              }
              t.name=t.name.replace(this.searchName,highLightHtml);
            }
          })
        });
      },
      /**
       * ，定位到第一个匹配项处
       */
      _goToSearchPosition(){
        if(!this.searchResultFirstId) return;
        var dom = document.getElementsByClassName('area'+this.searchResultFirstId);
        var top = dom[0].getBoundingClientRect().top;
        document.getElementsByClassName('app-main')[0].scrollTop=top-300;//通过scrollTop设置滚动到指定
      },
      /**
       * 获取当前选择学校数据
       */
      getSelectData(){
        return this.hasCheckedOrgList;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this._getHistory();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this._getHistory();
      },
      /**
       * 上传excel文件
       * @param file
       * @private
       */
      beforeUploadFile(file){
        let flag = true;
        var filedata = file.raw;
        var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        // 类型判断
        if(!(ext=='xls'||ext=='xlsx')){
          this.$confirm("请按照模板格式的文档上传文件", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          flag = false;
        }
        //文件名不超过40个字符
        if(file.name.length>40){
          this.$confirm("文件名不能超过40个字符", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          flag = false;
        }
        // 判断文件大小是否符合 文件不为0
        if(file.size<1){
          this.$confirm("文件大小不能小于1bt", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          flag = false;
        }
        // 判断文件大小是否符合 文件不大于100M
        if(file.size/1024/1024 > 100){
          this.$confirm("文件大小不能超过100M！", "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
          flag = false;
        }

        this.uploadLoading=flag;
        return flag;
      },
      /**
       * 上传文件请求成功的回调
       */
      upLoadFileSuccess(res, file, fileList){
        this._un_checkedAll();
        this.uploadFileName = file.name;
        if (res.code == '1') {
          this.importExcelInfo={
            all:res.data.orgs.length+res.data.erros.length,
            success:res.data.orgs.length,
            error:res.data.erros.length,
            errorData:res.data.erros,
          };
          this.importExcelInfoView=true;
          //将匹配到的学校选中
          res.data.orgs.forEach(iterm=>{
            this.area_school.forEach(item1=>{
              item1.schoolList.forEach(iterm2=>{
                if(iterm2.name==iterm.orgName){
                  if(!item1.checkedSchools.includes(iterm2.id)){
                    item1.checkedSchools.push(iterm2.id);
                    item1.checkAll = item1.checkedSchools.length === item1.schoolList.length;
                    item1.isIndeterminate = item1.checkedSchools.length > 0 && item1.checkedSchools.length < item1.schoolList.length;
                  }
                }
              })
            })
          });
        }else{
          this.$confirm(res.msg.msgTrim(), "提示",{
          	confirmButtonText: "确定",
          	cancelButtonText: "取消",
          	showCancelButton: false,
          	type: "error"
          });
        }
        console.log(12312312);
        this.uploadLoading = false;
      },
      /**
       * 上传文件请求失败的回调
       */
      uploadError(err, file, fileList){
        this.$confirm('上传文件失败，请重试', "提示",{
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	showCancelButton: false,
        	type: "error"
        });
        this.uploadLoading = false;
      },
    },
    watch:{
      hasCheckedOrgList(){
        this.$emit('selectChange',this.hasCheckedOrgList);
      }
    },
    created(){
      this._getSchools()
      this._getHistory()
    },

  }
</script>

<style scoped>
  .fastQuery>div{
    line-height: 36px;
    padding: 10px 0;
  }
  .fastQuery>div>div:first-child{
    color:#999;
    width: 80px;
    text-align: left;
    word-break: break-all;
    float: left;
  }
  .fastQuery>div>div:last-child{
  }

  .select_provinces{
    width: 70%;
  }
  .queryTips{
    background-color: #ced3d7;
    color: #2a3f54;
    line-height: 1 !important;
    padding: 4px 0 !important;
  }
  .area-list{
    padding: 20px 0 30px;
    border-bottom: 1px dashed #c8c8c8;
  }
  .area-list>div:first-child{
    display: inline-block;
    width: 120px;
    text-align: left;
    word-break: break-all;
    float: left;
    margin-top: 9px;
  }
  .area-list>div:last-child{
    margin-left: 130px;
    padding-left: 20px;
    text-align: left;
    border-left: 1px solid #e5e5e5;
  }
  .searchBox-wrapper{
    float: none;
  }

  .choose-school-list{
    line-height: 36px;
  }
  .choose-school-list .el-checkbox{
    width: 280px;
    margin-right: 10px;
    margin-left: 0 !important;
  }
  .fastQuery_r_text{
    display: inline-block;
    vertical-align: top;
  }
  .importExcelInfoView-title{
    width: 100px;
    display: inline-block;
    vertical-align: top;
  }
  .importExcelInfoView-list{
    padding-bottom: 4px;
  }
</style>

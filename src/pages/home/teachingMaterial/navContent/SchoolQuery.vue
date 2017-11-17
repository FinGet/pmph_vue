<template>
  <div class="query">
    <!--操作按钮区-->
    <div class="query-operation paddingR20">
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" :disabled="!queryData.length>0" @click="publishBtn" size="large">
          发布
          <span v-if="queryData.length>0">({{queryData.length}})</span>
        </el-button>
      </div>
    </div>
    <!--快速选择区域-->
    <div class="fastQuery">
      <div class="clearfix">
        <div class="justify-align">
          快速选择：&nbsp;&nbsp;<span></span>
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
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <div class="clearfix">
        <div class="justify-align">
          区域：&nbsp;&nbsp;<span></span>
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
      <div class="clearfix marginB20">
        <div class="justify-align">
          机构类型：&nbsp;&nbsp;<span></span>
        </div>
        <div>
          <el-checkbox class="marginR30"
                       :indeterminate="select_orgType.isIndeterminate"
                       v-model="select_orgType.checkAll"
                       @change="checkAllTypeChange()">
            全部
          </el-checkbox>
          <span class="vertical-line"></span>
          <el-checkbox-group v-model="select_orgType.types" class="inline-block marginL20">
            <el-checkbox v-for="iterm in orgTypeList" :label="iterm.id" :key="iterm.id"  @change="handleCheckedTypeChange()">{{iterm.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="queryTips text-center">* 如无工作单位请联系教务处进行认证</div>
    </div>
    <!--地区详情区域-->
    <div class="border-T paddingT20">
      <div class="control-area clearfix paddingB20">
        <div class="pull-left">
          <el-button  type="primary" size="small" @click="checkedAll">全选</el-button>
          <el-button  type="primary" size="small" @click="uncheckedAll">清空</el-button>

          <div class="searchBox-wrapper">
            <div class="searchInput">
              <el-input placeholder="请输入搜索关键字" class="searchInputEle" @keyup.enter.native="goToSearchPosition" v-model="searchName" @change="searchOnPage"></el-input>
            </div>
          </div>
          <div class="searchBox-wrapper searchBtn">
            <el-button  type="primary" icon="search" @click="goToSearchPosition">搜索</el-button>
          </div>
        </div>
        <div class="pull-right">
          <el-button  type="primary" size="small" @click="sortByArea">按区域拼音排序</el-button>
          <el-button  type="primary" size="small" @click="sortByOrg">按机构拼音排序</el-button>
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
            @change="checkAllChange(item)">
            <span v-html="item.province"></span>
          </el-checkbox>
        </div>
        <div>
          <el-checkbox-group v-model="item.checkedSchools"  @change="handleCheckedSchoolChange(item)">
            <el-checkbox
              v-for="(city,index) in item.schoolList"
              :label="city.id"
              :key="index"
              v-if="city.type in select_orgType.types"><span v-html="city.name"></span></el-checkbox>
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
            prop="sort"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="通知名称">
          </el-table-column>
          <el-table-column
            prop="total"
            label="发布机构数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="通知创建日期"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template scope="scope">
              <el-button type="text" @click="chooseHistory(scope.$index,scope.row.orgIds)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--已选择院校预览-->
    <el-dialog
      title="已选中机构"
      :visible.sync="dialogVisible2">
      <div class="table-wrapper">
        <el-table
          :data="hasCheckedOrgList"
          stripe
          style="width: 100%">
          <el-table-column
            label="学校名称">
            <template scope="scope">
              <p class="bg-none" v-html="scope.row.name"></p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        sortArea:-1,
        sortOrg:-1,
        type:'new',
        reissueFormData:{
          id:'',
          title:'',
          content:'',
          file:'',
          sendType:1,
          orgIds:'',
          userIds:'',
          bookIds:'',
          senderId:''
        },
        formdata:{
          title:'',
          content:'',
          file:'',
          sendType:1,
          orgIds:'',
          userIds:'',
          bookIds:'',
        },
        selectAll:true,
        sortByTime:true,
        showPublishBtn:false,
        select_provinces:[],
        orgTypeList:[{
          id:1,
          name:'本科'
        },{
          id:2,
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
        tableData:[
          {
            orgIds:'123',
            sort:0,
            name:'全国高等学校健康服务与管理专业第一轮规划教材',
            total:34,
            date:'2017/10/1',
          },{
            orgIds:'123',
            sort:1,
            name:'全国高等学校健康服务与管理专业第一轮规划教材',
            total:34,
            date:'2017/10/1',
          },{
            orgIds:'123',
            sort:2,
            name:'全国高等学校健康服务与管理专业第一轮规划教材',
            total:34,
            date:'2017/10/1',
          }],
        dialogVisible2:false,
        searchName:'',
        searchResultFirstId:'',
      };
    },
    computed: {
      queryData(){
        var list = [];
        this.hasCheckedOrgList.forEach((iterm,index)=>{
          list.push(iterm.id)
        });
        return list;
      },
      hasCheckedOrgList(){
        var list = [];
        this.area_school.forEach((iterm,index)=>{
          if(this.select_provinces.length==0 || this.select_provinces.includes(iterm.id)){
            iterm.schoolList.forEach((t,i)=>{
              if(iterm.checkedSchools.includes(t.id)&&(this.select_orgType.types.length==0||this.select_orgType.types.includes(t.type))){
                list.push(t);
              }
            })
          }
        });
        return list;
      },
    },
    methods: {
      /**
       * 加载学校列表
       */
      getSchools() {
        var schoolName = []
        var schoolType = []
        var schoolId = []
        this.$axios.get("/pmpheep/messages/message/send_object",{
          params:{
            sendType: this.formdata.sendType,
            pageSize: 20,
            pageNumber: 1,
            userNameOrUserCode: '',
            orgName: '',
            materialName: ''
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
              if(tempObj.province){
                tempList.push(tempObj);
              }
            });
            this.area_school= tempList;
          }
        })
      },
      /**
       * 点击快速选择历史弹窗中的选择按钮
       * @param tableIndex 选中表格数据的index值
       */
      chooseHistory(tableIndex,id){
        // console.log(id)
        this.formdata.bookIds = id
        this.historyData = [this.tableData[tableIndex]]
        this.dialogVisible=false;
      },
      /**
       * 关闭已选择历史记录时触发此方法
       * @param tag 该标签数据
       */
      handleHistoryTagClose(tag){
        this.historyData=[];
      },
      /**
       * 当省份复选框发生变化
       * @param iterm
       */
      checkAllChange(iterm){
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
      handleCheckedSchoolChange(iterm){
        var index = this.area_school.indexOf(iterm);
        let checkedCount = this.area_school[index].checkedSchools.length;
        this.area_school[index].checkAll = checkedCount === this.area_school[index].schoolList.length;
        this.area_school[index].isIndeterminate = checkedCount > 0 && checkedCount < this.area_school[index].schoolList.length;
      },

      /**
       * 当机构类型复选框发生变化
       * @param iterm
       */
      checkAllTypeChange(iterm){
        this.select_orgType.types=[];
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
      handleCheckedTypeChange(iterm){
        let checkedCount = this.select_orgType.types.length;
        this.select_orgType.checkAll = checkedCount == this.orgTypeList.length;
        this.select_orgType.isIndeterminate = checkedCount > 0 && checkedCount < this.orgTypeList.length;
      },
      /**
       * 点击全选按钮
       */
      checkedAll(){
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
      /**
       * 点击清空按钮
       */
      uncheckedAll(){
        this.area_school.forEach((iterm,index)=>{
          iterm.checkAll=false;
          iterm.checkedSchools=[];
          iterm.isIndeterminate=false;
        })
      },
      /**
       * 提交表单
       */
      publishBtn(){
        this.dialogVisible2=true;
      },
      /**
       * 点击发布按钮
       */
      submit(){
        this.$message.success('发布成功！');
        this.$router.push({name:'通知列表'});
      },
      /**
       * 返回编辑, 将路由带过来的参数再传给编辑消息页面
       */
      goBackEdit(){
        var routerParams = this.$route.params;
        this.$router.push({name: '编辑消息',query:{type:'reEdit'},params:routerParams})
      },
      /**
       * 按区域拼音排序
       */
      sortByArea(){
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
      sortByOrg(){
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
      searchOnPage(){
        var highLightHtml=`<span class="bg-yellow">${this.searchName}</span>`;
        this.searchResultFirstId=undefined;
        this.area_school.forEach((iterm,i)=>{
          iterm.schoolList.forEach((t,j)=>{
            this.area_school[i].schoolList[j].name=this.$commonFun.getHTMLText(this.area_school[i].schoolList[j].name);
            if(t.name.indexOf(this.searchName)>-1){
              if(!this.searchResultFirstId){
                this.searchResultFirstId=iterm.id;
              }
              this.area_school[i].schoolList[j].name=this.area_school[i].schoolList[j].name.replace(this.searchName,highLightHtml);
            }
          })
        });
      },
      /**
       * ，定位到第一个匹配项处
       */
      goToSearchPosition(){
        console.log(this.searchResultFirstId);
        var dom = document.getElementsByClassName('area'+this.searchResultFirstId);
        var top = dom[0].getBoundingClientRect().top;
        document.getElementsByClassName('app-main')[0].scrollTop=top-300;//通过scrollTop设置滚动到指定
      }
    },
    created(){
      this.getSchools()
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
</style>

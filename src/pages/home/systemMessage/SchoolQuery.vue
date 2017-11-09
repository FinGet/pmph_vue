<script src="../../../router/index.js"></script>
<template>
  <div class="query">
    <!--操作按钮区-->
    <div class="query-operation paddingR20">
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" @click="goBackEdit">
          返回编辑
        </el-button>
        <el-button type="primary" :disabled="!queryData.length>0" @click="publishBtn">
          发送
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
      <div class="clearfix">
        <div class="justify-align">
          机构类型：&nbsp;&nbsp;<span></span>
        </div>
        <div>
          <el-radio-group v-model="select_orgType">
            <el-radio-button :label="0">全部</el-radio-button>
            <el-radio-button :label="1">本科</el-radio-button>
            <el-radio-button :label="2">医院</el-radio-button>
            <el-radio-button :label="3">职教</el-radio-button>
            <el-radio-button :label="4">本科&职教</el-radio-button>
          </el-radio-group>
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
        </div>
        <div class="pull-right">
          <el-button  type="primary" size="small" @click="sortByArea">按区域拼音排序</el-button>
          <el-button  type="primary" size="small" @click="sortByOrg">按机构拼音排序</el-button>
        </div>
      </div>
      <div class="area-list"
           v-for="(item,index) in area_school"
           :key="index"
           v-if="(select_provinces.includes(item.id))||select_provinces.length==0">
        <div>
          <el-checkbox
            :indeterminate="item.isIndeterminate"
            v-model="item.checkAll"
            @change="checkAllChange(item)">
            {{item.province}}
          </el-checkbox>
        </div>
        <div>
          <el-checkbox-group v-model="item.checkedSchools"  @change="handleCheckedSchoolChange(item)">
            <el-checkbox
              v-for="(city,index) in item.schoolList"
              :label="city.id"
              :key="index"
              v-if="select_orgType==0||city.type==select_orgType">{{city.name}}</el-checkbox>
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
            prop="name"
            label="通知名称">
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
        sortArea:false,
        sortOrg:false,
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
        select_orgType:0,
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
      };
    },
    computed: {
      queryData(){
        var list = [];
        this.area_school.forEach((iterm,index)=>{
          [].push.apply(list,iterm.checkedSchools);
        });
        return list;
      },
      hasCheckedOrgList(){
        var list = [];
        this.area_school.forEach((iterm,index)=>{
          iterm.schoolList.forEach((t,i)=>{
            if(iterm.checkedSchools.includes(t.id)){
              list.push(t);
            }
          })
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
        this.$axios.get("/messages/message/send_object",{
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
                  type:tempType[i],
                  name:tempName[i]
                })
              })

              tempList.push(tempObj);
            })
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
            this.area_school[index].checkedSchools.push(t.id);
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
       * 点击全选按钮
       */
      checkedAll(){
        this.area_school.forEach((iterm,index)=>{
          iterm.checkAll=true;
          iterm.checkedSchools=[];
          iterm.schoolList.forEach((t,i)=>{
            iterm.checkedSchools.push(t.id);
          })
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
        var self = this;
        var data = this.type=='reissue'?this.reissueFormData:this.formdata;
        var url = this.type=='reissue'?'/messages/message/again':'/messages/message/new'
        data.orgIds=this.queryData.join(',');
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
        this.sortArea = !this.sortArea;
        this.area_school.sort((x,y)=>{
          return x['province'].localeCompare(y['province'])>0?this.sortArea:!this.sortArea;
        });
      },
      /**
       * 按机构名称拼音排序
       */
      sortByOrg(){
        this.sortOrg = !this.sortOrg;
        this.area_school.forEach(iterm=>{
          iterm.schoolList.sort((x,y)=>{
            return x['name'].localeCompare(y['name'])>0?this.sortOrg:!this.sortOrg;
          })
        })
      }
    },
    created(){
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
    width: 80px;
    text-align: center;
    float: left;
  }
  .area-list>div:last-child{
    margin-left: 90px;
    padding-left: 20px;
    text-align: left;
    border-left: 1px solid #e5e5e5;
  }
</style>

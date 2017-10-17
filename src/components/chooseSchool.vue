<template>
  <div class="query">
    <!--操作按钮区-->
    <div class="query-operation clearfix">
      <!--搜索-->
      <div class="searchBox-wrapper">
        <el-input placeholder="请输入" class="searchInputEle"></el-input>
      </div>
      <!--搜索按钮-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">搜索</el-button>
      </div>
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" :disabled="!showPublishBtn">发布</el-button>
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
          <el-button  type="primary" size="small">全选</el-button>
          <el-button  type="primary" size="small">清空</el-button>
        </div>
        <div class="pull-right">
          <el-button  type="primary" size="small">按区域拼音排序</el-button>
          <el-button  type="primary" size="small">按机构拼音排序</el-button>
        </div>
      </div>
      <div class="area-list"
           v-for="(iterm,index) in area_school"
           :key="index"
           v-if="(select_provinces.includes(iterm.id))||select_provinces.length==0">
        <div>
          <el-checkbox
            :indeterminate="iterm.isIndeterminate"
            v-model="iterm.checkAll"
            @change="checkAllChange(iterm)">
            {{iterm.province}}
          </el-checkbox>
        </div>
        <div>
          <el-checkbox-group v-model="iterm.checkedSchools"  @change="handleCheckedSchoolChange(iterm)">
            <el-checkbox
              v-for="(city,index) in iterm.schoolList"
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
              <el-button type="text" @click="chooseHistory(scope.$index)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selectAll:true,
        sortByTime:true,
        showPublishBtn:false,
        select_provinces:[],
        select_orgType:0,
        area_school:[{
          id:0,
          province:'北京',
          isIndeterminate:false,
          checkAll:false,
          checkedSchools:[],
          schoolList:[{id:1,type:1,name:'清华大学'},{id:2,type:1,name:'北京大学'},{id:3,type:2,name:'中国武警总医院'},{id:4,type:2,name:'协和医院'},{id:5,type:3,name:'中日友好医院'},
            {id:6,type:3,name:'北京医院'},{id:7,type:1,name:'中国人民解放军总医院'},{id:8,type:2,name:'北京回龙观医院'},{id:9,type:4,name:'北大方正软件技术学院卫生分院'}
          ]
        },{
          id:4,
          province:'天京',
          isIndeterminate:false,
          checkAll:false,
          checkedSchools:[],
          schoolList:[{id:1,type:1,name:'清华大学'},{id:2,type:1,name:'北京大学'},{id:3,type:2,name:'中国武警总医院'},{id:4,type:2,name:'协和医院'},{id:5,type:3,name:'中日友好医院'},
            {id:6,type:3,name:'北京医院'},{id:7,type:1,name:'中国人民解放军总医院'},{id:8,type:2,name:'北京回龙观医院'},{id:9,type:4,name:'北大方正软件技术学院卫生分院'}
          ]
        }],
        dialogVisible:false,
        historyData:[],
        tableData:[{
          id:'123',
          sort:0,
          name:'全国高等学校健康服务与管理专业第一轮规划教材',
          total:34,
          date:'2017/10/1',
        },{
          id:'123',
          sort:1,
          name:'全国高等学校健康服务与管理专业第一轮规划教材',
          total:34,
          date:'2017/10/1',
        },{
          id:'123',
          sort:2,
          name:'全国高等学校健康服务与管理专业第一轮规划教材',
          total:34,
          date:'2017/10/1',
        }],
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      /**
       * 点击快速选择历史弹窗中的选择按钮
       * @param tableIndex 选中表格数据的index值
       */
      chooseHistory(tableIndex){
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
    }
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

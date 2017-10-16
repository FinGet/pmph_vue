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
        <el-button type="primary" :disabled="!hasSelected">发布</el-button>
      </div>
    </div>
    <!--快速选择区域-->
    <div class="fastQuery">
      <div class="clearfix">
        <div class="justify-align">
          快速选择：&nbsp;&nbsp;<span></span>
        </div>
        <div>
          <el-button type="default" size="small" @click="dialogVisible=true" icon="plus">历史教材通知</el-button>
        </div>
      </div>
      <div class="clearfix">
        <div class="justify-align">
          区域：&nbsp;&nbsp;<span></span>
        </div>
        <div>
          <el-select v-model="select_provinces" multiple  placeholder="全部" class="select_provinces">
            <el-option
              v-for="item in provinces"
              :key="item"
              :label="item"
              :value="item">
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
      <div class="area-list" v-for="(iterm,index) in area_school">
        <div>
          <el-checkbox :indeterminate="iterm.isIndeterminate" v-model="iterm.checkAll">{{iterm.province}}</el-checkbox>
        </div>
        <div>
          <el-checkbox-group v-model="iterm.checkedCities">
            <el-checkbox v-for="city in iterm.schoolList" :label="city" :key="city">{{city}}</el-checkbox>
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
              <el-button type="text">选择</el-button>
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
        hasSelected:false,
        provinces:['北京市','天津市','河北省','山西','内蒙古自治区',
          '辽宁省','吉林省','黑龙江省','上海市','江苏省','浙江省',
          '安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省',
          '广东省','广西壮族自治区','海南省','重庆市','四川省','贵州省','云南省',
          '西藏自治区','陕西省','甘肃省','青海省','宁夏回族自治区','新疆维吾尔自治区',
          '台湾省','香港特别行政区','澳门特别行政区'
        ],
        select_provinces:[],
        select_orgType:0,
        area_school:[{
          province:'北京',
          isIndeterminate:true,
          checkAll:true,
          checkedCities:[],
          schoolList:['清华大学', '北京大学', '中国武警总医院', '协和医院', '中日友好医院', '北京医院', '中国人民解放军总医院' , '北京回龙观医院',
            '北大方正软件技术学院卫生分院', '首都医科大学', '北京卫生职业学院','人民卫生出版社', '北京协和医院', '北京大学医学部'
          ]
        },{
          province:'北京',
          isIndeterminate:true,
          checkAll:true,
          checkedCities:[],
          schoolList:['清华大学', '北京大学', '中国武警总医院', '协和医院', '中日友好医院', '北京医院', '中国人民解放军总医院' , '北京回龙观医院',
            '北大方正软件技术学院卫生分院', '首都医科大学', '北京卫生职业学院','人民卫生出版社', '北京协和医院', '北京大学医学部'
          ]
        },{
          province:'北京',
          isIndeterminate:true,
          checkAll:true,
          checkedCities:[],
          schoolList:['清华大学', '北京大学', '中国武警总医院', '协和医院', '中日友好医院', '北京医院', '中国人民解放军总医院' , '北京回龙观医院',
            '北大方正软件技术学院卫生分院', '首都医科大学', '北京卫生职业学院','人民卫生出版社', '北京协和医院', '北京大学医学部'
          ]
        },{
          province:'北京',
          isIndeterminate:true,
          checkAll:true,
          checkedCities:[],
          schoolList:['清华大学', '北京大学', '中国武警总医院', '协和医院', '中日友好医院', '北京医院', '中国人民解放军总医院' , '北京回龙观医院',
            '北大方正软件技术学院卫生分院', '首都医科大学', '北京卫生职业学院','人民卫生出版社', '北京协和医院', '北京大学医学部'
          ]
        }],
        dialogVisible:false,
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

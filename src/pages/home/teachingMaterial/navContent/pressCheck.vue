<template>
  <div class="teachingMaterial publisherAudit">
    <div class="teachingMaterial-search clearfix" :class="{powerSearch:powerSearch}">
      <div v-if="!powerSearch">
        <!--书名选择框-->
        <div class="searchBox-wrapper lg">
          <div class="searchName">书名：<span></span></div>
          <div class="searchInput">
            <el-select v-model="booksChooseValue5" multiple placeholder="请选择">
              <el-option
                v-for="item in booksChooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">账号/姓名：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <!--职务搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职务：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <!--职称搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">职称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <!--工作单位搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">工作单位：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <!--申报单位搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">申报单位：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle"></el-input>
          </div>
        </div>
        <!--申报职务搜索-->
        <div class="searchBox-wrapper">
          <div class="searchName">申报职务：<span></span></div>
          <div class="searchInput">
            <el-select v-model="positionValueChoose" placeholder="请选择">
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
            <el-select placeholder="请选择">
              <el-option
                v-for="item in booksChooseOptions2"
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
            <el-select placeholder="请选择">
              <el-option
                v-for="item in booksChooseOptions3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
        <!--操作按钮-->
        <div class="operation-wrapper">
          <el-button type="primary">导出World</el-button>
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
            <el-select v-model="booksChooseValue5" multiple placeholder="请选择" v-if="powerSearchValue===1">
              <el-option
                v-for="item in booksChooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  multiple placeholder="请选择" v-else-if="powerSearchValue===7">
              <el-option
                v-for="item in booksChooseOptions2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  multiple placeholder="请选择" v-else-if="powerSearchValue===8">
              <el-option
                v-for="item in booksChooseOptions3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="请输入" class="searchInputEle" v-else></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
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
          width="100"
        >
          <template scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          width="120">
          <template scope="scope">
            <router-link :to="{name:'专家信息',query: { userId: scope.row.code }}" class="table-link">{{scope.row.code}}</router-link>
          </template>
        </el-table-column>

        <el-table-column
          label="申报单位/工作单位">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="申报单位" placement="top">
              <p>
                <i class="fa fa-university"></i>
                {{scope.row.applicationOrganization}}
              </p>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="工作单位" placement="top">
              <p>
                <i class="fa fa-briefcase"></i>
                {{scope.row.workOrganization}}
              </p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="职务/职称"
        >
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="工作单位" placement="top">
              <p>
                <i class="fa fa-tags"></i>
                {{scope.row.position}}
              </p>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="工作单位" placement="top">
              <p>
                <i class="fa fa-graduation-cap"></i>
                {{scope.row.professionalTitle}}
              </p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
        >
          <template scope="scope">
            <p>
              <i class="fa fa-phone fa-fw" v-if="scope.row.phone"></i>
              {{scope.row.phone}}
            </p>
            <p>
              <i class="fa fa-envelope fa-fw" v-if="scope.row.email"></i>
              {{scope.row.email}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="chooseBookJob"
          label="所选书籍与职务">
        </el-table-column>
        <el-table-column
          prop="schoolCheck"
          label="学校审核"
        >
        </el-table-column>
        <el-table-column
          prop="pressCheck"
          label="出版社审核"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        :page-sizes="[30,50,100, 200, 300, 400]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
          value:1,
          label:'全部'
        },{
          value:2,
          label:'主编'
        },{
          value:3,
          label:'副主编'
        },{
          value:4,
          label:'编委'
        }],
        booksChooseOptions: [{
          value: '选项1',
          label: '儿科护理学'
        }, {
          value: '选项2',
          label: '病理学与病理生理学'
        }, {
          value: '选项3',
          label: '精神科护理学'
        }, {
          value: '选项4',
          label: '护理伦理与法律法规'
        }, {
          value: '选项6',
          label: '精神科护理伦理与法律法规'
        }, {
          value: '选项5',
          label: '眼耳鼻咽喉口腔科护理学'
        }],
        booksChooseOptions2:[{
          value: '选项1',
          label: '已审核'
        }, {
          value: '选项2',
          label: '待审核'
        }],
        booksChooseOptions3:[{
          value: '选项1',
          label: '已收到纸质表'
        }, {
          value: '选项2',
          label: '未收到纸质表'
        }],
        booksChooseValue5: [],
        positionValueChoose:1,
        tableData: [{
          name: '王小虎',
          code: 'wangxiaohu',
          applicationOrganization:'四川大学',
          workOrganization:'成都医科大学',
          position:'无',
          professionalTitle:'副教授',
          chooseBookJob:'中医学-副主编',
          schoolCheck:'已审核',
          pressCheck:'已收到纸质表',
          phone:'13699999999',
          email:'13699999999@qq.com',
          birthdate:'1988-8-8'
        },
          {
            name: '张小虎',
            code: '1823333333u',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'课程负责人',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'未审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com',
            birthdate:'1988-8-8'
          },
          {
            name: '人卫社',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'教研室主任',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'未审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com',
            birthdate:'1988-8-8'
          },
          {
            name: '王小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'已审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com',
            birthdate:'1988-8-8'
          },
          {
            name: '小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'已审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            birthdate:'1988-8-8'
          },
          {
            name: '王小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'未审核',
            pressCheck:'未收到纸质表',
            email:'13699999999@qq.com',
            birthdate:'1988-8-8'
          },
          {
            name: '大小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'待审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          },
          {
            name: '大小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'待审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          },
          {
            name: '大小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'待审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          },
          {
            name: '大小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'待审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          },
          {
            name: '王小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'待审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          },
          {
            name: '李小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'已审核',
            pressCheck:'未收到纸质表',
            phone:'13699999999',
            email:'13699999999@qq.com'
          }
        ]
      }
    },
    methods:{
      filterSchoolCheck(value, row){
        return row.schoolCheck === value;
      },
      filterPressCheck(value, row){
        return row.pressCheck === value;
      },
      /**
       * 此方法用于展开与收起高级搜索区域
       */
      toggleSearchType(){
        this.powerSearch=!this.powerSearch;
      },
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

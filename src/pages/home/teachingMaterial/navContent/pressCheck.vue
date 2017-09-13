<template>
  <div class="teachingMaterial publisherAudit">
    <div class="teachingMaterial-search clearfix">
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书名：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--姓名搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职务：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--职务搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职务：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--职称搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">职称：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--工作单位搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">工作单位：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
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
      <!--<div class="searchBox-wrapper">-->
        <!--<div class="searchName">学校审核：<span></span></div>-->
        <!--<div class="searchInput">-->
          <!--<el-input placeholder="全部" class="searchInputEle"></el-input>-->
        <!--</div>-->
      <!--</div>-->
      <!--纸质表搜索-->
      <!--<div class="searchBox-wrapper">-->
        <!--<div class="searchName">纸质表：<span></span></div>-->
        <!--<div class="searchInput">-->
          <!--<el-select v-model="positionValueChoose" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in positionValue"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
      <!--</div>-->
      <!--姓名搜索-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary" icon="search">搜索</el-button>
      </div>
    </div>
    <!--操作按钮-->
    <div class="operation-wrapper">
      <el-button type="primary">导出World</el-button>
      <el-button type="primary">导出Excel</el-button>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          sortable
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="code"
          label="申报账号">
        </el-table-column>
        <el-table-column
          label="申报单位/工作单位">
          <template scope="scope">
            <p>{{scope.row.applicationOrganization}}</p>
            <p>{{scope.row.workOrganization}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职务"
        >
        </el-table-column>
        <el-table-column
          prop="professionalTitle"
          label="职称">
        </el-table-column>
        <el-table-column
          prop="chooseBookJob"
          label="所选书籍与职务">
        </el-table-column>
        <el-table-column
          prop="schoolCheck"
          label="学校审核"
          :filters="[{ text: '已审核', value: '已审核' }, { text: '待审核', value: '待审核' }, { text: '未审核', value: '未审核' }]"
          :filter-method="filterSchoolCheck"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          prop="pressCheck"
          label="出版社审核"
          :filters="[{ text: '已收到纸质表', value: '已收到纸质表' }, { text: '未收到纸质表', value: '未收到纸质表' }]"
          :filter-method="filterPressCheck"
          filter-placement="bottom-end"
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
          pressCheck:'已收到纸质表'
        },
          {
            name: '张小虎',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'未审核',
            pressCheck:'未收到纸质表'
          },
          {
            name: '人卫社',
            code: 'wangxiaohu',
            applicationOrganization:'四川大学',
            workOrganization:'成都医科大学',
            position:'无',
            professionalTitle:'副教授',
            chooseBookJob:'中医学-副主编',
            schoolCheck:'未审核',
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
            pressCheck:'未收到纸质表'
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
    },
  }
</script>

<style scoped>

</style>

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
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--学校审核搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">学校审核：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--纸质表搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">纸质表：<span></span></div>
        <div class="searchInput">
          <el-input placeholder="全部" class="searchInputEle"></el-input>
        </div>
      </div>
      <!--姓名搜索-->
      <div class="searchBox-wrapper searchBtn">
        <el-button  type="primary">查询</el-button>
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
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="申报账号">
        </el-table-column>
        <el-table-column
          prop="applicationOrganization"
          label="申报单位">
        </el-table-column>
        <el-table-column
          prop="workOrganization"
          label="工作单位">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职务">
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
          label="学校审核">
        </el-table-column>
        <el-table-column
          prop="pressCheck"
          label="出版社审核">
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
        tableData: [{
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
            name: '王小虎',
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
    }
  }
</script>

<style scoped>

</style>

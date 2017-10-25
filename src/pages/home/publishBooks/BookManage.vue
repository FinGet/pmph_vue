<template>
	<div class="bookManage">
    <div class="clearfix" :class="{powerSearch:powerSearch}">
      <!--高级搜索-->
      <div  v-if="powerSearch">
        <div class="searchBox-wrapper powerSearch">
          <el-select v-model="powerSearchValue" class="searchName" placeholder="请选择">
            <el-option
              v-for="item in powerSearchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" placeholder="请选择" v-if="powerSearchValue===3">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isEmphasis" placeholder="请选择" v-else-if="powerSearchValue===4">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isPublish" placeholder="请选择" v-else-if="powerSearchValue===5">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.bookName" v-else-if="powerSearchValue===1"></el-input>
            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.bookType" v-else-if="powerSearchValue===2"></el-input>
          </div>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">高级搜索</el-button>
        </div>
      </div>
      <div v-else>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">书籍名称：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.bookName"></el-input>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">书籍类别：<span></span></div>
          <div class="searchInput">
            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.bookType"></el-input>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">是否新书推荐：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" placeholder="请选择">
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
            <el-select v-model="searchForm.isEmphasis" placeholder="请选择">
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
            <el-select v-model="searchForm.isPublish" placeholder="请选择">
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
          <el-button  type="primary" icon="search">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
      </div>
    </div>
    <!--操作按钮-->
    <div class="operation-wrapper">
      <el-button type="primary">导出World</el-button>
      <el-button type="primary">导出Excel</el-button>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  searchForm:{
			    bookName:'',
          bookType:'',
          isNew:'',
          isEmphasis:'',
          isPublish:''
        },
        powerSearch:true,
        powerSearchValue:1,
        powerSearchList:[
          {
            value:1,
            label:'书籍名称'
          },
          {
            value:2,
            label:'书籍类别'
          },{
            value:3,
            label:'是否新书推荐'
          },{
            value:4,
            label:'是否重磅推荐'
          },{
            value:5,
            label:'是否上架'
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
        }]
      }
		},
    methods:{
      /**
       * 点击展开收起高级搜索文字按钮
       */
      toggleSearchType(){
        this.powerSearch=!this.powerSearch;
      },
    },
	}
</script>

<style scoped>
  .searchBox-wrapper{
    width: 350px;
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
</style>

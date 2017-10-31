<template>
	<div class="bookManage">
    <div class="clearfix" :class="{powerSearch:powerSearch}">
      <!--高级搜索-->
      <div  v-if="powerSearch">
        <div class="searchBox-wrapper powerSearch" :class="{lg:powerSearchValue===2}">
          <el-select v-model="powerSearchValue" class="searchName" placeholder="请选择">
            <el-option
              v-for="item in powerSearchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" @change="getTableData" placeholder="请选择" v-if="powerSearchValue===3">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isPromote" @change="getTableData" placeholder="请选择" v-else-if="powerSearchValue===4">
              <el-option
                v-for="item in FilterNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="searchForm.isOnSale" placeholder="请选择" @change="getTableData" v-else-if="powerSearchValue===5">
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
              :props="{ label: 'typeName', value:'path', children: 'childrenMaterialTypeVO' }"
              :value="searchForm.path"
              @change="bookTypeChange"
              :change-on-select="true"
            ></el-cascader>
            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.name" v-else-if="powerSearchValue===1"></el-input>
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
            <el-input placeholder="请输入" class="searchInputEle" v-model="searchForm.name"></el-input>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper lg">
          <div class="searchName">书籍类别：<span></span></div>
          <div class="searchInput">
            <el-cascader
              class="searchInputEle bookType"
              :options="bookTypeList"
              :props="{ label: 'typeName', value:'path', children: 'childrenMaterialTypeVO' }"
              :value="searchForm.path"
              @change="bookTypeChange"
              :change-on-select="true"
            ></el-cascader>
          </div>
        </div>
        <!--书名选择框-->
        <div class="searchBox-wrapper">
          <div class="searchName">是否新书推荐：<span></span></div>
          <div class="searchInput">
            <el-select v-model="searchForm.isNew" placeholder="请选择" @change="getTableData">
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
            <el-select v-model="searchForm.isPromote" placeholder="请选择" @change="getTableData">
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
            <el-select v-model="searchForm.isOnSale" placeholder="请选择" @change="getTableData">
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
          <el-button  type="primary" icon="search" @click="getTableData">搜索</el-button>
        </div>
        <!--姓名搜索-->
        <div class="searchBox-wrapper searchBtn">
          <el-button type="text" @click="toggleSearchType">收起搜索区</el-button>
        </div>
      </div>
      <div class="operation-wrapper">
        <el-tooltip class="item" effect="dark" content="请按照模板格式上传!" placement="top">
          <el-button type="primary">配套图书导入</el-button>
        </el-tooltip>
        <el-button type="primary">模板下载.xlsx</el-button>
        <el-button type="primary">图书全量同步</el-button>
        <el-button type="primary">图书增量同步</el-button>
        <el-button type="primary" :disabled="!selectData.length" @click="bulkEditInfo">批量修改</el-button>
      </div>
    </div>
    <div class="table-wrapper clearfix">
      <el-table
        :data="tableData"
        ref="myMsgTable"
        border
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
          width="80">
          <template scope="scope">
            <el-button type="text" @click="editInfo(scope.row)">修改</el-button>
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
        :current-page="searchForm.pageNumber"
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
        <el-form ref="form" :model="form" label-width="120px" class="form">
          <el-form-item label="是否新书推荐：">
            <el-radio-group v-model="form.isNew">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否重点推荐：">
            <el-radio-group v-model="form.isPromote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架：">
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
          <el-form-item label="书籍类别：">
            <el-cascader
              class="searchInputEle bookType"
              :options="bookTypeList"
              :props="{ label: 'typeName', value:'id', children: 'childrenMaterialTypeVO' }"
              :value="form.typeId"
              @change="bookTypeChange_form"
              :change-on-select="true"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  form:{
			    bookId:'',
          isNew:true,
          isPromote:true,
          isOnSale:true,
          typeId:[]
        },
			  searchForm:{
          name:'',
          path:[],
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
      }
		},
    methods:{
      /**
       * 获取表格数据
       */
      getTableData(){
        let path = this.bookTypeSelected[this.bookTypeSelected.length-1];
        path=path?path:"";
        console.log(path);
        this.$axios.get('/books/list/book',{params:{
          name:this.searchForm.name,
          path:path,
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
              this.tableData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 获取书籍类别树数据
       */
      getBookType(){
        this.$axios.get('/books/list/materialtype')
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              res.data.typeName='全部';
              res.data.path='';
              this.bookTypeList = res.data.childrenMaterialTypeVO;
              console.log(this.bookTypeList)
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
        console.log(row)
        this.dialogVisible=true;
        this.form.bookId = row.id;
        this.form.isNew = row.isNew;
        this.form.isOnSale = row.isOnSale;
        this.form.isPromote = row.isPromote;
        var path = row.path?row.path.split('-'):[];
        path.forEach(t=>{
          this.form.typeId.push(parseInt(t));
        });
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
        this.form.typeId = [1];
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
        let type = this.form.typeId[this.form.typeId.length-1];
        type=type?type:0;

        this.$axios.put('/books/update/book',this.$commonFun.initPostData({
          ids:this.form.bookId,
          isNew:this.form.isNew,
          isPromote:this.form.isPromote,
          isOnSale:this.form.isOnSale,
          type:type,
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
      }
    },
    created(){
		  this.getTableData();
		  this.getBookType();
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
</style>

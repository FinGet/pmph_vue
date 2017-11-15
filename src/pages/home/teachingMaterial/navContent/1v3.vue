<template>
  <div class="teachingMaterial bookSelect">
    <div class="teachingMaterial-search clearfix">
      <!--书名选择框-->
      <div class="searchBox-wrapper lg">
        <div class="searchName">书名：<span></span></div>
        <div class="searchInput">
          <el-select v-model="booksChooseValue5" multiple placeholder="全部">
            <el-option
              v-for="item in booksChooseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--进度搜索-->
      <div class="searchBox-wrapper">
        <div class="searchName">进度：<span></span></div>
        <div class="searchInput">
          <el-select v-model="currentState" placeholder="全部">
            <el-option
              v-for="item in currentStateList"
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
      <!--操作按钮-->
      <div class="operation-wrapper">
        <el-button type="primary" @click="forceEnd=!forceEnd">{{forceEnd?'恢复':'强制结束'}}</el-button>
        <el-button type="primary" @click="showDialog(1)">批量通过</el-button>
        <el-button type="primary" @click="showDialog(0)">批量结果公布</el-button>
        <el-button type="primary">批量导出Excel</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="bookorder"
          label="书序"
          width="68">
        </el-table-column>
        <el-table-column
          prop="edition"
          label="版次"
          width="68">
        </el-table-column>
        <el-table-column
          label="书名">
          <template scope="scope">
            {{scope.row.bookname}}
          </template>
        </el-table-column>
        <el-table-column
          prop="applyNumber"
          label="申报数"
          width="80">
        </el-table-column>
        <!--主任 start-->
        <el-table-column
          label="策划编辑"
          width="106">
          <template scope="scope">
            <p v-if="scope.row.state==0">
              待分配
              <el-tooltip class="item" effect="dark" content="点击选择策划编辑" placement="top">
                <el-button type="text">
                  <i class="fa fa-pencil fa-fw"></i>
                </el-button>
              </el-tooltip>
            </p>
            <p v-else>
              {{scope.row.planningEditor}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="遴选主编/副主编" width="230">
          <template scope="scope">
            <span v-if="scope.row.state==1">李雪华，陈朝阳</span>
            <span v-else-if="scope.row.state==2">刘德华，黎明等{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人</span>
            <span v-else-if="scope.row.state==3">傅松滨</span>
            <span v-else-if="scope.row.state==4">陈朝阳</span>
            <span v-else>待遴选</span>
            <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top" v-if="scope.row.state!=2">
              <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid,type:'chief'}}">
                <el-button type="text">
                  <i class="fa fa-pencil fa-fw"></i>
                </el-button>
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          label="遴选编委" width="230">
          <template scope="scope">
            <span v-if="scope.row.state==1">王家乐，王家梁</span>
            <span v-else-if="scope.row.state==2">王家乐，王家梁{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人</span>
            <span v-else-if="scope.row.state==3">王家乐</span>
            <span v-else-if="scope.row.state==4">王家梁</span>
            <span v-else>待遴选</span>
            <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top" v-if="scope.row.state!=2">
              <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid,type:'pres'}}">
                <el-button type="text">
                  <i class="fa fa-pencil fa-fw"></i>
                </el-button>
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--主任 end-->

        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button type="text" :disabled="true" v-if="scope.row.state==0||scope.row.state==2||scope.row.state>4">名单确认</el-button>
            <el-button type="text" v-else @click="showDialog(1,scope.row)">名单确认</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" @click="showDialog(0,scope.row)"  v-if="(scope.row.state!=0&&scope.row.state!=2)&&scope.row.state<5">最终结果公布</el-button>
            <el-button type="text" :disabled="true" v-else>最终结果公布</el-button>
            <span class="vertical-line"></span>
            <el-button type="text">导出Excel</el-button>
            <span class="vertical-line"></span>
            <el-button type="text" :disabled="true" v-if="scope.row.state==0||scope.row.state>4">创建小组</el-button>
            <el-button type="text" v-else>创建小组</el-button>
          </template>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <p v-html="dialogContent"></p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
        forceEnd:false,
        booksChooseValue5:'',
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
        currentState:1,
        currentStateList:[{
          value:1,
          label:'全部'
        },{
          value:2,
          label:'名单未确认'
        },{
          value:3,
          label:'名单已确认'
        },{
          value:4,
          label:'结果已公布'
        },{
          value:5,
          label:'强制结束'
        }],
        tableData: [{
          state:0,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:[],
        },{
          state:1,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          subeditorHasChoose:true,
          editorialBoard:['张一山','王尔尔','赵三三','一一一','二二人','三三'],
          editorialBoardHasChoose:true,
        },{
          state:2,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['张一山','王尔尔','赵三三','一一一','二二人','三三'],
          editorialBoardHasChoose:true,
        },{
          state:3,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['张一山','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:4,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:5,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:6,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:7,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:8,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:false,
          bookid:'123456',
          bookorder:1,
          bookname: '眼耳鼻喉口腔科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是','','',''],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:true,
          bookid:'123456',
          bookorder:1,
          bookname: '细胞生物学和医学遗传学',
          edition: 9,
          applyNumber:188,
          planningEditor:'张强',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['张一一','王尔尔','赵三三','一一一','二二人','三三'],
        },{
          state:0,
          editing:false,
          bookid:'223456',
          bookorder:1,
          bookname: '神经科学',
          edition: 9,
          applyNumber:188,
          planningEditor:'人卫社',
          chiefEditor:'张三',
          subeditor:['张思','王五','赵六','李思是'],
          editorialBoard:['李建国','王尔尔','赵三三','一一一','二二人','三三'],
        }],
        dialogVisible:false,
        dialogContent:''
      }
    },
    methods:{
      /**
       * 显示出取人弹出框，
       * @param type 0代表通过按钮，1代表点击结果公布按钮
       * @param data 数据，当为空时代表批量导出或公布
       */
      showDialog(type,data){
        var html = '';
        if(type==1){
          html = `您要通过${data?'《'+data.bookname+'》':'所有选中'}的名单吗？<br/>名单通过后，除您以外的其他编辑和主编将无法继续变动名单`
        }else{
          html = `您要公布${data?'《'+data.bookname+'》':'所有选中'}的遴选结果吗？<br/>结果公布后您仍然可以修改名单并再次公布`
        }
        this.dialogContent = html;

        this.dialogVisible=!this.dialogVisible;
      }
    },
  }
</script>
<style>
  .scopeSpan1{
    display: inline-block;
    vertical-align: middle;
  }
  .scopeSpan2{
    display: inline-block;
    vertical-align: middle;
    max-width: 110px;
    padding: 0 0 0 10px;
    text-align: center;
  }
  .scopeSpan3{
    display: inline-block;
    vertical-align: middle;
  }
</style>

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
        <!--申报职务搜索-->
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
          <el-button  type="primary" v-if="level==2">批量导出Excel</el-button>
          <el-button  type="primary" v-if="level==2">查看遴选表</el-button>
          <el-button type="primary" @click="showDialog(1)" v-if="level==1">批量通过</el-button>
          <el-button type="primary" @click="showDialog(0)" v-if="level==1">批量结果公布</el-button>
          <el-button type="primary" v-if="level==1">批量导出Excel</el-button>
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
            v-if="level==2||level==1"
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
          <el-table-column  v-if="level===1"
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
            label="遴选主编/副主编/编委" v-if="level===1" width="230">
            <template scope="scope">
              <span class="scopeSpan1">
                <span v-if="scope.row.state==0"></span>
                <span v-else>共{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人</span>
              </span>
              <span class="scopeSpan2">
                <span v-if="scope.row.state==0">待遴选</span>
                <span v-if="scope.row.state==1">
                  <span>策划编辑已确认</span>
                  <span>项目编辑已确认</span>
                </span>
                <span v-if="scope.row.state==2">策划编辑已确认</span>
                <span v-if="scope.row.state==3">项目编辑已确认</span>
                <span v-if="scope.row.state==4"></span>
                <span v-if="scope.row.state==5">通过</span>
                <span v-if="scope.row.state==6">结果已公布</span>
                <span v-if="scope.row.state==7">通过 <el-tag type="warning">变动</el-tag></span>
                <span v-if="scope.row.state==8">结果公布 <el-tag type="warning">变动</el-tag></span>
              </span>
              <span class="scopeSpan3">
                <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top">
                  <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="当前进度" v-if="level===1">
            <template scope="scope">
              <span v-if="scope.row.state==0">名单未产生</span>
              <span v-if="scope.row.state==1">名单已确认</span>
              <span v-if="scope.row.state==2">遴选中</span>
              <span v-if="scope.row.state==3">遴选中</span>
              <span v-if="scope.row.state==4">遴选中</span>
              <span v-if="scope.row.state==5">通过</span>
              <span v-if="scope.row.state==6">结果公布</span>
              <span v-if="scope.row.state==7">再次修改</span>
              <span v-if="scope.row.state==8">再次修改</span>
            </template>
          </el-table-column>
          <!--主任 end-->

          <!--项目编辑start-->
          <el-table-column
            v-if="level===2"
            label="策划编辑"
            width="110">
            <template scope="scope">
              <p>
                <span v-if="scope.row.state==0">(待分配)</span>
                <span v-else>{{scope.row.planningEditor}}</span>
                <el-tooltip class="item" effect="dark" content="点击进入遴选策划编辑" placement="top">
                  <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="主编/副主编" v-if="level===2">
            <template scope="scope">
              <p v-if="scope.row.chiefEditor">
                <span v-if="scope.row.state==0">待遴选</span>
                <span v-else-if="scope.row.state==1">李雪华，陈朝阳</span>
                <span v-else-if="scope.row.state==2">刘德华，黎明等{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人</span>
                <span v-else-if="scope.row.state==3">傅松滨<el-tag type="warning">暂存</el-tag></span>
                <span v-else-if="scope.row.state==4">陈朝阳</span>
                <span v-else>陈朝阳</span>
                <el-tooltip class="item" effect="dark" content="点击进入遴选主编/副主编/编委" placement="top" v-if="scope.row.state==3||scope.row.state==0">
                  <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid,level:level}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击进入查看主编/副主编/编委" placement="top" v-else>
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:0}}">
                    <el-button type="text">
                      <i class="fa fa-eye fa-lg"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
              <p class="gray" v-else>( 空 )</p>
            </template>
          </el-table-column>
          <el-table-column
            label="编委审核" v-if="level===2">
            <template scope="scope">
              <p class="gray"  v-if="scope.row.state==0||scope.row.state==3">-</p>
              <p v-else>
                <span v-if="scope.row.state==1">共13人 <el-tag type="warning">待确认</el-tag></span>
                <span v-else-if="scope.row.state==2">共13人 <el-tag type="warning">变动</el-tag></span>
                <span v-else-if="scope.row.state==4">等待主编提供名单</span>
                <span v-else-if="scope.row.state==5">共13人 <el-tag type="success">结果已公布</el-tag></span>
                <span v-else-if="scope.row.state==6">共13人 <el-tag type="success">已确认</el-tag></span>
                <span v-else-if="scope.row.state==7">共13人 <el-tag type="success">审核通过</el-tag></span>
                <el-tooltip class="item" effect="dark" content="点击进入编委审核" placement="top">
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:0}}">
                    <el-button type="text">
                      <i class="fa fa-eye fa-lg"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
            </template>
          </el-table-column>
          <!--项目编辑end-->

          <!--策划编辑start-->
          <el-table-column  v-if="level===3"
                            label="主编/副主编">
            <template scope="scope">
              <p v-if="scope.row.state!=0">刘德华，黎明等{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人</p>
              <p v-else>项目编辑遴选中</p>
            </template>
          </el-table-column>
          <el-table-column
            label="编委预选" v-if="level===3">
            <template scope="scope">
              <p v-if="scope.row.editorialBoard.length">
                <span v-if="scope.row.state==3">待预选</span>
                <span v-else-if="scope.row.state==2">已选3人 <el-tag type="warning">暂存</el-tag></span>
                <span v-else>已选{{scope.row.editorialBoard.length}}人</span>
                <el-tooltip class="item" effect="dark" content="点击进入遴选编委" placement="top" v-if="scope.row.state==2||scope.row.state==3||scope.row.state==4||scope.row.state==5">
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:1}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw" v-if="!scope.row.subeditorHasChoose"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
              <p class="gray" v-else>( 空 )</p>
            </template>
          </el-table-column>
          <el-table-column
            label="编委审核" v-if="level===3">
            <template scope="scope">
              <p v-if="scope.row.editorialBoard.length">
                <span v-if="scope.row.state==2||scope.row.state==3">-</span>
                <span v-else-if="scope.row.state==1">共13人 <el-tag type="warning">待确认</el-tag></span>
                <span v-else-if="scope.row.state==4">等待主编提交名单</span>
                <span v-else-if="scope.row.state==5">共13人 <el-tag type="success">结果已公布</el-tag></span>
                <span v-else-if="scope.row.state==6">共13人 <el-tag type="success">已确认</el-tag></span>
                <span v-else-if="scope.row.state==7">共13人 <el-tag type="warning">变动</el-tag></span>
                <span v-else-if="scope.row.state==8">共13人 <el-tag type="success">审核通过</el-tag></span>
                <span v-else>-</span>
                <el-tooltip class="item" effect="dark" content="点击查看编委" placement="top" v-if="scope.row.state!=2&&scope.row.state!=3">
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:0}}">
                    <el-button type="text">
                      <i class="fa fa-eye fa-lg"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
              <p class="gray" v-else>-</p>
            </template>
          </el-table-column>
          <!--策划编辑end-->

          <el-table-column
            label="操作">
            <template scope="scope">
              <div v-if="level===1">
                <el-button type="text" :disabled="true" v-if="scope.row.state==0||scope.row.state==5||scope.row.state==6||scope.row.state==8">通过</el-button>
                <el-button type="text" v-else @click="showDialog(1,scope.row)">通过</el-button>
                <span class="vertical-line"></span>
                <el-button type="text" @click="showDialog(0,scope.row)"  v-if="scope.row.state==1||scope.row.state==5||scope.row.state==7||scope.row.state==8">结果公布</el-button>
                <el-button type="text" :disabled="true" v-else>结果公布</el-button>
                <span class="vertical-line"></span>
                <el-button type="text">导出Excel</el-button>
              </div>
              <div v-else>
                <el-button type="text">导出Excel</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrapper">
        <el-pagination v-if="level===1"
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
              level:undefined,
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
                label:'待选主编/副主编'
              },{
                value:3,
                label:'已分配主编/副主编'
              },{
                value:4,
                label:'...'
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
        created(){
          this.$store.commit('UPDATE_LEVEL',{level:this.$route.query.level});
          this.level = this.$store.getters.getUserLevel;
          console.log(this.$store.getters.getUserData)
          console.log(this.$store.getters.getUserLevel)
          //模拟下当是策划编辑时少一点数据
          if(this.level!==1){
            this.tableData.splice(8);
          }
        },
        watch: {
          $route () {
            this.$store.commit('UPDATE_LEVEL',{level:this.$route.query.level});
            this.level = this.$store.getters.getUserLevel;
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

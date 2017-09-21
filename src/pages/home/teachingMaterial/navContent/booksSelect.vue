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
          <el-button  type="primary" v-if="level==2">主编/副主编确认</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="table-wrapper">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--width="55">-->
          <!--</el-table-column>-->
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
              <router-link to="#">{{scope.row.bookname}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyNumber"
            label="申报数"
            width="80">
          </el-table-column>
          <!--主任 start-->
          <el-table-column  v-if="level===1"
                            prop="planningEditor"
                            label="策划编辑"
                            width="100">
          </el-table-column>
          <el-table-column
            label="遴选主编/副主编/编委" v-if="level===1">
            <template scope="scope">
              <p v-if="scope.row.chiefEditor">
                {{scope.row.chiefEditor}}等{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人
                <el-tooltip class="item" effect="dark" content="点击进入遴选主编/副主编/编委" placement="top">
                  <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
              </p>
              <p class="gray" v-else>( 空 )</p>
            </template>
          </el-table-column>
          <!--主任 end-->

          <!--项目编辑start-->
          <el-table-column
            v-if="level===2"
            label="策划编辑"
            width="100">
            <template scope="scope">
              <p>
                {{scope.row.planningEditor}}
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
                {{scope.row.chiefEditor}}等{{scope.row.subeditor.length+scope.row.editorialBoard.length}}人
                <el-tooltip class="item" effect="dark" content="点击进入遴选主编/副主编/编委" placement="top">
                  <router-link :to="{name:'遴选主编/副主编',query:{bookid:scope.row.bookid,level:level}}">
                    <el-button type="text">
                      <i class="fa fa-pencil fa-fw"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
                <el-tag type="success" v-if="scope.row.subeditorHasChoose">已确认</el-tag>
                <el-tag type="warning" v-else>待确认</el-tag>
              </p>
              <p class="gray" v-else>( 空 )</p>
            </template>
          </el-table-column>
          <el-table-column
            label="编委审核" v-if="level===2">
            <template scope="scope">
              <p v-if="scope.row.editorialBoard.length">
                {{scope.row.editorialBoard[0]}}等{{scope.row.editorialBoard.length}}人
                <el-tooltip class="item" effect="dark" content="点击进入编委审核" placement="top">
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:0}}">
                    <el-button type="text">
                      <i class="fa fa-eye fa-lg"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
                <el-tag type="success" v-if="scope.row.editorialBoardHasChoose">已提交</el-tag>
                <el-tag type="warning" v-else>暂存</el-tag>
              </p>
              <p class="gray" v-else>等待主编提交名单</p>
            </template>
          </el-table-column>
          <!--项目编辑end-->

          <!--策划编辑start-->
          <el-table-column  v-if="level===3"
                            label="第一主编"
                            width="100">
            <template scope="scope">
              <p v-if="scope.row.chiefEditor">{{scope.row.chiefEditor}}</p>
              <p v-else>(空)</p>
            </template>
          </el-table-column>
          <el-table-column
            label="编委预选" v-if="level===3">
            <template scope="scope">
              <p v-if="scope.row.editorialBoard.length">
                {{scope.row.editorialBoard[0]}}等{{scope.row.editorialBoard.length}}人
                <el-tooltip class="item" effect="dark" content="点击进入遴选编委" placement="top">
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
                {{scope.row.editorialBoard[0]}}等{{scope.row.editorialBoard.length}}人
                <el-tooltip class="item" effect="dark" content="点击查看编委" placement="top">
                  <router-link :to="{name:'预选编委',query:{bookid:scope.row.bookid,edit:0}}">
                    <el-button type="text">
                      <i class="fa fa-eye fa-fg"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
                <el-tag type="success" v-if="scope.row.subeditorHasChoose">已确认</el-tag>
                <el-tag type="warning" v-else>待确认</el-tag>
              </p>
              <p class="gray" v-else>等待主编提交名单</p>
            </template>
          </el-table-column>
          <!--策划编辑end-->

          <el-table-column
            label="操作">
            <template scope="scope">
              <div v-if="level===1">
                <el-button type="text">通过</el-button>
                <span class="vertical-line"></span>
                <el-button type="text">结果公布</el-button>
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
    </div>
</template>
<style>

</style>
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

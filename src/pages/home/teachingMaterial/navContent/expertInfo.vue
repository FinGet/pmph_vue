<template>
  <div class="teachingMaterial expert_info">
    <div class="info-wrapper">

      <!--操作按钮-->
      <div class="paddingB10 text-right">
        <el-button type="primary">发送私信</el-button>
        <el-button type="primary">确认收到纸质表</el-button>
        <el-button type="warning">退回</el-button>
        <el-button type="primary">通过</el-button>
        <el-button type="primary">打印</el-button>
        <el-button type="primary">登录</el-button>
      </div>

      <!--图书选择-->
      <div class="expert-info-box expert-operation-wrapper">
        <p class="info-box-title operation">图书选择（书籍可以多选，一本书职位可以多选）</p>
        <div>
          <div class="chooseBook clearfix lineheight-36" v-for="(iterm,index) in addBookList" :key="index">
            <!--新增书籍-->
            <div  v-if="!iterm.hasComplete">
              <div v-if="iterm.isNew">
                <div class="searchBox-wrapper marginR20">
                  <div class="searchName">图书：<span></span></div>
                  <div class="searchInput">
                    <el-select v-model="iterm.bookname" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in bookList"
                        :key="index"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <el-radio-group v-model="iterm.position" class="">
                  <el-radio :label="'主编'">主编</el-radio>
                  <el-radio :label="'副主编'">副主编</el-radio>
                  <el-radio :label="'编委'">编委</el-radio>
                </el-radio-group>
                <div class="info-iterm-text widthAuto marginL10">
                  <div>教学大纲：<span></span></div>
                  <div>
                    <el-upload
                      class="upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="uploadFile"
                      :show-file-list="false"
                      multipl="true">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </div>
                </div>
                <el-button class="" type="danger" size="small" icon="delete" @click="deleteNew(index)">删除</el-button>
              </div>
              <div v-else>
                <div class="info-iterm-text">
                  <div>图书：<span></span></div>
                  <div>{{iterm.bookname}}</div>
                </div>
                <div class="info-iterm-text">
                  <div>职位：<span></span></div>
                  <div>{{iterm.position}}</div>
                </div>
                <div class="info-iterm-text">
                  <div>教学大纲：<span></span></div>
                  <div>
                    <a href="javascript:" v-if="iterm.filename">{{iterm.filename}}</a>
                    <span v-else>（无）</span>
                  </div>
                </div>
                <el-button class="" type="danger" size="small" icon="delete" @click="deleteNew(index)">删除</el-button>
              </div>

            </div>
            <!--已有书籍-->
            <div v-else>
              <div class="info-iterm-text">
                <div>图书：<span></span></div>
                <div>{{iterm.bookname}}</div>
              </div>
              <div class="info-iterm-text">
                <div>职位：<span></span></div>
                <div>{{iterm.position}}</div>
              </div>
              <div class="info-iterm-text">
                <div>教学大纲：<span></span></div>
                <div><a href="javascript:">{{iterm.filename}}</a></div>
              </div>
              <div class="info-iterm-text">
                <div>遴选状态：<span></span></div>
                <div>
                  <el-tag type="success">已被策划编辑推选为编委</el-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="expert_info-buttonWrapper">
            <el-button type="primary" @click="saveBook" v-if="hasNewAddbook">保存图书</el-button>
            <el-button type="primary" @click="addNewBook">添加图书</el-button>
          </div>
        </div>
      </div>

      <div class="expert-info-box">
        <p class="info-box-title">专家信息</p>
        <div>
          <div class="info-iterm-text">
            <div>姓名：<span></span></div>
            <div>刘德华</div>
          </div>
          <div class="info-iterm-text">
            <div>职务：<span></span></div>
            <div>课程负责人</div>
          </div>
          <div class="info-iterm-text">
            <div>传真：<span></span></div>
            <div></div>
          </div>
          <div class="info-iterm-text">
            <div>性别：<span></span></div>
            <div>男</div>
          </div>
          <div class="info-iterm-text">
            <div> 职称：<span></span></div>
            <div>副教授</div>
          </div>
          <div class="info-iterm-text">
            <div>手机：<span></span></div>
            <div>12304567893</div>
          </div>
          <div class="info-iterm-text">
            <div>出生年月：<span></span></div>
            <div>1955-09-09</div>
          </div>
          <div class="info-iterm-text">
            <div>地址：<span></span></div>
            <div>成都四化路009号某某某小区</div>
          </div>
          <div class="info-iterm-text">
            <div>Email：<span></span></div>
            <div>123456@qq.com</div>
          </div>
          <div class="info-iterm-text">
            <div>教龄(年)：<span></span></div>
            <div>20</div>
          </div>
          <div class="info-iterm-text">
            <div>邮编：<span></span></div>
            <div>000000</div>
          </div>
          <div class="info-iterm-text">
            <div>证件类型：<span></span></div>
            <div>身份证</div>
          </div>
          <div class="info-iterm-text">
            <div>工作单位：<span></span></div>
            <div>成都高新医学高等专科学校</div>
          </div>
          <div class="info-iterm-text">
            <div>联系电话：<span></span></div>
            <div>028-000000</div>
          </div>
          <div class="info-iterm-text">
            <div>证件号码：<span></span></div>
            <div>411755222222123456</div>
          </div>
        </div>
      </div>

      <!--主要学习经历-->
      <div class="expert-info-box">
        <p class="info-box-title">主要学习经历</p>
        <div class="no-padding">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.startdate}} &nbsp;-&nbsp; {{scope.row.enddate}}
              </template>
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校名称">
            </el-table-column>
            <el-table-column
              prop="major"
              label="专业">
            </el-table-column>
            <el-table-column
              prop="education"
              label="学历">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--主要工作经历-->
      <div class="expert-info-box">
        <p class="info-box-title">主要工作经历</p>
        <div class="no-padding">
          <el-table border
            :data="tableData2"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.startdate}} &nbsp;-&nbsp; {{scope.row.enddate}}
              </template>
            </el-table-column>
            <el-table-column
              prop="employer"
              label="工作单位">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--主要教学经历-->
      <div class="expert-info-box">
        <p class="info-box-title">主要教学经历</p>
        <div class="no-padding">
          <el-table border
            :data="tableData3"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.startdate}} &nbsp;-&nbsp; {{scope.row.enddate}}
              </template>
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校名称">
            </el-table-column>
            <el-table-column
              prop="course"
              label="教学科目">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--主要学术兼职-->
      <div class="expert-info-box">
        <p class="info-box-title">主要学术兼职</p>
        <div class="no-padding">
          <el-table border
            :data="tableData4"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="兼职学术组织">
            </el-table-column>
            <el-table-column
              prop="level"
              label="级别">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职务">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--个人成就-->
      <div class="expert-info-box">
        <p class="info-box-title">个人成就</p>
        <div>
          <p class="achievements">
            国家第四批名老中医学术思想继承人，获得首届中国中西医结合青年突出贡献奖。主要从事风湿病的诊治及相关研究，对类风湿关节炎、系统性红斑狼疮、干燥综合征、强直性脊柱炎、系统性硬化症及血管炎的诊治有独到见解，坚持中西医结合治疗，取得良好疗效。发表SCI收录文章6篇，国家级核心期刊20余篇，主持国家级课题1项，省级课题4项。
          </p>
        </div>
      </div>

      <!--申报单位-->
      <div class="expert-info-box">
        <p class="info-box-title">申报单位</p>
        <div>
          <div class="info-iterm-text">
            <div>申报单位：<span></span></div>
            <div>哈尔滨医科大学</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              tableData: [{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                school:'福建医科大学',
                education:'本科',
                major:'中医学',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                remark:''
              },{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                school:'福建医科大学',
                education:'本科',
                major:'中医学',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                remark:''
              },{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                school:'福建医科大学',
                education:'本科',
                major:'中医学',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                remark:''
              }],
              tableData2: [{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                employer:'成都第一人民医院',
                position:'脑科专家',
                remark:''
              },{
                startdate: '2016-05-02',
                enddate:'2017-12-03',
                employer:'成都第一人民医院',
                position:'脑科专家',
                remark:''
              },],
              tableData3:[
                {
                  startdate: '2016-05-02',
                  enddate:'2017-12-03',
                  school:'福建医科大学',
                  course:'儿童护理学',
                  remark:''
                }
              ],
              tableData4:[
                {
                  name:'中国中西医结合学会风湿病专业委员会',
                  level:'国家级',
                  position:'副主任委员',
                  remark:''
                }
              ],
              bookList:['基础化学','病理生理学','精神病学','临床流行病学与循证医学','皮肤性病学'],
              addBookList:[{
                bookname:'基础化学',
                position:'编委',
                filename:'基础化学大纲.jpg',
                hasComplete:true
              }],
              radio2:9,
            }
        },
        computed:{
          /**
           * 判断保存图书按钮是否显示
           * @returns {boolean}
           */
          hasNewAddbook(){
            if(this.addBookList.length==0){
              return false;
            }
            let flag = false;
            for(let iterm of this.addBookList){
              if(iterm.isNew){
                flag = true;
                break;
              };
            }
            return flag;
          }
        },
        created(){
          this.$emit('hideTab')
        },
      methods:{
        /**
         * 点击添加新图书按钮执行方法
         */
        addNewBook(){
          var initObj = {
            isNew:true,
            bookname:undefined,
            position:'编委',
            file:[]
          }
          this.addBookList.push(initObj);
        },
        /**
         * 点击删除按钮执行此方法
         * @param index
         */
        deleteNew(index){
          this.addBookList.splice(index, 1);
        },
        /**
         * 保存图书，保存成功后就将图书isNew状态改为false
         */
        saveBook(){
          for(let iterm of this.addBookList){
            if(!iterm.bookname){
              this.$message.error('请选择图书');
              return false;
            }
            iterm.isNew = false;
          }
        },
        /**
         * 点击上传按钮执行此方法
         * @param file
         * @param fileList
         */
        uploadFile(file, fileList){
          console.log(file.name);
        }
      }
    }
</script>
<style scoped>
  .info-wrapper{
  }
  .expert-info-box{

  }
  .expert-info-box .info-box-title{
    display: inline-block;
    padding: 0 20px;
    background: #c8ceb2;
    color:#fff;
  }
  .expert-info-box .info-box-title.operation{
    background: #de8333;
  }
  .expert-info-box>div{
    border:1px solid #f1f1f1;
    padding: 20px 15px;
    margin-bottom: 28px;
  }
  .expert-info-box>div.no-padding{
    padding: 0 !important;
  }

  /*专家信息*/
  .info-iterm-text{
    display: inline-block;
    height: 36px;
    width: 33%;
    max-width: 410px;
    line-height: 36px;
    vertical-align: middle;
  }
  .info-iterm-text>div:nth-of-type(1){
    display: inline-block;
    vertical-align: middle;
    width: 80px;
    float: left;
    text-align: justify;
  }
  .info-iterm-text>div:nth-of-type(1) > span { display: inline-block /* Opera */; padding-left: 100%; }
  .info-iterm-text>div:nth-of-type(2){
    margin-left: 88px;
  }
  .expert_info-buttonWrapper{
    margin-top: 30px;
  }
  .searchBox-wrapper{
    padding: 0;
  }
  .chooseBook{
    margin-bottom: 10px;
  }
  .chooseBook .searchBox-wrapper{
    width: auto;
  }
  .widthAuto{
    width: auto;
  }

  .expert-operation-wrapper .info-iterm-text{
    width: 24%;
    max-width: 270px;
  }

  .info-iterm-text a{
    color:#337ab7;
  }
  .info-iterm-text a:hover{
    color: #23527c;
  }
</style>

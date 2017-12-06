<template>
  <div class="teachingMaterial expert_info">
    <div class="info-wrapper">

      <!--操作按钮-->
      <div class="paddingB10 text-right print-none">
        <el-button type="primary" @click="showSendMsg=true">发送私信</el-button>
        <el-button type="primary" @click="confirmPaperList">确认收到纸质表</el-button>
        <el-button type="warning">退回给个人</el-button>
        <el-button type="primary">通过</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <el-button type="primary">登录</el-button>
      </div>

      <!--图书选择-->
      <div class="expert-info-box expert-operation-wrapper">
        <p class="info-box-title operation">图书选择（书籍可以多选，一本书职位可以多选）</p>
        <div>
          <div class="chooseBook clearfix lineheight-36" v-for="(iterm,index) in addBookList" :key="index">
            <!--新增书籍-->
            <div  v-if="iterm.newCreated || (!iterm.chosenPosition&&!iterm.isDigitalEditor)">
              <div v-if="iterm.isNew">
                <div class="searchBox-wrapper marginR20">
                  <div class="searchName">图书：<span></span></div>
                  <div class="searchInput">
                    <el-select v-model="iterm.textbookId" placeholder="请选择" @change="selectBookChange(index)">
                      <el-option
                        v-for="(item,i) in bookList"
                        :key="i"
                        :label="item.textbookName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <el-radio-group v-model="iterm.presetPosition_temp" class="">
                  <el-radio :label="1">主编</el-radio>
                  <el-radio :label="2">副主编</el-radio>
                  <el-radio :label="3">编委</el-radio>
                  <el-radio :label="4">数字编委</el-radio>
                </el-radio-group>
                <div class="info-iterm-text widthAuto marginL10">
                  <div>教学大纲：<span></span></div>
                  <div class="ellipsis">
                    <my-upload
                      v-if="!iterm.syllabusName||iterm.fileUploading"
                      class="upload"
                      ref="upload"
                      :action="api_file_uploadurl"
                      :file-list="iterm.fileList"
                      :on-change="uploadChange"
                      :before-upload="beforeUpload"
                      :on-success="uploadSuccess"
                      :show-file-list="false">
                      <el-button size="small" type="primary" @click="uploadBtnClick(index)" :loading="iterm.fileUploading">点击上传</el-button>
                    </my-upload>
                    <span class="link" :title="iterm.syllabusName" v-if="iterm.syllabusName&&!iterm.fileUploading">{{iterm.syllabusName}}</span>
                  </div>
                </div>
                <el-button class="print-none" type="danger" size="small" icon="delete" @click="deleteNew(index)">删除</el-button>
              </div>
              <div v-else>
                <div class="info-iterm-text">
                  <div>图书：<span></span></div>
                  <div class="lineheight-normal paddingT10">{{iterm.textbookName}}</div>
                </div>
                <div class="info-iterm-text">
                  <div>职位：<span></span></div>
                  <div>{{positionList[iterm.presetPosition]}}</div>
                </div>
                <div class="info-iterm-text">
                  <div>教学大纲：<span></span></div>
                  <div class="ellipsis">
                    <a :href="iterm.syllabusId" target="_blank" v-if="iterm.syllabusName" :download="iterm.syllabusName">{{iterm.syllabusName}}</a>
                    <span v-else>（无）</span>
                  </div>
                </div>
                <el-button class="print-none" type="danger" size="small" icon="delete" @click="deleteNew(index,true)">删除</el-button>
              </div>
            </div>
            <!--已有书籍-->
            <div v-else>
              <div class="info-iterm-text">
                <div>图书：<span></span></div>
                <div class="lineheight-normal paddingT10">{{iterm.textbookName}}</div>
              </div>
              <div class="info-iterm-text">
                <div>职位：<span></span></div>
                <div>{{positionList[iterm.presetPosition]}}</div>
              </div>
              <div class="info-iterm-text">
                <div>教学大纲：<span></span></div>
                <div class="ellipsis">
                  <a :href="iterm.syllabusId" target="_blank" v-if="iterm.syllabusName" :download="iterm.syllabusName">{{iterm.syllabusName}}</a>
                  <span v-else>（无）</span>
                </div>
              </div>
              <div class="info-iterm-text">
                <div>遴选状态：<span></span></div>
                <div>
                  <el-tag type="success">已被选为{{iterm.chosenPosition?positionList[iterm.chosenPosition]:iterm.isDigitalEditor?'数字编委':''}}</el-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="expert_info-buttonWrapper print-none">
            <el-button type="primary" @click="addNewBook">添加图书</el-button>
            <el-button type="primary" @click="saveBook" v-if="(hasNewAddbook||hasBookListChanged)&&addBookList.length">保存图书</el-button>
          </div>
        </div>
      </div>

      <div class="expert-info-box">
        <p class="info-box-title">专家信息</p>
        <div>
          <div class="info-iterm-text">
            <div>姓名：<span></span></div>
            <div>{{expertInfoData.realname}}</div>
          </div>
          <div class="info-iterm-text">
            <div>职务：<span></span></div>
            <div>{{expertInfoData.position}}</div>
          </div>
          <div class="info-iterm-text">
            <div>传真：<span></span></div>
            <div></div>
          </div>
          <div class="info-iterm-text">
            <div>性别：<span></span></div>
            <div>{{expertInfoData.sex}}</div>
          </div>
          <div class="info-iterm-text">
            <div> 职称：<span></span></div>
            <div>{{expertInfoData.title}}</div>
          </div>
          <div class="info-iterm-text">
            <div>手机：<span></span></div>
            <div>{{expertInfoData.handphone}}</div>
          </div>
          <div class="info-iterm-text">
            <div>出生年月：<span></span></div>
            <div>{{expertInfoData.birthday}}</div>
          </div>
          <div class="info-iterm-text">
            <div>地址：<span></span></div>
            <div class="lineheight-normal paddingT10">{{expertInfoData.address}}</div>
          </div>
          <div class="info-iterm-text">
            <div>Email：<span></span></div>
            <div>{{expertInfoData.email}}</div>
          </div>
          <div class="info-iterm-text">
            <div>教龄(年)：<span></span></div>
            <div>{{expertInfoData.experience}}</div>
          </div>
          <div class="info-iterm-text">
            <div>邮编：<span></span></div>
            <div>{{expertInfoData.postcode}}</div>
          </div>
          <div class="info-iterm-text">
            <div>证件类型：<span></span></div>
            <div>身份证</div>
          </div>
          <div class="info-iterm-text">
            <div>工作单位：<span></span></div>
            <div>{{expertInfoData.orgName}}</div>
          </div>
          <div class="info-iterm-text">
            <div>联系电话：<span></span></div>
            <div>{{expertInfoData.telephone}}</div>
          </div>
          <div class="info-iterm-text">
            <div>证件号码：<span></span></div>
            <div>{{expertInfoData.idcard}}</div>
          </div>
        </div>
      </div>

      <!--主要学习经历-->
      <div class="expert-info-box">
        <p class="info-box-title">主要学习经历</p>
        <div class="no-padding">
          <el-table
            border
            :data="learnExperience"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.dateBegin}} &nbsp;-&nbsp; {{scope.row.dateEnd}}
              </template>
            </el-table-column>
            <el-table-column
              prop="schoolName"
              label="学校名称">
            </el-table-column>
            <el-table-column
              prop="major"
              label="专业">
            </el-table-column>
            <el-table-column
              prop="degree"
              label="学历">
            </el-table-column>
            <el-table-column
              prop="note"
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
            :data="workExperience"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.dateBegin}} &nbsp;-&nbsp; {{scope.row.dateEnd}}
              </template>
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="工作单位">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="note"
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
            :data="teachExperience"
            style="width: 100%">
            <el-table-column
              label="起止时间">
              <template scope="scope">
                {{scope.row.dateBegin}} &nbsp;-&nbsp; {{scope.row.dateEnd}}
              </template>
            </el-table-column>
            <el-table-column
              prop="schoolName"
              label="学校名称">
            </el-table-column>
            <el-table-column
              prop="subject"
              label="教学科目">
            </el-table-column>
            <el-table-column
              prop="note"
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
            :data="academicExperience"
            style="width: 100%">
            <el-table-column
              prop="orgName"
              label="兼职学术组织">
            </el-table-column>
            <el-table-column
              label="级别">
              <template scope="scope">
                {{scope.row.rank&&scope.row.rank<5?rankList[scope.row.rank]:''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="position"
              label="职务">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--上版教材参编情况（未参编请在教材名称栏填无)(必填)-->
      <div class="expert-info-box">
        <p class="info-box-title">上版教材参编情况</p>
        <div class="no-padding">
          <el-table border
                    :data="lastPositionList"
                    style="width: 100%">
            <el-table-column
              prop="materialName"
              label="教材名称">
            </el-table-column>
            <el-table-column
              label="职务">
              <template scope="scope">{{scope.row.position&&scope.row.position<4?positionList[scope.row.position]:''}}</template>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--国家精品课程建设情况-->
      <div class="expert-info-box">
        <p class="info-box-title">国家精品课程建设情况</p>
        <div class="no-padding">
          <el-table border
                    :data="nationalCourseConstruction"
                    style="width: 100%">
            <el-table-column
              prop="courseName"
              label="课程名称">
            </el-table-column>
            <el-table-column
              prop="classHour"
              label="该课程全年课时数">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--省部级精品课程建设情况-->
      <div class="expert-info-box">
        <p class="info-box-title">省部级精品课程建设情况</p>
        <div class="no-padding">
          <el-table border
                    :data="provinceCourseConstruction"
                    style="width: 100%">
            <el-table-column
              prop="courseName"
              label="课程名称">
            </el-table-column>
            <el-table-column
              prop="classHour"
              label="该课程全年课时数">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--学校精品课程建设情况-->
      <div class="expert-info-box">
        <p class="info-box-title">学校精品课程建设情况</p>
        <div class="no-padding">
          <el-table border
                    :data="schoolCourseConstruction"
                    style="width: 100%">
            <el-table-column
              prop="courseName"
              label="课程名称">
            </el-table-column>
            <el-table-column
              prop="classHour"
              label="该课程全年课时数">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--主编国家级规划教材情况-->
      <div class="expert-info-box">
        <p class="info-box-title">主编国家级规划教材情况</p>
        <div class="no-padding">
          <el-table border
                    :data="nationalPlan"
                    style="width: 100%">
            <el-table-column
              prop="materialName"
              label="规划教材名">
            </el-table-column>
            <el-table-column
              prop="isbn"
              label="标准书号">
            </el-table-column>
            <el-table-column
              label="教材级别">
              <template scope="scope">
                {{scope.row.rank&&scope.row.rank<4?national_plan_rankList[scope.row.rank]:''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--教材编写情况-->
      <div class="expert-info-box">
        <p class="info-box-title">教材编写情况</p>
        <div class="no-padding">
          <el-table border
                    :data="textbook"
                    style="width: 100%;table-layout:fixed;">
            <el-table-column
              prop="materialName"
              label="教材名称">
            </el-table-column>
            <el-table-column
              label="级别">
              <template scope="scope">
                {{scope.row.rank&&scope.row.rank<6?textbook_rankList[scope.row.rank]:''}}
              </template>
            </el-table-column>
            <el-table-column
              label="职务">
              <template scope="scope">
                {{scope.row.position&&scope.row.position<4?positionList[scope.row.position]:''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="publisher"
              label="出版社">
            </el-table-column>
            <el-table-column
              prop="publishDate"
              label="出版时间">
              <template scope="scope">
                {{scope.row.publishDate?$commonFun.formatDate(scope.row.publishDate).split(' ')[0]:''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="isbn"
              label="标准书号">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--科研情况-->
      <div class="expert-info-box">
        <p class="info-box-title">科研情况</p>
        <div class="no-padding">
          <el-table border
                    :data="researchData"
                    style="width: 100%">
            <el-table-column
              prop="researchName"
              label="课题名称（包括项目编号）"
              width="600">
            </el-table-column>
            <el-table-column
              prop="approvalUnit"
              label="审批单位">
            </el-table-column>
            <el-table-column
              prop="award"
              label="获奖情况">
            </el-table-column>
            <el-table-column
              prop="note"
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
            {{personalAchievements}}
          </p>
        </div>
      </div>

      <!--申报单位-->
      <div class="expert-info-box">
        <p class="info-box-title">申报单位</p>
        <div>
          <div class="info-iterm-text">
            <div>申报单位：<span></span></div>
            <div>{{expertInfoData.orgNameOne}}</div>
          </div>
        </div>
      </div>

    </div>


    <el-dialog
      title="发送私信"
      :visible.sync="showSendMsg"
      :before-close="clearInputMsg"
      size="tiny">
      <div class="relative">
        <el-input
          autofocus
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          @input.native="changeTextarea"
          @keyup.native.enter="sendmsg"
          v-model="inputMsg">
        </el-input>
        <p class="tip-text" v-if="250-inputMsg.length<20">还可输入{{250-inputMsg.length}}个字符</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeInputMsg">取 消</el-button>
        <el-button type="primary" @click="sendmsg">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              api_info:'/pmpheep/declaration/list/declaration/exportExcel',
              api_book_list:'/pmpheep/textBook/list',
              api_update_book:'/pmpheep/declaration/list/declaration/saveBooks',
              api_confirm_paper:'/pmpheep/declaration/list/declaration/confirmPaperList',
              api_file_uploadurl:'/pmpheep/messages/message/file',
              api_send_msg:'/pmpheep/messages/newOneMessage',
              searchFormData:{
                declarationId:'',
                materialId:'',
              },
              currentUploadFileBookIndex:undefined,
              expertInfoData:{
                realname:'',
                sex:'男',
                birthday:'',
                orgName:'',
                position:'',
                title:'',
                address:'',
                postcode:'',
                handphone:'',
                email:'',
                telephone:'',
                idcard:'',
                experience:'',
                offlineProgress:'',
              },
              learnExperience: [],
              workExperience: [],
              teachExperience:[],
              academicExperience:[],
              lastPositionList:[],
              nationalCourseConstruction:[],
              provinceCourseConstruction:[],
              schoolCourseConstruction:[],
              nationalPlan:[],
              textbook:[],
              researchData:[],
              personalAchievements:'',
              bookList:[],
              positionList:['','主编','副主编','编委'],
              addBookList:[],
              hasBookListChanged:false,
              showSendMsg:false,
              inputMsg:'',
              rankList:['','国际','国家','省部','其他'],
              national_plan_rankList:['','教育部十二五','国家卫计委十二五','教育部十二五&&国家卫计委十二五'],
              textbook_rankList:['','其他教材','教育部规划','卫计委规划','区域规划','创新教材'],
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
            id:'',
            isNew:true,
            newCreated:true,
            declarationId:'',
            textbookId:'',
            textbookName:'',
            presetPosition:3,
            presetPosition_temp:3,
            isDigitalEditor:false,
            fileName:'',
            syllabusName:'',
            fileUploading:false,
            file:undefined
          }
          this.addBookList.push(initObj);
        },
        /**
         * 选择图书框发生改变时
         */
        selectBookChange(index){
          this.bookList.forEach(iterm=>{
            if(iterm.id == this.addBookList[index].textbookId){
              this.addBookList[index].textbookName = iterm.textbookName;
            }
          })
        },
        /**
         * 点击删除按钮执行此方法
         * @param index
         */
        deleteNew(index,hasChange){
          this.addBookList.splice(index, 1);
          if(hasChange){
            this.hasBookListChanged=true;
          }
          if(this.addBookList.length==0){
            this.$message.error('至少要有一本书！');
          }
        },
        /**
         * 保存图书，保存成功后就将图书isNew状态改为false
         */
        saveBook(){
          let dataIsReady = true;
          for(let iterm of this.addBookList){
            if(!iterm.textbookId){
              this.$message.error('请选择图书');
              return;
            }
          }

          //准备上传数据
          let formData = {};
          this.addBookList.forEach((iterm,index)=>{
            if(iterm.newCreated){
              if(iterm.presetPosition_temp==4){
                iterm.presetPosition = 0;
                iterm.isDigitalEditor = true;
              }else{
                iterm.isDigitalEditor = false;
                iterm.presetPosition =iterm.presetPosition_temp;
              }
            }
            formData['list['+index+'].'+'id']=iterm.id;
            formData['list['+index+'].'+'declarationId']=this.searchFormData.declarationId;
            formData['list['+index+'].'+'textbookId']=iterm.textbookId;
            formData['list['+index+'].'+'presetPosition']=iterm.presetPosition;
            formData['list['+index+'].'+'isDigitalEditor']=iterm.isDigitalEditor;
            formData['list['+index+'].'+'file']=iterm.filePath?iterm.filePath:'';
          });
          this.$axios.post(this.api_update_book,this.$commonFun.initPostData(formData))
            .then(response=>{
              var res = response.data;
              if(res.code==1){
                this.addBookList.forEach(iterm=>{
                  iterm.isNew = false;
                })
                this.$message.success('保存成功！');
              }else{
                this.$message.error(res.msg.msgTrim())
              }
            })
            .catch(e=>{
              console.log(e);
            })

        },
        /**
         * 点击上传按钮执行此方法
         * @param file
         * @param fileList
         */
        uploadChange(file,fileList){
          var filedata = file.raw;
          var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();

          if(this.addBookList[this.currentUploadFileBookIndex].hasHandleFileUid){
            return;
          }
          if(!filedata||!ext){
            return;
          }
          //文件名不超过40个字符
          if(file.name.length>40){
            this.$message.error("文件名不能超过40个字符");
            return;
          }
          // 类型判断
          if(ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif'){
            this.$message.error("不可以上传可.exe|.bat|.com|.lnk|.pif等格式的可执行文件");
            return;
          }
          // 判断文件大小是否符合 文件不为0
          if(file.size<1){
            this.$message.error("文件大小不能小于1bt");
            return;
          }
          // 判断文件大小是否符合 文件不大于100M
          if(file.size/1024/1024 > 100){
            this.$message.error("文件大小不能超过100M！");
            self.newGroupData.syllabusName=undefined;
            return;
          }
          //赋值
          this.addBookList[this.currentUploadFileBookIndex].file = filedata;
          this.addBookList[this.currentUploadFileBookIndex].syllabusName = file.name;
          this.addBookList[this.currentUploadFileBookIndex].hasHandleFileUid = file.uid;
          this.addBookList[this.currentUploadFileBookIndex].fileUploading = true;
          console.log(this.addBookList[this.currentUploadFileBookIndex])
        },
        beforeUpload(file){
          const ext = file.name.substring(file.name.lastIndexOf('.')+1);
          console.log(file)
          const isLt0M = 0 < file.size / 1024 / 1024 && file.size / 1024 / 1024<100;
          const nameLen = file.name.length <= 40;
          //文件名不超过40个字符
          if(file.name.length>40){
            this.$message.error("文件名不能超过40个字符");
            return false;
          }
          if (file.size / 1024 / 1024==0) {
            this.$message.error('上传文件大小不能小于 0kb!');
            return false;
          }
          if (file.size / 1024 / 1024>100) {
            this.$message.error('文件大小不能超过100M！');
            return false;
          }
          if (ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif') {
            this.$message.error('上传文件不能是可执行文件!');
            return false;
          }
          if (!nameLen) {
            this.$message.error('上传文件名字长度不能超过80个字符!');
            return false;
          }
          return isLt0M&&nameLen&&!(ext=='exe'||ext=='bat'||ext=='com'||ext=='lnk'||ext=='pif')
        },
        uploadSuccess(response, file, fileList){
          this.addBookList.forEach(iterm=>{
            if(iterm.hasHandleFileUid == file.uid){
              iterm.fileUploading=false;
              iterm.filePath = response.data;
              console.log('file',iterm)
            }
          })
        },
        /**
         * 点击上传按钮就把当前index 赋值给currentUploadFileBookIndex
         * 用于当文件上传成功后通过currentUploadFileBookIndex找到正在操作哪本书
         */
        uploadBtnClick(index){
          this.currentUploadFileBookIndex = index;
        },
        /**
         * 获取专家信息数据
         */
        getTableData(){
          this.$axios.get(this.api_info,{params:{
            declarationId:this.searchFormData.declarationId
          }})
            .then(response=>{
              var res = response.data;
              if(res.code==1){
                //初始化添加图书数据
                this.hasBookListChanged=false;
                this.addBookList = res.data.decPositionList;

                //初始化专家身份信息
                res.data.declaration.sex=res.data.declaration.sex?res.data.declaration.sex==1?'男':'女':'保密';
                res.data.declaration.birthday = this.$commonFun.formatDate(res.data.declaration.birthday).split(' ')[0];
                this.expertInfoData = res.data.declaration;

                //初始化主要学习经历
                this.learnExperience = res.data.decEduExpList;

                //初始化主要工作经历
                this.workExperience = res.data.decWorkExpList;

                //主要教学经历
                this.teachExperience = res.data.decTeachExpList;

                //学术经验
                this.academicExperience = res.data.decAcadeList;

                //个人成就
                this.personalAchievements = res.data.decExtensionList.length==0?'':res.data.decExtensionList[0].content;

                //上版教材参编情况
                this.lastPositionList = res.data.decLastPositionList;
                //国家级精品课程建设情况
                this.nationalCourseConstruction = res.data.decNationalCourseConstructionList;
                //省部级精品课程建设情况
                this.provinceCourseConstruction = res.data.decProvinceCourseConstructionList;
                //学校精品课程建设情况
                this.schoolCourseConstruction = res.data.decSchoolCourseConstructionList;
                //作家主编国家级规划教材情况表
                this.nationalPlan = res.data.decNationalPlanList;
                //作家教材编写情况表
                this.textbook = res.data.decTextbookList;
                //作家科研情况表
                this.researchData = res.data.decResearchList;

              }else{
                this.$message.error(res.msg.msgTrim())
              }
            })
            .catch(e=>{
              console.log(e);
            })
        },
        /**
         * 获取教材所有书籍
         */
          getBookList(){
          // console.log(this.searchForm)
          this.$axios.get(this.api_book_list,{params:{
            materialId:this.searchFormData.materialId
          }})
            .then(response=>{
              var res = response.data;
              if(res.code==1){
                this.bookList = res.data
              }else{
                this.$message.error(res.msg.msgTrim())
              }
            })
            .catch(e=>{
              console.log(e);
            })
          },
        /**
         * 确认收到纸质表
         */
        confirmPaperList(){
          this.$confirm("确定收到纸质表？", "提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(()=>{
              this.$axios.get(this.api_confirm_paper,{params:{
                id:this.searchFormData.declarationId,
                offlineProgress:this.expertInfoData.offlineProgress,
                materialId:this.searchFormData.materialId,
              }})
                .then(response=>{
                var res = response.data;
                if(res.code==1){
                  this.$message.success('已确认！')
                }else{
                  this.$message.error(res.msg.msgTrim())
                }
              })
                .catch(e=>{
                  console.log(e);
                })
            })
            .catch(e=>{})
        },
        /**
         * 发送消息
         */
        sendmsg(){
          if(!this.inputMsg){
            this.$message.error('发送内容不能为空！');
            return;
          }
          this.$axios.post(this.api_send_msg,this.$commonFun.initPostData({
            content:this.inputMsg,
            sessionId:this.$getUserData().userInfo.id,
            receiverId:this.searchFormData.declarationId
          }))
            .then(response=>{
              var res = response.data;
              if(res.code==1){
                this.$message.success('已发送！')
              }else{
                this.$message.error(res.msg.msgTrim())
              }
              this.closeInputMsg();
            })
            .catch(e=>{
              console.log(e);
              this.$message.error('发送失败，请重试！');
              this.closeInputMsg();
            })
        },
        /**
         * 当聊天输入框发生变化
         */
        changeTextarea(){
          if(this.inputMsg.length>250){
            this.inputMsg=this.inputMsg.substring(0,250);
          }
        },
        /**
         * 清除已输入文字
         */
        clearInputMsg(done){
          this.inputMsg='';
          done();
        },
        closeInputMsg(){
          this.inputMsg='';
          this.showSendMsg=false;
        },
        /**
         * 打印
         */
        print(){
          console.log(this);
          window.print();
        }
      },
      created(){
        this.searchFormData.declarationId = this.$route.query.declarationId;
        this.searchFormData.materialId = this.$route.params.materialId;
        //如果没有教材id则跳转到通知列表
        if(!this.searchFormData.materialId){
          this.$router.push({name:'通知列表'});
        }
        //如果没有用户id则跳转到申报审核列表
        if(!this.searchFormData.materialId){
          this.$router.push({name:'申报表审核'});
        }
        this.getTableData();
        this.getBookList();
      },
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
    padding-bottom: 8px;
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
    padding-right: 10px;
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
  .tip-text{
    color: #ccc;
    text-align: right;
    position: absolute;
    right: 0;
    bottom: -20px;
  }
</style>

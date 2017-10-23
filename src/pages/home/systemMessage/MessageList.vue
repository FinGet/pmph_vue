<template>
  <div class="message-list">
    <el-row>
      <el-col :span="12">
        <div class="search-title">消息标题:</div>
        <el-col :span="6" class="search-10">
          <el-input v-model="title" placeholder="请输入搜索内容"></el-input>
        </el-col>
        <el-button class="btn" type="primary"  icon="search" @click="search">搜索</el-button>
      </el-col>
     <div class="pull-right">
       <el-popover
         ref="popover"
         placement="top"
         width="160"
         v-model="visible">
         <p>选中的文件确定删除吗？</p>
         <div style="text-align: right; margin: 0">
           <el-button size="mini" type="text" @click="visible = false">取消</el-button>
           <el-button type="primary" size="mini" @click="visible = false,delet()">确定</el-button>
         </div>
       </el-popover>
       <el-button class="btn" type="danger" icon="delete" :disabled="isSelected"  v-popover:popover>批量删除</el-button>
       <router-link :to="{ name: '编辑消息',query:{type:'add'}}">
       <el-button class="btn" type="primary" icon="edit">
         发送新消息
       </el-button>
       </router-link>
     </div>
    </el-row>
    <div class="cutLine-dashed"></div>
    <el-row>
      <el-col :span="24">
        <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      empty-text="暂无数据"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
        >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="信息标题"
        width="400"
        show-overflow-tooltip>
        <template scope="scope">
          <a href="javascript:;" @click="preview(scope.row.title)">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="sendName"
        label="发送者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sendTime"
        label="发送时间"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleReissue(scope.$index, scope.row)">补发</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRecall(scope.$index, scope.row)">撤回</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleState(scope.row.msgId, scope.row)">消息状态</el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-col>
    </el-row>
    <el-pagination class="pull-right"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="currentPage"
     :page-sizes="[10, 20, 30, 40]"
     :page-size="pageSize"
     layout="total, sizes, prev, pager, next, jumper"
     :total="dataTotal">
    </el-pagination>
    <!--预览弹窗-->
    <!--<Preview-popup :close.sync="previewShow"></Preview-popup>-->
    <el-dialog title="消息" :visible.sync="dialogPreviewVisible" top="5%" size="large">
      <div class="previewWrapper">
        <div class="previewInner">
          <span class="clossBtn"></span>
          <div>

            <h5 class="previewTitle">{{previewTitle}}</h5>
            <div class="previewContent" v-html="content"></div>
            <!--附件-->
            <el-row>
              <el-col :span="3" class="fontSize-16">
                附件 ：
              </el-col>
              <el-col :span="20">
                <div class="previewFile" title="预览界面不提供下载附件功能">
                  <span v-for="(iterm,index) in file" :key="index">{{iterm}}</span>
                </div>
              </el-col>
            </el-row>
            <slot></slot>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import PreviewPopup from 'components/PreviewPopup'
  import {getLocalTime, formatDate} from '../../../../static/commonFun'
  export default {
    data() {
      return {
        dialogPreviewVisible:false,
        visible: false,
        currentPage: 4, // 分页当前页
        tableData: [
          {
            msgId: '1',
            title:'测试111111111111',
            sendName: 'bios',
            sendTime: '1111111111111111'
          },
          {
            msgId: '2',
            title:'测试111111111111',
            sendName: 'bios',
            sendTime: '1111111111111111'
          },
          {
            msgId: '3',
            title:'测试111111111111',
            sendName: 'bios',
            sendTime: '1111111111111111'
          }
        ],
        multipleSelection: [],
        pageNumber: 1,
        pageSize: 20,
        title: '',
        dataTotal: 0,
        previewTitle: '',
        content:`<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 21px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 24px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">各有关住院医师规范化培训基地、医院科教处、教育处：</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">“国家卫生和计划生育委员会住院医师规范化培训规划教材”是人民卫生出版社贯彻落实2013年12月31日国家卫生计生委等七部委联合印发的《关于建立住院医师规范化培训制度的指导意见》、2014年6月30日教育部等六部委联合印发的《关于医教协同深化临床医学人才培养改革的意见》等相关文件,在国家卫生计生委科教司的领导和支持下，组织全国顶级专家编写并于2014年陆续出版，受到了住培医师的欢迎。</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">为进一步落实2017年7月11日国务院办公厅印发的</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">《关于深化</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">医</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">教协同进一步推进医学教育改革与发展的意见》</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">及</span><span style="padding: 0px; color: rgb(2, 2, 2); line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">“全国医学教育改革发展工作会议”的精神，</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">经全国住院医师规范化培养教材评审委员会、人民卫生出版社研究决定，计划组织修订“国家卫生和计划生育委员会住院医师规范化培训规划教材”西医临床专业第2版并启动相关调研工作。</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">本次修订调研工作面对各住培基地师生及社会广大教材读者，请各基地积极配合调研工作，提出宝贵的意见和建议，这对第2版教材的修订以及编写团队的遴选非常重要。现对住培教材修订相关事项通知如下：</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">1.<span style="padding: 0px; line-height: normal; font-family:;">&nbsp;&nbsp;</span></span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">教材使用情况调查表（请教学管理部门填写附件1）</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">2.<span style="padding: 0px; line-height: normal; font-family:;">&nbsp;&nbsp;</span></span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">质量调查表（请主编自检、带教老师及住院医师填写附件2）</span></p><p style="margin: 0px 0px 10px 31px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">3.</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">国家卫生计生委住院医师规范化培训规划教材目录(西医临床专业40种,请见附件3）</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;&nbsp;&nbsp; 4.</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">选题意向申报表（如有其他出版意向请填写附件4）</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 32px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">即日起启动调研工作，恳请有关单位的相关部门认真组织填写调研表，并于2017年10月9日前将纸质文件经单位审核盖章后邮寄到出版社，电子表格发送到以下邮箱。</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">联系人：柴山山&nbsp; 010-59787352，13811953734</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">胡</span><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">冰雪&nbsp; 010-59787522, 17801011539</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 64px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">左&nbsp; 巍&nbsp; 010-59787311，13717795243</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 56px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">邮 箱： jiaocaidiaoyan@163.com</span></p><p class="MsoListParagraph" style="margin: 0px 0px 10px 55px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">地 址：北京市朝阳区潘家园南里19号人民卫生出版社，邮 编：100021</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 0px; letter-spacing: normal; font-family:;"><span style="padding: 0px; line-height: 18.4px; font-family: 宋体; font-size: 16px; box-sizing: border-box;">&nbsp;</span></p><p style="margin: 0px 0px 10px; padding: 0px; color: rgb(112, 112, 112); line-height: 16.1px; text-indent: 8px; letter-spacing: normal; font-family:;">`,
        file:['调研函2.jpg','教材使用情况调查表.docx','40种住陪教材目录.docx']
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.multipleSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    mounted() {
      // this.getMessageList()
    },
    methods: {
      /**
       * 加载消息列表
       */
      getMessageList() {
        this.$axios.get("/messages/list/message", {
          params: {
            sessionId: this.$mySessionStorage.get('currentUser','json').userSessionId,
            title: this.title,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data
          this.dataTotal = res.data.total
          if (res.code == '1') {
            this.tableData=res.data.rows
            // 将时间戳转为标准格式
            for (let i=0; i< this.tableData.length; i++) {
              this.tableData[i].sendTime = formatDate(this.tableData[i].sendTime)
            }
            // console.log(this.tableData)
            if (this.dataTotal == 0) {
              this.$message({
                showClose: true,
                message: '没有数据!',
                type: 'warning'
              });
            }
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      },
      /**
       * 搜索
       */
      search() {
        this.getMessageList()
      },
      /**
       * 选择每页有多少条数据
       */
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getMessageList()
      },
      /**
       * 选择当前第几页
       */
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageNumber = val
        this.getMessageList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       /**
        * 点击修改
        */
      handleEdit(index, row) {
        this.$router.push({ name: '编辑消息',query:{type:'edit',messageId:row.msgId}});
      },
      /**
       * 撤回
       */
      handleRecall(index, row) {
        console.log(index, row);
      },
      /**
       * 点击补发
       */
      handleReissue(index, row) {
        console.log(index, row);
        this.$router.push({name:'选择学校',query:{history:'1'}});
      },
      /**
       * 点击消息状态
       * @param id
       * @param row
       */
      handleState(id, row) {
        console.log(id)
        this.$router.push({path:'messagestate', query: {msgId: id}})  //将你的跳转写在这里。
      },
      preview(title){
        this.previewTitle = title
        this.dialogPreviewVisible = true
      },
      /**
       * 批量删除
       */
      delet() {
        // console.log(1)
        // console.log(this.multipleSelection)
        var len = this.multipleSelection.length
        var arr = []
        for (var i = 0; i< len; i++) {
          arr.push(this.multipleSelection[i].msgId)
        }
        var msgId = arr.join()
        this.$axios.delete("/messages/delete/message/"+msgId).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code == '1') {
            this.tableData.splice(this.multipleSelection,len)
            this.$refs.multipleTable.clearSelection()
            this.$message({
              message: '恭喜你，删除成功！',
              type: 'success'
            });
          }
        }).catch((error) => {
          console.log(error.msg)
        })
      }
    },
    components: {
      PreviewPopup
    }
  }
</script>

<style scoped="scoped">
  .search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
  table a{
    color: #337ab7;
  }
  .previewTitle{
    color: #14232e;
    font-size: 26px;
    font-weight: 500;
  }
  .previewContent{
    margin-top: 48px;
  }
  .previewFile>span{
    display: block;
    color: #337ab7;
    margin: 0 0 10px;
  }
</style>

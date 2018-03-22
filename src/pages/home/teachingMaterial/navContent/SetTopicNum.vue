<template>
	<div class="set-topic-num">
    <p class="page-title">设置选题号:</p>

    <div class="teachingMaterial-search clearfix">
      <!--&lt;!&ndash;书名选择框&ndash;&gt;-->
      <!--<div class="searchBox-wrapper">-->
        <!--<div class="searchName">书名：<span></span></div>-->
        <!--<div class="searchInput">-->
          <!--<el-input placeholder="请输入关键字" class="searchInputEle"></el-input>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;姓名搜索&ndash;&gt;-->
      <!--<div class="searchBox-wrapper searchBtn">-->
        <!--<el-button  type="primary" icon="search">搜索</el-button>-->
      <!--</div>-->

      <!--操作按钮-->
      <div class="operation-wrapper">
        <span class="grey_button">请先选择导出，完善选题号后导入（<a href="/static/选题号模板下载.xlsx">模板下载.xls</a> ）</span>
        <my-upload
          class="ChatInputFileBtn"
          ref="upload"
          :action="api_upload"
          :before-upload="beforeUploadFile"
          :on-success="upLoadFileSuccess"
          :on-error="uploadError"
          :show-file-list="false">
          <el-button type="primary" :disabled="uploadLoading"  :loading="uploadLoading">{{uploadLoading?'正在上传解析中...':'点击导入'}}</el-button>
        </my-upload>
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
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
          label="书序"
          prop="sort"
          width="120">
        </el-table-column>
        <el-table-column
          prop="textbookName"
          label="书籍名称">
        </el-table-column>
        <el-table-column
          prop="textbookRound"
          label="版次"
          width="180">
        </el-table-column>
        <el-table-column
          label="选题号">
          <template scope="scope">
            <div class="width200">
              <el-form :model="scope.row" :rules="inputRules" :ref="'inputRules'+scope.$index" style="margin:18px 0;">
                <el-form-item prop="topicNumber">
                  <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model="scope.row.topicNumber"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
    //整数验证
   var  numberChecked=(rule, value, callback)=>{
        var reg = '^[0-9]*$';   //阿拉伯数字验证正则
        if(!value){
          callback()
        }else{
            if (!(value + '').match(reg)) {
              callback('请输入正确的数字');
            } else {
              callback()
            }
        }

    }
			return {
        api_upload: '/pmpheep/textBook/import/topicExcel',
        tableData:[],
        materialId:'',// 教材ID
        book:{
          id: '', // 书籍id
          materialId: '' ,//教材
          textbookName: '', // 书籍名称
          textbookRound: '', //书籍轮次
          sort: '', // 图书序号
          isPublished: false, // 是否发布
          topicNumber: '', // 选题号
        },
        topicTextbooks:[],
        uploadLoading:false,
        inputRules:{
            topicNumber:[
                        {type:'string',min:0,max:30,message:'选题号不能超过30个字符',trigger:'blur,change'},
                        {validator:numberChecked,trigger: "blur,change"},
            ]
        }
      }
		},
    created(){
      this.materialId = this.$route.params.materialId
      // console.log(this.materialId)
    },
    mounted(){
      this.getTableList()
    },
    methods:{
      /**
        获取初始化教材数据
       */
      getTableList(){
        this.$axios.get('/pmpheep/textBook/list/topics',{
          params:{
            materialId: this.materialId
          }
        }).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.tableData = res.data
            // console.log(this.tableData)
            this.tableData.sort(function(a,b){
              return a.sort - b.sort
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit(){
        // console.log(this.tableData)
        var re = /^[0-9]+[0-9]*]*$/
        for (var i = 0; i < this.tableData.length; i++) {
          for (var key in this.book) {
            this.book[key] = this.tableData[i][key]
          }
          /* if ( this.tableData[i].topicNumber && !re.test(this.tableData[i].topicNumber)) {
            this.$message.error('选题号只能为数字')
            return
          } */

          // console.log(this.book)
          this.topicTextbooks.push(this.book)
          this.book={
            id: '', // 书籍id
            materialId: '' ,//教材
            textbookName: '', // 书籍名称
            textbookRound: '', //书籍轮次
            sort: '', // 图书序号
            isPublished: false, // 是否发布
            topicNumber: '', // 选题号
          }
      }
      /* 验证规则是否通过 */
        var isChecked=true;
          for(var i in this.tableData){
             this.$refs['inputRules'+i].validate((valid)=>{
               if(!valid){
                isChecked=false;
               }
             })
          }
          if(!isChecked){
            return ;
          }
        // console.log(this.topicTextbooks)
        this.$confirm('确认提交选题号！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/pmpheep/textBook/add/topic',this.$initPostData({
            topicTextbooks: JSON.stringify(this.topicTextbooks)
          })).then(response => {
            let res = response.data
            if (res.code == 1) {
              this.$message.success('设置成功!');
            } else {
              this.$message.error(res.msg.msgTrim());
            }
          }).catch(err => {
            this.$message.error('提交失败，请稍后再试！')
          })
        }).catch(() => {});
      },
      /**
       * 当上传按钮添加excel
       * @param file
       */
      beforeUploadFile(file){
        let flag = true;

        var filedata = file.raw;
        var ext=file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
        // 类型判断
        if(!(ext=='xls'||ext=='xlsx')){
          this.$message.error("请按照模板格式的文档上传文件");
          return;
        }
        //文件名不超过40个字符
        /* if(file.name.length>40){
          this.$message.error("文件名不能超过40个字符");
          return;
        } */
        // 判断文件大小是否符合 文件不为0
        if(file.size<1){
          this.$message.error("文件大小不能小于1bt");
          return;
        }
        // 判断文件大小是否符合 文件不大于100M
        if(file.size/1024/1024 > 100){
          this.$message.error("文件大小不能超过100M！");
          return;
        }

        this.uploadLoading=flag;
        return flag;
      },
      /**
       * 上传文件请求成功的回调
       */
      upLoadFileSuccess(res, file, fileList){
        if (res.code == '1') {
          var upLoad = res.data;
          var tableData = this.tableData;
          var data = [];
          /*提取相同数据*/
          for (var i =0;i<tableData.length;i++) {
            for (var j = 0; j<upLoad.length;j++) {
              if (tableData[i].sort == upLoad[j].sort && tableData[i].textbookName == upLoad[j].textbookName && tableData[i].textbookRound== upLoad[j].textbookRound) {
                /* data.push(upLoad[j]); */
                tableData[i].topicNumber=upLoad[j].topicNumber;
              }
            }
          }
          /*将不同的数据加入其中*/
          /* if (data.length < tableData.length) {
            data=[...data,...(tableData.slice(data.length))];
          }
//          console.log(data);
          this.tableData = data; */
        }else{
          this.$message.error(res.msg.msgTrim());
        }
        this.uploadLoading = false;
      },
      /**
       * 上传文件请求失败的回调
       */
      uploadError(err, file, fileList){
        console.log(err);
        this.$message.error(err.msg.msgTrim());
        this.uploadLoading = false;
      },
      /** 导出Excel */
      exportExcel(){
        let url = '/pmpheep/textbook/exportTopic/?materialId='+ this.materialId;
        // console.log(url)
        this.$commonFun.downloadFile(url);
      }
    }
	}
</script>

<style scoped>
.searchInputEle {
  padding: 3px 0;
}
.grey_button{
  color: #9c9c9c;
}
.grey_button a{
  color: #337ab7
}
.ChatInputFileBtn{
  position: relative;
  top: 13px;
  margin-right: 10px;
}
</style>

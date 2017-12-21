<template>
  <div class="check" style="height:100%;">
		<div class="top-nav">
			<div class="header_title_tips">
        <p >{{ruleForm.bookname}}</p>
        <div class="tips_icon"></div>
      </div>
		</div>
		<div class="bottom-content">
			<el-row>
				<el-col span="12">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="书名:">
							<p>{{ruleForm.bookname}}</p>
						</el-form-item>
						<el-form-item label="纠错信息:">
							<div class="messageBox">
								<p>页码：{{ruleForm.page}} 行数：{{ruleForm.line}}</p>
							</div>
						</el-form-item>
						<el-form-item label="纠错人:">
							<p>{{ruleForm.realname}}</p>
						</el-form-item>
						<el-form-item label="提交时间:">
							<p>{{ruleForm.gmtCreate}}</p>
						</el-form-item>
						<el-form-item label="主编回复:">
							<div class="messageBox">
								<p>{{ruleForm.authorReply}}</p>
							</div>
						</el-form-item>
						<el-form-item label="检查结果:" prop="result">
							<el-radio-group v-model="ruleForm.result" class="radio-group">
									<el-radio :label="true">存在问题</el-radio>
									<el-radio :label="false">无问题</el-radio>
								</el-radio-group>
						</el-form-item>
						<el-form-item label="回复用户:" prop="editorReply">
							<el-input
								type="textarea"
								:autosize="{ minRows: 4, maxRows: 8}"
								placeholder="请输入内容"
								v-model="ruleForm.editorReply">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button icon="arrow-left">返回</el-button>
							<el-button type="primary" @click="back">提交</el-button>
						</el-form-item>
					</el-form>
				</el-col>	
			</el-row>
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
				ruleForm: {
					bookname: '', // 书名
					page:'',
					line:'',
					realname: '', // 纠错人
					gmtCreate: '', // 提交时间
					result:'',
					editorReply:''
        },
				rules: {
          editorReply: [
            { required: true, message: '请输入回复内容', trigger: 'blur' },
            { min: 1, max: 500, message: '不能超过500个字符', trigger: 'blur' }
					],
					result: [
						{ required: true, message: '检查结果', trigger: 'blur' },
					]
        }
    };
  },
  created(){
      this.ruleForm.bookname = this.$route.query.bookname;
			// alert(this.bookname)
			this.getBookError();
	},
	methods:{
		getBookError(){
			this.$axios.get('/pmpheep/bookCorrection/list',{
			params:{
					pageSize: 1,
					pageNumber:1,
					bookname: this.ruleForm.bookname,
					result: ''
			}
			}).then(response =>{
					let res = response.data
					if (res.code == 1) {
						this.ruleForm = res.data.rows[0];
						this.ruleForm.gmtCreate = this.$commonFun.formatDate(this.ruleForm.gmtCreate);                    
					}
			})
		},
		back(){
			this.$router.go(-1);
		}
	}
};
</script>
<style>
.top-nav{
	/* float: left; */
	width:100%;
	position: relative;
	height: 43px;
	background-color: rgb(238, 241, 246);
	border: 1px solid rgb(209, 217, 229);
	box-sizing: border-box;
}
.top-nav .header_title_tips{
    margin-bottom:15px;
    /* float:left; */
    color:#fff;
    position: absolute;
    left:-8px;
    top:8px;
}
.top-nav .header_title_tips p{
    /* float:left; */
    background-color: #12806b;
    font-size:16px;
    padding:2px 20px 2px 15px;
    max-width:545px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.top-nav .header_title_tips .tips_icon{
    border:4px solid #475669;
    position: absolute;
    left: 0;
    bottom:-8px;
    border-left-color:#fff;
    border-bottom-color:#fff;
}
.bottom-content{
	border: 1px solid rgb(209, 217, 229);
	box-sizing: border-box;
	border-top: 0;
	padding: 15px 20px;
	float: left;
	width: 100%;
	background-color: #fff;
}
.messageBox{
	min-height: 50px;
	border: 1px solid #e2dddd;
	padding: 0px 15px 20px 15px;
	margin-top: 5px;
	background: #f3f3f3;
}
</style>
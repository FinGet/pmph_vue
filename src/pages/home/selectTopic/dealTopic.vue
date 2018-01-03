<template>
  <div class="deal_topic">
      <div style="overflow:hidden;">
   <p class="left_header_p">
       翻译书稿
       <span></span>
   </p>
   </div>
   <el-form :model="formData" ref="form" label-width="150px" class="form_box">
       <el-form-item label-width="0">
       <div class="percent50">
            <el-form-item
             label="译稿原书名："
           >
           <el-input v-if="type=='check'" placeholder="请输入译稿原书名" v-model="data.originalBookname"></el-input>
					 <p v-else>{{data.originalBookname}}</p>
           </el-form-item> 
       </div>
       <div class="percent50">
            <el-form-item
             label="原编著者："
           >
           <el-input v-if="type=='check'" placeholder="请输入原编著者" v-model="data.originalAuthor"></el-input>
					 <p v-else>{{data.originalAuthor}}</p>
           </el-form-item> 
       </div>
       </el-form-item>
       <el-form-item label-width="0">
       <div class="percent50">
            <el-form-item
             label="国籍："
           >
           <el-input v-if="type=='check'" placeholder="请输入国籍" v-model="data.nation"></el-input>
					 <p v-else>{{data.nation}}</p>
           </el-form-item> 
       </div>
       <div class="percent50">
            <el-form-item
             label="出版年代及版次："
           >
           <el-input v-if="type=='check'" placeholder="请输入出版年代及版次" v-model="data.edition"></el-input>
					 <p v-else>{{data.edition}}</p>
           </el-form-item> 
       </div>
       </el-form-item>    
        <div style="overflow:hidden;">   
            <p class="left_header_p">
                编者情况
                <span></span>
            </p>
            </div>
        <el-form-item label-width="50px">
          <el-table :data="writerData" border class="form_table">
           <el-table-column
            label="姓名"
            prop="realname"
            width="120"
           ></el-table-column>
           <el-table-column
            label="性别"
            prop="sex"
            width="85"
           >
					 	<template scope="scope">
							 <span>{{scope.row.sex==0?'男':'女'}}</span>
						 </template>
					 </el-table-column> 
           <el-table-column
            label="年龄"
            prop="price"
            width="90"
           ></el-table-column> 
           <el-table-column
            label="行政职务"
            prop="position"
           ></el-table-column>
           <el-table-column
            label="工作单位"
            prop="workplace"
           ></el-table-column>   
          </el-table>
        </el-form-item>
        <el-form-item
        label="指定编辑："
        >
         <p>{{data.realname}}</p>
        </el-form-item>
        <el-form-item
        label="审核意见："
        >
         <el-input type="textarea" v-if="type=='check'" :rows="4" v-model="data.authFeedback"></el-input>
				 <p v-else>{{data.authFeedback}}</p>
        </el-form-item>
   </el-form>
   <div class="bottom_box">
       <el-button type="primary" icon="arrow-left" @click="goBack">返回</el-button>
       <!-- <el-button type="danger" v-if="type=='check'" :disabled="isAccepted || isEditorHandling">退回分配人</el-button> -->
       <el-button type="primary" v-if="type=='check'" :disabled="!isAccepted" @click="check(3)">通过</el-button>
       <el-button type="danger" v-if="type=='check'" :disabled="!isAccepted" @click="check(2)">不通过</el-button>
   </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
			id: '', // 教材申报id
			type: '', // detail 、 check
			active: '', // 从哪个页面跳过来的
			routerName: '',
			data:{},
			writerData:[],
		//	authFeedback: '',  // 审核意见
			isDirectorHandling:true, //是否由主任受理
			isEditorHandling:true, //是否由编辑受理
			isAccepted:true //编辑是否接受办理
    };
	},
	created(){
		this.id = this.$route.query.id;
		this.type = this.$route.query.type;
		this.active = this.$route.query.active || '';
		this.routerName = this.$route.query.name || null;
		console.log(this.$route.query)
	},
	methods:{
		getData(){
			this.$axios.get('/pmpheep/topic/get/topicText',{
				params:{
					id: this.id
				}
			}).then(response => {
				let res = response.data;
				if (res.code == '1') {
					this.isDirectorHandling = res.data.isDirectorHandling, //是否由主任受理
					this.isEditorHandling = res.data.isEditorHandling, //是否由编辑受理
					this.isAccepted = res.data.isAccepted //编辑是否接受办理
					this.data = res.data;
					this.writerData = res.data.topicWriters;
				}
			})
		},
		// 审核
		check(authProgress){
			this.$axios.put('/pmpheep/topic/put/editorHandling',this.$initPostData({
				id: this.id,
				authProgress: authProgress, // 审核进度
				authFeedback: this.data.authFeedback
			})).then(response => {
				let res = response.data;
				if (res.code == '1') {
					this.$message.sucees('操作成功！');
				} else {
					this.$message.error(res.msg.msgTrim());
				}
			}).catch(err => {
				this.$message.error('操作错误，请稍后再试！')
			})
		},
		/**返回上一级 */
		goBack(){
			this.$router.push({name:this.routerName?this.routerName:'选题申报审核',query:{active:this.active}});
		}
	}
};
</script>
<style scoped>
.deal_topic {
  overflow: hidden;
  padding-top: 20px;
}
.deal_topic .left_header_p {
  padding: 0 30px;
  line-height: 30px;
  float: left;
  background-color: #12806b;
  color: #fff;
  position: relative;
  z-index: 1;
}
.deal_topic .left_header_p span {
  height: 0px;
  display: block;
  width: 0px;
  background-color: #fff;
  border: 15px #fff solid;
  border-bottom-color: #fff;
  border-left-color: #12806b;
  border-right-color: #fff;
  position: absolute;
  z-index: 9;
  right: -25px;
  top: 0;
}
.deal_topic .form_box {
  padding: 20px 100px 20px 0px;
}
.deal_topic .form_box .percent50 {
  width: 50%;
  float: left;
}
.deal_topic .form_box .form_table {
  margin-top: 20px;
  box-sizing: border-box;
}
.deal_topic .bottom_box {
  margin-left: 50%;
  float: left;
  transform: translateX(-50%);
}
</style>

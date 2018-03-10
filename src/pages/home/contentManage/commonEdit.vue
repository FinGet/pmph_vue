<template>
  <div class="common_edit">
    <div class="top-nav">
	  <div class="header_title_tips">
        <p >{{$route.params.type=='new'?'常见问题新增':'常见问题维护'}}</p>
        <div class="tips_icon"></div>
      </div>
	</div>
      <!-- 表单 -->
    <div style="margin-top:20px;padding:0 50px 0 0;">
      <el-form :model="formData" ref="formData" :rules="rules"  label-width="140px">
         <el-form-item label="常见问题标题：" prop="title">
             <el-input  placeholder="请输入问题标题"  v-model="formData.title"  style="width:30%"></el-input>
         </el-form-item>
         <el-form-item label="问题解决方案：" prop="content">
             <el-input  type="textarea" v-model="formData.content" :rows="4"></el-input>
         </el-form-item>
      </el-form>  
     </div>
     <div class="overflow:hidden;">
   <div class="bottom_button">
       <el-button type="primary" @click="editSubmit" v-if="$route.params.check!='check'">发布</el-button>
       <el-button type="primary" @click="$router.push({name:'帮助管理'})">返回</el-button>
    </div>   
   </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
              addNewUrl:'/pmpheep/help/newHelp',   //添加常见问题url
              editUrl:'/pmpheep/help/update',    //修改问题url
             formData:{
               title:'',
               content:''
             },
             rules:{
               title:[
                 { required: true, message: "请输入问题标题", trigger: "blur" },
                 {min:1,max:100,message:'问题标题不能超过100个字符',trigger: "blur,change" }
               ],
               content:[
                  { required: true, message: "解决方案不能为空", trigger: "blur" },
               ]
             }
            }
        },
        created(){
          if(!this.$route.params.type){
               this.$router.push({name:'帮助管理'});
          }
          if(this.$route.params.type=='edit'){
            this.formData.mid=this.$route.params.editData.cmsContent.mid;
            this.formData.id=this.$route.params.editData.cmsContent.id;
            this.formData.content=this.$route.params.editData.content.content;
            this.formData.title=this.$route.params.editData.cmsContent.title;
          }
        },
        methods:{
          editSubmit(){
            this.$refs.formData.validate((valid) =>{
              if(valid){
                /* 新增 */
                if(this.$route.params.type=='new'){
                  this.$axios.post(this.addNewUrl,this.$commonFun.initPostData(this.formData))
                  .then((res)=>{
                    if(res.data.code==1){
                      this.$message.success('添加成功');
                      this.$router.push({name:'帮助管理'});
                    }else{
                      this.$message.error(res.data.msg.msgTrim());
                    }
                  })
                  /* 修改 */
                }else{
                 this.$axios.put(this.editUrl,this.$commonFun.initPostData(this.formData))
                 .then((res)=>{
                    if(res.data.code==1){
                      this.$message.success('修改成功');
                      this.$router.push({name:'帮助管理'});
                    }else{
                      this.$message.error(res.data.msg.msgTrim());
                    }
                 }) 
                }
              }else{
                return ;
              }
            })
          }
        }
    }
</script>
<style scoped>

.common_edit .bottom_button{
    float:left;
    margin-left:50%;
    transform: translateX(-50%);
}
.top-nav {
  /* float: left; */
  width: 100%;
  position: relative;
  height: 43px;
  background-color: rgb(238, 241, 246);
  border-bottom: 1px solid rgb(209, 217, 229);
  box-sizing: border-box;
}
.top-nav .header_title_tips {
  margin-bottom: 15px;
  /* float:left; */
  color: #fff;
  position: absolute;
  left: -9px;
  top: 8px;
}
.top-nav .header_title_tips p {
  /* float:left; */
  background-color: #12806b;
  font-size: 16px;
  padding: 2px 20px 2px 15px;
  max-width: 545px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.top-nav .header_title_tips .tips_icon {
  border: 4px solid #475669;
  position: absolute;
  left: 0;
  bottom: -8px;
  border-left-color: #fff;
  border-bottom-color: #fff;
}
</style>

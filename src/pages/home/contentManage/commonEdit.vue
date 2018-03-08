<template>
  <div class="common_edit">
    <div class="top-nav">
	  <div class="header_title_tips">
        <p >常见问题维护</p>
        <div class="tips_icon"></div>
      </div>
	</div>
      <!-- 表单 -->
    <div style="margin-top:20px;padding:0 50px 0 0;">
      <el-form :model="formData" ref="formData"  label-width="140px">
         <el-form-item label="常见问题标题：">
             <el-input  placeholder="请输入问题标题"  style="width:30%"></el-input>
         </el-form-item>
         <el-form-item label="问题解决方案：">
             <el-input  type="textarea" :rows="4"></el-input>
         </el-form-item>
      </el-form>  
     </div>
     <div class="overflow:hidden;">
   <div class="bottom_button">
       <el-button type="primary">发布</el-button>
       <el-button type="primary">返回</el-button>
    </div>   
   </div>
  </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
             formData:{}
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

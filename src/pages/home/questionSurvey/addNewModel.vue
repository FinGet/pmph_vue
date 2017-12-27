<template>
  <div class="add_new_model">
      <div style="width:100%;float:left;">
      <p class="left_header_p">
         新增问卷模板
       <span></span>
       </p>
       </div>
    <div class="question_list">
       <h4>题目控件</h4>
      <ul >
        <li>
            <el-button type="primary" class="button" @click="addNewFormItem(1)">单选题</el-button>
        </li>
        <li>
            <el-button type="primary" class="button" @click="addNewFormItem(2)">多选题</el-button>
        </li>
        <li>
            <el-button type="primary" class="button" @click="addNewFormItem(3)">下拉题</el-button>
        </li>
        <li>
            <el-button type="primary" class="button" @click="addNewFormItem(4)">单行文本题</el-button>
        </li>
         <li>
            <el-button type="primary" class="button" @click="addNewFormItem(5)">多行文本题</el-button>
        </li>
         <li>
            <el-button type="primary" class="button" @click="addNewFormItem(6)">附件内容题</el-button>
        </li>
        </ul>
      </div>
      <!-- 表单列表 -->
      <div class="form_list">
         <h3 v-if="!isEditTitle" @dblclick="isEditTitle=true">{{title}}</h3>
         <el-input type="text" v-else v-model="title"  style="width:60%;margin-left:20%;margin-bottom:20px;" @blur="isEditTitle=false"></el-input>
         <el-form :model="formData" ref="form" label-width="100px" label-position="top">

           <el-form-item :label="(index+1)+'.'+item.label" v-for="(item,index) in formList" :key="index">
               <!-- 单选 -->
                <el-radio-group v-model="formData[item.key]" v-if="item.questionType==1">
                    <el-radio :label="it.value" v-for="(it,index) in item.SelectOptions" :key="index">{{it.label}}</el-radio>
                </el-radio-group>
                <!-- 多选 -->
                <el-checkbox-group v-model="formData[item.key]"  v-if="item.questionType==2" style="float:left;">
                    <el-checkbox :label="it.label" v-for="(it,index) in item.SelectOptions" :key="index"></el-checkbox>
                </el-checkbox-group>
                <!-- 下拉 -->
                <el-select v-model="formData[item.key]" placeholder="请选择" v-if="item.questionType==3">
                    <el-option
                    v-for="(it,index) in item.SelectOptions"
                    :key="index"
                    :label="it.label"
                    :value="it.value">
                    </el-option>
                </el-select>
                <!-- 单行文本 -->
                <el-input v-model="formData[item.key]" class="form_input" v-if="item.questionType==4"></el-input>
                <!-- 多行文本 -->
                <el-input  v-model="formData[item.key]" type="textarea" :rows="3" class="form_input" v-if="item.questionType==5"></el-input>
                <el-upload
                    style="float:left"
                    v-if="item.questionType==6"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">{{item.note}}</div>
                </el-upload>
                <!-- 操作按钮 -->
                <el-button type="text" class="form_button" style="margin-left:15px;" @click="editFormItem(item,index)">修改</el-button>
                <el-button type="text" class="form_button" @click="deleteFormItem(index)">删除</el-button>
            </el-form-item>
            <!-- <el-form-item label="活动名称">
                <el-input v-model="formData.name" class="form_input"></el-input>
                <el-button type="text" class="form_button">修改</el-button>
                <el-button type="text" class="form_button">删除</el-button>
            </el-form-item> -->
         </el-form>

         <div class="bottom_box">
             <div class="button_box">
                 <el-button >返回</el-button>
                 <el-button type="primary">确定</el-button>
             </div>
         </div>
      </div>

      <!-- 添加 修改弹窗 -->
      <el-dialog  title="新增问题项" :visible.sync="dialogVisible" size="tiny" class="form_item_dialog">
           <el-form :model="dialogForm" ref="dialogForm" label-width="70px">
               <el-form-item label="题目：">
                   <el-input placeholder="请输入题目" v-model="dialogForm.label"></el-input>
               </el-form-item>
               <el-form-item label="备注：" v-if="dialogForm.questionType!=1&&dialogForm.questionType!=2&&dialogForm.questionType!=3">
                   <el-input placeholder="请输入备注" v-model="dialogForm.note"></el-input>
               </el-form-item>
               <el-form-item label="类型：">
                   <el-select v-model="dialogForm.questionType" placeholder="请选择题目类型" >
                    <el-option
                        v-for="item in dialogOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="必填：">
                   <el-radio-group v-model="dialogForm.isRequired">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
               </el-form-item>
               <el-form-item label="选项：" v-if="dialogForm.questionType!=4&&dialogForm.questionType!=5&&dialogForm.questionType!=6">
                 <el-form-item label-width="0" v-for="(item,index) in dialogForm.SelectOptions" :key="index">
                    <el-input placeholder="请输入选项" class="dialog_input" v-model="item.label"></el-input>
                    <el-button type="text"  style="color:#ff4949" @click="deleteDlalogOption(index)">删除</el-button>
                 </el-form-item>

                 <!-- <el-form-item label-width="0">
                    <el-input placeholder="请输入选项" class="dialog_input"></el-input>
                    <el-button type="text"  style="color:#ff4949">删除</el-button>
                 </el-form-item>
                 <el-form-item label-width="0">
                    <el-input placeholder="请输入选项" class="dialog_input"></el-input>
                    <el-button type="text"  style="color:#ff4949">删除</el-button>
                 </el-form-item> -->  

                   <el-button type="primary" size="small" @click="addDialogOption">新建选项</el-button>

               </el-form-item>
           </el-form>
         <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="upLoadFormItem">确 定</el-button>
         </span>
      </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
        formData:{
            name:''
        },
        title:'测试问卷',
        isEditTitle:false,
        editIndex:'',
        isEdit:false,
        formList:[
           {
          label:'您使用过xx网吗？',
          note:'',  
          isRequired:'',
          questionType:1,
          SelectOptions:[
            {
                label:'使用过',
                value:1
            },
            {
                label:'没有',
                value:2
            },
            ]
        },
        {
          label:'您的年龄',
          note:'',  
          isRequired:'',
          questionType:4,
          SelectOptions:[
            ]
        },
        {
          label:'您经常上什么网站？',
          note:'',  
          isRequired:'',
          questionType:2,
          SelectOptions:[
            {
                label:'知乎',
                value:1
            },
            {
                label:'微博',
                value:2
            },
            {
                label:'论坛',
                value:2
            },
            ]
        },
        ],
        dialogOptions:[
         {
             value:1,
             label:'单选题'
         },
         {
             value:2,
             label:'多选题'
         },
         {
             value:3,
             label:'下拉题'
         },
         {
             value:4,
             label:'单行文本题'
         },
         {
             value:5,
             label:'多行文本题'
         },
         {
             value:6,
             label:'附件内容题'
         },
        ],
        dialogForm:{
          label:'',
          note:'',  
          isRequired:'',
          questionType:1,
          SelectOptions:[
            {
                label:'',
                value:1
            },
            {
                label:'',
                value:2
            },
            ]
        },
        
        dialogVisible:false,

    }
  },
  methods:{
      /* 添加题目 */
      addNewFormItem(i){
          this.isEdit=false;
          this.dialogForm.questionType=i;
          this.dialogVisible=true;
      },
      /* 对话框 选项删除 */
      deleteDlalogOption(i){
       this.dialogForm.SelectOptions.splice(i,1);
      },
      /* 添加对话框选项 */
      addDialogOption(){
         this.dialogForm.SelectOptions.push({label:''});
      },
      /* 修改表单项 */
      editFormItem(item){
          this.isEdit=true;
      this.dialogForm=item;
      this.dialogVisible=true;
      },
      /* 删除表单项1 */
      deleteFormItem(index){
      this.formList.splice(index,1);
      },
      /* 确定添加题目 */
      upLoadFormItem(){
          if(this.isEdit){
              this.formList[this.editIndex]=this.dialogForm;
          }else{
             this.formList.push(this.dialogForm);
          }
          this.dialogForm={
          label:'',
          note:'',  
          isRequired:'',
          questionType:1,
          SelectOptions:[
            {
                label:'',
                value:1
            },
            {
                label:'',
                value:2
            },
            ]
        };
          this.dialogVisible=false;
        
      },
  }
};
</script>
<style scoped>
.add_new_model {
      padding-top:20px;
  overflow: hidden;
}
.add_new_model .question_list {
  margin:35px 0;
  padding: 0 20px;
  width: 18%;
  float: left;
  box-sizing: border-box;
  
}
.add_new_model .left_header_p{
    padding:0 30px;
    line-height: 30px;
    float: left;
    background-color: #12806b;
    color:#fff;
    position: relative;
    z-index: 1;
}
.add_new_model .left_header_p span{
    height:0px;
    display: block;
    width:0px;
    background-color: #fff;
    border:15px #fff solid;
    border-bottom-color:#fff;
    border-left-color:#12806b;
    border-right-color:#fff;
    position: absolute;
    z-index: 9;
    right: -25px;
    top:0;

}
.add_new_model .question_list h4{
    font-size: 16px;
    margin-bottom:20px;
}
.add_new_model .question_list ul li{
    margin-bottom:3px;
}
.add_new_model .question_list ul li .button{
    width:100%;
}
.add_new_model .form_list{
   float: left;
   width:80%;
   margin:35px 0;
   padding-left:35px;
   padding-right:12%;
   border-left:1px solid #dadada;
   min-height:765px;
   box-sizing: border-box;
} 
.add_new_model .form_list h3{
    font-size: 18px;
    line-height:36px;
    margin-bottom:20px;
    text-align: center;
}
.add_new_model .form_list .form_input{
    width:calc(100% - 120px);
    margin-right:10px;
}
.add_new_model .form_list  .form_button{
    color:#337ab7;
}
.add_new_model .form_item_dialog .el-dialog{
  min-width:500px;
}
.add_new_model .form_item_dialog .dialog_input{
    margin-right:10px;
    width:calc(100% - 60px);
}
.add_new_model .form_item_dialog .el-form-item .el-form-item{
    margin-bottom:22px;
}
.add_new_model .form_list .bottom_box{
    width:100%;
}
.add_new_model .form_list .bottom_box .button_box{
    float: left;
    margin-left:50%;
    transform: translateX(-50%);
}
</style>
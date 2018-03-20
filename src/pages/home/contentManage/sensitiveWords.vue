<template>
  <div class="sensitive_words">
    <p class="header_p">
      <span>敏感词内容：</span>
      <el-input class="input" placeholder="请输入" v-model="searchParams.word" @keyup.enter.native="search"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
      <el-button type="danger" style="float:right;" @click="deleteSensitive">删除</el-button>
      <el-button type="primary" style="float:right;" @click="openEditDialog(false)">增加</el-button>
    </p>
    <el-table :data="tableData" class="table-wrapper" border style="width:100%;"
     @selection-change="handleSelectionChange"
    >
      <el-table-column
      type="selection"
      width="45">
      </el-table-column>
      <el-table-column label="敏感词ID" width="100" prop="id" >
        </el-table-column>
        <el-table-column label="敏感词内容" prop="word"></el-table-column>
        <el-table-column label="发表时间" width="175">
          <template scope="scope">
            {{$commonFun.formatDate(scope.row.gmtCreate)}}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note"></el-table-column>  
        <el-table-column label="启用标志" width="100" >
          <template scope="scope">
            {{scope.row.isDisabled?'禁用':'启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" >
          <template scope="scope">
             <el-button type="text" @click="openEditDialog(true,scope.row)">修改</el-button>   
          </template>
        </el-table-column>
    </el-table>
          <!--分页-->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="pageTotal>searchParams.pageSize"
        @size-change="HandleSizeChange"
        @current-change="HandleCurrentChange"
        :current-page="searchParams.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

    <!-- 增加修改弹框 -->
    <el-dialog 
    :title="isEdit?'修改':'新增'"
    :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="110px" class="dialog_from">
        <el-form-item label="敏感词内容：" prop="word">
           <el-input placeholder="请输入敏感词内容"  v-model="dialogForm.word"></el-input>
        </el-form-item>
        <el-form-item label="排序码：" prop="sort">
           <el-input placeholder="请输入排序码"  v-model="dialogForm.sort"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发表时间：">
           <el-date-picker
            v-model="dialogForm.data"
            type="datetime"
            style="width:100%"
            placeholder="请选择发表时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注：" prop="note">
          <el-input type="textarea" v-model="dialogForm.note" :rows="3" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="启用：" prop="isDisabled">
           <el-select v-model="dialogForm.isDisabled" placeholder="请选择">
              <el-option label="启用" :value="false"></el-option>
              <el-option label="禁用" :value="true"></el-option>
            </el-select>
        </el-form-item>
        </el-form> 

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
    export default{
      data(){
        return{
          sensitiveListUrl:'/pmpheep/sensitive/list' ,  //敏感词列表url
          editSensitiveUrl:'/pmpheep/sensitive/update',   //修改敏感词url
          addSensitiveUrl:'/pmpheep/sensitive/add' ,  //新增敏感词url
          deleteSensitiveUrl:'/pmpheep/sensitive/isDeleted',   //删除敏感词url
          tableData:[],
          pageTotal:100,
          searchParams:{
             pageSize:10,
             pageNumber:1,
             word:''  
          },
          dialogForm:{
              word:'',
              sort:'',
              note:'',
              isDisabled:''
          },
          deleteIds:[],
          dialogVisible:false,
          isEdit:false,
          rules:{
             word:[
              {required:'true',message:'敏感词内容不能为空',trigger:'blur'}
             ],
             sort: [
              {min:1,max:10, message: "显示顺序不能超过10个字符", trigger: "change,blur" },
              {validator:this.$formCheckedRules.numberChecked,trigger: "blur"}
            ],
            note:[
              
            ],
            isDisabled:[
              {required:'true',type:'boolean',message:'请选择是否启用',trigger:'change'}
            ]
          }
        }
      },
      created(){
         this.getList();
      },
      methods:{
        /* 获取敏感词列表 */
        getList(){
          this.$axios.get(this.sensitiveListUrl,{
            params:this.searchParams
          }).then((res)=>{
            console.log(res);
            if(res.data.code==1){
              this.tableData=res.data.data.rows;
              this.pageTotal=res.data.data.total;
            }
          })
        },
        /* 搜索按钮 */
        search(){
         this.searchParams.pageNumber=1;
         this.getList();
        },
        /* 打开编辑对话框 修改或新增 */
        openEditDialog(bool,obj){
          this.isEdit=bool;
          if(bool){
            this.dialogForm.id=obj.id;
            this.dialogForm.word=obj.word;
            this.dialogForm.sort=obj.sort+'';
            this.dialogForm.note=obj.note;
            this.dialogForm.isDisabled=obj.isDisabled;
          }else{
            this.dialogForm={
                    word:'',
                    sort:'',
                    note:'',
                    isDisabled:false
                    }
          }
          this.dialogVisible=true;

        },
        /* 修改或新增提交 */
        dialogSubmit(){
          this.$refs.dialogForm.validate((valid)=>{
            if(valid){
              if(this.isEdit){
                /* 修改 */
                this.$axios.put(this.editSensitiveUrl,this.$commonFun.initPostData(this.dialogForm))
                .then((res)=>{
                   if(res.data.code==1){
                       this.$message.success('修改成功')  ;
                       this.getList();
                       this.dialogVisible=false;
                   }else{
                     this.$message.error(res.data.msg.msgTrim());
                   }
                }).catch((error)=>{})
              }else{
                /* 新增 */
                this.$axios.post(this.addSensitiveUrl,this.$commonFun.initPostData(this.dialogForm))
                .then((res)=>{
                   if(res.data.code==1){
                     this.$message.success('新增成功')  ;
                     this.getList();
                     this.dialogVisible=false;
                   }else{
                     this.$message.error(res.data.msg.msgTrim());
                   }      
                }).catch((error)=>{})
              }  
            }else{
              return;
            }
          })
        },
        deleteSensitive(){
         if(this.deleteIds.length!=0){
            this.$confirm('确定删除选中的敏感词吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(() => {
                 this.$axios.delete(this.deleteSensitiveUrl,{
                   params:{
                     ids:this.deleteIds.join(',')
                   }
                 }).then((res)=>{
                   if(res.data.code==1){
                     this.$message.success('已成功删除');
                     this.getList();
                   }else{
                     this.$message.error(res.data.msg.msgTrim());
                   }
                 }) 
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作'
                });          
            });  
         }else{
           this.$message.error('请至少选中一个敏感词');
         }
        },
        /*table选中切换  */
        handleSelectionChange(val){
          this.deleteIds=[];
            for(var i in val){
              this.deleteIds.push(val[i].id);
            }

        },
        HandleSizeChange(val){
         this.searchParams.pageSize=val;
         this.searchParams.pageNumber=1;
         this.getList();
        },
        HandleCurrentChange(val){
          this.searchParams.pageNumber=val; 
          this.getList(); 
        }
      }
    }
</script>
<style scoped>
.sensitive_words .header_p {
  overflow: hidden;
}
.sensitive_words .header_p .input {
  width: 190px;
  margin-right: 10px;
}
.sensitive_words  .dialog_from .input{
  width:80%;
}
</style>

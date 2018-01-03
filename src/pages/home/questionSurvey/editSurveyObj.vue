<template>
  <div class="edit_survey_obj">
     <h4>调查对象列表</h4> 
     <p class="header_p">
        <span>对象名称：</span>
        <el-input placeholder="请输入对象名称" class="input"></el-input>
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button type="primary" style="float:right" @click="dialogVisible=true">增加对象</el-button>  
     </p>
     <el-table class="table-wrapper" :data="tableData" border>
         <el-table-column  label="对象名称">
         </el-table-column>
         <el-table-column  label="显示顺序">
         </el-table-column>
         <el-table-column  label="启用标识">
         </el-table-column>
         <el-table-column  label="备注">
         </el-table-column>
         <el-table-column  label="操作" width="100">
             <template scope="scope">
                <el-button type="text">修改</el-button>
             </template>
         </el-table-column>
     </el-table>

     <!-- 弹框 -->

        <el-dialog title="新增对象" :visible.sync="dialogVisible"   class="obj_dialog" size="tiny">
            <div style="padding-right:30px;" >
                <el-form ref="dialogForm" :model="dialogForm"   label-width="110px">
                    <el-form-item label="角色名称：" prop="roleName">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="启用标识：">
                        <el-radio-group>
                          <el-radio :label="false">启用</el-radio>
                          <el-radio :label="true">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="显示顺序：" prop="sort">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="note">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
            </span>
        </el-dialog>
  </div>  
</template>
<script>
    export default{
        data(){
            return{
                tableData:[],
                dialogVisible:false,
                dialogForm:{
                    
                }
            }
        }
    }
</script>
<style>
.edit_survey_obj{
    overflow: hidden;
}
.edit_survey_obj h4{
    font-size: 16px;
    margin-bottom:22px;
}
.edit_survey_obj .header_p {
  overflow: hidden;
  margin-bottom: 20px;
}
.edit_survey_obj .header_p .input {
  width: 217px;
  margin-right: 10px;
}
</style>

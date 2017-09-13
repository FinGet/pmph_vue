<template>
    <div class="application_list">
        <p class="search_p">
            <el-radio-group v-model="searchRadio" class="search_radio" fill="#1ab194">
                <el-radio :label="1">全部</el-radio>
                <el-radio :label="2">与我相关</el-radio>
            </el-radio-group>
            <span class="search_line">|</span>
             <el-checkbox-group v-model="searchCheckList" fill="#1ab194" class="search_check">
                <el-checkbox label="已公布"></el-checkbox>
                <el-checkbox label="已发布"></el-checkbox>
                <el-checkbox label="未发布"></el-checkbox>
                <el-checkbox label="已结束"></el-checkbox>
            </el-checkbox-group> 
            
        </p>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            searchRadio: '',
            searchCheckList:[],

        }
    }
}
</script>
<style>
 .search_p .search_line {
    font-size: 20px;
    margin: 0 10px;
    float:left;
}
.search_p {
    overflow: hidden;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    line-height: 36px;
    background-color: #fff;
}
.search_radio{
     line-height: 36px;
    float:left;
}
 .application_list .search_radio .is-checked .el-radio__inner {
     border-color: #1ab194;
     background: #1ab194;
 }
 .application_list .search_check .is-checked .el-checkbox__inner{
     border-color: #1ab194;
     background: #1ab194;
 }
.search_check{
    float:left;
}
</style>
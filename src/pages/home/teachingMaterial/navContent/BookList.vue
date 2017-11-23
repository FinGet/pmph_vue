<template>
    <div class="new_book_release">
        <el-form ref="form" :model="formData" class="release_form" label-width="110px">
            <el-form-item label="教材名称：">
                <span class="grey_span">{{formData.bookName}}</span>
            </el-form-item>
            <el-form-item label="教材轮次：">
                <span class="grey_span">第{{formData.round}}轮</span>
            </el-form-item>
            <el-form-item label="教材分类：">
                <span class="grey_span">{{formData.releaseText}}</span>
                <p><span class="red_span">（*若教材数量较多，可按照模板即第一列为书名第二列为版次的格式导入Excel文档批量添加）</span></p>
                <div>
                  <span class="grey_span" style="float:left;">
                    请按照模板格式上传（
                    <el-button type="text" class="grey_button">模板下载.xlsx</el-button>
                    ）：
                  </span>
                  <el-upload class="upload" action="" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="书目录：">
              <!--表格-->
              <div class="table-wrapper book-list-catalogue">
                <div class="pull-right">
                  <el-button type="primary" size="small" @click="autoSetBookNum">自动设置书序</el-button>
                  <el-button type="primary" size="small" @click="sortByBookNum">按书序排序</el-button>
                  <el-button type="primary" size="small" @click="sortByPreNum">按版次排序</el-button>
                </div>
                <el-table
                  ref="multipleTable"
                  border
                  stripe
                  :data="extendListData"
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column
                    prop="orderNum"
                    label="书序"
                    width="120">
                    <template scope="scope">
                      <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model.number="scope.row.sort"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="bookName"
                    label="书籍名称"
                    width="400">
                    <template scope="scope">
                      <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model.trim="scope.row.textbookName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="edition"
                    label="版次"
                    width="120">
                    <template scope="scope">
                      <el-input placeholder="请输入选题号" class="searchInputEle" icon="edit" v-model.number="scope.row.textbookRound"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template scope="scope">
                      <el-button type="text" @click="insertRow(scope.$index)">插入行</el-button>
                      <el-button type="text" @click="deleteExtendItem(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="out_bottom_box marginT60">
                  <div class="bottom_box">
                    <el-button type="primary" class="bottom_button">暂存</el-button>
                    <el-button type="primary" class="bottom_button" @click="$router.push({name:'教材申报选择学校'})" >保存，下一步</el-button>
                    <el-checkbox class="marginL20" v-model="formData.onlySchool">仅选中学校可见</el-checkbox>
                  </div>
                </div>
              </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            api_book_list:'/pmpheep/textBook/list',
            formData: {
                materialId:'',
                bookName: '全国高等学校本科应用心理学专业第三轮规划教材',
                releaseText: '学校教育>研究生教材',
                round: 3,
                classify: '',
                onlySchool:false
            },
            fileList: [],
            extendListData: [],
        }
    },
    methods: {
      /**
       * 获取当前教材下所有书籍
       * @param val
       */
      getBookList(){
        this.$axios.get(this.api_book_list,{params:{
          materialId:this.formData.materialId
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.extendListData = res.data;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 删除入行
       * @param index
       */
      deleteExtendItem(index) {
        this.$confirm("确定删除该行？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.extendListData.splice(index, 1);
          })
          .catch(e=>{})
      },
      /**
       * 插入行
       * @param index
       */
      insertRow(index){
        console.log(index)
        this.extendListData.splice(index+1,0,{
          sort: '',
          bookName: '',
          textbookRound: ''
        });
      },
      /**
       * 按照书序排序显示
       */
      sortByBookNum(){
        this.extendListData.sort((x,y)=>{
          return x['sort']-y['sort'];
        })
        this.$message.success('已排序完成！');
      },
      /**
       * 按照版次排序
       */
      sortByPreNum(){
        this.extendListData.sort((x,y)=>{
          return x['textbookRound']-y['textbookRound'];
        })
        this.$message.success('已排序完成！');
      },
      /**
       * 自动设置书序
       */
      autoSetBookNum(){
        this.extendListData.forEach((iterm,index)=>{
          iterm.sort = index+1;
        });
        this.$message.success('自动设置书序完成！');
      },
    },
  created(){
    this.formData.materialId = this.$route.params.materialId;
    //如果没有教材id则跳转到通知列表
    if(!this.formData.materialId){
      this.$router.push({name:'通知列表'});
    }
    this.getBookList();
  },
}

</script>
<style scoped>
 .book-list-catalogue{
   max-width: 840px;
 }


.new_book_release .grey_span {
    color: #9c9c9c;
}

.new_book_release .grey_span .grey_button {
    color: #337ab7;
}

.new_book_release .grey_span .grey_button:hover {
    color: #23527c;
}

.new_book_release .upload {
    float: left;
}

.new_book_release .red_span {
    color: #f5596e;
}

.release_form .classify_input {
    width: 600px;
    margin-right: 20px;
}

.release_form .classify_button {
    color: #1abb9c;
}

.release_form .classify_button:hover {
    opacity: .9;
}

.new_book_release .checkTree_dialog .el-dialog__body{
    overflow: hidden;
}
.new_book_release .checkTree_dialog .tree_box {
    box-sizing: border-box;
    width: calc(100% - 100px);
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    float: left;
}

.new_book_release .checkTree_dialog .tree_box::-webkit-scrollbar {
    display: none;
}

.new_book_release .checkTree_dialog .button {
    float: right;
}

.extend_list {
    width: 80%;
}

.extend_list tr {
    border: 1px solid #d4d4d4;
}

.extend_list tr td {
    width: 25%;
    color: #5e5e5e;
    text-align: center;
    padding: 5px 0;
}

.extend_list tr td i {
    margin-left: 5px;
    cursor: pointer;
}

.extend_list .add_button {
    color: #1ab194;
}

.extend_list .delete_button {
    color: #e57e2f;
}

.out_bottom_box {
    width: 100%;
    overflow: hidden;
}

.out_bottom_box .bottom_box {
    float: left;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>

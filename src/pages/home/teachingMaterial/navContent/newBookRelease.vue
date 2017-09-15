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
                <!-- <el-form-item>
                    <el-input v-model="formData.classify" class="classify_input" disabled></el-input>
                    <el-button type="text" class="classify_button" @click="dialogVisible=true">选择</el-button>
                    <el-button type="text" class="classify_button">删除</el-button>
                </el-form-item> -->
                <el-form-item>
                    <span class="red_span">（*若教材数量较多，可按照模板即第一列为书名第二列为版次的格式导入Excel文档批量添加）</span>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <span class="grey_span" style="float:left;">请按照模板格式上传（
                            <el-button type="text" class="grey_button">模板下载.xlsx</el-button>）：</span>
                        <el-upload class="upload" action="" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form-item>
            </el-form-item>
            <el-form-item label="扩展项：">
                <table class="extend_list">
                    <tr>
                        <td>序号</td>
                        <td>书名</td>
                        <td>版次</td>
                        <td>
                            <el-button type="text" @click="addExtendItem" class="add_button">新增</el-button>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in extendListData" :key="index">
                        <td>
                            <!-- <span v-if="!item.orderNumVisible">{{item.orderNum}}
                                            <i class="el-icon-edit" @click="showInput(index,'input'+index+'_1','orderNumVisible')"></i>
                                        </span> -->
                            <el-input v-model="item.orderNum" :ref="'input'+index+'_1'" style="width:90px;"></el-input>
                        </td>
                        <td>
                            <!--  <span v-if="!item.bookNameVisible">{{item.bookName}} -->
                            <!--  <i class="el-icon-edit"  @click="showInput(index,'input'+index+'_2','bookNameVisible')"></i> -->
                            </span>
                            <el-input v-model="item.bookName" :ref="'input'+index+'_2'" style="width:80%;"></el-input>
                        </td>
                        <td>
                            <!--  <span v-if="!item.editionVisible">{{item.edition}} -->
                            <!-- <i class="el-icon-edit"  @click="showInput(index,'input'+index+'_3','editionVisible')"></i> -->
                            </span>
                            <el-input v-model="item.edition" :ref="'input'+index+'_3'" style="width:80%;"></el-input>
                        </td>
                        <td>
                            <el-button type="text" @click="deleteExtendItem(index)" class="delete_button">删除</el-button>
                        </td>
                    </tr>
                    <!--  <tr>
                                             <td>
                                                 1<i class="el-icon-edit"></i>  
                                                 <el-input style="width:100px;" size="mini"></el-input>      
                                                </td>
                                             <td>请填写书名 <i class="el-icon-edit"></i></td>
                                             <td>请填写版次<i class="el-icon-edit"></i></td>
                                             <td><el-button type="text">删除</el-button></td>
                                         </tr> -->
                </table>
            </el-form-item>
        </el-form>

        <div class="out_bottom_box">
            <div class="bottom_box">
                <el-button type="primary" class="bottom_button">保存但不发布</el-button>
                <el-button type="primary" class="bottom_button">保存并发布</el-button>
            </div>
        </div>
        <!-- 教材分类选择弹框 -->
        <el-dialog title="医学教材架构" :visible.sync="dialogVisible" class="checkTree_dialog">
            <el-tree :data="treeData" :props="defaultProps" class="tree_box"></el-tree>

        </el-dialog>
    </div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            formData: {
                bookName: '全国高等学校本科应用心理学专业第三轮规划教材',
                releaseText: '学校教育>研究生教材',
                round: 3,
                classify: ''
            },
            fileList: [],
            dialogVisible: false,
            extendListData: [
                {
                    orderNum: 1,
                    orderNumVisible: false,
                    bookName: '请填写书名',
                    bookNameVisible: false,
                    edition: '请填写版次',
                    editionVisible: false
                },
                {
                    orderNum: 3,
                    orderNumVisible: false,
                    bookName: '请填写书名',
                    bookNameVisible: false,
                    edition: '请填写版次',
                    editionVisible: false
                },
                {
                    orderNum: 2,
                    orderNumVisible: false,
                    bookName: '请填写书名',
                    bookNameVisible: false,
                    edition: '请填写版次',
                    editionVisible: false
                },
            ],
            treeData: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            this.checkedTreeData = data;
            console.log(data);
        },
        getTreeNode() {

        },
        //切换输入框并自动聚焦
        /*  showInput(index, str,name) {
             this.extendListData[index][name] = true;
            // console.log(index, str);
            // console.log(this.$refs);
             this.$nextTick(_ => {
                 console.log(this.$refs[str]["0"].$refs);
                 this.$refs[str]["0"].$refs.input.focus()
             });
         }, */
        deleteExtendItem(index) {
            this.extendListData.splice(index, 1);
        },
        addExtendItem() {
            this.extendListData.push({
                orderNum: 1,
                orderNumVisible: false,
                bookName: '请填写书名',
                bookNameVisible: false,
                edition: '请填写版次',
                editionVisible: false
            });
        }
    }
}

</script>
<style scoped>
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
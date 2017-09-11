<template>
  <transition name="el-fade-in-linear">
    <div class="previewWrapper" v-show="close">
      <div class="previewInner">
        <span class="clossBtn" @click="closePopup"></span>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="教材书籍" name="first">
            <div class="tabsContainer">
              <el-row>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="9">
                      <span>教材书籍 :</span>
                    </el-col>
                    <el-col :span="15">

                      <el-input placeholder="选择书籍"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <span>教材书籍 :</span>
                  <el-input placeholder="选择书籍"></el-input>
                </el-col>
                <el-col :span="6">
                  <span>教材书籍 :</span>
                  <el-input placeholder="选择书籍"></el-input>
                </el-col>
                <el-col :span="6">
                  <span>教材书籍 :</span>
                  <el-input placeholder="选择书籍"></el-input>
                </el-col>
              </el-row>
              <div class="tableContainer groupmanageTable">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="日期"
                    width="120">
                    <template scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[30,50,100, 200, 300, 400]"
                  :page-size="30"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
                <div class="btn-wrapper text-right">
                  <el-button  type="primary">添加成员</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="社内用户" name="second">

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props:{
      close:{
        type:Boolean,
        default:false,
      }
    },
    data() {
      return {
        activeName:'first',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    computed:{
    },
    methods:{
      closePopup(){
        this.$emit('update:close', false)
      },
      /**
       * 点击标签页
       */
      handleClick(){

      },
    }
  }
</script>

<style scoped>
  .previewWrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height:100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .previewInner{
    position: relative;
    width: 80%;
    max-width: 1400px;
    margin: 30px auto;
    min-height:50%;
    border-radius: 6px;
    background-color: #f7f7f7;
  }
  .previewInner:first-child{
    padding: 80px 80px 30px 80px;
  }
  .clossBtn{
    position: absolute;
    top: 10px;
    right: 10px;
    display: block;
    width: 36px;
    z-index: 10;
    height: 36px;
    border-radius: 50%;
    background: url(../../common/images/close.png) no-repeat 100% 100%;
    background-size: cover;
    cursor: pointer;
  }
  .btn-wrapper{
    margin-top: 20px;
  }
  .tabsContainer el-input{
    display: inline-block;
  }

</style>


<template>
  <transition name="el-fade-in-linear">
    <div class="previewWrapper" v-show="close">
      <div class="previewInner">
        <span class="clossBtn" @click="closePopup"></span>
        <el-row>
          <el-col>
            <el-table
              ref="multipleTable"
              id="groupfilemanagetable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="filename"
                header-align="center"
                width="500">
                <template scope="scope">
                  <i class="fa fa-file-word-o"></i>
                  <span style="margin-left: 10px">{{ scope.row.filename }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="上传时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="uploader"
                label="上传者"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="downcount"
                align="center"
                label="下载次数">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col>
            <el-col :span="6">已选中{{count}}个文件</el-col>
            <el-col :span="6" class="pull-right">
              <el-popover
                ref="popover"
                placement="top"
                width="160"
                v-model="visible">
                <p>选中的文件确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false,delet()">确定</el-button>
                </div>
              </el-popover>

              <el-button class="pull-right" type="danger" :disabled="isSelected" v-popover:popover>删除</el-button>
            </el-col>
          </el-col>
        </el-row>
        <br>
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
        count:0,
        visible: false,
        multipleSelection: [],
        tableData: [{
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }, {
          filename:'颜值并没有那么重要.docx',
          date: '2016-05-02',
          uploader: '王小虎',
          downcount: '10'
        }]
      }
    },
    computed:{
      /**
       * 判断当前是否有选中项来设置删除按钮是否可以点击
       * @returns {boolean}
       */
      isSelected() {
        if (this.multipleSelection.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods:{
      closePopup(){
        this.$emit('update:close', false)
      },
      /**
       * 当选中项变化是，把选中项赋值个multipSelection从而实现了isSelected
       * @param val
       */
      handleSelectionChange(val) {
        // console.log(val)
        this.multipleSelection = val
      },
      /**
       * 删除选中数据
       */
      delet() {
        //console.log(this.multipleSelection)
        this.tableData.splice(this.multipleSelection,1)
      }
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
    padding: 80px 80px 0 80px;
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

</style>

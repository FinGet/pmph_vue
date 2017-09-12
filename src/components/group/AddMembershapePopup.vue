<template>
  <transition name="el-fade-in-linear">
    <div class="previewWrapper" v-show="close">
      <div class="previewInner">
        <span class="clossBtn" @click="closePopup"></span>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="作家用户" name="first">
            <div class="tabsContainer">
                <div class="searchBox-wrapper">
                  <span>教材书籍：</span>
                  <div>
                    <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                  </div>
                </div>
                <div class="searchBox-wrapper">
                  <span>遴选职位：</span>
                  <div>
                    <el-select v-model="selectValue" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="searchBox-wrapper">
                  <span>用户名：</span>
                  <div>
                    <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                  </div>
                </div>
                <div class="searchBox-wrapper">
                  <span>真实姓名：</span>
                  <div>
                    <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                  </div>
                </div>
              <div class="searchBtn-wrapper text-right">
                <el-button  type="primary">查询</el-button>
              </div>
              <div class="tableContainer groupmanageTable">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="用户名">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="真实姓名">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="遴选职位">
                  </el-table-column>
                  <el-table-column
                    prop="work"
                    label="工作单位"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :page-sizes="[30,50,100, 200, 300, 400]"
                  :page-size="30"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
                <div class="btn-wrapper text-right">
                  <el-button  type="primary" @click="closePopup">添加成员</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="社内用户" name="second">

            <div class="tabsContainer">
              <div class="searchBox-wrapper">
                <span>社内用户：</span>
                <div>
                  <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                </div>
              </div>
              <div class="searchBox-wrapper">
                <span>遴选职位：</span>
                <div>
                  <el-select v-model="selectValue" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="searchBox-wrapper">
                <span>用户名：</span>
                <div>
                  <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                </div>
              </div>
              <div class="searchBox-wrapper">
                <span>真实姓名：</span>
                <div>
                  <el-input placeholder="请输入内容" class="searchInputEle"></el-input>
                </div>
              </div>
              <div class="searchBtn-wrapper text-right">
                <el-button  type="primary">查询</el-button>
              </div>
              <div class="tableContainer groupmanageTable">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="真实姓名">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="用户名">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="遴选职位">
                  </el-table-column>
                  <el-table-column
                    prop="work"
                    label="工作单位"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :page-sizes="[30,50,100, 200, 300, 400]"
                  :page-size="30"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
                <div class="btn-wrapper text-right">
                  <el-button  type="primary" @click="closePopup">添加成员</el-button>
                </div>
              </div>
            </div>
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
          code: 'wangxiaohu',
          name: '王小虎',
          position:'副主编',
          work: '福建卫生职业技术学院'
        },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },

          {
            code: 'wangxiaohu',
            name: '王小虎',
            position:'副主编',
            work: '福建卫生职业技术学院'
          },
        ],
        selectValue:'',
        options:[],
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
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height:100%;
    padding: 40px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .previewInner{
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height:100%;
    min-height:50%;
    border-radius: 6px;
    background-color: #f7f7f7;
  }
  .previewInner:first-child{
    padding: 40px 40px 30px 40px;
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
  .searchBox-wrapper{
    box-sizing: border-box;
    display: inline-block;
    max-width: 320px;
    padding: 0 10px;
    margin-bottom: 6px;
  }
  .searchBox-wrapper>span{
    float: left;
    line-height: 36px;
    width: 90px;
    vertical-align: middle;
  }
  .searchBox-wrapper>div{
    margin-left: 90px;
    box-sizing: border-box;
  }
  .searchBtn-wrapper{
    margin-bottom: 16px;
  }

</style>


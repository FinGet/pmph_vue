<template>
    <div class="teachMaterial chief">
      <p class="bookTitle">医学心理学与精神病学（第4版）</p>

      <div class="teachingMaterial-search clearfix">
        <div class="operation-wrapper">
          <el-button type="primary" @click="dialogVisible = true"> 查看历史记录 </el-button>
          <el-button type="primary" @click="submit" :disabled="!hasPermission([2,3])||tableData.length==0">确认</el-button>
          <el-button type="warning" @click="reset" :disabled="!hasPermission([2,3])">重置</el-button>
        </div>
      </div>

      <div class="table-wrapper">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          tooltip-effect="dark"
          max-height="750"
          style="width: 100%">
          <el-table-column label="姓名">
            <template scope="scope">
              <router-link :to="{name:'专家信息',query: { declarationId: scope.row.declarationId }}" class="table-link">{{scope.row.realname}}</router-link>
            </template>
          </el-table-column>

          <el-table-column label="申报单位"  prop="reportName"></el-table-column>

          <!--<el-table-column label="工作单位" prop="orgName"></el-table-column>-->
          <el-table-column label="申请职位" prop="presetPosition"></el-table-column>
          <el-table-column label="学校审核" width="100" prop="onlineProgress"></el-table-column>
          <el-table-column label="出版社审核" width="110" prop="offlineProgress"></el-table-column>

          <el-table-column label="是否主编" width="100" align="center" >
            <template scope="scope">
              <el-checkbox
                v-model="scope.row.isZhubian"
                @change="checkboxChange(1,scope.row)"
                :disabled="!hasPermission(2)"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="排位" width="90" align="center">
            <template scope="scope">
              <div class="paddingB15 paddingT10 relative">
                <el-input
                  class="border-radius-4"
                  :class="{'border-red':scope.row.isZhubian&&!scope.row.zhubianSortIsOk}"
                  v-model.trim="scope.row.zhubianSort"
                  :disabled="!hasPermission(2)||!scope.row.isZhubian"
                  @blur="sortChange(1,scope.row)"
                  @change="sortChange(1,scope.row)"
                  size="mini"
                ></el-input>
                <span class="error fontsize-sm table-input-tips" v-if="scope.row.isZhubian&&!scope.row.zhubianSortIsOk">{{scope.row.zhubianSort?'排序错误':'请输入'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="是否副主编"
            width="110"
            align="center">
            <template scope="scope">
              <el-checkbox
                v-model="scope.row.isFuzhubian"
                @change="checkboxChange(2,scope.row)"
                :disabled="!hasPermission(2)"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="排位" width="90" align="center">
            <template scope="scope">
              <div class="paddingB15 paddingT10 relative">
                <el-input
                  class="border-radius-4"
                  :class="{'border-red':!scope.row.fuzhubianSortIsOk}"
                  v-model.trim="scope.row.fuzhubianSort"
                  :disabled="!hasPermission(2)||!scope.row.isFuzhubian"
                  @blur="sortChange(2,scope.row)"
                  @change="sortChange(2,scope.row)"
                  size="mini"
                ></el-input>
                <span class="error fontsize-sm table-input-tips" v-if="scope.row.isFuzhubian&&!scope.row.fuzhubianSortIsOk">{{scope.row.fuzhubianSort?'排序错误':'请输入'}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="是否编委" width="100" align="center">
            <template scope="scope">
              <el-checkbox
                v-model="scope.row.isBianwei"
                @change="checkboxChange(3,scope.row)"
                :disabled="!hasPermission(3)"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="是否数字编委" width="120" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.isDigitalEditor" :disabled="!hasPermission([2,3])"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="修改记录"
        :visible.sync="dialogVisible">
        <div class="history-box timeLine">
          <ul v-if="historyLog.length>0">
            <li v-for="(iterm,index) in historyLog" :key="iterm.id">
              <b></b>
              <p>{{iterm.detail}}</p>
            </li>
          </ul>
          <p v-else>暂无历史消息</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        api_list:'/pmpheep/declaration/list/editor/selection',
        api_submit:'/pmpheep/declaration/editor/selection/update',
        api_log:'/pmpheep/textBookLog/list',
        searchParams:{
          textbookId:'',
          realName:'',
          presetPosition:'',
        },
        formData:{
          materialId:'',
          textbookId:'',
        },
        dialogVisible:false,
        tableData:[],
        zhubianSelectSortNumber:[],
        fuzhubianSelectSortNumber:[],
        historyLog:[],
      }
    },
    computed:{

    },
    created(){
      this.formData.materialId = this.$route.params.materialId;
      this.formData.textbookId = this.$route.query.bookid;
      this.searchParams.textbookId = this.formData.textbookId;
      //如果没有教材id则跳转到通知列表
      if(!this.formData.materialId){
        this.$router.push({name:'通知列表'});
      }
      //如果没有书籍id则跳转到遴选列表页面
      if(!this.formData.materialId){
        this.$router.push({path: '1v3'});
      }

      this.getTableData();
    },
    methods:{
      //获取table数据
      getTableData(){
        this.$axios.get(this.api_list,{params:{
          textbookId:this.formData.textbookId,
          realName:'',
          presetPosition:'',
        }})
          .then(response=>{
            var res = response.data;
            this.getHistoryLog();
            if(res.code==1){
              var onlineProgress = ['未提交','已提交','被退回','通过'];
              var offlineProgress = ['未收到','被退回','已收到'];
              var positionList = ['','主编','副主编','编委'];
              res.data.map(iterm=>{
                iterm.onlineProgress = onlineProgress[iterm.onlineProgress];
                iterm.offlineProgress = onlineProgress[iterm.offlineProgress];
                iterm.presetPosition = positionList[iterm.presetPosition];

                iterm.isZhubian = iterm.chosenPosition==1;
                iterm.zhubianSort = iterm.isZhubian?iterm.rank:'';
                iterm.zhubianSortIsOk = true;
                iterm.isFuzhubian = iterm.chosenPosition==2;
                iterm.fuzhubianSort = iterm.isFuzhubian?iterm.rank:'';
                iterm.fuzhubianSortIsOk = true;
                iterm.isBianwei = iterm.chosenPosition==3;
              });
              this.tableData = res.data;
            }
          })
          .catch(e=>{
            this.getHistoryLog();
            console.log(e);
          })
      },
      //获取历史记录
      getHistoryLog(){
        this.$axios.get(this.api_log,{params:{
          textbookId:this.formData.textbookId,
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.historyLog = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * checkbox实现单选功能
       * @param type 类型
       * @param row 数据
       */
      checkboxChange(type,row) {
        if((type==1&&!row.isZhubian)||(type==2&&!row.isFuzhubian)||(type==3&&!row.isBianwei)){
          row.isZhubian = false;
          row.isFuzhubian = false;
          row.isBianwei = false;
          row.zhubianSort = '';
          row.fuzhubianSort = '';
          row.zhubianSortIsOk = true;
          row.fuzhubianSortIsOk = true;
          return;
        }
        row.chosenPosition = type;
        row.isZhubian = type==1;
        row.isFuzhubian = type==2;
        row.isBianwei = type==3;
        row.zhubianSort = '';
        row.fuzhubianSort = '';
        row.zhubianSortIsOk = true;
        row.fuzhubianSortIsOk = true;
      },
      /**
       * 提交遴选结果
       */
      submit(){

        if(!this.checkSortIsOk()){
          return;
        }

        this.$confirm("确认提交？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            let jsonDecPosition = [];
            for(let i = 0, len = this.tableData.length; i < len; i++){
              let tempObj = {
                id:this.tableData[i].id,
                textbookId:this.searchParams.textbookId,
                chosenPosition:this.tableData[i].chosenPosition,
                rank:this.tableData[i].chosenPosition==1?this.tableData[i].zhubianSort:(this.tableData[i].chosenPosition==2?this.tableData[i].fuzhubianSort:''),
                isDigitalEditor:this.tableData[i].isDigitalEditor,
              };
              if(this.tableData[i].isZhubian||this.tableData[i].isFuzhubian||this.tableData[i].isBianwei||this.tableData[i].isDigitalEditor){
                jsonDecPosition.push(tempObj);
              }
            }
            //提交
            this.$axios.put(this.api_submit,this.$commonFun.initPostData({
              jsonDecPosition:JSON.stringify(jsonDecPosition)
            }))
              .then(response=>{
                var res = response.data;
                if(res.code==1){
                  this.getTableData();
                  this.$message.success('提交成功！');
                }else{
                  this.$message.error(res.msg.msgTrim());
                }
              })
              .catch(e=>{
                console.log(e);
              })

          })
          .catch(e=>{})
      },
      /**
       * 点击重置按钮
       */
      reset(){
        this.$confirm("放弃当前修改，重置数据？", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(()=>{
            this.getTableData();
          })
          .catch(e=>{})
      },
      /**
       * 当排序码发生变化时检测是否合法
       * @param type 类型 1：主编，2:副主编
       * @param row 表格当前列数据
       */
      sortChange(type,row){
        if(type==1){
          if(row.isZhubian&&!(row.zhubianSort&&this.$commonFun.checkType(row.zhubianSort,'number')&&parseInt(row.zhubianSort)<999)){
            row.zhubianSortIsOk=false;
          }else{
            row.zhubianSortIsOk=true;
          }
        }


        if(type==2){
          if(row.isFuzhubian&&!(row.fuzhubianSort&&this.$commonFun.checkType(row.fuzhubianSort,'number')&&parseInt(row.fuzhubianSort)<999)){
            row.fuzhubianSortIsOk=false;
          }else{
            row.fuzhubianSortIsOk=true;
          }
        }
      },
      checkSortIsOk(){
        var zhubianSortList = [];
        var fuzhubianSortList = [];
        var zhubianData = [];
        var fuzhubianData =[];

        this.tableData.forEach(iterm=>{
          if(iterm.isZhubian){
            zhubianSortList.push(parseInt(iterm.zhubianSort));
            zhubianData.push(iterm);
          }
          if(iterm.isFuzhubian){
            fuzhubianSortList.push(parseInt(iterm.fuzhubianSort));
            fuzhubianData.push(iterm);
          }
        })
        zhubianSortList = zhubianSortList.sort();
        fuzhubianSortList = fuzhubianSortList.sort();

        let zhubianSortIsOk =zhubianSortList.length==0 || (zhubianSortList[0]==1 && (zhubianSortList[zhubianSortList.length-1] - zhubianSortList[0] == zhubianSortList.length - 1 ? true : false));
        let fuzhubianSortIsOk = fuzhubianSortList.length==0 || (fuzhubianSortList[0]==1 && (fuzhubianSortList[fuzhubianSortList.length-1] - fuzhubianSortList[0] == fuzhubianSortList.length - 1 ? true : false));

        if(!(zhubianSortIsOk&&fuzhubianSortIsOk)){
          this.$message.error((zhubianSortIsOk?'副主编':'主编')+'排序码必须是从1开始的连续整数');
        }

        return zhubianSortIsOk&&fuzhubianSortIsOk

      },
      hasPermission(index){
        return this.$commonFun.materialPower(index);
      }
    }
  }
</script>

<style>
  .bookTitle{
    margin: 10px 0 0px;
    font-size: 16px;
    height:36px;
    line-height: 36px;
  }
  .history-box{
    min-height: 400px;
  }
  .table-input-tips{
    position: absolute;
    bottom: 7px;
    height: 12px;
    left: 0;
  }
</style>

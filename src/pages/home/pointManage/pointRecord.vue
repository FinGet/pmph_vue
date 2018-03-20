<template>
   <div class="point_record">
      <div class="header_box">
         <p class="lable_p">
             用户姓名：
             <span>{{currentUser.realname}}</span>
         </p>
         <p class="lable_p">
             当前总积分：
             <span>{{currentUser.gain}}</span>
         </p>
         <p class="lable_p">
             消费总积分：
             <span>{{currentUser.loss}}</span>
         </p>
      </div>
    <!-- tab -->
    <el-tabs type="border-card" @tab-click="tabChange" v-model="activeName">
        <el-tab-pane label="积分获取记录" name="first">
            <p class="header_p">
             <span>
                 时间：
             </span>
                 <el-date-picker
                    v-model="getParams.startTime"
                    @change="getStartChange"
                    type="date"
                    class="input"
                    placeholder="请选择开始时间"
                    >
                </el-date-picker>
                <span>—</span>
                 <el-date-picker
                    v-model="getParams.endTime"
                    @change="getEndChange"
                    type="date"
                    class="input"
                    placeholder="请选择结束时间"
                    >
                </el-date-picker>
                <el-button type="primary" icon="search" @click="getSearch">搜索</el-button>
                <el-button type="primary" style="float:right" size="small" @click="nimbleSearch('m',true)">近一个月</el-button>
                <el-button type="primary" style="float:right" size="small" @click="nimbleSearch('w',true)">近一周</el-button>
            </p>
            <el-table :data="getPointData" border style="width:100%;margin:10px 0;">
              <el-table-column label="获取行为" prop="ruleName"></el-table-column>
              <el-table-column label="时间" prop="gmtCreate">
                  <template scope="scope">
                      {{scope.row.gmtCreate}}
                  </template>
              </el-table-column>
              <el-table-column label="得分" prop="point"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination-wrapper">
            <el-pagination
                v-if="getPageTotal>getParams.pageSize"
                @size-change="getPointSizeChange"
                @current-change="getPointCurrentChange"
                :current-page="getParams.pageNumber"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="getParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="getPageTotal">
            </el-pagination>
            </div>            
        </el-tab-pane>
        <el-tab-pane label="积分兑换记录" name="second">
            <p class="header_p">
             <span>
                 时间：
             </span>
                 <el-date-picker
                    v-model="exchangeParams.startTime"
                    @change="exchangeStartChange"
                    type="date"
                    class="input"
                    placeholder="请选择开始时间"
                    >
                </el-date-picker>
                <span>—</span>
                 <el-date-picker
                    v-model="exchangeParams.endTime"
                    @change="exchangeEndChange"
                    type="date"
                    class="input"
                    placeholder="请选择结束时间"
                    >
                </el-date-picker>
                <el-button type="primary" icon="search" @click="exchangeSearch">搜索</el-button>
                <el-button type="primary" style="float:right" size="small" @click="nimbleSearch('m',false)">近一个月</el-button>
                <el-button type="primary" style="float:right" size="small" @click="nimbleSearch('w',false)">近一周</el-button>
            </p>
            <el-table :data="exchangePointData" border style="width:100%;margin:10px 0;">
              <el-table-column label="获取行为" prop="ruleName"></el-table-column>
              <el-table-column label="时间">
                  <template scope="scope">
                   {{scope.row.gmtCreate}}
                  </template>
              </el-table-column>
              <el-table-column label="消费积分" prop="total"></el-table-column>
              <el-table-column label="兑换积分" prop="losss"></el-table-column>
            </el-table>
                <!-- 分页 -->
                <div class="pagination-wrapper">
                <el-pagination
                    v-if="exchangePageTotal>exchangeParams.pageSize"
                    @size-change="exchangePointSizeChange"
                    @current-change="exchangePointCurrentChange"
                    :current-page="exchangeParams.pageNumber"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="exchangeParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="exchangePageTotal">
                </el-pagination>
                </div>             
        </el-tab-pane>
    </el-tabs>
   </div>
</template>
<script type="text/javascript">
    export default{
        props:['currentUser','dialogFormVisible'],
        data(){
            return{
               activeName:'first',
               getPointUrl:'/pmpheep/writerpointlog/list',  //积分获取记录url
               exchangePointUrl:'/pmpheep/writerpointlog/listExchange',     //积分兑换url
               getParams:{
                   startTime:'',
                   endTime:'',
                   pageSize:10,
                   pageNumber:1,
                   userId:this.currentUser.id
               },
               getPageTotal:100,
               getPointData:[],
               exchangeParams:{
                   startTime:'',
                   endTime:'',
                   pageSize:10,
                   pageNumber:1,
                   userId:this.currentUser.id
               },
               exchangePageTotal:100,
               exchangePointData:[],

            }
        },
        created(){
           this.getPointList();
        },
        watch:{
         dialogFormVisible(val){
             if(val){
                this.getParams.userId=this.currentUser.id;
                this.exchangeParams.userId=this.currentUser.id;
                this.activeName='first'; 
                this.getPointList();
             }
             
         }
        },
        methods:{
            /* 积分获取记录列表 */
            getPointList(){
             this.$axios.get(this.getPointUrl,{
                 params:this.getParams
             }).then((res)=>{
                 console.log(res);
                 if(res.data.code==1){
                     this.getPointData=res.data.data.rows;
                     this.getPageTotal=res.data.data.total;
                 }
             })
            },
            /* 获取搜索 */
            getSearch(){
             this.getParams.pageNumber=1;   
             this.getPointList();
            },
            /* 日期格式化 */
            getStartChange(val){
              this.getParams.startTime=val;
            },
            getEndChange(val){
              this.getParams.endTime=val;
            },
            /* 兑换搜索 */
            exchangeSearch(){
             this.exchangeParams.pageNumber=1;
             this.exchangePointList()
            },

            /* 积分兑换记录列表 */
            exchangePointList(){
                console.log(this.exchangeParams);
             this.$axios.get(this.exchangePointUrl,{
                 params:this.exchangeParams
             }).then((res)=>{
                 console.log(res);
                 if(res.data.code==1){
                     this.exchangePointData=res.data.data.rows;
                     this.exchangePageTotal=res.data.data.total; 
                 }
             })
            },
            /* 日期格式化 */
            exchangeStartChange(val){
              this.exchangeParams.startTime=val;
            },
            exchangeEndChange(val){
              this.exchangeParams.endTime=val;
            },
            /* tab页切换 */
            tabChange(tab){
              if(tab.name=='first'){
                  this.getPointList();
              }else{
                  this.exchangePointList();
              }
            },
            /* 快捷搜索 */
            nimbleSearch(str,bool){
                /* 获取记录 */
                if(bool){
                    console.log(this.$commonFun.getnowDate());
                    this.getParams.endTime=this.$commonFun.getnowDate();
                    this.getParams.startTime=str=='m'?this.$commonFun.getoneMonthDate():this.$commonFun.getoneWeekDate();
                    this.getSearch();
                }else{
                    /* 兑换记录 */
                    this.exchangeParams.endTime=this.$commonFun.getnowDate();
                    this.exchangeParams.startTime=str=='m'?this.$commonFun.getoneMonthDate():this.$commonFun.getoneWeekDate();
                    this.exchangeSearch();
                }
                
            },
            /* 积分获取页翻页 */
            getPointSizeChange(val){
              this.getParams.pageSize=val;
              this.getParams.pageNumber=1;
              this.getPointList();
            },
            getPointCurrentChange(val){
             this.getParams.pageNumber=1;
             this.getPointList();
            },
            /* 积分兑换页翻页 */
            exchangePointSizeChange(val){
              this.exchangeParams.pageSize=val;
              this.exchangeParams.pageNumber=1;
              this.exchangePointList();
            },
            exchangePointCurrentChange(val){
              this.exchangeParams.pageNumber=1;
              this.exchangePointList();
            }
        }
    }
</script>
<style scoped>
.point_record .header_box{
    overflow: hidden;
    margin-bottom: 20px;
}
.point_record .header_box .lable_p{
    width:25%;
    float:left;
}
.point_record .header_box .lable_p span{
    color:#000;
}
.point_record .el-tabs--border-card{
    box-shadow: none;
}
.point_record .header_p {
  overflow: hidden;
}
.point_record .header_p .input {
  width: 190px;
  margin: 0 5px ;
}
</style>
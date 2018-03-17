<template>
   <div class="point_record">
      <div class="header_box">
         <p class="lable_p">
             用户姓名：
             <span>张万德</span>
         </p>
         <p class="lable_p">
             当前总积分：
             <span>2000</span>
         </p>
         <p class="lable_p">
             消费总积分：
             <span>14000</span>
         </p>
      </div>
    <!-- tab -->
    <el-tabs type="border-card" @tab-click="tabChange" :active-name="activeName">
        <el-tab-pane label="积分获取记录" name="first">
            <p class="header_p">
             <span>
                 时间：
             </span>
                 <el-date-picker
                    v-model="getParams.start"
                    type="date"
                    class="input"
                    placeholder="请选择开始时间"
                    >
                </el-date-picker>
                <span>—</span>
                 <el-date-picker
                    v-model="getParams.end"
                    type="date"
                    class="input"
                    placeholder="请选择结束时间"
                    >
                </el-date-picker>
                <el-button type="primary" icon="search" @click="getSearch">搜索</el-button>
                <el-button type="primary" style="float:right" size="small">近一个月</el-button>
                <el-button type="primary" style="float:right" size="small">近一周</el-button>
            </p>
            <el-table :data="getPointData" border style="width:100%;margin:10px 0;">
              <el-table-column label="获取行为"></el-table-column>
              <el-table-column label="时间"></el-table-column>
              <el-table-column label="得分"></el-table-column>
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
                    v-model="exchangeParams.start"
                    type="date"
                    class="input"
                    placeholder="请选择开始时间"
                    >
                </el-date-picker>
                <span>—</span>
                 <el-date-picker
                    v-model="exchangeParams.end"
                    type="date"
                    class="input"
                    placeholder="请选择结束时间"
                    >
                </el-date-picker>
                <el-button type="primary" icon="search" @click="exchangeSearch">搜索</el-button>
                <el-button type="primary" style="float:right" size="small">近一个月</el-button>
                <el-button type="primary" style="float:right" size="small">近一周</el-button>
            </p>
            <el-table :data="exchangePointData" border style="width:100%;margin:10px 0;">
              <el-table-column label="获取行为"></el-table-column>
              <el-table-column label="时间"></el-table-column>
              <el-table-column label="消费积分"></el-table-column>
              <el-table-column label="兑换积分"></el-table-column>
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
        props:['currentUser'],
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
        methods:{
            /* 积分获取记录列表 */
            getPointList(){
             this.$axios.get(this.getPointUrl,{
                 params:this.getParams
             }).then((res)=>{
                 console.log(res);
                 if(res.data.code==1){
                     
                 }
             })
            },
            getSearch(){
             this.getParams.pageNumber=1;   
             this.getPointList();
            },
            exchangeSearch(){
             this.exchangeParams.pageNumber=1;
             this.exchangePointList()
            },
            /* 积分兑换记录列表 */
            exchangePointList(){
             this.$axios.get(this.exchangePointUrl,{
                 params:this.exchangeParams
             }).then((res)=>{
                 console.log(res);
                 if(res.data.code==1){
                     
                 }
             })
            },
            /* tab页切换 */
            tabChange(tab){
              if(tab.name=='first'){
                  this.getPointList();
              }else{
                  this.exchangePointList();
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
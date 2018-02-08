<template>
  <div>
    <slot name="searchBox"></slot>
    <!--表格-->
    <div class="table-wrapper">
      <el-table
        :data="data"
        border
        stripe
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论">
          <template scope="scope">
            <div class="ellipsis cursor-pointer blue" @click="showCommentDetail(scope.row)">
              {{scope.row.writerName}}在《{{scope.row.bookname}}》中评论：{{scope.row.content}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="评论时间"
          width="168">
        </el-table-column>
        <el-table-column
          prop="score"
          label="评分"
          width="70">
        </el-table-column>
        <el-table-column
          prop="state"
          label="审核状态"
          width="120">
        </el-table-column>
      </el-table>
    </div>
    <slot name="pagination"></slot>
  </div>
</template>

<script>
  export default {
    props:['data'],
    data() {
      return {}
    },
    methods:{
      showCommentDetail(row){
        this.$emit('show-comment-detail',row)
      },
      handleSelectionChange(list){
        this.$emit('selection-change',list)
      }
    }
  }
</script>

<style scoped>

</style>

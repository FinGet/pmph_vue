<template>
    <div class="search">
      <div class="search-title">{{title}}</div>
      <el-col :span="6" class="search-10">
        <el-input v-model="input" :placeholder="placeholder"></el-input>
      </el-col>
      <el-button class="btn" type="primary"  icon="search">搜索</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'search',
    props: {
      placeholder: {
        type:String,
        default: '请输入搜索内容内容'
      },
      title: {
        type:String,
        default: ''
      },
      input:''
    }
  }
</script>

<style>
  .search-title{
    margin: 10px 0 0 10px;
    font-size: 16px;
    float: left;
    height:36px;
    line-height: 36px;
  }
</style>

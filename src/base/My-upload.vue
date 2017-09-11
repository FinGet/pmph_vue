<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList">
    <span> <i class="fa fa-paperclip fa-lg"></i> 添加附件</span>
    <div slot="tip" class="el-upload__tip">文件大小不超过100M</div>
  </el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>

</style>

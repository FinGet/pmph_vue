<template>
	<div class="groupsetting">
    <el-row>
      <el-col>
        <el-col :span="5">
          <img :src="group.image?data.image:defaultImage" alt="小组头像">
        </el-col>
        <el-col :span="8">
          <span class="name">小组名称:</span><el-input v-model="name"></el-input>
          <br>
          <el-upload
            class="upload"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">上传头像</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-col>
      <el-col>
        <div class="cutLine-dashed clearfix"></div>
        <el-button class="pull-right" type="primary">确认修改</el-button>
      </el-col>
    </el-row>
	</div>
</template>

<script>
	export default {
    props:{
      group:{
        type:Object,
        default: () => {
          return {}
        }
      },
      name:{
        type:String,
        default:'人卫社小组'
      }
    },
    data() {
      return {
        defaultImage:'http://119.254.226.115/pmph_imesp/upload/sys_userext_avatar/1706/20170623191553876.png',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
  .groupsetting{
    padding: 10px;
  }
  .name{
    color:rgb(131, 143, 165);
    padding-bottom: 5px;
    display: inline-block;
  }
  .upload{
    margin-top: 10px;
  }
</style>

<template>
	<div class="groupsetting">
    <el-row>
      <el-col>
        <div class="pull-left marginR30">
          <img class="avatar" :src="group.image?data.image:defaultImage" alt="小组头像">
        </div>
        <el-col :span="8">
          <span class="name">小组名称:</span><el-input v-model="name"></el-input>
          <br>
        </el-col>
      </el-col>
      <el-col>
        <el-upload
          class="marginT10 marginL10"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">上传头像</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
      <el-col>
        <div class="cutLine-dashed clearfix"></div>
        <el-button class="pull-right" type="primary" @click="change">确认修改</el-button>
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
        defaultImage:'http://119.254.226.115/pmph_imesp/upload/sys_userext_avatar/1706/20170623191553876.png'
      };
    },
    methods: {
      // 头像上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 限制用户上传头像类型与大小
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 确认修改
      change() {
        this.$message({
          message: '恭喜你，修改成功！',
          type: 'success'
        });
      }
    }
	}
</script>

<style scoped>
  .groupsetting{
    padding: 10px 30px;
  }
  .name{
    color:rgb(131, 143, 165);
    padding-bottom: 5px;
    display: inline-block;
  }
  .avatar{
    width: 100px;
    height:100px;
  }
</style>

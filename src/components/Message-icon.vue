<template>
  <el-dropdown>
        <span class="el-dropdown-link" trigger="click">

          <i class="fa fa-envelope-o fa-lg"></i>
          <span class="mes-num">5</span>
        </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <Message-simple></Message-simple>
      </el-dropdown-item>
      <el-dropdown-item>
        <Message-simple></Message-simple>
      </el-dropdown-item>
      <el-dropdown-item>
        <Message-simple></Message-simple>
      </el-dropdown-item>
      <el-dropdown-item>
        <Message-simple></Message-simple>
      </el-dropdown-item>
      <el-dropdown-item>
        <Message-simple  :linkToAll="true"></Message-simple>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import MessageSimple from './Message-simple.vue'
	export default {
		data() {
			return {}
		},
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    },
    components:{
      MessageSimple
    }
	}
</script>

<style scoped>
.el-dropdown{
  padding-right: 32px;
  cursor: pointer;
}
  .mes-num{
    background: #1ABB9C!important;
    border: 1px solid #1ABB9C!important;
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    padding: 2px 6px;
    position: absolute;
    right: 18px;
    border-radius: 50%;
    top: 2px;
  }
.el-dropdown-menu{
  max-width: 290px;
}
.el-dropdown-menu__item:hover{
  background: none;
}

  .message-all{}
</style>

<template>
  <el-dropdown>
        <span class="el-dropdown-link" trigger="click">

          <i class="fa fa-envelope-o fa-lg"></i>
          <span class="mes-num">5</span>
        </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(iterm,index) in messageList" :key="index">
        <a class="message-iterm">
          <span class="image"><img src="http://119.254.226.115/pmph_imesp/upload/sys_userext_avatar/1706/20170623191553876.png" alt="Profile Image"></span>
          <span>
            <span>成都大学</span>
            <span class="time">3分钟前</span>
          </span>
          <span class="message">
            规划教材-'全国高等学校五年制临床医学专业第九轮规划教材'-'中医学'移除张杰编委职位...
          </span>
        </a>
      </el-dropdown-item>
      <el-dropdown-iterm>
        <a class="message-iterm">
          <span class="message message-all">
            查看全部
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </a>
      </el-dropdown-iterm>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
	export default {
		data() {
			return {
			  messageList:[,,,,],
      }
		},
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    },
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
a.message-iterm{
  font-size: 12px;
  line-height: 1.42;
  color: #5A738E;
  display: block;
  padding: 4px 8px;
  background: #f7f7f7;
  margin: 8px 0;
}
a.message-iterm:hover {
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
}
.image>img {
  border-radius: 2px;
  -webkit-border-radius: 2px;
  float: left;
  margin-right: 10px;
  width: 11%;
}
a .time {
  font-size: 11px;
  font-style: italic;
  font-weight: 700;
  position: absolute;
  right: 35px;
}
.message{
  display: block!important;
}
.message-all{
  text-align: center;
  font-weight: 700;
  padding: 8px 8px;
}

  .message-all{}
</style>

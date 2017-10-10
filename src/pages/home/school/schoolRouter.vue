<template>
	<div class="school_router">
		<el-tabs type="border-card">
			<el-tab-pane label="教师审核">用户管理</el-tab-pane>
			<el-tab-pane label="学校管理员审核">配置管理</el-tab-pane>
		</el-tabs>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {

		}
	}
}
</script>
<style>

</style>

<template>
	<div class="school_router clearfix">
		<ul class="tab clearfix">
			<li v-for="(item, index) in tabs" @click="changeTab(index)" :key="item.id" :class="{'active':currentIndex == index}">
				<router-link :to="{path:item.path}">{{item.name}}</router-link>
			</li>
		</ul>
		<div class="main clearfix">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			currentIndex: 0,
			breadData: '',
			tabs: [
				{
					name: '教师审核',
					path: 'writers'
				},
				{
					name: '学校管理员审核',
					path: 'orgs'
				}
			]
		}
	},
	watch: {
		$route () {
			this.initBreadData()
		}
	},
	created() {
		this.initBreadData()
	},
	methods: {
		changeTab(index) {
			this.currentIndex = index
		},
		/**
		 * 初始化当前路由
		 */
		initBreadData(){
			this.breadData=this.$router.currentRoute.matched;
			// console.log(this.breadData)
			this.breadData.forEach(item => {
				if(item.name == '教师审核'){
					this.currentIndex = 0
				}else {
					this.currentIndex = 1
				}
			})
		}
	}
}
</script>
<style>
	.school_router{
		width: 100%;
		height: 100%;
	}
	.tab{
		width: 100%;
		height: 40px;
		white-space: nowrap;
    position: relative;
    transition: transform .3s;
		background-color: #eef1f6;
		border: 1px solid #d1d9e5;
  }
  .tab li {
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #838fa5;
		position: relative;
		cursor: pointer;
  }
  .tab .active{
		background-color: #fff;
		color: #2a3f54;
		border-bottom: 0;
    border-right-color: #d1d9e5;
	}
	.main{
		width: 100%;
    border: 1px solid rgb(209, 217, 229);
    background: #fff;
		min-height: 100%;
		border-top: 0;
	}
</style>

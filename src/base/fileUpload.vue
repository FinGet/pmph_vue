<template>
	<div>
    <input type="file" @change="change">
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
    methods:{
      change(){
        this.$emit('change',)
      }
    }
	}
</script>

<style scoped>

</style>

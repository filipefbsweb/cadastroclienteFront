<template>
	<div class="loading">
		<q-spinner color="primary" size="3em" :thickness="10" />
	</div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
	name: "AppLoading",
});
</script>

<style scoped>
.loading {
	width: 100%;
	height: 100vh;
	position: fixed;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}
</style>

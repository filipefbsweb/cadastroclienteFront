<template>
	<q-layout>
		<q-page-container>
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: "ScreenClients",
};
</script>
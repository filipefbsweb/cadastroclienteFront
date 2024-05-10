<script setup>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
import AppLoading from "@/components/common/AppLoading.vue";
import { useActiveLoading } from "./stores";
import { useQuasar } from 'quasar'

const loading = useActiveLoading();
const $q = useQuasar()

 $q.dark.set(false)
</script>

<template>
<q-layout>
	<app-loading v-if="loading.stateLoading" />
	<app-header />
	<div class="main q-pa-sm">
		<router-view> </router-view>
	</div>
	<app-footer />
</q-layout>
</template>


<style scoped>
.main {
	width: 100%;
	max-width: 1440px;
	margin: auto;
}
</style>
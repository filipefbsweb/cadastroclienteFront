<script setup>
import { defineComponent } from "vue";
import EditClient from "@/components/forms/Client.vue";

defineComponent({
	name: "ClientsEdit",
});
</script>

<template>
	<div class="q-ml-lg">
		<h1 class="text-h4 text-bold">Edição de cliente</h1>
		<p class="text-body1">
			Altere os campos que deseja e clique em salvar
		</p>
	</div>
	<edit-client :edit="true" />
</template>

<script setup>
import { defineComponent } from "vue";
import AddClient from "@/components/forms/Client.vue";

defineComponent({
	name: "ClientsAdd",
});
</script>

<template>
	<div class="q-ml-lg">
		<h1 class="text-h4 text-bold">Novo Cliente</h1>
		<p class="text-body1">
			Preencha os campos abaixo para adicionar um novo cliente
		</p>
	</div>
	<add-client :edit="false" />
</template>

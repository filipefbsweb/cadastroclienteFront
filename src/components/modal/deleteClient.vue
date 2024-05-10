<script setup>
import { defineComponent, defineProps, defineEmits } from "vue";

defineComponent({
	name: "DeleteClient",
});

const emit = defineEmits(["closeModal", "confirmDelete"]);

const props = defineProps({
	showModal: Boolean,
    nameClient: Object
});
</script>

<template>
	<q-dialog v-model="props.showModal" persistent>
		<q-card>
			<q-card-section class="row items-center">
				<q-avatar icon="warning_amber" color="negative" text-color="white" />
				<span class="q-ml-md"
					>Tem certeza que deseja excluir o cliente <br />
					{{ props.nameClient.name }}
				</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="Excluir" color="negative" @click="emit('confirmDelete', props.nameClient.code)" />
				<q-btn flat label="Cancelar" color="primary" @click="emit('closeModal')" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

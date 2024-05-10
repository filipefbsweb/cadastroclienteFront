<template>
	<q-page-container>
		<div class="row q-mb-lg q-mt-lg text-center">
			<div class="col text-h4">Lista de Cliente</div>
		</div>
		<div class="row q-mb-lg text-right">
			<div class="col">
				<q-btn
					color="primary"
					label="Adicionar cliente"
					@click="$router.push({ name: 'AddClient' })"
				/>
			</div>
		</div>

		<q-table
			v-if="clientsList != '' "
			:rows="clientsList"
			row-key="code"
			:columns="columns"
			:pagination.sync="pagination"
		>
			<template v-slot:body-cell-acoes="props">
				<q-td :props="props">
					<q-btn
						flat
						round
						small
						color="primary"
						icon="edit"
						@dblclick="
							$router.push({ name: 'EditClient', params: { code: props.row.code } })
						"
						virtual-scroll
						:virtual-scroll-item-size="20"
						:virtual-scroll-sticky-size-start="20"
					/>
					<q-btn
						flat
						round
						small
						color="negative"
						icon="delete"
						@click="deleteClient(props.row.code)"
					/>
				</q-td>
			</template>
		</q-table>

		<p class="col text-h5 text-center" v-else>
			No momento, não existe nenhum cliente cadastrado
		</p>
	</q-page-container>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import Clients from "@/services/clients.js";

let clientsService = new Clients();

let clientsList = ref('');
let columns = [
	{ name: "name", required: true, label: "Nome", align: "left", field: "name" },
	{
		name: "address",
		required: true,
		label: "Endereço",
		align: "left",
		field: "address",
	},
	{
		name: "city",
		required: true,
		label: "Cidade",
		align: "left",
		field: "city",
	},
	{
		name: "state",
		required: true,
		label: "Estado",
		align: "left",
		field: "state",
	},
	{ name: "acoes", required: true, label: "Ações", align: "left" },
];
let pagination = {
	rowsPerPage: 10,
};

async function listClients() {
	let res = await clientsService.listClients();
	clientsList.value = res;
}

async function deleteClient(id) {
	await clientsService.deleteClient(id);	
	listClients();
}

onMounted(() => {
	listClients();
});
</script>

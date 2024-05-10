<template>
	<q-page-container>
		<modal-delete-client
			:showModal="varShowModal"
			:nameClient="nameClientModal"
			@closeModal="varShowModal = false"
			@confirmDelete="serviceDeleteClient($event)"
		/>

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
			v-if="clientsList != ''"
			:rows="clientsList"
			row-key="code"
			:columns="columns"
			:pagination.sync="pagination"
			@row-dblclick="editClient"
		>
			<template v-slot:body-cell-acoes="props">
				<q-td :props="props">
					<q-btn
						flat
						round
						small
						color="negative"
						icon="delete"
						@click="deleteClient(props.row)"
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
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import ModalDeleteClient from "@/components/modal/deleteClient.vue";
import Clients from "@/services/clients.js";

const router = useRouter();
let clientsService = new Clients();
let nameClientModal = reactive({});
let varShowModal = ref(false);

let clientsList = ref("");
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
	{ name: "acoes", required: true, label: "Excluir", align: "left" },
];

let pagination = {
	rowsPerPage: 10,
};

async function listClients() {
	let res = await clientsService.listClients();
	clientsList.value = res;
}

async function serviceDeleteClient(id){
	await clientsService.deleteClient(id);
	varShowModal.value = false;
	listClients();
}

function deleteClient(client) {
	nameClientModal = client;
	varShowModal.value = true;	
}

function editClient(evt, row) {
	router.push({ name: "EditClient", params: { code: row.code } });
}

onMounted(() => {
	listClients();
});
</script>

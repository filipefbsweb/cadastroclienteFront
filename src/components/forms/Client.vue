<script setup>
import {
	defineComponent,
	defineProps,
	watch,
	reactive,
	ref,
	onMounted,
	computed,
} from "vue";
import Clients from "@/services/clients.js";
import { useRoute, useRouter } from "vue-router";
import Cep from "@/services/cep.js";
import { listStates } from "@/utils/states.js";

const router = useRouter();
const route = useRoute();
const serviceClients = new Clients();
const functionCep = new Cep();
const states = listStates;

defineComponent({
	name: "FormAddClient",
});

const props = defineProps({
	edit: Boolean,
});

let isEditing = ref(0);
let attachment = ref(null);
let form = reactive([
	{
		name: "",
		cep: "",
		address: "",
		number: "",
		district: "",
		city: "",
		state: "",
	},
]);

watch(
	() => form.cep,
	() => searchCep()
);

async function searchCep() {
	if (form.cep.length === 9 && isEditing.value === 0) {
		let res = await functionCep.searchCep(form.cep);
		form.address = res.logradouro;
		form.district = res.bairro;
		form.city = res.localidade;
		form.state = states.find(({ uf }) => uf === res.uf);
	}
}

function submitForm(e) {
	e.preventDefault();
	const data = new FormData();
	data.append("name", form.name);
	data.append("cep", form.cep);
	data.append("address", form.address);
	data.append("number", form.number);
	data.append("district", form.district);
	data.append("city", form.city);
	data.append("state", form.state.uf);
	data.append("attachment", null);
	saveForm(data);
}

async function saveForm(value) {
	let edit = computed(() => props.edit);
	edit.value && (await serviceClients.updateClient(value, route.params.code));
	!edit.value && (await serviceClients.addClient(value));
	router.push({ name: "ListClients" });
}

async function searchClient() {
	isEditing.value = 1;

	let res = await serviceClients.getClient(route.params.code);
	res = res.reduce((acc, cur) => Object.assign(acc, cur));
	form.name = res.name;
	form.address = res.address;
	form.number = res.number;
	form.district = res.district;
	form.city = res.city;
	form.state = states.find(({ uf }) => uf === res.state);
	form.cep = res.cep;

	isEditing.value = 0;
}

onMounted(() => {
	props.edit && searchClient();
});
</script>

<template>
	<q-page padding>
		<q-form @submit="submitForm" class="text-center">
			<div class="row">
				<div class="col-12">
					<q-input
						filled
						standout
						v-model="form.name"
						label="Nome"
						:rules="[
							(val) => (val && val.length > 0) || 'Necessário informar o nome',
						]"
						class="q-mb-md"
					/>
				</div>

				<div class="col-xs-12 col-md-6">
					<q-input
						filled
						standout
						v-model="form.cep"
						label="CEP"
						:mask="'XXXXX-XXX'"
						:rules="[
							(val) => (val && val.length === 9) || 'O campo CEP é obrigatório',
						]"
						class="q-mb-md"
					/>
				</div>
				<div class="col-12">
					<q-input
						filled
						standout
						v-model="form.address"
						label="Endereço"
						:rules="[
							(val) =>
								(val && val.length > 0) || 'Você precisa informar o endereço',
						]"
						class="q-mb-md"
					/>
				</div>
			</div>
			<div class="row justify-between">
				<div class="col-xs-12 col-md-3">
					<q-input
						filled
						standout
						v-model="form.number"
						label="Número"
						:rules="[(val) => (val && val.length != '') || 'Qual o número?']"
						class="q-mb-md"
					/>
				</div>
				<div class="col-xs-12 col-md-8">
					<q-input
						filled
						standout
						v-model="form.district"
						label="Bairro"
						:rules="[
							(val) =>
								(val && val.length > 0) || 'Por favor, nos fale qual o bairro',
						]"
						class="q-mb-md"
					/>
				</div>
			</div>
			<div class="row justify-between">
				<div class="col-xs-12 col-md-6">
					<q-input
						filled
						standout
						v-model="form.city"
						label="Cidade"
						:rules="[
							(val) => (val && val.length > 0) || 'Está faltando a cidade',
						]"
						class="q-mb-md"
					/>
				</div>
				<div class="col-xs-12 col-md-5">
					<q-select
						filled
						standout
						v-model="form.state"
						label="Estado"
						:options="states"
						option-label="nome"
						option-uf="sigla"
						:rules="[
							(val) => (val && val != []) || 'Por favor, selecione o estado',
						]"
						class="q-mb-md"
					/>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-6 q-mb-md">
					<q-file
						rounded
						outlined
						bottom-slots
						v-model="attachment"
						label="Clique para enviar seu PDF"
						counter
						max-files="1"
						accept=".pdf"
					>
						<template v-slot:before>
							<q-icon name="attachment" />
						</template>

						<template v-slot:append>
							<q-icon
								v-if="attachment !== null"
								name="close"
								@click.stop.prevent="attachment = null"
								class="cursor-pointer"
							/>
							<q-icon name="search" @click.stop.prevent />
						</template>
					</q-file>
				</div>
			</div>

			<div class="row">
				<q-btn label="Salvar" type="submit" color="primary" />
				<q-btn
					label="Cancelar"
					color="negative q-ml-md"
					@click="router.push({ name: 'ListClients' })"
				/>
			</div>
		</q-form>
	</q-page>
</template>

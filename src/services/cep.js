import axios from "axios";
import { useActiveLoading } from "@/stores";
const client = axios.create();
let activeLoading = useActiveLoading();


export default class Cep {
    async searchCep(search) {
        activeLoading.changeLoading(true);
        try {
            const resp = await client.get(`https://viacep.com.br/ws/${search}/json`);
            return resp.data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }
}



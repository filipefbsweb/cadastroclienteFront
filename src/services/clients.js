import axios from "axios";
import { useActiveLoading } from "@/stores";
const client = axios.create();
const activeLoading = useActiveLoading();

export default class Clients {
    async listClients(search) {
        activeLoading.changeLoading(true);
        try {
            const { data } = await client.get(`${import.meta.env.VITE_API_BASE}/`);
            return data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }

    async getClient(code) {
        activeLoading.changeLoading(true);
        try {
            const { data } = await client.get(`${import.meta.env.VITE_API_BASE}/${code}`);
            return data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }

    async addClient(value) {
        activeLoading.changeLoading(true);
        try {
            const resp = await client.post(`${import.meta.env.VITE_API_BASE}/addClient`, value);
            return resp.data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }

    async updateClient(value, id) {
        activeLoading.changeLoading(true);
        try {
            const resp = await client.put(`${import.meta.env.VITE_API_BASE}/updateClient/${id}`, value);
            return resp.data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }

    async deleteClient(id) {
        activeLoading.changeLoading(true);
        try {
            const resp = await client.delete(`${import.meta.env.VITE_API_BASE}/deleteClient/${id}`);
            return resp.data;
        } catch (error) {
            console.log(error)
        } finally {
            activeLoading.changeLoading(false);
        }
    }
}



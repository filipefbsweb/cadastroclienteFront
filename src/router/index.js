import { createRouter, createWebHistory } from "vue-router";

import Clients from "@/views/clients/_Clients.vue";

const routes = [
    {
        path: "/",
        name: "Clients",
        component: Clients,
        redirect: "/clientes",
        children: [
            {
                path: "/clientes",
                name: "ListClients",
                component: () => import("@/views/clients/ClientsList.vue"),
            },
            {
                path: "/clientes/adicionar",
                name: "AddClient",
                component: () => import("@/views/clients/ClientsAdd.vue"),
            },
            {
                path: "/clientes/editar/:code",
                name: "EditClient",
                component: () => import("@/views/clients/ClientsEdit.vue"),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { defineStore } from "pinia";

const useActiveLoading = defineStore ('loading', {
    state: () => ({
        active: false
    }),

    actions: {
        changeLoading(payload){
            this.active = payload
        }
    },

    getters: {
        stateLoading: (state) => state.active
    }
})

export default useActiveLoading
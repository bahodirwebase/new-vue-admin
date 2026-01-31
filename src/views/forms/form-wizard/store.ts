import { defineStore } from "pinia";
import { ref } from "vue";

export const useWizardStore = defineStore('wizard', () => {
    // Wizard selection
    const selectedWizard = ref('comprehensive')
    const loading = ref(false)

    return {
        selectedWizard,
        loading
    }
})
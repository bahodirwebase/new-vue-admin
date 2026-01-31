<script lang="ts" setup>
import { useWizardStore } from '../store';
const wizardStore = useWizardStore();
</script>
<template>
    <n-card title="Choose Wizard Type">
        <n-space vertical :size="16">
            <n-radio-group v-model:value="wizardStore.selectedWizard" size="large">
                <n-space vertical :size="12">
                    <n-radio value="simple">
                        <div>
                            <div style="font-weight: 600">Simple Registration (3 Steps)</div>
                            <div style="font-size: 12px; color: var(--text-secondary)">
                                Basic user registration with name, email, and preferences
                            </div>
                        </div>
                    </n-radio>
                    <n-radio value="medium">
                        <div>
                            <div style="font-weight: 600">Job Application (4 Steps)</div>
                            <div style="font-size: 12px; color: var(--text-secondary)">
                                Complete job application form with professional details
                            </div>
                        </div>
                    </n-radio>
                    <n-radio value="comprehensive">
                        <div>
                            <div style="font-weight: 600">Comprehensive Application (5 Steps)</div>
                            <div style="font-size: 12px; color: var(--text-secondary)">
                                Full application with all details and document upload
                            </div>
                        </div>
                    </n-radio>
                </n-space>
            </n-radio-group>
        </n-space>
    </n-card>
</template>
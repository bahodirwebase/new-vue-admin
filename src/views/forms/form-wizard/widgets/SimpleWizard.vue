<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useWizardStore } from '../store'
import { useMessage } from 'naive-ui';
import { CheckmarkOutline, ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import { SIMPLE_ACCOUNT_RULES, SIMPLE_PREFERENCES_RULES, SIMPLE_PROFILE_RULES } from '../rules/simple';
import { SIMPLE_COUNTRY_OPTIONS } from '../constants';
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
const wizardStore = useWizardStore()
const message = useMessage()

const simpleAccountFormRef = ref()
const simpleProfileFormRef = ref()
const simplePreferencesFormRef = ref()

// Simple wizard data
const simpleWizardData = reactive({
    account: {
        username: '',
        email: '',
        password: ''
    },
    profile: {
        fullName: '',
        age: null,
        country: ''
    },
    preferences: {
        interests: [],
        newsletter: false,
        theme: ''
    }
})

// Simple wizard state
const simpleCurrentStep = ref(1)
const simpleStepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Simple wizard methods
const simpleNextStep = async () => {
    const isValid = await validateSimpleStep()
    if (isValid) {
        if (simpleCurrentStep.value < 3) {
            simpleCurrentStep.value++
            if (simpleCurrentStep.value === 3) {
                simpleStepStatus.value = 'finish'
            }
        }
    } else {
        message.error('Please fix the validation errors before proceeding')
    }
}

const simplePreviousStep = () => {
    if (simpleCurrentStep.value > 1) {
        simpleCurrentStep.value--
        simpleStepStatus.value = 'process'
    }
}

const submitSimpleWizard = async () => {
    wizardStore.loading = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        message.success('Registration completed successfully!')
        // TODO: Make API call to submit registration
        // await submitRegistration(simpleWizardData)

        setTimeout(() => {
            resetSimpleWizard()
        }, 1500)
    } catch (error) {
        message.error('Failed to submit registration')
        simpleStepStatus.value = 'error'
    } finally {
        wizardStore.loading = false
    }
}

const resetSimpleWizard = () => {
    simpleCurrentStep.value = 1
    simpleStepStatus.value = 'process'

    Object.assign(simpleWizardData.account, {
        username: '',
        email: '',
        password: ''
    })
    Object.assign(simpleWizardData.profile, {
        fullName: '',
        age: null,
        country: ''
    })
    Object.assign(simpleWizardData.preferences, {
        interests: [],
        newsletter: false,
        theme: ''
    })
}

const validateSimpleStep = () => {
    const formRefs = {
        1: simpleAccountFormRef,
        2: simpleProfileFormRef,
        3: simplePreferencesFormRef
    }

    return new Promise((resolve) => {
        const formRef = formRefs[simpleCurrentStep.value as keyof typeof formRefs]
        if (formRef.value) {
            formRef.value.validate((errors: any) => {
                resolve(!errors)
            })
        } else {
            resolve(true)
        }
    })
}
</script>
<template>
    <n-card v-if="wizardStore.selectedWizard === 'simple'" title="Simple Registration Wizard">
        <n-steps :current="simpleCurrentStep" :status="simpleStepStatus" size="small" :vertical="isMobile">
            <n-step title="Account" description="Basic info" />
            <n-step title="Profile" description="Personal details" />
            <n-step title="Preferences" description="Settings" />
        </n-steps>

        <div class="wizard-content">
            <!-- Simple Step 1: Account -->
            <div v-if="simpleCurrentStep === 1" class="step-content">
                <h3>Create Account</h3>
                <n-form ref="simpleAccountFormRef" :model="simpleWizardData.account" :rules="SIMPLE_ACCOUNT_RULES"
                    label-placement="left" label-width="100">
                    <n-form-item label="Username" path="username">
                        <n-input v-model:value="simpleWizardData.account.username" placeholder="Choose a username" />
                    </n-form-item>
                    <n-form-item label="Email" path="email">
                        <n-input v-model:value="simpleWizardData.account.email" placeholder="Enter your email" />
                    </n-form-item>
                    <n-form-item label="Password" path="password">
                        <n-input v-model:value="simpleWizardData.account.password" type="password"
                            placeholder="Create a password" show-password-on="click" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Simple Step 2: Profile -->
            <div v-if="simpleCurrentStep === 2" class="step-content">
                <h3>Profile Information</h3>
                <n-form ref="simpleProfileFormRef" :model="simpleWizardData.profile" :rules="SIMPLE_PROFILE_RULES"
                    label-placement="left" label-width="100">
                    <n-form-item label="Full Name" path="fullName">
                        <n-input v-model:value="simpleWizardData.profile.fullName" placeholder="Enter your full name" />
                    </n-form-item>
                    <n-form-item label="Age" path="age">
                        <n-input-number v-model:value="simpleWizardData.profile.age" placeholder="Your age" :min="18"
                            :max="100" />
                    </n-form-item>
                    <n-form-item label="Country" path="country">
                        <n-select v-model:value="simpleWizardData.profile.country" placeholder="Select your country"
                            :options="SIMPLE_COUNTRY_OPTIONS" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Simple Step 3: Preferences -->
            <div v-if="simpleCurrentStep === 3" class="step-content">
                <h3>Preferences</h3>
                <n-form ref="simplePreferencesFormRef" :model="simpleWizardData.preferences"
                    :rules="SIMPLE_PREFERENCES_RULES" label-placement="left" label-width="100">
                    <n-form-item label="Interests" path="interests">
                        <n-checkbox-group v-model:value="simpleWizardData.preferences.interests">
                            <n-space>
                                <n-checkbox value="sports">Sports</n-checkbox>
                                <n-checkbox value="music">Music</n-checkbox>
                                <n-checkbox value="movies">Movies</n-checkbox>
                                <n-checkbox value="reading">Reading</n-checkbox>
                            </n-space>
                        </n-checkbox-group>
                    </n-form-item>
                    <n-form-item label="Newsletter" path="newsletter">
                        <n-switch v-model:value="simpleWizardData.preferences.newsletter">
                            <template #checked>Subscribe</template>
                            <template #unchecked>Don't subscribe</template>
                        </n-switch>
                    </n-form-item>
                    <n-form-item label="Theme" path="theme">
                        <n-radio-group v-model:value="simpleWizardData.preferences.theme">
                            <n-radio value="light">Light</n-radio>
                            <n-radio value="dark">Dark</n-radio>
                            <n-radio value="auto">Auto</n-radio>
                        </n-radio-group>
                    </n-form-item>
                </n-form>
            </div>
        </div>

        <!-- Simple Wizard Navigation -->
        <div class="wizard-navigation">
            <n-space justify="space-between">
                <n-button v-if="simpleCurrentStep > 1" @click="simplePreviousStep">
                    <template #icon>
                        <n-icon :component="ChevronBackOutline" />
                    </template>
                    Previous
                </n-button>
                <div v-else></div>

                <n-space>
                    <n-button v-if="simpleCurrentStep < 3" type="primary" @click="simpleNextStep">
                        Next
                        <template #icon>
                            <n-icon :component="ChevronForwardOutline" />
                        </template>
                    </n-button>
                    <n-button v-if="simpleCurrentStep === 3" type="primary" @click="submitSimpleWizard">
                        <template #icon>
                            <n-icon :component="CheckmarkOutline" />
                        </template>
                        Register
                    </n-button>
                </n-space>
            </n-space>
        </div>
    </n-card>
</template>
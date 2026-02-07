<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import {
    ChevronBackOutline,
    ChevronForwardOutline,
    CheckmarkOutline
} from '@vicons/ionicons5'
import { useWizardStore } from '../store';
import { useMessage } from 'naive-ui'
import { COUNTRY_OPTIONS, DEPARTMENT_OPTIONS, EXPERIENCE_OPTIONS, SALARY_MARKS, STEPS } from '../constants';
import { ADDITIONAL_RULES, ADDRESS_RULES, PERSONAL_RULES, PROFESSIONAL_RULES } from '../rules/comprehensive';
import { useBreakpoints } from '@/composables/useBreakpoints'

const wizardStore = useWizardStore();
const message = useMessage()
const { isMobile } = useBreakpoints()

// Form refs
const personalFormRef = ref()
const addressFormRef = ref()
const professionalFormRef = ref()
const additionalFormRef = ref()

// Wizard state
const currentStep = ref(1)
const stepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Wizard data
const wizardData = reactive({
    personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: null,
        gender: ''
    },
    address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        addressType: ''
    },
    professional: {
        company: '',
        jobTitle: '',
        department: '',
        experience: '',
        skills: [],
        salary: 50000
    },
    additional: {
        bio: '',
        hobbies: [],
        languages: [],
        workPreference: '',
        startDate: null,
        resume: []
    }
})

// Methods
const validateCurrentStep = () => {
    const formRefs = {
        1: personalFormRef,
        2: addressFormRef,
        3: professionalFormRef,
        4: additionalFormRef
    }

    return new Promise((resolve) => {
        const formRef = formRefs[currentStep.value as keyof typeof formRefs]
        if (formRef.value) {
            formRef.value.validate((errors: any) => {
                resolve(!errors)
            })
        } else {
            resolve(true)
        }
    })
}

const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
        if (currentStep.value < STEPS.length) {
            currentStep.value++
            if (currentStep.value === STEPS.length) {
                stepStatus.value = 'finish'
            }
        }
    } else {
        message.error('Please fix the validation errors before proceeding')
    }
}

const previousStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--
        stepStatus.value = 'process'
    }
}

const submitWizard = async () => {
    wizardStore.loading = true
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        message.success('Application submitted successfully!')
        // TODO: Make API call to submit wizard data
        // await submitApplication(wizardData)

        // Reset wizard after successful submission
        setTimeout(() => {
            resetWizard()
        }, 2000)
    } catch (error) {
        message.error('Failed to submit application')
        stepStatus.value = 'error'
    } finally {
        wizardStore.loading = false
    }
}
const resetWizard = () => {
    currentStep.value = 1
    stepStatus.value = 'process'

    // Reset all form data
    Object.assign(wizardData.personal, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: null,
        gender: ''
    })
    Object.assign(wizardData.address, {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        addressType: ''
    })
    Object.assign(wizardData.professional, {
        company: '',
        jobTitle: '',
        department: '',
        experience: '',
        skills: [],
        salary: 50000
    })
    Object.assign(wizardData.additional, {
        bio: '',
        hobbies: [],
        languages: [],
        workPreference: '',
        startDate: null,
        resume: []
    })
}
// Computed
const progressPercentage = computed(() => {
  return Math.round((currentStep.value / STEPS.length) * 100)
})

const formatDate = (date: number | null) => {
    if (!date) return 'Not specified'
    return new Date(date).toLocaleDateString()
}

const getCountryName = (countryCode: string) => {
    const country = COUNTRY_OPTIONS.find(c => c.value === countryCode)
    return country ? country.label : 'Not specified'
}
</script>
<template>
    <n-card v-if="wizardStore.selectedWizard === 'comprehensive'" title="Comprehensive Application Wizard">
        <n-steps :current="currentStep" :status="stepStatus" size="medium" :vertical="isMobile">
            <n-step v-for="(step, index) in STEPS" :key="index" :title="step.title" :description="step.description" />
        </n-steps>

        <div class="wizard-content">
            <div v-if="currentStep === 1" class="step-content">
                <h3>Personal Information</h3>
                <n-form ref="personalFormRef" :model="wizardData.personal" :rules="PERSONAL_RULES"
                    label-placement="left" label-width="120">
                    <n-grid cols="1 md:2" :x-gap="16" responsive="screen">
                        <n-grid-item>
                            <n-form-item label="First Name" path="firstName">
                                <n-input v-model:value="wizardData.personal.firstName" placeholder="Enter first name" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label="Last Name" path="lastName">
                                <n-input v-model:value="wizardData.personal.lastName" placeholder="Enter last name" />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>

                    <n-form-item label="Email" path="email">
                        <n-input v-model:value="wizardData.personal.email" placeholder="Enter email address" />
                    </n-form-item>

                    <n-form-item label="Phone" path="phone">
                        <n-input v-model:value="wizardData.personal.phone" placeholder="Enter phone number" />
                    </n-form-item>

                    <n-form-item label="Date of Birth" path="dob">
                        <n-date-picker v-model:value="wizardData.personal.dob" type="date"
                            placeholder="Select birth date" />
                    </n-form-item>

                    <n-form-item label="Gender" path="gender">
                        <n-radio-group v-model:value="wizardData.personal.gender">
                            <n-radio value="male">Male</n-radio>
                            <n-radio value="female">Female</n-radio>
                            <n-radio value="other">Other</n-radio>
                        </n-radio-group>
                    </n-form-item>
                </n-form>
            </div>

            <!-- Step 2: Address Information -->
            <div v-if="currentStep === 2" class="step-content">
                <h3>Address Information</h3>
                <n-form ref="addressFormRef" :model="wizardData.address" :rules="ADDRESS_RULES" label-placement="left"
                    label-width="120">
                    <n-form-item label="Street Address" path="street">
                        <n-input v-model:value="wizardData.address.street" placeholder="Enter street address" />
                    </n-form-item>

                    <n-grid :cols="2" :x-gap="16">
                        <n-grid-item>
                            <n-form-item label="City" path="city">
                                <n-input v-model:value="wizardData.address.city" placeholder="Enter city" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label="State/Province" path="state">
                                <n-input v-model:value="wizardData.address.state" placeholder="Enter state/province" />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>

                    <n-grid :cols="2" :x-gap="16">
                        <n-grid-item>
                            <n-form-item label="Postal Code" path="postalCode">
                                <n-input v-model:value="wizardData.address.postalCode"
                                    placeholder="Enter postal code" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label="Country" path="country">
                                <n-select v-model:value="wizardData.address.country" placeholder="Select country"
                                    :options="COUNTRY_OPTIONS" />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>

                    <n-form-item label="Address Type" path="addressType">
                        <n-radio-group v-model:value="wizardData.address.addressType">
                            <n-radio value="home">Home</n-radio>
                            <n-radio value="work">Work</n-radio>
                            <n-radio value="other">Other</n-radio>
                        </n-radio-group>
                    </n-form-item>
                </n-form>
            </div>

            <!-- Step 3: Professional Information -->
            <div v-if="currentStep === 3" class="step-content">
                <h3>Professional Information</h3>
                <n-form ref="professionalFormRef" :model="wizardData.professional" :rules="PROFESSIONAL_RULES"
                    label-placement="left" label-width="120">
                    <n-form-item label="Company" path="company">
                        <n-input v-model:value="wizardData.professional.company" placeholder="Enter company name" />
                    </n-form-item>

                    <n-form-item label="Job Title" path="jobTitle">
                        <n-input v-model:value="wizardData.professional.jobTitle" placeholder="Enter job title" />
                    </n-form-item>

                    <n-form-item label="Department" path="department">
                        <n-select v-model:value="wizardData.professional.department" placeholder="Select department"
                            :options="DEPARTMENT_OPTIONS" />
                    </n-form-item>

                    <n-form-item label="Experience" path="experience">
                        <n-select v-model:value="wizardData.professional.experience"
                            placeholder="Select years of experience" :options="EXPERIENCE_OPTIONS" />
                    </n-form-item>

                    <n-form-item label="Skills" path="skills">
                        <n-checkbox-group v-model:value="wizardData.professional.skills">
                            <n-space>
                                <n-checkbox value="javascript">JavaScript</n-checkbox>
                                <n-checkbox value="python">Python</n-checkbox>
                                <n-checkbox value="java">Java</n-checkbox>
                                <n-checkbox value="csharp">C#</n-checkbox>
                                <n-checkbox value="react">React</n-checkbox>
                                <n-checkbox value="vue">Vue.js</n-checkbox>
                                <n-checkbox value="angular">Angular</n-checkbox>
                                <n-checkbox value="nodejs">Node.js</n-checkbox>
                            </n-space>
                        </n-checkbox-group>
                    </n-form-item>

                    <n-form-item label="Salary Expectation" path="salary">
                        <n-slider v-model:value="wizardData.professional.salary" :min="30000" :max="200000" :step="5000"
                            :marks="SALARY_MARKS" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Step 4: Additional Information -->
            <div v-if="currentStep === 4" class="step-content">
                <h3>Additional Information</h3>
                <n-form ref="additionalFormRef" :model="wizardData.additional" :rules="ADDITIONAL_RULES"
                    label-placement="left" label-width="120">
                    <n-form-item label="Bio" path="bio">
                        <n-input v-model:value="wizardData.additional.bio" type="textarea"
                            placeholder="Tell us about yourself" :rows="4" />
                    </n-form-item>

                    <n-form-item label="Hobbies" path="hobbies">
                        <n-dynamic-tags v-model:value="wizardData.additional.hobbies" />
                    </n-form-item>

                    <n-form-item label="Languages" path="languages">
                        <n-checkbox-group v-model:value="wizardData.additional.languages">
                            <n-space>
                                <n-checkbox value="english">English</n-checkbox>
                                <n-checkbox value="spanish">Spanish</n-checkbox>
                                <n-checkbox value="french">French</n-checkbox>
                                <n-checkbox value="german">German</n-checkbox>
                                <n-checkbox value="chinese">Chinese</n-checkbox>
                                <n-checkbox value="japanese">Japanese</n-checkbox>
                            </n-space>
                        </n-checkbox-group>
                    </n-form-item>

                    <n-form-item label="Work Preference" path="workPreference">
                        <n-radio-group v-model:value="wizardData.additional.workPreference">
                            <n-radio value="remote">Remote</n-radio>
                            <n-radio value="office">Office</n-radio>
                            <n-radio value="hybrid">Hybrid</n-radio>
                        </n-radio-group>
                    </n-form-item>

                    <n-form-item label="Available Start Date" path="startDate">
                        <n-date-picker v-model:value="wizardData.additional.startDate" type="date"
                            placeholder="Select available start date" />
                    </n-form-item>

                    <n-form-item label="Resume" path="resume">
                        <n-upload v-model:file-list="wizardData.additional.resume" :max="1" accept=".pdf,.doc,.docx">
                            <n-button>Upload Resume</n-button>
                        </n-upload>
                    </n-form-item>
                </n-form>
            </div>

            <!-- Step 5: Review & Submit -->
            <div v-if="currentStep === 5" class="step-content">
                <h3>Review Your Information</h3>
                <n-space vertical :size="16">
                    <n-collapse>
                        <n-collapse-item title="Personal Information" name="personal">
                            <n-descriptions :column="2" bordered>
                                <n-descriptions-item label="Name">
                                    {{ wizardData.personal.firstName }} {{ wizardData.personal.lastName }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Email">
                                    {{ wizardData.personal.email }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Phone">
                                    {{ wizardData.personal.phone }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Date of Birth">
                                    {{ formatDate(wizardData.personal.dob) }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Gender">
                                    {{ wizardData.personal.gender }}
                                </n-descriptions-item>
                            </n-descriptions>
                        </n-collapse-item>

                        <n-collapse-item title="Address Information" name="address">
                            <n-descriptions :column="2" bordered>
                                <n-descriptions-item label="Street">
                                    {{ wizardData.address.street }}
                                </n-descriptions-item>
                                <n-descriptions-item label="City">
                                    {{ wizardData.address.city }}
                                </n-descriptions-item>
                                <n-descriptions-item label="State">
                                    {{ wizardData.address.state }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Postal Code">
                                    {{ wizardData.address.postalCode }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Country">
                                    {{ getCountryName(wizardData.address.country) }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Address Type">
                                    {{ wizardData.address.addressType }}
                                </n-descriptions-item>
                            </n-descriptions>
                        </n-collapse-item>

                        <n-collapse-item title="Professional Information" name="professional">
                            <n-descriptions :column="2" bordered>
                                <n-descriptions-item label="Company">
                                    {{ wizardData.professional.company }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Job Title">
                                    {{ wizardData.professional.jobTitle }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Department">
                                    {{ wizardData.professional.department }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Experience">
                                    {{ wizardData.professional.experience }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Skills">
                                    {{ wizardData.professional.skills.join(', ') }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Salary Expectation">
                                    ${{ wizardData.professional.salary.toLocaleString() }}
                                </n-descriptions-item>
                            </n-descriptions>
                        </n-collapse-item>

                        <n-collapse-item title="Additional Information" name="additional">
                            <n-descriptions :column="1" bordered>
                                <n-descriptions-item label="Bio">
                                    {{ wizardData.additional.bio }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Hobbies">
                                    {{ wizardData.additional.hobbies.join(', ') }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Languages">
                                    {{ wizardData.additional.languages.join(', ') }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Work Preference">
                                    {{ wizardData.additional.workPreference }}
                                </n-descriptions-item>
                                <n-descriptions-item label="Available Start Date">
                                    {{ formatDate(wizardData.additional.startDate) }}
                                </n-descriptions-item>
                            </n-descriptions>
                        </n-collapse-item>
                    </n-collapse>

                    <n-alert type="info" title="Final Step">
                        Please review all your information before submitting. You can go back to any step to make
                        changes.
                    </n-alert>
                </n-space>
            </div>
        </div>

        <!-- Wizard Navigation -->
        <div class="wizard-navigation">
            <n-space justify="space-between">
                <n-button v-if="currentStep > 1" @click="previousStep" :disabled="wizardStore.loading">
                    <template #icon>
                        <n-icon :component="ChevronBackOutline" />
                    </template>
                    Previous
                </n-button>

                <div v-else></div>

                <n-space>
                    <n-button v-if="currentStep < 5" type="primary" @click="nextStep" :loading="wizardStore.loading">
                        Next
                        <template #icon>
                            <n-icon :component="ChevronForwardOutline" />
                        </template>
                    </n-button>

                    <n-button v-if="currentStep === 5" type="primary" @click="submitWizard"
                        :loading="wizardStore.loading">
                        <template #icon>
                            <n-icon :component="CheckmarkOutline" />
                        </template>
                        Submit Application
                    </n-button>
                </n-space>
            </n-space>
        </div>
    </n-card>
    <!-- Progress Overview -->
    <n-card title="Progress Overview">
        <n-progress type="line" :percentage="progressPercentage" :status="stepStatus" :show-indicator="true" />
        <n-p style="margin-top: 8px; color: var(--text-secondary)">
            Step {{ currentStep }} of {{ STEPS.length }} - {{ progressPercentage }}% Complete
        </n-p>
    </n-card>

    <!-- Form Data Preview -->
    <n-card title="Complete Form Data">
        <n-code :code="JSON.stringify(wizardData, null, 2)" language="json" />
    </n-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useWizardStore } from '../store';
import { useMessage } from 'naive-ui';
import { CheckmarkOutline, ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import { MEDIUM_EXPERIENCE_RULES, MEDIUM_PERSONAL_RULES, MEDIUM_SKILLS_RULES } from '../rules/medium';
import { EDUCATION_OPTIONS, EXPERIENCE_OPTIONS, MEDIUM_SALARY_MARKS } from '../constants';
import { useBreakpoints } from '@/composables/useBreakpoints'


const wizardStore = useWizardStore();
const message = useMessage();
const { isMobile } = useBreakpoints();

const mediumPersonalFormRef = ref()
const mediumExperienceFormRef = ref()
const mediumSkillsFormRef = ref()

// Medium wizard state
const mediumCurrentStep = ref(1)
const mediumStepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Medium wizard data
const mediumWizardData = reactive({
    personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
    },
    experience: {
        currentCompany: '',
        jobTitle: '',
        yearsExperience: '',
        previousCompany: '',
        education: ''
    },
    skills: {
        languages: [],
        frameworks: [],
        experienceLevel: '',
        salary: 75000
    }
})

// Medium wizard methods
const mediumNextStep = async () => {
    const isValid = await validateMediumStep()
    if (isValid) {
        if (mediumCurrentStep.value < 4) {
            mediumCurrentStep.value++
            if (mediumCurrentStep.value === 4) {
                mediumStepStatus.value = 'finish'
            }
        }
    } else {
        message.error('Please fix the validation errors before proceeding')
    }
}

const mediumPreviousStep = () => {
    if (mediumCurrentStep.value > 1) {
        mediumCurrentStep.value--
        mediumStepStatus.value = 'process'
    }
}

const submitMediumWizard = async () => {
    wizardStore.loading = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        message.success('Job application submitted successfully!')
        console.log('Medium wizard data:', mediumWizardData)

        setTimeout(() => {
            resetMediumWizard()
        }, 1500)
    } catch (error) {
        message.error('Failed to submit application')
        mediumStepStatus.value = 'error'
    } finally {
        wizardStore.loading = false
    }
}
const validateMediumStep = () => {
    const formRefs = {
        1: mediumPersonalFormRef,
        2: mediumExperienceFormRef,
        3: mediumSkillsFormRef
    }

    return new Promise((resolve) => {
        const formRef = formRefs[mediumCurrentStep.value as keyof typeof formRefs]
        if (formRef.value) {
            formRef.value.validate((errors: any) => {
                resolve(!errors)
            })
        } else {
            resolve(true)
        }
    })
}
const resetMediumWizard = () => {
    mediumCurrentStep.value = 1
    mediumStepStatus.value = 'process'

    Object.assign(mediumWizardData.personal, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
    })
    Object.assign(mediumWizardData.experience, {
        currentCompany: '',
        jobTitle: '',
        yearsExperience: '',
        previousCompany: '',
        education: ''
    })
    Object.assign(mediumWizardData.skills, {
        languages: [],
        frameworks: [],
        experienceLevel: '',
        salary: 75000
    })
}
</script>
<template>
    <n-card v-if="wizardStore.selectedWizard === 'medium'" title="Job Application Wizard">
        <n-steps :current="mediumCurrentStep" :status="mediumStepStatus" size="medium" :vertical="isMobile">
            <n-step title="Personal" description="Basic information" />
            <n-step title="Experience" description="Work background" />
            <n-step title="Skills" description="Technical skills" />
            <n-step title="Review" description="Review application" />
        </n-steps>

        <div class="wizard-content">
            <!-- Medium Step 1: Personal -->
            <div v-if="mediumCurrentStep === 1" class="step-content">
                <h3>Personal Information</h3>
                <n-form ref="mediumPersonalFormRef" :model="mediumWizardData.personal" :rules="MEDIUM_PERSONAL_RULES"
                    label-placement="left" label-width="120">
                    <n-grid cols="1 md:2" :x-gap="16" responsive="screen">
                        <n-grid-item>
                            <n-form-item label="First Name" path="firstName">
                                <n-input v-model:value="mediumWizardData.personal.firstName" placeholder="First name" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label="Last Name" path="lastName">
                                <n-input v-model:value="mediumWizardData.personal.lastName" placeholder="Last name" />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>

                    <n-form-item label="Email" path="email">
                        <n-input v-model:value="mediumWizardData.personal.email" placeholder="Email address" />
                    </n-form-item>

                    <n-form-item label="Phone" path="phone">
                        <n-input v-model:value="mediumWizardData.personal.phone" placeholder="Phone number" />
                    </n-form-item>

                    <n-form-item label="Location" path="location">
                        <n-input v-model:value="mediumWizardData.personal.location" placeholder="City, Country" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Medium Step 2: Experience -->
            <div v-if="mediumCurrentStep === 2" class="step-content">
                <h3>Work Experience</h3>
                <n-form ref="mediumExperienceFormRef" :model="mediumWizardData.experience"
                    :rules="MEDIUM_EXPERIENCE_RULES" label-placement="left" label-width="120">
                    <n-form-item label="Current Company" path="currentCompany">
                        <n-input v-model:value="mediumWizardData.experience.currentCompany"
                            placeholder="Current company" />
                    </n-form-item>

                    <n-form-item label="Job Title" path="jobTitle">
                        <n-input v-model:value="mediumWizardData.experience.jobTitle" placeholder="Current job title" />
                    </n-form-item>

                    <n-form-item label="Years of Experience" path="yearsExperience">
                        <n-select v-model:value="mediumWizardData.experience.yearsExperience"
                            placeholder="Select experience" :options="EXPERIENCE_OPTIONS" />
                    </n-form-item>

                    <n-form-item label="Previous Company" path="previousCompany">
                        <n-input v-model:value="mediumWizardData.experience.previousCompany"
                            placeholder="Previous company (optional)" />
                    </n-form-item>

                    <n-form-item label="Education" path="education">
                        <n-select v-model:value="mediumWizardData.experience.education" placeholder="Highest education"
                            :options="EDUCATION_OPTIONS" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Medium Step 3: Skills -->
            <div v-if="mediumCurrentStep === 3" class="step-content">
                <h3>Technical Skills</h3>
                <n-form ref="mediumSkillsFormRef" :model="mediumWizardData.skills" :rules="MEDIUM_SKILLS_RULES"
                    label-placement="left" label-width="120">
                    <n-form-item label="Programming Languages" path="languages">
                        <n-checkbox-group v-model:value="mediumWizardData.skills.languages">
                            <n-space>
                                <n-checkbox value="javascript">JavaScript</n-checkbox>
                                <n-checkbox value="python">Python</n-checkbox>
                                <n-checkbox value="java">Java</n-checkbox>
                                <n-checkbox value="csharp">C#</n-checkbox>
                                <n-checkbox value="php">PHP</n-checkbox>
                            </n-space>
                        </n-checkbox-group>
                    </n-form-item>

                    <n-form-item label="Frameworks" path="frameworks">
                        <n-checkbox-group v-model:value="mediumWizardData.skills.frameworks">
                            <n-space>
                                <n-checkbox value="react">React</n-checkbox>
                                <n-checkbox value="vue">Vue.js</n-checkbox>
                                <n-checkbox value="angular">Angular</n-checkbox>
                                <n-checkbox value="django">Django</n-checkbox>
                                <n-checkbox value="laravel">Laravel</n-checkbox>
                            </n-space>
                        </n-checkbox-group>
                    </n-form-item>

                    <n-form-item label="Experience Level" path="experienceLevel">
                        <n-radio-group v-model:value="mediumWizardData.skills.experienceLevel">
                            <n-radio value="junior">Junior</n-radio>
                            <n-radio value="mid">Mid-level</n-radio>
                            <n-radio value="senior">Senior</n-radio>
                            <n-radio value="lead">Lead</n-radio>
                        </n-radio-group>
                    </n-form-item>

                    <n-form-item label="Salary Expectation" path="salary">
                        <n-slider v-model:value="mediumWizardData.skills.salary" :min="30000" :max="150000" :step="5000"
                            :marks="MEDIUM_SALARY_MARKS" />
                    </n-form-item>
                </n-form>
            </div>

            <!-- Medium Step 4: Review -->
            <div v-if="mediumCurrentStep === 4" class="step-content">
                <h3>Review Application</h3>
                <n-descriptions :column="2" bordered>
                    <n-descriptions-item label="Name">
                        {{ mediumWizardData.personal.firstName }} {{ mediumWizardData.personal.lastName }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Email">
                        {{ mediumWizardData.personal.email }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Phone">
                        {{ mediumWizardData.personal.phone }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Location">
                        {{ mediumWizardData.personal.location }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Current Company">
                        {{ mediumWizardData.experience.currentCompany }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Job Title">
                        {{ mediumWizardData.experience.jobTitle }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Experience">
                        {{ mediumWizardData.experience.yearsExperience }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Education">
                        {{ mediumWizardData.experience.education }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Languages">
                        {{ mediumWizardData.skills.languages.join(', ') }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Frameworks">
                        {{ mediumWizardData.skills.frameworks.join(', ') }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Level">
                        {{ mediumWizardData.skills.experienceLevel }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Salary">
                        ${{ mediumWizardData.skills.salary.toLocaleString() }}
                    </n-descriptions-item>
                </n-descriptions>
            </div>
        </div>

        <!-- Medium Wizard Navigation -->
        <div class="wizard-navigation">
            <n-space justify="space-between">
                <n-button v-if="mediumCurrentStep > 1" @click="mediumPreviousStep">
                    <template #icon>
                        <n-icon :component="ChevronBackOutline" />
                    </template>
                    Previous
                </n-button>
                <div v-else></div>

                <n-space>
                    <n-button v-if="mediumCurrentStep < 4" type="primary" @click="mediumNextStep">
                        Next
                        <template #icon>
                            <n-icon :component="ChevronForwardOutline" />
                        </template>
                    </n-button>
                    <n-button v-if="mediumCurrentStep === 4" type="primary" @click="submitMediumWizard">
                        <template #icon>
                            <n-icon :component="CheckmarkOutline" />
                        </template>
                        Submit Application
                    </n-button>
                </n-space>
            </n-space>
        </div>
    </n-card>
</template>
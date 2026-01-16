<template>
  <div class="form-validation-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Form Validation">
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-placement="left"
          label-width="120"
          require-mark-placement="right-hanging"
          size="medium"
        >
          <n-form-item label="Name" path="name">
            <n-input v-model:value="formData.name" placeholder="Enter your name" />
          </n-form-item>
          
          <n-form-item label="Email" path="email">
            <n-input v-model:value="formData.email" placeholder="Enter your email" />
          </n-form-item>
          
          <n-form-item label="Age" path="age">
            <n-input-number v-model:value="formData.age" placeholder="Enter your age" />
          </n-form-item>
          
          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="formData.password"
              type="password"
              show-password-on="click"
              placeholder="Enter password"
            />
          </n-form-item>
          
          <n-form-item label="Confirm Password" path="confirmPassword">
            <n-input
              v-model:value="formData.confirmPassword"
              type="password"
              show-password-on="click"
              placeholder="Confirm password"
            />
          </n-form-item>
          
          <n-form-item label="Gender" path="gender">
            <n-radio-group v-model:value="formData.gender">
              <n-radio value="male">Male</n-radio>
              <n-radio value="female">Female</n-radio>
              <n-radio value="other">Other</n-radio>
            </n-radio-group>
          </n-form-item>
          
          <n-form-item label="Country" path="country">
            <n-select
              v-model:value="formData.country"
              placeholder="Select your country"
              :options="countryOptions"
            />
          </n-form-item>
          
          <n-form-item label="Interests" path="interests">
            <n-checkbox-group v-model:value="formData.interests">
              <n-space>
                <n-checkbox value="sports">Sports</n-checkbox>
                <n-checkbox value="music">Music</n-checkbox>
                <n-checkbox value="reading">Reading</n-checkbox>
                <n-checkbox value="traveling">Traveling</n-checkbox>
              </n-space>
            </n-checkbox-group>
          </n-form-item>
          
          <n-form-item label="Bio" path="bio">
            <n-input
              v-model:value="formData.bio"
              type="textarea"
              placeholder="Tell us about yourself"
              :rows="4"
            />
          </n-form-item>
          
          <n-form-item label="Terms" path="terms">
            <n-checkbox v-model:value="formData.terms">
              I agree to the terms and conditions
            </n-checkbox>
          </n-form-item>
          
          <n-form-item>
            <n-space>
              <n-button type="primary" @click="handleSubmit">
                Submit
              </n-button>
              <n-button @click="handleReset">
                Reset
              </n-button>
              <n-button @click="handleValidate">
                Validate Only
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>

      <n-card title="Advanced Validation Rules">
        <n-form
          ref="advancedFormRef"
          :model="advancedFormData"
          :rules="advancedRules"
          label-placement="left"
          label-width="140"
        >
          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="advancedFormData.username"
              placeholder="3-20 characters, alphanumeric"
            />
          </n-form-item>
          
          <n-form-item label="Phone Number" path="phone">
            <n-input
              v-model:value="advancedFormData.phone"
              placeholder="+1234567890"
            />
          </n-form-item>
          
          <n-form-item label="Website URL" path="website">
            <n-input
              v-model:value="advancedFormData.website"
              placeholder="https://example.com"
            />
          </n-form-item>
          
          <n-form-item label="Credit Card" path="creditCard">
            <n-input
              v-model:value="advancedFormData.creditCard"
              placeholder="1234 5678 9012 3456"
            />
          </n-form-item>
          
          <n-form-item label="Date of Birth" path="dob">
            <n-date-picker
              v-model:value="advancedFormData.dob"
              type="date"
              placeholder="Select your birth date"
            />
          </n-form-item>
          
          <n-form-item label="Salary Range" path="salary">
            <n-slider
              v-model:value="advancedFormData.salary"
              :min="0"
              :max="200000"
              :step="5000"
              :marks="salaryMarks"
            />
          </n-form-item>
          
          <n-form-item>
            <n-button type="primary" @click="handleAdvancedSubmit">
              Submit Advanced Form
            </n-button>
          </n-form-item>
        </n-form>
      </n-card>

      <n-card title="Dynamic Form Fields">
        <n-form
          ref="dynamicFormRef"
          :model="dynamicFormData"
          :rules="dynamicRules"
          label-placement="left"
          label-width="120"
        >
          <n-form-item
            v-for="(field, index) in dynamicFormData.fields"
            :key="index"
            :label="`Field ${index + 1}`"
            :path="`fields.${index}.value`"
          >
            <n-space align="center">
              <n-input
                v-model:value="field.value"
                :placeholder="`Enter field ${index + 1} value`"
              />
              <n-button
                circle
                type="error"
                size="small"
                @click="removeField(index)"
                v-if="dynamicFormData.fields.length > 1"
              >
                <template #icon>
                  <n-icon :component="TrashOutline" />
                </template>
              </n-button>
            </n-space>
          </n-form-item>
          
          <n-form-item>
            <n-space>
              <n-button @click="addField">
                <template #icon>
                  <n-icon :component="AddOutline" />
                </template>
                Add Field
              </n-button>
              <n-button type="primary" @click="handleDynamicSubmit">
                Submit Dynamic Form
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>

      <n-card title="Form Data Preview">
        <n-code :code="JSON.stringify(formData, null, 2)" language="json" />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { AddOutline, TrashOutline } from '@vicons/ionicons5'

const message = useMessage()

// Form refs
const formRef = ref()
const advancedFormRef = ref()
const dynamicFormRef = ref()

// Basic form data
const formData = reactive({
  name: '',
  email: '',
  age: null,
  password: '',
  confirmPassword: '',
  gender: '',
  country: '',
  interests: [],
  bio: '',
  terms: false
})

// Advanced form data
const advancedFormData = reactive({
  username: '',
  phone: '',
  website: '',
  creditCard: '',
  dob: null,
  salary: 50000
})

// Dynamic form data
const dynamicFormData = reactive({
  fields: [{ value: '' }]
})

// Country options
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' }
]

// Salary marks
const salaryMarks = {
  0: '0',
  50000: '50k',
  100000: '100k',
  150000: '150k',
  200000: '200k'
}

// Validation rules
const rules = {
  name: {
    required: true,
    message: 'Please enter your name',
    trigger: ['input', 'blur']
  },
  email: {
    required: true,
    message: 'Please enter your email',
    trigger: ['input', 'blur'],
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  },
  age: {
    required: true,
    type: 'number',
    message: 'Please enter your age',
    trigger: ['input', 'blur'],
    min: 18,
    max: 120
  },
  password: {
    required: true,
    message: 'Please enter a password',
    trigger: ['input', 'blur'],
    min: 8,
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  confirmPassword: {
    required: true,
    message: 'Please confirm your password',
    trigger: ['input', 'blur'],
    validator: (rule: any, value: string) => {
      if (value !== formData.password) {
        return new Error('Passwords do not match')
      }
      return true
    }
  },
  gender: {
    required: true,
    message: 'Please select your gender',
    trigger: 'change'
  },
  country: {
    required: true,
    message: 'Please select your country',
    trigger: 'change'
  },
  interests: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Please select at least one interest',
    trigger: 'change'
  },
  bio: {
    required: true,
    message: 'Please enter your bio',
    trigger: ['input', 'blur'],
    min: 10,
    max: 500
  },
  terms: {
    required: true,
    type: 'boolean',
    message: 'You must agree to the terms and conditions',
    trigger: 'change'
  }
}

// Advanced validation rules
const advancedRules = {
  username: {
    required: true,
    message: 'Please enter a username',
    trigger: ['input', 'blur'],
    min: 3,
    max: 20,
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscores'
    }
  },
  phone: {
    required: true,
    message: 'Please enter your phone number',
    trigger: ['input', 'blur'],
    pattern: {
      value: /^\+?[\d\s\-\(\)]+$/,
      message: 'Please enter a valid phone number'
    }
  },
  website: {
    required: true,
    message: 'Please enter your website URL',
    trigger: ['input', 'blur'],
    pattern: {
      value: /^https?:\/\/.+\..+/,
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  },
  creditCard: {
    required: true,
    message: 'Please enter your credit card number',
    trigger: ['input', 'blur'],
    pattern: {
      value: /^[\d\s]{13,19}$/,
      message: 'Please enter a valid credit card number'
    }
  },
  dob: {
    required: true,
    type: 'number',
    message: 'Please select your date of birth',
    trigger: 'change',
    validator: (rule: any, value: number) => {
      if (!value) return new Error('Date of birth is required')
      const age = Math.floor((Date.now() - value) / (365.25 * 24 * 60 * 60 * 1000))
      if (age < 18) return new Error('You must be at least 18 years old')
      if (age > 120) return new Error('Please enter a valid date of birth')
      return true
    }
  },
  salary: {
    required: true,
    type: 'number',
    message: 'Please select your salary range',
    trigger: 'change',
    min: 0,
    max: 200000
  }
}

// Dynamic validation rules
const dynamicRules = {
  fields: {
    type: 'array',
    required: true,
    fields: {
      value: {
        required: true,
        message: 'Field value is required',
        trigger: ['input', 'blur'],
        min: 3
      }
    }
  }
}

// Form handlers
const handleSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('Form submitted successfully!')
      console.log('Form data:', formData)
    } else {
      message.error('Please fix the validation errors')
      console.log('Validation errors:', errors)
    }
  })
}

const handleReset = () => {
  formRef.value?.restoreValidation()
  Object.assign(formData, {
    name: '',
    email: '',
    age: null,
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    interests: [],
    bio: '',
    terms: false
  })
  message.info('Form has been reset')
}

const handleValidate = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('Form is valid!')
    } else {
      message.error('Form has validation errors')
    }
  })
}

const handleAdvancedSubmit = () => {
  advancedFormRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('Advanced form submitted successfully!')
      console.log('Advanced form data:', advancedFormData)
    } else {
      message.error('Please fix the validation errors')
    }
  })
}

const handleDynamicSubmit = () => {
  dynamicFormRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('Dynamic form submitted successfully!')
      console.log('Dynamic form data:', dynamicFormData)
    } else {
      message.error('Please fix the validation errors')
    }
  })
}

// Dynamic field handlers
const addField = () => {
  dynamicFormData.fields.push({ value: '' })
}

const removeField = (index: number) => {
  dynamicFormData.fields.splice(index, 1)
}
</script>

<style scoped>
.form-validation-demo {
  padding: 0;
}


.n-code {
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
}
</style>

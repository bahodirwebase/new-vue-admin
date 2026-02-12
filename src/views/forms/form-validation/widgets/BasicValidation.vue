<script setup lang="ts">
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";

const message = useMessage();
const formRef = ref();

const formData = reactive({
  name: "",
  email: "",
  age: null,
  password: "",
  confirmPassword: "",
  gender: "",
  country: "",
  interests: [],
  bio: "",
  terms: false,
});

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "China", value: "cn" },
];

const rules = {
  name: {
    required: true,
    message: "Please enter your name",
    trigger: ["input", "blur"],
  },
  email: {
    required: true,
    message: "Please enter your email",
    trigger: ["input", "blur"],
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  age: {
    required: true,
    type: "number",
    message: "Please enter your age",
    trigger: ["input", "blur"],
    min: 18,
    max: 120,
  },
  password: {
    required: true,
    message: "Please enter a password",
    trigger: ["input", "blur"],
    min: 8,
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
  confirmPassword: {
    required: true,
    message: "Please confirm your password",
    trigger: ["input", "blur"],
    validator: (rule: any, value: string) => {
      if (value !== formData.password) {
        rule;
        return new Error("Passwords do not match");
      }
      return true;
    },
  },
  gender: {
    required: true,
    message: "Please select your gender",
    trigger: "change",
  },
  country: {
    required: true,
    message: "Please select your country",
    trigger: "change",
  },
  interests: {
    required: true,
    type: "array",
    min: 1,
    message: "Please select at least one interest",
    trigger: "change",
  },
  bio: {
    required: true,
    message: "Please enter your bio",
    trigger: ["input", "blur"],
    min: 10,
    max: 500,
  },
  terms: {
    required: true,
    type: "boolean",
    message: "You must agree to the terms and conditions",
    trigger: "change",
  },
};

const handleSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success("Form submitted successfully!");
      console.log("Form data:", formData);
    } else {
      message.error("Please fix the validation errors");
      console.log("Validation errors:", errors);
    }
  });
};

const handleReset = () => {
  formRef.value?.restoreValidation();
  Object.assign(formData, {
    name: "",
    email: "",
    age: null,
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    interests: [],
    bio: "",
    terms: false,
  });
  message.info("Form has been reset");
};

const handleValidate = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success("Form is valid!");
    } else {
      message.error("Form has validation errors");
    }
  });
};
</script>

<template>
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
        <n-input
          v-model:value="formData.name"
          placeholder="Enter your name"
        />
      </n-form-item>

      <n-form-item label="Email" path="email">
        <n-input
          v-model:value="formData.email"
          placeholder="Enter your email"
        />
      </n-form-item>

      <n-form-item label="Age" path="age">
        <n-input-number
          v-model:value="formData.age"
          placeholder="Enter your age"
        />
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
          <n-button type="primary" @click="handleSubmit"> Submit </n-button>
          <n-button @click="handleReset"> Reset </n-button>
          <n-button @click="handleValidate"> Validate Only </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-card>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";

const message = useMessage();
const advancedFormRef = ref();

const advancedFormData = reactive({
  username: "",
  phone: "",
  website: "",
  creditCard: "",
  dob: null,
  salary: 50000,
});

const salaryMarks = {
  0: "0",
  50000: "50k",
  100000: "100k",
  150000: "150k",
  200000: "200k",
};

const advancedRules = {
  username: {
    required: true,
    message: "Please enter a username",
    trigger: ["input", "blur"],
    min: 3,
    max: 20,
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  },
  phone: {
    required: true,
    message: "Please enter your phone number",
    trigger: ["input", "blur"],
    pattern: {
      value: /^\+?[\d\s\-\(\)]+$/,
      message: "Please enter a valid phone number",
    },
  },
  website: {
    required: true,
    message: "Please enter your website URL",
    trigger: ["input", "blur"],
    pattern: {
      value: /^https?:\/\/.+\..+/,
      message: "Please enter a valid URL starting with http:// or https://",
    },
  },
  creditCard: {
    required: true,
    message: "Please enter your credit card number",
    trigger: ["input", "blur"],
    pattern: {
      value: /^[\d\s]{13,19}$/,
      message: "Please enter a valid credit card number",
    },
  },
  dob: {
    required: true,
    type: "number",
    message: "Please select your date of birth",
    trigger: "change",
    validator: (rule: any, value: number) => {
      if (!value) return new Error("Date of birth is required");
      const age = Math.floor(
        (Date.now() - value) / (365.25 * 24 * 60 * 60 * 1000),
      );
      rule;
      if (age < 18) return new Error("You must be at least 18 years old");
      if (age > 120) return new Error("Please enter a valid date of birth");
      return true;
    },
  },
  salary: {
    required: true,
    type: "number",
    message: "Please select your salary range",
    trigger: "change",
    min: 0,
    max: 200000,
  },
};

const handleAdvancedSubmit = () => {
  advancedFormRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success("Advanced form submitted successfully!");
      console.log("Advanced form data:", advancedFormData);
    } else {
      message.error("Please fix the validation errors");
    }
  });
};
</script>

<template>
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
</template>
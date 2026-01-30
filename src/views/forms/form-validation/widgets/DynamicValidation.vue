<template>
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
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";
import { AddOutline, TrashOutline } from "@vicons/ionicons5";

const message = useMessage();
const dynamicFormRef = ref();

const dynamicFormData = reactive({
  fields: [{ value: "" }],
});

const dynamicRules = {
  fields: {
    type: "array",
    required: true,
    fields: {
      value: {
        required: true,
        message: "Field value is required",
        trigger: ["input", "blur"],
        min: 3,
      },
    },
  },
};

const handleDynamicSubmit = () => {
  dynamicFormRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success("Dynamic form submitted successfully!");
      console.log("Dynamic form data:", dynamicFormData);
    } else {
      message.error("Please fix the validation errors");
    }
  });
};

const addField = () => {
  dynamicFormData.fields.push({ value: "" });
};

const removeField = (index: number) => {
  dynamicFormData.fields.splice(index, 1);
};
</script>

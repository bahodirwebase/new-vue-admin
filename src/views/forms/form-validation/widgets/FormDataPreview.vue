<script setup lang="ts">
import { reactive } from "vue";

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
</script>

<template>
  <n-card title="Form Data Preview">
    <n-code :code="JSON.stringify(formData, null, 2)" language="json" />
  </n-card>
</template>

<style scoped>
.n-code {
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
}
</style>

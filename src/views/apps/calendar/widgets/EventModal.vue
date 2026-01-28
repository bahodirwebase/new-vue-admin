<script lang="ts" setup>
import { ref } from "vue";
import { useCalendarStore } from "../store";
import { FORM_RULES, CATEGORY_OPTIONS } from "../constants";
import type { FormInst } from "naive-ui";

const formRef = ref<FormInst | null>(null);
const calendarStore = useCalendarStore();

const saveEvent = async () => {
    if (!formRef.value) return;

    try {
        await formRef.value.validate();
        calendarStore.saveEvent();
    } catch (error) {
        console.error("Form validation failed:", error);
    }
};
</script>
<template>
    <n-modal v-model:show="calendarStore.showModal" :mask-closable="false" preset="card"
        :title="calendarStore.editingEvent ? 'Edit Event' : 'Create New Event'" style="width: 600px"
        class="event-modal">
        <n-form ref="formRef" :model="calendarStore.eventForm" :rules="FORM_RULES">
            <n-form-item label="Event Title" path="title">
                <n-input v-model:value="calendarStore.eventForm.title" placeholder="Enter event title" size="large" />
            </n-form-item>

            <n-grid :cols="2" :x-gap="16">
                <n-form-item-grid-item :span="1">
                    <n-form-item label="Date">
                        <n-date-picker v-model:value="calendarStore.eventForm.date" type="date" value-format="timestamp"
                            size="large" style="width: 100%" />
                    </n-form-item>
                </n-form-item-grid-item>
                <n-form-item-grid-item :span="1">
                    <n-form-item label="Time">
                        <n-time-picker v-model:value="calendarStore.eventForm.time" format="HH:mm"
                            value-format="timestamp" size="large" style="width: 100%" />
                    </n-form-item>
                </n-form-item-grid-item>
            </n-grid>

            <n-form-item label="Category" path="category">
                <n-select v-model:value="calendarStore.eventForm.category" :options="CATEGORY_OPTIONS"
                    placeholder="Select category" size="large" />
            </n-form-item>

            <n-form-item label="Color" path="color">
                <n-color-picker v-model:value="calendarStore.eventForm.color" :modes="['hex']" size="large"
                    style="width: 100%" />
            </n-form-item>

            <n-form-item label="Description" path="description">
                <n-input v-model:value="calendarStore.eventForm.description" type="textarea"
                    placeholder="Event description (optional)" :rows="3" size="large" />
            </n-form-item>
        </n-form>

        <template #footer>
            <n-space justify="end">
                <n-button @click="calendarStore.closeModal">Cancel</n-button>
                <n-button type="primary" @click="saveEvent">
                    {{ calendarStore.editingEvent ? "Update" : "Create" }}
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>
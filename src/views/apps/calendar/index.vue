<script setup lang="ts">
import { onMounted } from "vue";

import CalendarSidebar from "./widgets/CalendarSidebar.vue";
import CalendarContent from "./widgets/CalendarContent.vue";
import EventModal from "./widgets/EventModal.vue";

import { useCalendarStore } from "./store";
import PageHeader from "@/components/custom/PageHeader.vue";

const calendarStore = useCalendarStore();

onMounted(() => {
  calendarStore.activeDate = Date.now();
});
</script>
<template>
  <div class="calendar-app p-0">
    <n-space vertical :size="18">
      <PageHeader title="Calendar" subtitle="Interactive calendar with event management, scheduling, and organization features" />
      
      <!-- Main Content -->
      <main class="calendar-main">
        <!-- Sidebar -->
        <aside class="calendar-sidebar">
            <calendar-sidebar></calendar-sidebar>
        </aside>

        <!-- Calendar Content -->
        <section class="calendar-content">
          <calendar-content></calendar-content>
        </section>
      </main>

      <!-- Event Modal -->
      <event-modal></event-modal>
    </n-space>
  </div>
</template>



<style lang="scss">
@use "./styles/calendar.scss";

</style>

<script setup lang="ts">
import { onMounted } from "vue";

import CalendarSidebar from "./widgets/CalendarSidebar.vue";
import CalendarContent from "./widgets/CalendarContent.vue";
import EventModal from "./widgets/EventModal.vue";

import { useCalendarStore } from "./store";

const calendarStore = useCalendarStore();

onMounted(() => {
  calendarStore.activeDate = Date.now();
});
</script>
<template>
  <div class="calendar-app">
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
  </div>
</template>



<style>
@import "./styles/calendar.scss";
</style>

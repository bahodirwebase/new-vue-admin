<script lang="ts" setup>
import {
    TrashOutline,
    DownloadOutline,
    AddOutline,
} from "@vicons/ionicons5";
import { useCalendarStore } from "../store";
import { VIEW_OPTIONS } from "../constants";
import { useCalendar } from "../composables/useCalendar";

const calendarStore = useCalendarStore();
const { todayEvents, thisWeekEvents, upcomingEvents, currentPeriodInfo } = useCalendar();
</script>
<template>
    <n-card title="Calendar Tools" class="sidebar-card">
        <n-space vertical size="large">
            <!-- View Switcher -->
            <div class="view-switcher">
                <n-button type="primary" size="large" block @click="calendarStore.openEventModal">
                    <template #icon>
                        <n-icon>
                            <AddOutline />
                        </n-icon>
                    </template>
                    New Event
                </n-button>
                <!-- <h4>View</h4> -->
                <n-button-group vertical size="large" style="width: 100%; margin-top: 12px;">
                    <n-button v-for="view in VIEW_OPTIONS" :key="view.value"
                        :type="calendarStore.currentView === view.value ? 'primary' : 'default'"
                        @click="calendarStore.currentView = view.value"
                        style="width: 100%; justify-content: flex-start">
                        <template #icon>
                            <n-icon :component="view.icon" />
                        </template>
                        {{ view.label }}
                    </n-button>
                </n-button-group>
            </div>

            <!-- Statistics -->
            <div class="stats-section">
                <h4>Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">{{ calendarStore.events.length }}</div>
                        <div class="stat-label">Total Events</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">{{ todayEvents.length }}</div>
                        <div class="stat-label">Today</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">{{ thisWeekEvents.length }}</div>
                        <div class="stat-label">This Week</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">{{ upcomingEvents.length }}</div>
                        <div class="stat-label">Upcoming</div>
                    </div>
                </div>
            </div>

            <!-- Current Period -->
            <div class="period-section">
                <h4>Current Period</h4>
                <div class="period-info">
                    <n-tag type="info" size="large">
                        {{ currentPeriodInfo }}
                    </n-tag>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="actions-section">
                <h4>Quick Actions</h4>
                <n-space vertical>
                    <n-button dashed @click="calendarStore.exportEvents" style="width: 100%">
                        <template #icon>
                            <n-icon>
                                <DownloadOutline />
                            </n-icon>
                        </template>
                        Export Events
                    </n-button>
                    <n-button dashed @click="calendarStore.clearAllEvents" style="width: 100%">
                        <template #icon>
                            <n-icon>
                                <TrashOutline />
                            </n-icon>
                        </template>
                        Clear All
                    </n-button>
                </n-space>
            </div>
        </n-space>
    </n-card>
</template>
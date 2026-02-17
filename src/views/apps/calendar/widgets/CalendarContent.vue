<script lang="ts" setup>
import {
    CreateOutline,
    TrashOutline,
    ChevronBackOutline,
    ChevronForwardOutline
} from "@vicons/ionicons5";
import { useCalendarStore } from "../store";
import { useCalendar } from "../composables/useCalendar";
import { formatDate } from "@/utils"
import CustomTag from '@/components/custom/CustomTag.vue';

const calendarStore = useCalendarStore();
const { getEventsForDate, weekRange, weekDays, getEventsForDay, selectedDayFormatted, getEventsForHour } = useCalendar();

</script>
<template>
    <n-card class="calendar-card">
        <!-- Month View -->
        <div v-if="calendarStore.currentView === 'month'" class="month-view">

            <div class="month-view-wrapper">
                <n-calendar v-model:value="calendarStore.activeDate" #default="{ year, month, date }"
                    class="custom-calendar">
                    <div class="calendar-day-content">
                        <div class="day-number">{{ date }}</div>
                        <div v-if="getEventsForDate(year, month, date).length > 0" class="event-indicators">
                            <div v-for="event in getEventsForDate(year, month, date).slice(
                                0,
                                3
                            )" :key="event.id" class="event-dot" :style="{ backgroundColor: event.color }"
                                :title="event.title"></div>
                            <div v-if="getEventsForDate(year, month, date).length > 3" class="more-events">
                                +{{ getEventsForDate(year, month, date).length - 3 }}
                            </div>
                        </div>
                    </div>
                </n-calendar>
            </div>
        </div>

        <!-- Week View -->
        <div v-else-if="calendarStore.currentView === 'week'" class="week-view">
            <div class="view-header">
                <n-space justify="space-between" align="center">
                    <n-button quaternary circle @click="calendarStore.previousWeek">
                        <template #icon>
                            <n-icon>
                                <ChevronBackOutline />
                            </n-icon>
                        </template>
                    </n-button>
                    <h2 class="view-title">{{ weekRange }}</h2>
                    <n-button quaternary circle @click="calendarStore.nextWeek">
                        <template #icon>
                            <n-icon>
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-button>
                </n-space>
            </div>
            <div class="week-grid">
                <div class="time-column">
                    <div class="time-slot"></div>
                    <div v-for="hour in 24" :key="hour" class="time-slot">
                        {{ String(hour - 1).padStart(2, "0") }}:00
                    </div>
                </div>
                <div v-for="day in weekDays" :key="day.date.getTime()" class="day-column">
                    <div class="day-header">
                        <div class="day-name">{{ day.name }}</div>
                        <div class="day-date">{{ day.date.getDate() }}</div>
                    </div>
                    <div class="day-events">
                        <div v-for="event in getEventsForDay(day.date)" :key="event.id" class="week-event"
                            :style="{ backgroundColor: event.color }">
                            <n-ellipsis style="max-width: 120px">
                                {{ event.title }}
                            </n-ellipsis>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Day View -->
        <div v-else-if="calendarStore.currentView === 'day'" class="day-view">
            <div class="view-header">
                <n-space justify="space-between" align="center">
                    <n-button quaternary circle @click="calendarStore.previousDay">
                        <template #icon>
                            <n-icon>
                                <ChevronBackOutline />
                            </n-icon>
                        </template>
                    </n-button>
                    <h2 class="view-title">{{ selectedDayFormatted }}</h2>
                    <n-button quaternary circle @click="calendarStore.nextDay">
                        <template #icon>
                            <n-icon>
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-button>
                </n-space>
            </div>
            <div class="day-timeline">
                <div v-for="hour in 24" :key="hour" class="hour-row">
                    <div class="hour-label">
                        {{ String(hour - 1).padStart(2, "0") }}:00
                    </div>
                    <div class="hour-content">
                        <div v-for="event in getEventsForHour(calendarStore.activeDate, hour - 1)" :key="event.id"
                            class="day-event">
                            <CustomTag :color="event.color" text-color="#fff">
                                {{ event.title }}
                            </CustomTag>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- List View -->
        <div v-else-if="calendarStore.currentView === 'list'" class="list-view">
            <div class="view-header">
                <h2 class="view-title">All Events</h2>
            </div>
            <div class="events-list">
                <div v-for="event in calendarStore.events" :key="event.id" class="event-item">
                    <div class="event-color-bar" :style="{ backgroundColor: event.color }"></div>
                    <div class="event-content">
                        <div class="event-header">
                            <h4 class="event-title">{{ event.title }}</h4>
                            <CustomTag :color="event.color" text-color="#fff" size="small">
                                {{ event.category }}
                            </CustomTag>
                        </div>
                        <div class="event-details">
                            <p class="event-date">{{ formatDate(event.date) }}</p>
                            <p class="event-time">{{ event.time }}</p>
                        </div>
                        <p v-if="event.description" class="event-description">
                            {{ event.description }}
                        </p>
                    </div>
                    <div class="event-actions">
                        <n-button quaternary circle size="small" @click="calendarStore.editEvent(event)">
                            <template #icon>
                                <n-icon>
                                    <CreateOutline />
                                </n-icon>
                            </template>
                        </n-button>
                        <n-button quaternary circle size="small" type="error"
                            @click="calendarStore.deleteEvent(event.id)">
                            <template #icon>
                                <n-icon>
                                    <TrashOutline />
                                </n-icon>
                            </template>
                        </n-button>
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>
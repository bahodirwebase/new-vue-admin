import { ref } from "vue";
import { defineStore } from "pinia";
import { EVENTS } from "./constants";
import type { Events } from "./types";
import { message } from '@/utils/naive-discrete-api'

export const useCalendarStore = defineStore("calendar", () => {

    const currentView = ref("month");
    const events = ref<Events[]>(EVENTS);
    const activeDate = ref(Date.now());
    const showModal = ref(false);
    const editingEvent = ref<Events | null>(null);
    // Event form
    const eventForm = ref({
        title: "",
        date: Date.now(),
        time: Date.now(),
        category: "work",
        color: "#18a058",
        description: "",
    });

    // Event management
    const openEventModal = () => {
        editingEvent.value = null;
        eventForm.value = {
            title: "",
            date: Date.now(),
            time: Date.now(),
            category: "work",
            color: "#18a058",
            description: "",
        };
        showModal.value = true;
    };
    const exportEvents = () => {
        const data = JSON.stringify(events.value, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `events-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        message.success("Events exported successfully");
    };
    const clearAllEvents = () => {
        events.value = [];
        message.success("All events cleared");
    };

    // Navigation
    const previousWeek = () => {
        const newDate = new Date(activeDate.value);
        newDate.setDate(newDate.getDate() - 7);
        activeDate.value = newDate.getTime();
    };
    const nextWeek = () => {
        const newDate = new Date(activeDate.value);
        newDate.setDate(newDate.getDate() + 7);
        activeDate.value = newDate.getTime();
    };
    const previousDay = () => {
        const newDate = new Date(activeDate.value);
        newDate.setDate(newDate.getDate() - 1);
        activeDate.value = newDate.getTime();
    };
    const nextDay = () => {
        const newDate = new Date(activeDate.value);
        newDate.setDate(newDate.getDate() + 1);
        activeDate.value = newDate.getTime();
    };

    //Actions
    const editEvent = (event: Events) => {
        editingEvent.value = event;
        eventForm.value = {
            title: event.title,
            date: event.date.getTime(),
            time: new Date().setHours(
                ...(event.time.split(":").map(Number) as [number, number]),
                0,
                0
            ),
            category: event.category,
            color: event.color,
            description: event.description || "",
        };
        showModal.value = true;
    };
    const deleteEvent = (eventId: number) => {
        const index = events.value.findIndex((e) => e.id === eventId);
        if (index !== -1) {
            events.value.splice(index, 1);
            message.success("Event deleted successfully");
        }
    };
    const closeModal = () => {
        showModal.value = false;
        editingEvent.value = null;
        eventForm.value = {
            title: "",
            date: Date.now(),
            time: Date.now(),
            category: "work",
            color: "#18a058",
            description: "",
        };
    };
    const saveEvent = () => {
        const eventData = {
            ...eventForm.value,
            date: new Date(eventForm.value.date!),
            time: new Date(eventForm.value.time!).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
        };

        if (editingEvent.value) {
            // Update existing event
            const index = events.value.findIndex(
                (e) => e.id === editingEvent.value!.id
            );
            if (index !== -1) {
                events.value[index] = { ...eventData, id: editingEvent.value!.id };
            }
            message.success("Event updated successfully");
        } else {
            // Create new event
            events.value.push({ ...eventData, id: Date.now() });
            message.success("Event created successfully");
        }

        closeModal();
    };
    return {
        openEventModal,
        currentView,
        events,
        exportEvents,
        clearAllEvents,
        activeDate,
        previousWeek,
        nextWeek,
        previousDay,
        nextDay,
        editEvent,
        deleteEvent,
        showModal,
        editingEvent,
        eventForm,
        closeModal,
        saveEvent
    }
})
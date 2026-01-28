import { computed } from "vue";
import { useCalendarStore } from "../store";

const calendarStore = useCalendarStore();

export function useCalendar() {
    // Computed properties
    const todayEvents = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate < tomorrow;
        });
    });
    const thisWeekEvents = computed(() => {
        const today = new Date();
        const startOfWeek = new Date(today);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day;
        startOfWeek.setDate(diff);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
    });
    const upcomingEvents = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        });
    });
    const currentPeriodInfo = computed(() => {
        switch (calendarStore.currentView) {
            case "month":
                return currentMonthYear.value;
            case "week":
                return weekRange.value;
            case "day":
                return selectedDayFormatted.value;
            case "list":
                return `All Events (${calendarStore.events.length})`;
            default:
                return "";
        }
    });
    const weekRange = computed(() => {
        const start = weekDays.value[0].date;
        const end = weekDays.value[6].date;
        return `${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}`;
    });
    const weekDays = computed(() => {
        const startOfWeek = new Date(calendarStore.activeDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day;
        startOfWeek.setDate(diff);

        const days = [];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            days.push({
                name: dayNames[i],
                date: currentDate,
            });
        }

        return days;
    });
    const selectedDayFormatted = computed(() => {
        return new Date(calendarStore.activeDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });
    const currentMonthYear = computed(() => {
        return new Date(calendarStore.activeDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    });
    const sortedEvents = computed(() => {
        return [...calendarStore.events].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
    });

    //Methods
    const getEventsForDate = (year: number, month: number, date: number) => {
        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month - 1 && // Fix month indexing
                eventDate.getDate() === date
            );
        });
    };
    const getEventsForDay = (date: Date) => {
        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
    };
    const getEventsForHour = (date: number, hour: number) => {
        return calendarStore.events.filter((event) => {
            const eventDate = new Date(event.date);
            const eventHour = parseInt(event.time.split(":")[0]);
            return (
                eventDate.toDateString() === new Date(date).toDateString() &&
                eventHour === hour
            );
        });
    };
    return {
        todayEvents,
        thisWeekEvents,
        upcomingEvents,
        currentPeriodInfo,
        weekRange,
        weekDays,
        selectedDayFormatted,
        sortedEvents,
        getEventsForDate,
        getEventsForDay,
        getEventsForHour
    }
}

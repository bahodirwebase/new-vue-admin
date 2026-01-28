import { GridOutline, ListOutline, TimeOutline } from "@vicons/ionicons5";
import type { Events } from "./types";
import type { FormRules } from "naive-ui";

// View options with icons
export const VIEW_OPTIONS = [
    { label: "Month", value: "month", icon: GridOutline },
    { label: "Week", value: "week", icon: GridOutline },
    { label: "Day", value: "day", icon: TimeOutline },
    { label: "List", value: "list", icon: ListOutline },
];

export const EVENTS: Events[] = [
    {
        id: 1,
        title: "Team Meeting",
        date: new Date(),
        time: "10:00",
        category: "work",
        color: "#18a058",
        description: "Weekly team sync meeting",
    },
    {
        id: 2,
        title: "Lunch with Client",
        date: new Date(),
        time: "12:30",
        category: "work",
        color: "#2080f0",
        description: "Discuss project requirements",
    },
    {
        id: 3,
        title: "Gym Session",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        time: "18:00",
        category: "health",
        color: "#f0a020",
        description: "Workout session",
    },
]

// Form validation rules
export const FORM_RULES: FormRules = {
    title: {
        required: true,
        message: "Please enter event title",
        trigger: "blur",
    },
};

// Category options
export const CATEGORY_OPTIONS = [
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
  { label: "Meeting", value: "meeting" },
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Social", value: "social" },
  { label: "Other", value: "other" },
];
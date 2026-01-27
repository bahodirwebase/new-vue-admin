import { h } from "vue";
import { NIcon } from "naive-ui";
import { AnalyticsOutline, StorefrontOutline } from "@vicons/ionicons5";

export default [
  {
    type: "group",
    label: "Dashboard",
    key: "dashboard-group",
  },
  {
    label: "Analytical",
    key: "Analytical",
    icon: () => h(NIcon, { component: AnalyticsOutline }),
  },
  {
    label: "Commerce",
    key: "Commerce",
    icon: () => h(NIcon, { component: StorefrontOutline }),
  },
];

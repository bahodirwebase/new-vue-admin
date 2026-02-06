import { h } from "vue";
import { NIcon } from "naive-ui";
import {
  CalendarOutline,
  ChatbubbleEllipsesOutline,
  MailOutline,
  StorefrontOutline,
} from "@vicons/ionicons5";

export default [
  {
    type: "group",
    label: "Apps",
    key: "apps-group",
  },
  {
    label: "Calendar",
    key: "Calendar",
    icon: () => h(NIcon, { component: CalendarOutline }),
  },
  {
    label: "Chat",
    key: "Chat",
    icon: () => h(NIcon, { component: ChatbubbleEllipsesOutline }),
  },
  {
    label: "Email",
    key: "Email",
    icon: () => h(NIcon, { component: MailOutline }),
  },
  {
    label: "Email1",
    key: "Email1",
    icon: () => h(NIcon, { component: MailOutline }),
  },
  {
    label: "E-commerce",
    key: "Ecommerce",
    icon: () => h(NIcon, { component: StorefrontOutline }),
  },
];

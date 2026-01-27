export default [
  {
    path: "dashboard/analytical",
    name: "Analytical",
    component: () => import("@/views/dashboard/analytical/index.vue"),
    meta: {
      title: "Analytical",
      icon: "analytics-outline",
      group: "Dashboard",
    },
  },
  {
    path: "dashboard/commerce",
    name: "Commerce",
    component: () => import("@/views/dashboard/commerce/index.vue"),
    meta: { title: "Commerce", icon: "storefront-outline", group: "Dashboard" },
  },
];

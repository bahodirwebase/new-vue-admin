export default [
  {
    path: "apps/calendar",
    name: "Calendar",
    component: () => import("@/views/apps/Calendar.vue"),
    meta: { title: "Calendar", icon: "calendar-outline", group: "Apps" },
  },
  {
    path: "apps/chat",
    name: "Chat",
    component: () => import("@/views/apps/Chat.vue"),
    meta: { title: "Chat", icon: "chatbubble-ellipses-outline", group: "Apps" },
  },
  {
    path: "apps/email",
    name: "Email",
    component: () => import("@/views/apps/Email.vue"),
    meta: { title: "Email", icon: "mail-outline", group: "Apps" },
  },
  {
    path: "apps/ecommerce",
    name: "Ecommerce",
    component: () => import("@/views/apps/ecommerce/index.vue"),
    meta: { title: "E-commerce", icon: "storefront-outline", group: "Apps" },
  },
  {
    path: "apps/ecommerce/cart",
    name: "ShoppingCart",
    component: () => import("@/views/apps/ecommerce/widgets/ShoppingCart.vue"),
    meta: { title: "Shopping Cart", icon: "cart-outline", group: "Apps" },
  },
  {
    path: "apps/ecommerce/checkout",
    name: "Checkout",
    component: () => import("@/views/apps/ecommerce/widgets/Checkout.vue"),
    meta: { title: "Checkout", icon: "checkmark-outline", group: "Apps" },
  },
];

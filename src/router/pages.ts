export default [
  {
    path: "/pages/authentication/login-simple",
    name: "LoginSimple",
    component: () => import("@/views/pages/auth/LoginSimple.vue"),
    meta: {
      title: "Login (Simple)",
      icon: "person-circle-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/login-advanced",
    name: "LoginAdvanced",
    component: () => import("@/views/pages/auth/LoginAdvanced.vue"),
    meta: {
      title: "Login (Advanced)",
      icon: "person-circle-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/register-simple",
    name: "RegisterSimple",
    component: () => import("@/views/pages/auth/RegisterSimple.vue"),
    meta: {
      title: "Register (Simple)",
      icon: "document-text-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/register-advanced",
    name: "RegisterAdvanced",
    component: () => import("@/views/pages/auth/RegisterAdvanced.vue"),
    meta: {
      title: "Register (Advanced)",
      icon: "document-text-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/pages/auth/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password",
      icon: "mail-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/pages/auth/ResetPassword.vue"),
    meta: {
      title: "Reset Password",
      icon: "lock-closed-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/two-step-verification",
    name: "TwoStepVerification",
    component: () => import("@/views/pages/auth/TwoStepVerification.vue"),
    meta: {
      title: "Two Step Verification",
      icon: "shield-checkmark-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/authentication/lockscreen",
    name: "LockScreen",
    component: () => import("@/views/pages/auth/LockScreen.vue"),
    meta: {
      title: "Lock Screen",
      icon: "lock-closed-outline",
      group: "Pages",
      subgroup: "Authentication",
    },
  },
  {
    path: "/pages/errors/not-found",
    name: "NotFound",
    component: () => import("@/views/pages/errors/NotFound.vue"),
    meta: {
      title: "404 Not Found",
      icon: "alert-circle-outline",
      group: "Pages",
      subgroup: "Errors",
    },
  },
  {
    path: "/pages/errors/forbidden",
    name: "Forbidden",
    component: () => import("@/views/pages/errors/Forbidden.vue"),
    meta: {
      title: "403 Forbidden",
      icon: "shield-checkmark-outline",
      group: "Pages",
      subgroup: "Errors",
    },
  },
  {
    path: "/pages/errors/unauthorized",
    name: "Unauthorized",
    component: () => import("@/views/pages/errors/Unauthorized.vue"),
    meta: {
      title: "401 Unauthorized",
      icon: "lock-closed-outline",
      group: "Pages",
      subgroup: "Errors",
    },
  },
  {
    path: "/pages/errors/server-error",
    name: "ServerError",
    component: () => import("@/views/pages/errors/ServerError.vue"),
    meta: {
      title: "500 Server Error",
      icon: "warning-outline",
      group: "Pages",
      subgroup: "Errors",
    },
  },
];

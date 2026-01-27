import { h } from "vue";
import { NIcon } from "naive-ui";
import {
  MailOutline,
  LockClosedOutline,
  ShieldCheckmarkOutline,
  AlertCircleOutline,
  PersonCircleOutline,
  DocumentTextOutline,
  WarningOutline,
  SettingsOutline,
  CardOutline,
  HelpCircleOutline,
} from "@vicons/ionicons5";
export default [
  {
    type: "group",
    label: "Pages",
    key: "pages-group",
  },
  {
    label: "Authentication",
    key: "authentication-group",
    icon: () => h(NIcon, { component: LockClosedOutline }),
    children: [
      {
        label: "Login (Simple)",
        key: "LoginSimple",
        icon: () => h(NIcon, { component: PersonCircleOutline }),
      },
      {
        label: "Login (Advanced)",
        key: "LoginAdvanced",
        icon: () => h(NIcon, { component: PersonCircleOutline }),
      },
      {
        label: "Register (Simple)",
        key: "RegisterSimple",
        icon: () => h(NIcon, { component: DocumentTextOutline }),
      },
      {
        label: "Register (Advanced)",
        key: "RegisterAdvanced",
        icon: () => h(NIcon, { component: DocumentTextOutline }),
      },
      {
        label: "Forgot Password",
        key: "ForgotPassword",
        icon: () => h(NIcon, { component: MailOutline }),
      },
      {
        label: "Reset Password",
        key: "ResetPassword",
        icon: () => h(NIcon, { component: LockClosedOutline }),
      },
      {
        label: "Two Step Verification",
        key: "TwoStepVerification",
        icon: () => h(NIcon, { component: ShieldCheckmarkOutline }),
      },
      {
        label: "Lock Screen",
        key: "LockScreen",
        icon: () => h(NIcon, { component: LockClosedOutline }),
      },
    ],
  },
  {
    label: "Errors",
    key: "errors-group",
    icon: () => h(NIcon, { component: WarningOutline }),
    children: [
      {
        label: "404 Not Found",
        key: "NotFound",
        icon: () => h(NIcon, { component: AlertCircleOutline }),
      },
      {
        label: "403 Forbidden",
        key: "Forbidden",
        icon: () => h(NIcon, { component: ShieldCheckmarkOutline }),
      },
      {
        label: "401 Unauthorized",
        key: "Unauthorized",
        icon: () => h(NIcon, { component: LockClosedOutline }),
      },
      {
        label: "500 Server Error",
        key: "ServerError",
        icon: () => h(NIcon, { component: WarningOutline }),
      },
    ],
  },
  {
    label: "User",
    key: "user-group",
    icon: () => h(NIcon, { component: PersonCircleOutline }),
    children: [
      {
        label: "User Profile",
        key: "UserProfile",
        icon: () => h(NIcon, { component: PersonCircleOutline }),
      },
      {
        label: "Account Settings",
        key: "AccountSettings",
        icon: () => h(NIcon, { component: SettingsOutline }),
      },
      {
        label: "Pricing",
        key: "Pricing",
        icon: () => h(NIcon, { component: CardOutline }),
      },
      {
        label: "FAQ",
        key: "Faq",
        icon: () => h(NIcon, { component: HelpCircleOutline }),
      },
    ],
  },
];

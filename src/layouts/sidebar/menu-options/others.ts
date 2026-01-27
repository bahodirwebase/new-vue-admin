import { h } from "vue";
import { NIcon } from "naive-ui";
import { RibbonOutline, MenuOutline, SettingsOutline } from "@vicons/ionicons5";
import { useRender } from "../composables/useRender";

const { renderCustomizeLabel } = useRender();

export default [
  {
    type: "group",
    label: "Others",
    key: "others-group",
  },
  {
    label: "Menu Level 1",
    key: "menu-level-1",
    icon: () => h(NIcon, { component: MenuOutline }),
    children: [
      {
        label: "Menu Level 2",
        key: "menu-level-20",
        icon: () => h(NIcon, { component: MenuOutline }),
        children: [
          {
            label: "Menu Level 3",
            key: "menu-level-301",
            icon: () => h(NIcon, { component: MenuOutline }),
          },
          {
            label: "Menu Level 3",
            key: "menu-level-302",
            icon: () => h(NIcon, { component: MenuOutline }),
          },
        ],
      },
      {
        label: "Menu Level 2",
        key: "menu-level-21",
        icon: () => h(NIcon, { component: MenuOutline }),
        children: [
          {
            label: "Menu Level 3",
            key: "menu-level-303",
            icon: () => h(NIcon, { component: MenuOutline }),
          },
          {
            label: "Menu Level 3",
            key: "menu-level-304",
            icon: () => h(NIcon, { component: MenuOutline }),
          },
        ],
      },
    ],
  },
  {
    label: "Disabled Menu",
    key: "disabled-menu",
    icon: () => h(NIcon, { component: SettingsOutline }),
    disabled: true,
  },
  {
    label: renderCustomizeLabel("With Badge", "/", {
      value: "10",
      type: "info",
    }),
    key: "with-badge",
    icon: () => h(NIcon, { component: RibbonOutline }),
    badge: "10",
  },
];

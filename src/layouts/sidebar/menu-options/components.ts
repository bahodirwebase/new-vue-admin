import { h } from "vue";
import { NIcon } from "naive-ui";

import {
  AnalyticsOutline,
  GridOutline,
  RadioButtonOnOutline,
  AlertCircleOutline,
  PersonCircleOutline,
  RibbonOutline,
  BrowsersOutline,
  ListOutline,
  MenuOutline,
  EllipsisHorizontalOutline,
  AlbumsOutline,
  TimeOutline,
  InformationCircleOutline,
  TextOutline,
  AppsOutline,
  DocumentTextOutline,
  RemoveOutline,
  ColorPaletteOutline,
  WaterOutline,
  TimerOutline,
  CubeOutline,
  LayersOutline,
} from "@vicons/ionicons5";

export default [
  {
    type: "group",
    label: "Components",
    key: "components-group",
  },
  {
    label: "UI Elements",
    key: "ui-elements-group",
    icon: () => h(NIcon, { component: GridOutline }),
    children: [
      {
        label: "Alert",
        key: "Alert",
        icon: () => h(NIcon, { component: AlertCircleOutline }),
      },
      {
        label: "Avatar",
        key: "Avatar",
        icon: () => h(NIcon, { component: PersonCircleOutline }),
      },
      {
        label: "Badge",
        key: "Badge",
        icon: () => h(NIcon, { component: RibbonOutline }),
      },
      {
        label: "Button",
        key: "Button",
        icon: () => h(NIcon, { component: RadioButtonOnOutline }),
      },
      {
        label: "Modal",
        key: "Modal",
        icon: () => h(NIcon, { component: BrowsersOutline }),
      },
      {
        label: "List",
        key: "List",
        icon: () => h(NIcon, { component: ListOutline }),
      },
      {
        label: "Menu",
        key: "Menu",
        icon: () => h(NIcon, { component: MenuOutline }),
      },
      {
        label: "Pagination",
        key: "Pagination",
        icon: () => h(NIcon, { component: EllipsisHorizontalOutline }),
      },
      {
        label: "Tabs",
        key: "Tabs",
        icon: () => h(NIcon, { component: AlbumsOutline }),
      },
      {
        label: "Carousel",
        key: "Carousel",
        icon: () => h(NIcon, { component: AlbumsOutline }),
      },
      {
        label: "Collapse",
        key: "Collapse",
        icon: () => h(NIcon, { component: RemoveOutline }),
      },
      {
        label: "Tag",
        key: "Tag",
        icon: () => h(NIcon, { component: RibbonOutline }),
      },
      {
        label: "Timeline",
        key: "Timeline",
        icon: () => h(NIcon, { component: TimeOutline }),
      },
      {
        label: "Tooltip",
        key: "Tooltip",
        icon: () => h(NIcon, { component: InformationCircleOutline }),
      },
    ],
  },
  {
    label: "Tables",
    key: "tables-group",
    icon: () => h(NIcon, { component: GridOutline }),
    children: [
      {
        label: "Basic Table",
        key: "Basic-Table",
        icon: () => h(NIcon, { component: GridOutline }),
      },
      {
        label: "Data Table",
        key: "Data-Table",
        icon: () => h(NIcon, { component: ListOutline }),
      },
    ],
  },
  {
    label: "Charts",
    key: "charts-group",
    icon: () => h(NIcon, { component: AnalyticsOutline }),
    children: [
      {
        label: "Line Chart",
        key: "Line-Chart",
        icon: () => h(NIcon, { component: AnalyticsOutline }),
      },
      {
        label: "Bar Chart",
        key: "Bar-Chart",
        icon: () => h(NIcon, { component: GridOutline }),
      },
      {
        label: "Pie Chart",
        key: "Pie-Chart",
        icon: () => h(NIcon, { component: RadioButtonOnOutline }),
      },
      {
        label: "Mixed Chart",
        key: "Mixed-Chart",
        icon: () => h(NIcon, { component: LayersOutline }),
      },
    ],
  },
  {
    label: "Typography",
    key: "Typography",
    icon: () => h(NIcon, { component: TextOutline }),
  },
  {
    label: "Icons",
    key: "Icons",
    icon: () => h(NIcon, { component: AppsOutline }),
  },
  {
    label: "Extra",
    key: "extra-group",
    icon: () => h(NIcon, { component: CubeOutline }),
    children: [
      {
        label: "Divider",
        key: "Divider",
        icon: () => h(NIcon, { component: RemoveOutline }),
      },
      {
        label: "Ellipsis",
        key: "Ellipsis",
        icon: () => h(NIcon, { component: EllipsisHorizontalOutline }),
      },
      {
        label: "Gradient Text",
        key: "GradientText",
        icon: () => h(NIcon, { component: ColorPaletteOutline }),
      },
      {
        label: "Page Header",
        key: "PageHeader",
        icon: () => h(NIcon, { component: DocumentTextOutline }),
      },
      {
        label: "Watermark",
        key: "Watermark",
        icon: () => h(NIcon, { component: WaterOutline }),
      },
      {
        label: "Countdown",
        key: "CountDown",
        icon: () => h(NIcon, { component: TimerOutline }),
      },
    ],
  },
];

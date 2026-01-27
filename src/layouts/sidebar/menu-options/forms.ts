import { h } from "vue";
import { NIcon } from "naive-ui";

import {
  TextOutline,
  DocumentTextOutline,
  CheckboxOutline,
  RadioButtonOffOutline,
  ToggleOutline,
  CheckmarkOutline,
  ChevronForwardOutline,
  RemoveOutline
} from "@vicons/ionicons5";
export default [
  {
    type: "group",
    label: "Forms",
    key: "forms-group",
  },
  {
    label: "Form Elements",
    key: "form-elements-group",
    icon: () => h(NIcon, { component: DocumentTextOutline }),
    children: [
      {
        label: "Select",
        key: "Select",
        icon: () => h(NIcon, { component: CheckboxOutline }),
      },
      {
        label: "Input",
        key: "Input",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Radio",
        key: "Radio",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Switch",
        key: "Switch",
        icon: () => h(NIcon, { component: ToggleOutline }),
      },
      {
        label: "Slider",
        key: "Slider",
        icon: () => h(NIcon, { component: RemoveOutline }),
      },
      {
        label: "AutoComplete",
        key: "AutoComplete",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Checkbox",
        key: "Checkbox",
        icon: () => h(NIcon, { component: CheckboxOutline }),
      },
      {
        label: "DatePicker",
        key: "DatePicker",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Upload",
        key: "Upload",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
    ],
  },
  {
    label: "Extra Form Elements",
    key: "extra-form-elements-group",
    icon: () => h(NIcon, { component: DocumentTextOutline }),
    children: [
      {
        label: "Cascader",
        key: "Cascader",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Color Picker",
        key: "ColorPicker",
        icon: () => h(NIcon, { component: CheckboxOutline }),
      },
      {
        label: "Dynamic Input",
        key: "DynamicInput",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Dynamic Tags",
        key: "DynamicTags",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Input Number",
        key: "InputNumber",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Input OTP",
        key: "InputOtp",
        icon: () => h(NIcon, { component: CheckboxOutline }),
      },
      {
        label: "Mention",
        key: "Mention",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Rate",
        key: "Rate",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Transfer",
        key: "Transfer",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
      {
        label: "Tree Select",
        key: "TreeSelect",
        icon: () => h(NIcon, { component: RadioButtonOffOutline }),
      },
    ],
  },
  {
    label: "Form Validation",
    key: "Form-Validation",
    icon: () => h(NIcon, { component: CheckmarkOutline }),
  },
  {
    label: "Form Wizard",
    key: "Form-Wizard",
    icon: () => h(NIcon, { component: ChevronForwardOutline }),
  },
  {
    label: "Form Editor",
    key: "Form-Editor",
    icon: () => h(NIcon, { component: TextOutline }),
  },
];

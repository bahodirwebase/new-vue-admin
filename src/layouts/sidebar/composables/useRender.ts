import { h } from "vue";
import { NBadge } from "naive-ui";
import { RouteLocationRaw, RouterLink } from "vue-router";

interface IOptionBadge {
  value?: string | number;
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
}

export function useRender() {
  const renderCustomizeLabel = (
    label: string,
    router: RouteLocationRaw,
    optionBadge?: IOptionBadge,
  ) => {
    return () => {
      return h(
        "div",
        {
          class: "menu-label ",
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },
        [
          h(
            RouterLink,
            {
              to: router,
            },
            { default: () => label },
          ),
          h(NBadge, {
            value: optionBadge?.value,
            type: optionBadge?.type || "default",
            class: "mr-1",
          }),
        ],
      );
    };
  };
  
  return {
    renderCustomizeLabel,
  };
}

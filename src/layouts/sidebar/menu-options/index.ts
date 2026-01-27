import type { MenuOption } from "naive-ui";

import dashboard from "./dashboard";
import apps from "./apps";
import pages from "./pages";
import components from "./components";
import forms from "./forms";
import others from "./others";



const menuOptions: MenuOption[] = [
  ...dashboard,
  ...apps,
  ...pages,
  ...components,
  ...forms,
  ...others,
];

export default menuOptions;

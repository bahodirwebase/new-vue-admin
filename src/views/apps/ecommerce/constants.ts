import {
  GridOutline,
  CartOutline,
  PeopleOutline,
  BarChartOutline,
  SettingsOutline,
} from "@vicons/ionicons5";

export const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
  { label: "Home & Garden", value: "home" },
  { label: "Sports", value: "sports" },
];

export const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Out of Stock", value: "out_of_stock" },
  { label: "Discontinued", value: "discontinued" },
];

export const SORT_OPTIONS = [
  { label: "Name", value: "name" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Stock", value: "stock" },
  { label: "Date Added", value: "date" },
];

export const PRICE_RANGE_OPTIONS = [
  { label: "$0 - $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $500", value: "100-500" },
  { label: "$500+", value: "500+" },
];

export const NAVIGATION_OPTIONS = [
  { label: "Products", value: "products", icon: GridOutline },
  { label: "Shopping Cart", value: "cart", icon: CartOutline },
  { label: "Checkout", value: "checkout", icon: SettingsOutline },
  { label: "Orders", value: "orders", icon: CartOutline },
  { label: "Customers", value: "customers", icon: PeopleOutline },
  { label: "Analytics", value: "analytics", icon: BarChartOutline },
  { label: "Settings", value: "settings", icon: SettingsOutline },
];
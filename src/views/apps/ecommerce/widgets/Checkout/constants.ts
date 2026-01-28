export const stateOptions = [
  { label: "Alabama", value: "AL" },
  { label: "California", value: "CA" },
  { label: "Florida", value: "FL" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
];

export const countryOptions = [
  { label: "United States", value: "United States" },
  { label: "Canada", value: "Canada" },
  { label: "United Kingdom", value: "United Kingdom" },
];

export const shippingRules = {
  firstName: { required: true, message: "First name is required" },
  lastName: { required: true, message: "Last name is required" },
  email: { required: true, type: "email", message: "Valid email is required" },
  phone: { required: true, message: "Phone number is required" },
  address: { required: true, message: "Address is required" },
  city: { required: true, message: "City is required" },
  state: { required: true, message: "State is required" },
  zipCode: { required: true, message: "ZIP code is required" },
  country: { required: true, message: "Country is required" },
};

export const PAYMENT_RULES = {
  cardNumber: { required: true, message: "Card number is required" },
  expiryDate: { required: true, message: "Expiry date is required" },
  cvv: { required: true, message: "CVV is required" },
  cardholderName: { required: true, message: "Cardholder name is required" },
};
export const ORDER_ITEMS_LIST = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    salePrice: 249.99,
    quantity: 1,
    image: "https://picsum.photos/seed/headphones/60/60.jpg",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: 499.99,
    quantity: 2,
    image: "https://picsum.photos/seed/smartwatch/60/60.jpg",
  },
];


export const STEPS = [
  { key: 1, title: "Shipping", description: "Enter shipping information" },
  { key: 2, title: "Payment", description: "Select payment method" },
  { key: 3, title: "Review", description: "Review and place order" },
];
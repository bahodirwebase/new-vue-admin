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
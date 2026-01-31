// Simple wizard validation rules
export const SIMPLE_ACCOUNT_RULES = {
  username: { required: true, message: 'Username is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    min: 6,
    message: 'Password must be at least 6 characters'
  }
}
export const SIMPLE_PROFILE_RULES = {
  fullName: { required: true, message: 'Full name is required' },
  age: {
    required: true,
    type: 'number',
    message: 'Age is required',
    min: 18
  },
  country: { required: true, message: 'Country is required' }
}

export const SIMPLE_PREFERENCES_RULES = {
  interests: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one interest'
  },
  theme: { required: true, message: 'Theme selection is required' }
}

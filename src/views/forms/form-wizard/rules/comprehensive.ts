// Validation rules
export const PERSONAL_RULES = {
  firstName: { required: true, message: 'First name is required' },
  lastName: { required: true, message: 'Last name is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { required: true, message: 'Phone number is required' },
  dob: { required: true, message: 'Date of birth is required' },
  gender: { required: true, message: 'Gender is required' }
}

export const ADDRESS_RULES = {
  street: { required: true, message: 'Street address is required' },
  city: { required: true, message: 'City is required' },
  state: { required: true, message: 'State is required' },
  postalCode: { required: true, message: 'Postal code is required' },
  country: { required: true, message: 'Country is required' },
  addressType: { required: true, message: 'Address type is required' }
}

export const PROFESSIONAL_RULES = {
  company: { required: true, message: 'Company is required' },
  jobTitle: { required: true, message: 'Job title is required' },
  department: { required: true, message: 'Department is required' },
  experience: { required: true, message: 'Experience is required' },
  skills: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one skill is required'
  },
  salary: { required: true, message: 'Salary expectation is required' }
}

export const ADDITIONAL_RULES = {
  bio: {
    required: true,
    min: 10,
    message: 'Bio must be at least 10 characters'
  },
  hobbies: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one hobby is required'
  },
  languages: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one language is required'
  },
  workPreference: { required: true, message: 'Work preference is required' },
  startDate: { required: true, message: 'Start date is required' }
}
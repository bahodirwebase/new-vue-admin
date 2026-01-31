// Medium wizard validation rules
export const MEDIUM_PERSONAL_RULES = {
  firstName: { required: true, message: 'First name is required' },
  lastName: { required: true, message: 'Last name is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { required: true, message: 'Phone number is required' },
  location: { required: true, message: 'Location is required' }
}

export const MEDIUM_EXPERIENCE_RULES = {
  currentCompany: { required: true, message: 'Current company is required' },
  jobTitle: { required: true, message: 'Job title is required' },
  yearsExperience: { required: true, message: 'Experience level is required' },
  education: { required: true, message: 'Education is required' }
}

export const MEDIUM_SKILLS_RULES = {
  languages: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one language'
  },
  frameworks: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one framework'
  },
  experienceLevel: { required: true, message: 'Experience level is required' },
  salary: { required: true, message: 'Salary expectation is required' }
}
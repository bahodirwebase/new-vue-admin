export const COUNTDOWN_PRESETS = [
  { label: '5 seconds', value: 5 * 1000, unit: 'seconds' },
  { label: '30 seconds', value: 30 * 1000, unit: 'seconds' },
  { label: '1 minute', value: 60 * 1000, unit: 'minutes' },
  { label: '5 minutes', value: 5 * 60 * 1000, unit: 'minutes' },
  { label: '15 minutes', value: 15 * 60 * 1000, unit: 'minutes' },
  { label: '30 minutes', value: 30 * 60 * 1000, unit: 'minutes' },
  { label: '1 hour', value: 60 * 60 * 1000, unit: 'hours' },
  { label: '2 hours', value: 2 * 60 * 60 * 1000, unit: 'hours' }
]

export const PRECISION_OPTIONS = [
  { label: 'Seconds (0)', value: 0 },
  { label: 'Tenths (1)', value: 1 },
  { label: 'Hundredths (2)', value: 2 },
  { label: 'Milliseconds (3)', value: 3 }
]

export const FONT_SIZE_OPTIONS = [
  { label: 'Small (12px)', value: 12 },
  { label: 'Regular (16px)', value: 16 },
  { label: 'Large (20px)', value: 20 },
  { label: 'Extra Large (24px)', value: 24 }
]

export const COLOR_OPTIONS = [
  { label: 'Default', value: 'var(--text-primary)' },
  { label: 'Success', value: '#18a058' },
  { label: 'Warning', value: '#f0a020' },
  { label: 'Error', value: '#d03050' },
  { label: 'Info', value: '#2080f0' }
]

export const ROTATION_OPTIONS = [
  { label: 'Horizontal (0°)', value: 0 },
  { label: 'Diagonal (45°)', value: 45 },
  { label: 'Vertical (90°)', value: 90 },
  { label: 'Diagonal (-45°)', value: -45 }
]

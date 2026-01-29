export const WATERMARK_COLORS = [
  { label: 'Default', value: 'var(--text-color)' },
  { label: 'Red', value: '#d03050' },
  { label: 'Green', value: '#18a058' },
  { label: 'Blue', value: '#2080f0' },
  { label: 'Orange', value: '#f0a020' },
  { label: 'Gray', value: '#909399' }
]

export const WATERMARK_FONTS = [
  { label: 'Small (12px)', value: 12 },
  { label: 'Medium (16px)', value: 16 },
  { label: 'Large (20px)', value: 20 },
  { label: 'Extra Large (24px)', value: 24 },
  { label: 'Huge (32px)', value: 32 }
]

export const WATERMARK_ROTATIONS = [
  { label: 'Horizontal (0°)', value: 0 },
  { label: 'Diagonal (45°)', value: 45 },
  { label: 'Vertical (90°)', value: 90 },
  { label: 'Diagonal (-22°)', value: -22 },
  { label: 'Diagonal (-45°)', value: -45 }
]

export const WATERMARK_CONTENT = {
  confidential: 'CONFIDENTIAL',
  draft: 'DRAFT',
  sample: 'SAMPLE',
  demo: 'DEMO',
  copyright: 'COPYRIGHTED',
  doNotShare: 'DO NOT SHARE',
  internal: 'INTERNAL USE',
  brand: 'MyCompany™'
}

export const WATERMARK_GAPS = {
  tight: { x: 50, y: 100 },
  normal: { x: 100, y: 200 },
  loose: { x: 200, y: 300 },
  subtle: { x: 150, y: 250 }
}

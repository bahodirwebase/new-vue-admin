// Period options from bar-chart
export const PERIOD_OPTIONS = [
  { label: 'Last 7 Days', key: 'last7days' },
  { label: 'Last 14 Days', key: 'last14days' },
  { label: 'Last 30 Days', key: 'last30days' },
  { label: 'Last 90 Days', key: 'last90days' }
]

export const DATASET_OPTIONS = [
  { label: 'Sales Performance', key: 'sales' },
  { label: 'Revenue Analysis', key: 'revenue' },
  { label: 'Product Comparison', key: 'products' },
  { label: 'Category Distribution', key: 'categories' }
]

// Cascader options with chart data integration
export const CASCADER_OPTIONS = [
  {
    label: 'Electronics',
    value: 'electronics',
    children: [
      {
        label: 'Phones',
        value: 'phones',
        children: [
          { label: 'iPhone', value: 'iphone' },
          { label: 'Samsung', value: 'samsung' },
          { label: 'Xiaomi', value: 'xiaomi' }
        ]
      },
      {
        label: 'Laptops',
        value: 'laptops',
        children: [
          { label: 'MacBook', value: 'macbook' },
          { label: 'Dell', value: 'dell' },
          { label: 'HP', value: 'hp' }
        ]
      }
    ]
  },
  {
    label: 'Clothing',
    value: 'clothing',
    children: [
      {
        label: 'Men',
        value: 'men',
        children: [
          { label: 'Shirts', value: 'shirts' },
          { label: 'Pants', value: 'pants' },
          { label: 'Shoes', value: 'shoes' }
        ]
      },
      {
        label: 'Women',
        value: 'women',
        children: [
          { label: 'Dresses', value: 'dresses' },
          { label: 'Tops', value: 'tops' },
          { label: 'Skirts', value: 'skirts' }
        ]
      }
    ]
  }
]

export const CUSTOM_OPTIONS = [
  {
    label: 'Frontend',
    value: 'frontend',
    children: [
      { label: 'Vue.js', value: 'vue', type: 'framework' },
      { label: 'React', value: 'react', type: 'framework' },
      { label: 'Angular', value: 'angular', type: 'framework' }
    ]
  },
  {
    label: 'Backend',
    value: 'backend',
    children: [
      { label: 'Node.js', value: 'node', type: 'runtime' },
      { label: 'Python', value: 'python', type: 'language' },
      { label: 'Java', value: 'java', type: 'language' }
    ]
  }
]

export const CATEGORY_OPTIONS = [
  {
    label: 'Electronics',
    value: 'electronics',
    children: [
      {
        label: 'Smartphones',
        value: 'smartphones',
        children: [
          { label: 'iPhone 14', value: 'iphone14' },
          { label: 'Samsung Galaxy', value: 'galaxy' },
          { label: 'Pixel 7', value: 'pixel7' }
        ]
      },
      {
        label: 'Tablets',
        value: 'tablets',
        children: [
          { label: 'iPad Pro', value: 'ipadpro' },
          { label: 'Surface Pro', value: 'surfacepro' },
          { label: 'Galaxy Tab', value: 'galaxytab' }
        ]
      }
    ]
  },
  {
    label: 'Home & Garden',
    value: 'home',
    children: [
      {
        label: 'Furniture',
        value: 'furniture',
        children: [
          { label: 'Sofas', value: 'sofas' },
          { label: 'Chairs', value: 'chairs' },
          { label: 'Tables', value: 'tables' }
        ]
      },
      {
        label: 'Decor',
        value: 'decor',
        children: [
          { label: 'Wall Art', value: 'wallart' },
          { label: 'Lighting', value: 'lighting' },
          { label: 'Rugs', value: 'rugs' }
        ]
      }
    ]
  }
]

// Chart data for cascader categories
export const CHART_DATA = {
  electronics: {
    series: [
      {
        name: 'Sales Volume',
        data: [44000, 55000, 41000, 67000, 22000, 43000, 21000]
      }
    ],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    color: '#3b82f6'
  },
  clothing: {
    series: [
      {
        name: 'Sales Volume',
        data: [38000, 42000, 35000, 48000, 52000, 46000, 39000]
      }
    ],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    color: '#10b981'
  },
  'home-garden': {
    series: [
      {
        name: 'Sales Volume',
        data: [28000, 32000, 29000, 34000, 31000, 36000, 33000]
      }
    ],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    color: '#f59e0b'
  }
}

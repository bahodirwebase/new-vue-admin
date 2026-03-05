import { markRaw } from 'vue'
import {
  CashOutline,
  CartOutline,
  PeopleOutline,
  PricetagOutline,
  StarOutline,
  AlertCircleOutline,
  TimeOutline
} from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import type { StatCard, Order, Category, TrafficSource, Country, Activity, ConversionStat } from './types'

export const STAT_CARDS: StatCard[] = [
  {
    title: 'Total Sales',
    value: '$983,410',
    trend: '+3.34%',
    isPositive: true,
    period: 'vs last week',
    icon: CashOutline,
    color: 'orange'
  },
  {
    title: 'Total Orders',
    value: '58,375',
    trend: '-2.69%',
    isPositive: false,
    period: 'vs last week',
    icon: CartOutline,
    color: 'gray'
  },
  {
    title: 'Total Visitors',
    value: '237,782',
    trend: '+8.02%',
    isPositive: true,
    period: 'vs last week',
    icon: PeopleOutline,
    color: 'blue'
  }
]

export const ORDERS: Order[] = [
  { no: 1, orderId: '#10234', customer: 'Amaya Weller', product: 'Wireless Headphones', productIcon: '🎧', qty: 2, total: 100, status: 'Shipped' },
  { no: 2, orderId: '#10235', customer: 'Sebastian Adams', product: 'Running Shoes', productIcon: '👟', qty: 1, total: 75, status: 'Processing' },
  { no: 3, orderId: '#10236', customer: 'Suzanne Bright', product: 'Smartwatch', productIcon: '⌚', qty: 1, total: 150, status: 'Delivered' },
  { no: 4, orderId: '#10237', customer: 'Peter Howl', product: 'Coffee Maker', productIcon: '☕', qty: 1, total: 60, status: 'Pending' },
  { no: 5, orderId: '#10238', customer: 'Anita Singh', product: 'Bluetooth Speaker', productIcon: '🔊', qty: 3, total: 90, status: 'Shipped' }
]

export const CATEGORIES: Category[] = [
  { name: 'Electronics', value: 1200000 },
  { name: 'Fashion', value: 950000 },
  { name: 'Home & Kitchen', value: 750000 },
  { name: 'Beauty & Personal Care', value: 500000 }
]

export const CATEGORY_COLORS = [
  'var(--primary-color)',
  'var(--primary-color-800)',
  'var(--primary-color-500)',
  'var(--primary-color-300)'
]

export const TRAFFIC_SOURCES: TrafficSource[] = [
  { name: 'Direct Traffic', percentage: 40 },
  { name: 'Organic Search', percentage: 30 },
  { name: 'Social Media', percentage: 15 },
  { name: 'Referral Traffic', percentage: 10 },
  { name: 'Email Campaigns', percentage: 5 }
]

export const TRAFFIC_COLORS = [
  'var(--primary-color-800)',
  'var(--primary-color-600)',
  'var(--primary-color-400)',
  'var(--primary-color-200)',
  'var(--primary-color)'
]

export const COUNTRIES: Country[] = [
  { name: 'United States', percentage: 36 },
  { name: 'United Kingdom', percentage: 24 },
  { name: 'Indonesia', percentage: 17.5 },
  { name: 'Russia', percentage: 15 }
]

export const ACTIVE_USER_TOTAL = 2758
export const ACTIVE_USER_TREND = 8.02

export const ACTIVITIES: Activity[] = [
  {
    icon: markRaw(CartOutline),
    iconColor: '#ffffff',
    iconBg: 'var(--primary-color)',
    text: '<strong>Maureen Steel</strong> purchased 2 items totaling <strong>$120</strong>.',
    time: '10:30 AM'
  },
  {
    icon: markRaw(PricetagOutline),
    iconColor: '#ffffff',
    iconBg: 'var(--primary-color-200)',
    text: 'The price of <strong>"Smart TV"</strong> was updated from <strong>$500</strong> to <strong>$450</strong>.',
    time: '9:45 AM'
  },
  {
    icon: markRaw(StarOutline),
    iconColor: '#ffffff',
    iconBg: 'var(--primary-color-400)',
    text: '<strong>Vincent Laurent</strong> left a 5-star review for <strong>"Wireless Headphones."</strong>',
    time: '8:40 AM'
  },
  {
    icon: markRaw(AlertCircleOutline),
    iconColor: '#ffffff',
    iconBg: 'var(--primary-color-600)',
    text: '<strong>"Running Shoes"</strong> stock is below 10 units.',
    time: '7:55 AM'
  },
  {
    icon: markRaw(TimeOutline),
    iconColor: '#ffffff',
    iconBg: 'var(--primary-color-800)',
    text: '<strong>Damian Ugo\'s</strong> order status changed from <strong>"Pending"</strong> to <strong>"Processing."</strong>',
    time: '7:00 AM'
  }
]

export const CONVERSION_STATS: ConversionStat[] = [
  { label: 'Product Views', value: 25000, trend: 9 },
  { label: 'Add to Cart', value: 12000, trend: 6 },
  { label: 'Proceed to Checkout', value: 8500, trend: 4 },
  { label: 'Completed Purchases', value: 6200, trend: 7 },
  { label: 'Abandoned Carts', value: 3000, trend: -5 }
]

export const REVENUE_SERIES = [
  {
    name: 'Revenue',
    data: [9000, 10000, 9500, 11500, 12000, 13500, 12000, 11500, 12500]
  },
  {
    name: 'Order',
    data: [5500, 4000, 6000, 4500, 5000, 8500, 6000, 5000, 5500]
  }
]

export const REVENUE_CATEGORIES = [
  '12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug', '20 Aug'
]

export const PERIOD_OPTIONS: DropdownOption[] = [
  { label: 'Last 7 Days', key: 'last7days' },
  { label: 'Last 8 Days', key: 'last8days' },
  { label: 'Last 14 Days', key: 'last14days' },
  { label: 'Last 30 Days', key: 'last30days' }
]

export const CONVERSION_PERIOD_OPTIONS: DropdownOption[] = [
  { label: 'Today', key: 'today' },
  { label: 'This Week', key: 'thisweek' },
  { label: 'This Month', key: 'thismonth' },
  { label: 'This Year', key: 'thisyear' }
]

export const CATEGORY_FILTER_OPTIONS: DropdownOption[] = [
  { label: 'All Categories', key: 'all' },
  { label: 'Electronics', key: 'electronics' },
  { label: 'Fashion', key: 'fashion' },
  { label: 'Home & Kitchen', key: 'home' }
]

export const MENU_OPTIONS: DropdownOption[] = [
  { label: 'View Details', key: 'details' },
  { label: 'Export Data', key: 'export' },
  { label: 'Settings', key: 'settings' }
]

import { ref, computed, watch } from 'vue'
import { toRef } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { useThemeStore } from '@/stores/theme'
import { TRANSACTIONS } from '../constants'
import type { Transaction } from '../types'

// Module-level singleton state shared across widgets
const searchQuery = ref('')

export function useAnalytical() {
  const themeStore = useThemeStore()
  const isDark = toRef(themeStore, 'isDark')

  const filteredTransactions = computed<Transaction[]>(() => {
    if (!searchQuery.value) return TRANSACTIONS
    const query = searchQuery.value.toLowerCase()
    return TRANSACTIONS.filter(t =>
      t.customer.toLowerCase().includes(query) ||
      t.item.toLowerCase().includes(query)
    )
  })

  const chartOptionsSuccess = ref<ApexOptions>({
    chart: {
      toolbar: { show: false },
      sparkline: { enabled: false },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 4,
        color: 'var(--color-success)',
        opacity: 0.25,
      },
    },
    colors: ['var(--color-success)'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 },
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { theme: isDark.value ? 'dark' : 'light' },
  })

  const chartOptionsError = ref<ApexOptions>({
    chart: {
      toolbar: { show: false },
      sparkline: { enabled: false },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 4,
        color: 'var(--color-error)',
        opacity: 0.25,
      },
    },
    colors: ['var(--color-error)'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 },
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { theme: isDark.value ? 'dark' : 'light' },
  })

  watch(isDark, (val) => {
    const theme = val ? 'dark' : 'light'
    if (chartOptionsSuccess.value.tooltip) chartOptionsSuccess.value.tooltip.theme = theme
    if (chartOptionsError.value.tooltip) chartOptionsError.value.tooltip.theme = theme
  })

  return {
    isDark,
    searchQuery,
    filteredTransactions,
    chartOptionsSuccess,
    chartOptionsError,
  }
}

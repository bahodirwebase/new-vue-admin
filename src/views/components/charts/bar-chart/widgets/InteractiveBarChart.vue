<script lang="ts" setup>
import { computed, ref, toRef } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import { DATASET_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'

const apexchart = VueApexCharts
const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

// Period states
const selectedDataset = ref('Sales Performance')

// Interactive Bar Chart
const interactiveSeries = computed(() => {
    const datasets = {
        sales: [
            {
                name: 'Online Sales',
                data: [44000, 55000, 41000, 67000, 22000, 43000, 21000, 58000, 41000, 63000, 76000, 81000]
            },
            {
                name: 'Offline Sales',
                data: [33000, 41000, 62000, 33000, 56000, 33000, 81000, 49000, 52000, 71000, 68000, 92000]
            }
        ],
        revenue: [
            {
                name: 'Product Revenue',
                data: [120000, 132000, 101000, 134000, 90000, 230000, 210000, 122000, 133000, 201000, 212000, 233000]
            },
            {
                name: 'Service Revenue',
                data: [88000, 94000, 76000, 112000, 98000, 167000, 189000, 145000, 167000, 189000, 201000, 223000]
            }
        ],
        products: [
            {
                name: 'Electronics',
                data: [44, 55, 41, 67, 22, 43, 21, 58, 41, 63, 76, 81]
            },
            {
                name: 'Clothing',
                data: [33, 41, 62, 33, 56, 33, 81, 49, 52, 71, 68, 92]
            },
            {
                name: 'Food',
                data: [12, 15, 18, 25, 32, 28, 35, 42, 38, 51, 48, 62]
            }
        ],
        categories: [
            {
                name: 'Category A',
                data: [144000, 155000, 141000, 167000, 122000, 143000, 121000]
            },
            {
                name: 'Category B',
                data: [133000, 141000, 162000, 133000, 156000, 133000, 181000]
            },
            {
                name: 'Category C',
                data: [112000, 115000, 118000, 125000, 132000, 128000, 135000]
            }
        ]
    }

    const key = selectedDataset.value.toLowerCase().replace(' ', '')
    return datasets[key as keyof typeof datasets] || datasets.sales
})

const interactiveChartOptions = computed(() => ({
    chart: {
        type: 'bar' as const,
        height: 400,
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
            }
        },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['var(--primary-color)', '#22c55e', '#f59e0b', '#ef4444'],
    plotOptions: {
        bar: {
            borderRadius: 8,
            horizontal: false,
            columnWidth: '60%',
            dataLabels: {
                position: 'top'
            }
        }
    },
    grid: {
        borderColor: '#f0f0f0',
        strokeDashArray: 0,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
    },
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            style: {
                colors: '#999999',
                fontSize: '12px',
                fontWeight: 400
            }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#999999',
                fontSize: '12px',
                fontWeight: 400
            },
            formatter: function (value: number) {
                if (selectedDataset.value.includes('Performance') || selectedDataset.value.includes('Products')) {
                    return value.toLocaleString()
                }
                return '$' + (value / 1000) + 'K'
            }
        }
    },
    tooltip: {
        theme: isDark.value ? 'dark' : 'light',
        y: {
            formatter: function (value: number) {
                if (selectedDataset.value.includes('Performance') || selectedDataset.value.includes('Products')) {
                    return value.toLocaleString()
                }
                return '$' + value.toLocaleString()
            }
        }
    },
    legend: {
        show: true,
        position: 'top' as const,
        horizontalAlign: 'center' as const,
        labels: {
            colors: '#666666',
            useSeriesColors: false
        }
    }
}))

const handleDatasetSelect = (key: string) => {
    const option = DATASET_OPTIONS.find(opt => opt.key === key)
    if (option) {
        selectedDataset.value = option.label
    }
}


</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Interactive Bar Chart</h2>
            <n-dropdown :options="DATASET_OPTIONS" @select="handleDatasetSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ selectedDataset }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="bar" height="400" :options="interactiveChartOptions" :series="interactiveSeries" />
        </div>
    </n-card>
</template>
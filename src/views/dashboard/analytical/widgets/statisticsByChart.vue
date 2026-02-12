<script lang="ts" setup>
import { NCard, NIcon } from 'naive-ui';
import { TrendingDownOutline, TrendingUpOutline } from '@vicons/ionicons5';
import type { ApexOptions } from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

interface IProps {
    series: any[];
    chartOptions: ApexOptions;
    type: 'success' | 'error';
    label: string;
    value: string;
}

withDefaults(defineProps<IProps>(), {
    type: 'success',
    label: 'Users',
    value: '28.05k'
});
</script>

<template>
    <n-card>
        <div class="card-header">
            <h3>{{ label }}</h3>
            <div>
                <n-icon :component="type === 'success' ? TrendingUpOutline : TrendingDownOutline" size="18"
                    :color="type === 'success' ? 'var(--color-success)' : 'var(--color-error)'"></n-icon>
                <span :class="`custom-badge bg-${type}`">+12.5%</span>
            </div>
        </div>
        <h1>{{ value }}</h1>
        <div class="chart-wrapper">
            <apexchart type="area" height="150" :options="chartOptions" :series="series">
            </apexchart>
        </div>
    </n-card>
</template>

<style scoped>
.chart-wrapper {
    margin: -40px -20px;
}

.custom-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    color: white;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    margin-left: 8px;
}



:deep(.n-card .n-card__content) {
    padding: 16px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 768px) {
    :deep(.n-grid) {
        grid-template-columns: 1fr !important;
    }
}
</style>
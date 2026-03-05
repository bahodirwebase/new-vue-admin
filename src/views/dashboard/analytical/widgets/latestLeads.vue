<script setup lang="ts">
import { NCard, NButton, NAvatar } from 'naive-ui';
import { LEADS } from '../constants';

const leads = LEADS;
</script>

<template>
    <n-card class="leads-card" :bordered="false">
        <div class="card-header">
            <h3 class="card-title">Latest Leads</h3>
            <n-button text class="see-all-btn">
                See All
            </n-button>
        </div>

        <div class="leads-list">
            <div v-for="lead in leads" :key="lead.id" class="lead-item">
                <div class="lead-left">
                    <n-avatar :size="40" :src="lead.avatar" round :alt="lead.name" />
                    <span class="lead-name">{{ lead.name }}</span>
                </div>
                <span class="lead-time">{{ lead.time }}</span>
            </div>
        </div>
    </n-card>
</template>

<style scoped>
.leads-card {
    width: 100%;
    box-shadow: var(--shadow-md);
    background: var(--bg-primary);
}

.card-title {
    font-size: 1.5rem;
}

.see-all-btn {
    font-weight: 600;
    font-size: 0.9375rem;
    padding: 0;
    transition: all 0.2s ease;
}

.see-all-btn:hover {
    opacity: 0.8;
    transform: translateX(2px);
}

.leads-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.lead-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s ease;
}

.lead-item:last-child {
    border-bottom: none;
}

.lead-item:hover {
    padding-left: 0.5rem;
    background: var(--bg-secondary);
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    border-bottom-color: transparent;
}

.lead-left {
    display: flex;
    align-items: center;
    gap: 0.875rem;
}

.lead-name {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-primary);
}

.lead-time {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Dark mode specific styles */
[data-theme="dark"] .lead-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
    .leads-card {
        max-width: 100%;
    }

    .lead-item {
        padding: 0.75rem 0;
    }

    .lead-left {
        gap: 0.75rem;
    }
}
</style>
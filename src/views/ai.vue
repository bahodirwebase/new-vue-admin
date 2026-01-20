<template>
  <div class="stat-card">
      <h3 class="stat-value">7089</h3>
      <div class="stat-info">
        <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <span class="stat-label">New Leads</span>
      </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.stat-card {
  background: var(--bg-primary);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  width: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  line-height: 1;
}

.stat-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

/* Dark mode hover effects */
[data-theme="dark"] .stat-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

/* Responsive design */
@media (max-width: 768px) {
  .stat-card {
    padding: 1.25rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}
</style>
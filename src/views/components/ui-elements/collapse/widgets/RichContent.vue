<template>
  <n-card title="Rich Content">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Statistics in Collapse
        </h3>
        <n-collapse>
          <n-collapse-item title="User Statistics" name="stats">
            <div class="stats-grid">
              <div class="stat-item">
                <n-statistic label="Total Users" :value="1234" />
              </div>
              <div class="stat-item">
                <n-statistic label="Active Now" :value="567" />
              </div>
              <div class="stat-item">
                <n-statistic label="New Today" :value="89" />
              </div>
              <div class="stat-item">
                <n-statistic
                  label="Growth Rate"
                  :value="12.5"
                  suffix="%"
                />
              </div>
            </div>
          </n-collapse-item>
          <n-collapse-item title="Progress Overview" name="progress">
            <div class="progress-list">
              <div class="progress-item">
                <span>Frontend Development</span>
                <n-progress :percentage="85" />
              </div>
              <div class="progress-item">
                <span>Backend API</span>
                <n-progress :percentage="70" />
              </div>
              <div class="progress-item">
                <span>Database Design</span>
                <n-progress :percentage="90" />
              </div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.stat-item {
  text-align: center;
}

.progress-list {
  padding: 16px 0;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.progress-item span {
  min-width: 120px;
  font-weight: 500;
}
</style>

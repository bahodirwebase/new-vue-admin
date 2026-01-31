<script setup lang="ts">
import { CheckmarkOutline } from '@vicons/ionicons5'
import { useAccountActions } from './composables/useAccountActions'
import PersonalInfoWidget from './widgets/PersonalInfoWidget.vue'
import SecurityWidget from './widgets/SecurityWidget.vue'
import PreferencesWidget from './widgets/PreferencesWidget.vue'
import AccountStatsWidget from './widgets/AccountStatsWidget.vue'
import ConnectedAccountsWidget from './widgets/ConnectedAccountsWidget.vue'
import DeleteAccountWidget from './widgets/DeleteAccountWidget.vue'

const {
  isLoading,
  saveAllSettings
} = useAccountActions()

const handleSaveAllSettings = async () => {
  await saveAllSettings()
}
</script>

<template>
  <div class="account-settings p-0">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="page-title">Account Settings</h1>
          <p class="page-description">Manage your account preferences and security settings</p>
        </div>
        <div class="header-actions">
          <n-button type="primary" size="large" @click="handleSaveAllSettings" :loading="isLoading">
            <template #icon>
              <n-icon :component="CheckmarkOutline" />
            </template>
            Save All Changes
          </n-button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="settings-content">
      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-column">
          <PersonalInfoWidget />
          <SecurityWidget />
          <PreferencesWidget />
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <AccountStatsWidget />
          <ConnectedAccountsWidget />
          <DeleteAccountWidget />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.page-header {
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-info {
  flex: 1;
}


.header-actions {
  margin-left: 2rem;
}

.settings-content {
  max-width: 1200px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    margin-left: 0;
    width: 100%;
  }
  
  .header-actions .n-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem 0;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .page-description {
    font-size: 0.9rem;
  }
  
  .content-grid {
    gap: 1rem;
  }
  
  .left-column,
  .right-column {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 0.75rem 0;
    margin-bottom: 1.5rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
  
  .page-description {
    font-size: 0.85rem;
  }
  
  .content-grid {
    gap: 0.75rem;
  }
  
  .left-column,
  .right-column {
    gap: 0.75rem;
  }
}

@media (max-width: 360px) {
  .page-header {
    padding: 0.5rem 0;
    margin-bottom: 1rem;
  }
  
  .page-title {
    font-size: 1.1rem;
  }
  
  .page-description {
    font-size: 0.8rem;
  }
  
  .content-grid {
    gap: 0.5rem;
  }
}
</style>

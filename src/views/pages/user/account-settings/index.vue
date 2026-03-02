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
.settings-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-actions .n-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .page-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.25rem;
  }

  .page-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .page-title {
    font-size: 1.1rem;
  }

  .page-description {
    font-size: 0.8rem;
  }
}
</style>

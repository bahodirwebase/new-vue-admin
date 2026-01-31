<template>
  <n-card class="settings-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <div class="header-title">
          <n-icon :component="LinkOutline" />
          <h3>Connected Accounts</h3>
        </div>
        <n-button text size="small" @click="addAccount">
          <n-icon :component="AddOutline" />
        </n-button>
      </div>
    </template>
    <div class="connected-accounts">
      <div 
        v-for="account in connectedAccounts" 
        :key="account.platform" 
        class="account-item"
      >
        <div class="account-info">
          <n-icon :component="account.icon" />
          <div class="account-details">
            <span class="account-name">{{ account.platform }}</span>
            <span 
              class="account-status" 
              :class="account.connected ? 'connected' : 'disconnected'"
            >
              {{ account.connected ? 'Connected' : 'Not Connected' }}
            </span>
          </div>
        </div>
        <n-button 
          :type="account.connected ? 'error' : 'primary'" 
          size="small"
          @click="handleToggleAccount(account)"
          :loading="isLoading && loadingAccount === account.platform"
        >
          {{ account.connected ? 'Disconnect' : 'Connect' }}
        </n-button>
      </div>
      
      <div class="accounts-summary">
        <n-space justify="space-between">
          <span class="summary-text">
            {{ getConnectedCount() }} of {{ connectedAccounts.length }} accounts connected
          </span>
          <n-button text size="small" @click="handleAddAccount">
            <n-icon :component="AddOutline" />
            Add Account
          </n-button>
        </n-space>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LinkOutline, AddOutline } from '@vicons/ionicons5'
import { useConnectedAccounts } from '../composables/useConnectedAccounts'

const {
  connectedAccounts,
  toggleAccount,
  addAccount,
  getConnectedCount
} = useConnectedAccounts()

// Add loading state for account operations
const isLoading = ref(false)
const loadingAccount = ref('')

const handleToggleAccount = async (account: any) => {
  isLoading.value = true
  loadingAccount.value = account.platform
  try {
    await toggleAccount(account)
  } finally {
    isLoading.value = false
    loadingAccount.value = ''
  }
}

const handleAddAccount = () => {
  addAccount()
}
</script>

<style scoped>
.settings-card {
  transition: all 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  margin: 0;
  color: var(--text-primary);
}

.connected-accounts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.account-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.account-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.account-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.account-name {
  font-weight: 500;
  color: var(--text-primary);
}

.account-status {
  font-size: 0.85rem;
  font-weight: 500;
}

.account-status.connected {
  color: #22c55e;
}

.account-status.disconnected {
  color: #ef4444;
}

.accounts-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.summary-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>

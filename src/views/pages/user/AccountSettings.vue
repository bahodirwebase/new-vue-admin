<template>
  <div class="account-settings">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="page-title">Account Settings</h1>
          <p class="page-description">Manage your account preferences and security settings</p>
        </div>
        <div class="header-actions">
          <n-button type="primary" size="large" @click="saveAllSettings">
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
          <!-- Personal Information -->
          <n-card class="settings-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  <n-icon :component="PersonOutline" />
                  <h3>Personal Information</h3>
                </div>
                <n-button text size="small" @click="editPersonalInfo">
                  <n-icon :component="CreateOutline" />
                </n-button>
              </div>
            </template>
            <div class="settings-form">
              <div class="form-group">
                <label>First Name</label>
                <n-input v-model:value="personalInfo.firstName" placeholder="Enter your first name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <n-input v-model:value="personalInfo.lastName" placeholder="Enter your last name" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <n-input v-model:value="personalInfo.email" placeholder="Enter your email" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <n-input v-model:value="personalInfo.phone" placeholder="Enter your phone number" />
              </div>
              <div class="form-group">
                <label>Bio</label>
                <n-input 
                  type="textarea" 
                  v-model:value="personalInfo.bio" 
                  placeholder="Tell us about yourself"
                  :rows="3"
                />
              </div>
            </div>
          </n-card>

          <!-- Security Settings -->
          <n-card class="settings-card security-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  <n-icon :component="LockClosedOutline" />
                  <h3>Security</h3>
                </div>
                <n-button text size="small" @click="editSecurity">
                  <n-icon :component="CreateOutline" />
                </n-button>
              </div>
            </template>
            <div class="settings-form">
              <div class="form-group">
                <label>Current Password</label>
                <n-input 
                  type="password" 
                  v-model:value="securityData.currentPassword" 
                  placeholder="Enter current password"
                  show-password-on="click"
                />
              </div>
              <div class="form-group">
                <label>New Password</label>
                <n-input 
                  type="password" 
                  v-model:value="securityData.newPassword" 
                  placeholder="Enter new password"
                  show-password-on="click"
                />
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <n-input 
                  type="password" 
                  v-model:value="securityData.confirmPassword" 
                  placeholder="Confirm new password"
                  show-password-on="click"
                />
              </div>
              <div class="password-strength">
                <div class="strength-label">Password Strength</div>
                <div class="strength-bar">
                  <div class="strength-fill" :class="passwordStrengthClass"></div>
                </div>
                <span class="strength-text">{{ passwordStrengthText }}</span>
              </div>
            </div>
          </n-card>

          <!-- Preferences -->
          <n-card class="settings-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  <n-icon :component="SettingsOutline" />
                  <h3>Preferences</h3>
                </div>
              </div>
            </template>
            <div class="preferences-list">
              <div class="preference-item">
                <div class="preference-info">
                  <h4>Email Notifications</h4>
                  <p>Receive email updates about your account activity</p>
                </div>
                <n-switch v-model:value="preferences.emailNotifications" />
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <n-switch v-model:value="preferences.twoFactorAuth" />
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <h4>Dark Mode</h4>
                  <p>Use dark theme across the application</p>
                </div>
                <n-switch v-model:value="preferences.darkMode" />
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <h4>Public Profile</h4>
                  <p>Make your profile visible to other users</p>
                </div>
                <n-switch v-model:value="preferences.publicProfile" />
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <h4>Marketing Emails</h4>
                  <p>Receive promotional offers and updates</p>
                </div>
                <n-switch v-model:value="preferences.marketingEmails" />
              </div>
            </div>
          </n-card>
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <!-- Account Statistics -->
          <n-card class="stats-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  <n-icon :component="BarChartOutline" />
                  <h3>Account Statistics</h3>
                </div>
              </div>
            </template>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-icon">
                  <n-icon :component="CalendarOutline" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ accountStats.memberSince }}</span>
                  <span class="stat-label">Member Since</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <n-icon :component="DocumentTextOutline" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ accountStats.totalProjects }}</span>
                  <span class="stat-label">Total Projects</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <n-icon :component="TimeOutline" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ accountStats.lastLogin }}</span>
                  <span class="stat-label">Last Login</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <n-icon :component="ShieldCheckmarkOutline" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ accountStats.securityLevel }}</span>
                  <span class="stat-label">Security Level</span>
                </div>
              </div>
            </div>
          </n-card>

          <!-- Connected Accounts -->
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
              <div v-for="account in connectedAccounts" :key="account.platform" class="account-item">
                <div class="account-info">
                  <n-icon :component="account.icon" />
                  <div class="account-details">
                    <span class="account-name">{{ account.platform }}</span>
                    <span class="account-status" :class="account.connected ? 'connected' : 'disconnected'">
                      {{ account.connected ? 'Connected' : 'Not Connected' }}
                    </span>
                  </div>
                </div>
                <n-button 
                  :type="account.connected ? 'error' : 'primary'" 
                  size="small"
                  @click="toggleAccount(account)"
                >
                  {{ account.connected ? 'Disconnect' : 'Connect' }}
                </n-button>
              </div>
            </div>
          </n-card>

          <!-- Danger Zone -->
          <n-card class="danger-card" :bordered="false">
            <template #header>
              <div class="card-header danger-header">
                <div class="header-title">
                  <n-icon :component="WarningOutline" />
                  <h3>Danger Zone</h3>
                </div>
              </div>
            </template>
            <div class="danger-zone">
              <div class="danger-item">
                <div class="danger-info">
                  <h4>Export Data</h4>
                  <p>Download all your data in JSON format</p>
                </div>
                <n-button @click="exportData">Export Data</n-button>
              </div>
              <div class="danger-item">
                <div class="danger-info">
                  <h4>Deactivate Account</h4>
                  <p>Temporarily disable your account</p>
                </div>
                <n-button type="warning" @click="deactivateAccount">Deactivate</n-button>
              </div>
              <div class="danger-item">
                <div class="danger-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
                <n-button type="error" @click="confirmDeleteAccount">Delete Account</n-button>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- Confirmation Modals -->
    <n-modal v-model:show="showDeleteModal" preset="dialog" title="Delete Account">
      <template #header>
        <div class="modal-header">
          <n-icon :component="WarningOutline" />
          <span>Delete Account</span>
        </div>
      </template>
      <div class="modal-content">
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="confirmation-input">
          <label>Type "DELETE" to confirm:</label>
          <n-input v-model:value="deleteConfirmation" placeholder="DELETE" />
        </div>
      </div>
      <template #action>
        <n-button @click="showDeleteModal = false">Cancel</n-button>
        <n-button 
          type="error" 
          :disabled="deleteConfirmation !== 'DELETE'"
          @click="deleteAccount"
        >
          Delete Account
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  NCard, NButton, NIcon, NInput, NSwitch, NModal,
  useMessage
} from 'naive-ui'
import {
  PersonOutline, LockClosedOutline, SettingsOutline, CreateOutline,
  CheckmarkOutline, BarChartOutline, CalendarOutline, DocumentTextOutline,
  TimeOutline, ShieldCheckmarkOutline, LinkOutline, AddOutline,
  WarningOutline, LogoGithub, LogoTwitter, LogoGoogle, LogoFacebook
} from '@vicons/ionicons5'

const message = useMessage()

// Personal Information
const personalInfo = reactive({
  firstName: 'Alexandra',
  lastName: 'Chen',
  email: 'alexandra.chen@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Senior Full Stack Developer passionate about building scalable web applications.'
})

// Security Data
const securityData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Preferences
const preferences = reactive({
  emailNotifications: true,
  twoFactorAuth: false,
  darkMode: false,
  publicProfile: true,
  marketingEmails: false
})

// Account Statistics
const accountStats = reactive({
  memberSince: 'Jan 2022',
  totalProjects: 127,
  lastLogin: '2 hours ago',
  securityLevel: 'High'
})

// Connected Accounts
const connectedAccounts = reactive([
  { platform: 'GitHub', icon: LogoGithub, connected: true },
  { platform: 'Google', icon: LogoGoogle, connected: true },
  { platform: 'Twitter', icon: LogoTwitter, connected: false },
  { platform: 'Facebook', icon: LogoFacebook, connected: false }
])

// Modal States
const showDeleteModal = ref(false)
const deleteConfirmation = ref('')

// Computed Properties
const passwordStrengthClass = computed(() => {
  const password = securityData.newPassword
  if (!password) return ''
  if (password.length < 6) return 'weak'
  if (password.length < 10) return 'medium'
  return 'strong'
})

const passwordStrengthText = computed(() => {
  const password = securityData.newPassword
  if (!password) return 'Enter a password'
  if (password.length < 6) return 'Weak'
  if (password.length < 10) return 'Medium'
  return 'Strong'
})

// Methods
const saveAllSettings = () => {
  message.success('All settings saved successfully!')
}

const editPersonalInfo = () => {
  message.info('Editing personal information')
}

const editSecurity = () => {
  message.info('Editing security settings')
}

const exportData = () => {
  message.info('Exporting your data...')
}

const deactivateAccount = () => {
  message.warning('Account deactivation feature coming soon')
}

const confirmDeleteAccount = () => {
  showDeleteModal.value = true
}

const deleteAccount = () => {
  if (deleteConfirmation.value === 'DELETE') {
    message.error('Account deletion feature coming soon')
    showDeleteModal.value = false
    deleteConfirmation.value = ''
  }
}

const addAccount = () => {
  message.info('Add account feature coming soon')
}

const toggleAccount = (account: any) => {
  account.connected = !account.connected
  message.success(`${account.platform} ${account.connected ? 'connected' : 'disconnected'}`)
}
</script>

<style scoped>
.account-settings {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header-info p {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Main Content */
.settings-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
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

/* Cards */
.settings-card,
.stats-card,
.danger-card {
  transition: all 0.3s ease;
}

.settings-card:hover,
.stats-card:hover {
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

.danger-header .header-title h3 {
  color: #ef4444;
}

/* Forms */
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
}

/* Password Strength */
.password-strength {
  margin-top: 1rem;
}

.strength-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.strength-bar {
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.strength-fill {
  height: 100%;
  width: 0;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-fill.weak {
  width: 33%;
  background: #ef4444;
}

.strength-fill.medium {
  width: 66%;
  background: #f59e0b;
}

.strength-fill.strong {
  width: 100%;
  background: #22c55e;
}

.strength-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Preferences */
.preferences-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.preference-info h4 {
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.preference-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Statistics */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.stat-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-weight: 600;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Connected Accounts */
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
}

.account-info {
  display: flex;
  align-items: center;
  gap: 1rem;
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
}

.account-status.connected {
  color: #22c55e;
}

.account-status.disconnected {
  color: #ef4444;
}

/* Danger Zone */
.danger-card {
  border: 1px solid #ef4444;
}

.danger-zone {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.danger-info h4 {
  color: #ef4444;
  margin-bottom: 0.25rem;
}

.danger-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Modal */
.modal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
}

.modal-content {
  padding: 1rem 0;
}

.confirmation-input {
  margin-top: 1rem;
}

.confirmation-input label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .settings-content {
    padding: 0 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .account-item,
  .danger-item,
  .preference-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .account-item .n-button,
  .danger-item .n-button,
  .preference-item .n-switch {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .header-info h1 {
    font-size: 1.5rem;
  }
}
</style>
<template>
  <div class="account-settings">
    <div class="main-card">
      <div class="card-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and security settings</p>
      </div>
      <div class="card-body">
        <div class="settings-sections">
          <div class="section">
            <h2>Personal Information</h2>
            <form class="settings-form">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="formData.firstName" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="formData.lastName" />
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" v-model="formData.email" />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="formData.phone" />
              </div>
              <button type="submit" class="btn-primary" @click.prevent="savePersonalInfo">Save Changes</button>
            </form>
          </div>

          <div class="section">
            <h2>Security</h2>
            <form class="settings-form">
              <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" v-model="passwordData.currentPassword" />
              </div>
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" v-model="passwordData.newPassword" />
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" v-model="passwordData.confirmPassword" />
              </div>
              <button type="submit" class="btn-primary" @click.prevent="changePassword">Update Password</button>
            </form>
          </div>

          <div class="section">
            <h2>Preferences</h2>
            <div class="preferences-form">
              <div class="preference-item">
                <label class="switch">
                  <input type="checkbox" v-model="preferences.emailNotifications" />
                  <span class="slider"></span>
                </label>
                <div class="preference-info">
                  <h3>Email Notifications</h3>
                  <p>Receive email updates about your account activity</p>
                </div>
              </div>
              <div class="preference-item">
                <label class="switch">
                  <input type="checkbox" v-model="preferences.twoFactorAuth" />
                  <span class="slider"></span>
                </label>
                <div class="preference-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
              </div>
              <div class="preference-item">
                <label class="switch">
                  <input type="checkbox" v-model="preferences.darkMode" />
                  <span class="slider"></span>
                </label>
                <div class="preference-info">
                  <h3>Dark Mode</h3>
                  <p>Use dark theme across the application</p>
                </div>
              </div>
            </div>
          </div>

          <div class="section danger-section">
            <h2>Danger Zone</h2>
            <div class="danger-zone">
              <div class="danger-item">
                <div class="danger-info">
                  <h3>Delete Account</h3>
                  <p>Permanently delete your account and all associated data</p>
                </div>
                <button class="btn-danger" @click="confirmDeleteAccount">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567'
})

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const preferences = ref({
  emailNotifications: true,
  twoFactorAuth: false,
  darkMode: false
})

const savePersonalInfo = () => {
  console.log('Saving personal info:', formData.value)
}

const changePassword = () => {
  console.log('Changing password')
}

const confirmDeleteAccount = () => {
  console.log('Deleting account')
}
</script>

<style scoped>
.account-settings {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.main-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 2rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.card-header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.card-header p {
  color: var(--text-secondary);
  margin: 0;
}

.card-body {
  padding: 2rem;
}

.settings-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.section {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.danger-section {
  border-color: #ef4444;
}

.section h2 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.danger-section h2 {
  color: #ef4444;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.form-group input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.preferences-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preference-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.preference-info h3 {
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.preference-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.danger-zone {
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 1rem;
  background: #fef2f2;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.danger-info h3 {
  color: #ef4444;
  margin-bottom: 0.25rem;
}

.danger-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .account-settings {
    padding: 1rem;
  }

  .settings-sections {
    grid-template-columns: 1fr;
  }

  .danger-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-danger {
    width: 100%;
  }
}
</style>

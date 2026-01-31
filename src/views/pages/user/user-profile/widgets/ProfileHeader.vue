<template>
  <div class="profile-header">
    <div class="profile-cover">
      <div class="cover-image">
        <img :src="userData.coverImage" alt="Cover" />
        <div class="cover-overlay"></div>
      </div>
      <div class="profile-info">
        <div class="profile-avatar">
          <img :src="userData.avatar" alt="Profile" />
          <div class="avatar-badge">
            <n-icon :component="CameraOutline" />
          </div>
        </div>
        <div class="profile-details">
          <h1 class="profile-name">{{ userData.fullName }}</h1>
          <p class="profile-title">{{ userData.title }}</p>
          <div class="profile-meta">
            <span class="meta-item">
              <n-icon :component="LocationOutline" />
              {{ userData.location }}
            </span>
            <span class="meta-item">
              <n-icon :component="BusinessOutline" />
              {{ userData.company }}
            </span>
            <span class="meta-item">
              <n-icon :component="CalendarOutline" />
              Joined {{ userData.joinDate }}
            </span>
          </div>
        </div>
        <div class="profile-actions">
          <n-button type="primary" size="large" @click="editProfile">
            <template #icon>
              <n-icon :component="CreateOutline" />
            </template>
            Edit Profile
          </n-button>
          <n-button size="large" @click="viewSettings">
            <template #icon>
              <n-icon :component="SettingsOutline" />
            </template>
            Settings
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  CameraOutline, CreateOutline, SettingsOutline, LocationOutline, 
  BusinessOutline, CalendarOutline 
} from '@vicons/ionicons5'
import { useUserProfile } from '../composables/useUserProfile'
import { useProfileActions } from '../composables/useProfileActions'

const { userData } = useUserProfile()
const { editProfile, viewSettings } = useProfileActions()
</script>

<style scoped>
.profile-header {
  margin-bottom: 2rem;
}

.profile-cover {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.cover-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
}

.profile-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.avatar-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.avatar-badge:hover {
  background: var(--primary-color-hover);
  transform: scale(1.1);
}

.profile-details {
  flex: 1;
  color: white;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }

  .profile-avatar img {
    width: 100px;
    height: 100px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-meta {
    justify-content: center;
  }

  .profile-actions {
    flex-direction: column;
    width: 100%;
  }

  .profile-actions .n-button {
    width: 100%;
  }
}
</style>

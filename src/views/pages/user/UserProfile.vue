<template>
  <div class="user-profile">
    <n-card class="main-card" :bordered="false">
      <template #header>
        <div class="card-header">
          <h1>User Profile</h1>
          <n-space>
            <n-button type="primary" @click="editProfile">
              <template #icon>
                <n-icon :component="CreateOutline" />
              </template>
              Edit Profile
            </n-button>
            <n-button @click="viewSettings">
              <template #icon>
                <n-icon :component="SettingsOutline" />
              </template>
              Settings
            </n-button>
          </n-space>
        </div>
      </template>

      <div class="card-body">
        <div class="profile-header">
          <div class="profile-avatar">
            <n-avatar
              :size="150"
              :src="avatarUrl"
              class="avatar-img"
              @click="changeAvatar"
            >
              <n-icon :component="PersonOutline" />
            </n-avatar>
            <n-button 
              circle 
              type="primary" 
              class="avatar-edit-btn"
              @click="changeAvatar"
            >
              <template #icon>
                <n-icon :component="CameraOutline" />
              </template>
            </n-button>
          </div>
          <div class="profile-info">
            <h2>{{ profile.name }}</h2>
            <n-tag type="info" size="large" class="profile-title">
              {{ profile.title }}
            </n-tag>
            <div class="profile-email">
              <n-icon :component="MailOutline" />
              {{ profile.email }}
            </div>
            <n-space style="margin-top: 12px;">
              <n-tag v-for="status in profile.statuses" :key="status" size="small">
                {{ status }}
              </n-tag>
            </n-space>
          </div>
        </div>

        <n-tabs type="line" animated>
          <n-tab-pane name="about" tab="About Me">
            <div class="section">
              <h3>About Me</h3>
              <p>{{ profile.about }}</p>
            </div>
          </n-tab-pane>

          <n-tab-pane name="skills" tab="Skills">
            <div class="section">
              <h3>Skills</h3>
              <n-space wrap>
                <n-tag 
                  v-for="skill in profile.skills" 
                  :key="skill" 
                  type="primary"
                  round
                  size="medium"
                >
                  {{ skill }}
                </n-tag>
              </n-space>
            </div>
          </n-tab-pane>

          <n-tab-pane name="contact" tab="Contact">
            <div class="section">
              <h3>Contact Information</h3>
              <n-descriptions :column="1" bordered>
                <n-descriptions-item label="Email">
                  <n-space align="center">
                    <n-icon :component="MailOutline" />
                    {{ profile.contact.email }}
                  </n-space>
                </n-descriptions-item>
                <n-descriptions-item label="Phone">
                  <n-space align="center">
                    <n-icon :component="CallOutline" />
                    {{ profile.contact.phone }}
                  </n-space>
                </n-descriptions-item>
                <n-descriptions-item label="Location">
                  <n-space align="center">
                    <n-icon :component="LocationOutline" />
                    {{ profile.contact.location }}
                  </n-space>
                </n-descriptions-item>
                <n-descriptions-item label="Website">
                  <n-space align="center">
                    <n-icon :component="GlobeOutline" />
                    <n-button text type="primary" @click="openWebsite">
                      {{ profile.contact.website }}
                    </n-button>
                  </n-space>
                </n-descriptions-item>
              </n-descriptions>
            </div>
          </n-tab-pane>

          <n-tab-pane name="social" tab="Social Links">
            <div class="section">
              <h3>Social Links</h3>
              <n-space vertical size="12">
                <n-button 
                  v-for="link in profile.socialLinks" 
                  :key="link.name"
                  block
                  size="large"
                  @click="openSocialLink(link)"
                >
                  <template #icon>
                    <n-icon :component="link.icon" />
                  </template>
                  {{ link.name }}
                </n-button>
              </n-space>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { 
  PersonOutline, 
  MailOutline, 
  CreateOutline, 
  SettingsOutline,
  CameraOutline,
  CallOutline,
  LocationOutline,
  GlobeOutline,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
  DesktopOutline
} from '@vicons/ionicons5'

const message = useMessage()
const avatarUrl = ref('https://picsum.photos/seed/user-avatar/150/150.jpg')

const profile = reactive({
  name: 'John Doe',
  title: 'Senior Frontend Developer',
  email: 'john.doe@example.com',
  about: 'Passionate frontend developer with 5+ years of experience in building modern web applications using Vue.js, React, and TypeScript. I love creating intuitive user interfaces and solving complex problems.',
  skills: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'CSS/Sass', 'Git'],
  statuses: ['Active', 'Available'],
  contact: {
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev'
  },
  socialLinks: [
    { name: 'GitHub', icon: LogoGithub, url: 'https://github.com' },
    { name: 'LinkedIn', icon: LogoLinkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: LogoTwitter, url: 'https://twitter.com' },
    { name: 'Portfolio', icon: DesktopOutline, url: 'https://johndoe.dev' }
  ]
})

const editProfile = () => {
  message.info('Edit profile (demo)')
}

const viewSettings = () => {
  message.info('View settings (demo)')
}

const changeAvatar = () => {
  message.info('Change avatar (demo)')
}

const openWebsite = () => {
  message.info('Open website (demo)')
}

const openSocialLink = (link: any) => {
  message.info(`Open ${link.name} (demo)`)
}
</script>

<style scoped>
.user-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  font-size: 1.8rem;
  margin: 0;
  color: var(--text-primary);
}

.card-body {
  padding: 0;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  border: 4px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-img:hover {
  transform: scale(1.05);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.profile-title {
  margin-bottom: 0.75rem;
}

.profile-email {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 1rem;
}

.section {
  padding: 1.5rem;
}

.section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.section p {
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }

  .profile-info h2 {
    font-size: 1.5rem;
  }
}
</style>

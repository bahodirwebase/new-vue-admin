<template>
  <div class="user-profile">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-cover">
        <div class="cover-image">
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Cover" />
          <div class="cover-overlay"></div>
        </div>
        <div class="profile-info">
          <div class="profile-avatar">
            <img src="https://i.pravatar.cc/150?img=3" alt="Profile" />
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

    <!-- Main Content -->
    <div class="profile-content">
      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-column">
          <!-- About Section -->
          <n-card class="about-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>About</h3>
                <n-button text size="small" @click="editAbout">
                  <n-icon :component="CreateOutline" />
                </n-button>
              </div>
            </template>
            <p class="about-text">{{ userData.about }}</p>
            <div class="about-stats">
              <div class="stat-item">
                <span class="stat-value">{{ userData.projectsCompleted }}</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userData.experience }}</span>
                <span class="stat-label">Experience</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userData.rating }}</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </n-card>

          <!-- Skills Section -->
          <n-card class="skills-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>Skills</h3>
                <n-button text size="small" @click="editSkills">
                  <n-icon :component="AddOutline" />
                </n-button>
              </div>
            </template>
            <div class="skills-list">
              <n-tag 
                v-for="skill in userData.skills" 
                :key="skill.name"
                :type="skill.level === 'Expert' ? 'success' : skill.level === 'Advanced' ? 'primary' : 'default'"
                size="medium"
                round
              >
                {{ skill.name }}
              </n-tag>
            </div>
          </n-card>

          <!-- Social Links -->
          <n-card class="social-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>Social Links</h3>
                <n-button text size="small" @click="editSocial">
                  <n-icon :component="CreateOutline" />
                </n-button>
              </div>
            </template>
            <div class="social-links">
              <a v-for="link in userData.socialLinks" :key="link.platform" :href="link.url" class="social-link">
                <n-icon :component="link.icon" />
                <span>{{ link.platform }}</span>
              </a>
            </div>
          </n-card>
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <!-- Activity Feed -->
          <n-card class="activity-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>Recent Activity</h3>
                <n-dropdown :options="activityOptions" trigger="click">
                  <n-button text size="small">
                    <n-icon :component="FilterOutline" />
                  </n-button>
                </n-dropdown>
              </div>
            </template>
            <div class="activity-feed">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                <div class="activity-icon" :class="`activity-icon--${activity.type}`">
                  <n-icon :component="activity.icon" />
                </div>
                <div class="activity-content">
                  <p class="activity-text">{{ activity.text }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </n-card>

          <!-- Projects Gallery -->
          <n-card class="projects-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>Recent Projects</h3>
                <n-button text size="small" @click="viewAllProjects">
                  View All
                </n-button>
              </div>
            </template>
            <div class="projects-grid">
              <div v-for="project in userData.recentProjects" :key="project.id" class="project-item">
                <div class="project-image">
                  <img :src="project.image" :alt="project.name" />
                  <div class="project-overlay">
                    <n-button circle type="primary" size="small" @click="viewProject(project)">
                      <n-icon :component="EyeOutline" />
                    </n-button>
                  </div>
                </div>
                <div class="project-info">
                  <h4 class="project-name">{{ project.name }}</h4>
                  <p class="project-description">{{ project.description }}</p>
                  <div class="project-stats">
                    <span class="project-stat">
                      <n-icon :component="HeartOutline" />
                      {{ project.likes }}
                    </span>
                    <span class="project-stat">
                      <n-icon :component="ChatbubbleOutline" />
                      {{ project.comments }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </n-card>

          <!-- Contact Info -->
          <n-card class="contact-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <h3>Contact Information</h3>
                <n-button text size="small" @click="editContact">
                  <n-icon :component="CreateOutline" />
                </n-button>
              </div>
            </template>
            <div class="contact-info">
              <div class="contact-item">
                <n-icon :component="MailOutline" />
                <div class="contact-details">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">{{ userData.email }}</span>
                </div>
              </div>
              <div class="contact-item">
                <n-icon :component="PhonePortraitOutline" />
                <div class="contact-details">
                  <span class="contact-label">Phone</span>
                  <span class="contact-value">{{ userData.phone }}</span>
                </div>
              </div>
              <div class="contact-item">
                <n-icon :component="GlobeOutline" />
                <div class="contact-details">
                  <span class="contact-label">Website</span>
                  <a :href="userData.website" class="contact-value">{{ userData.website }}</a>
                </div>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <n-modal v-model:show="showEditModal" preset="dialog" title="Edit Profile">
      <div class="edit-form">
        <n-form :model="editForm" label-placement="left" label-width="100">
          <n-form-item label="Full Name">
            <n-input v-model:value="editForm.fullName" />
          </n-form-item>
          <n-form-item label="Title">
            <n-input v-model:value="editForm.title" />
          </n-form-item>
          <n-form-item label="Location">
            <n-input v-model:value="editForm.location" />
          </n-form-item>
          <n-form-item label="Company">
            <n-input v-model:value="editForm.company" />
          </n-form-item>
          <n-form-item label="About">
            <n-input type="textarea" v-model:value="editForm.about" :rows="4" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <n-button @click="showEditModal = false">Cancel</n-button>
        <n-button type="primary" @click="saveProfile">Save Changes</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  NCard, NButton, NIcon, NTag, NModal, NForm, NFormItem, NInput, NDropdown
} from 'naive-ui'
import { 
  CameraOutline, CreateOutline, SettingsOutline, LocationOutline, 
  BusinessOutline, CalendarOutline, AddOutline, FilterOutline,
  EyeOutline, HeartOutline, ChatbubbleOutline, MailOutline,
  PhonePortraitOutline, GlobeOutline, DocumentTextOutline,
  TimeOutline, TrophyOutline, PeopleOutline, LogoGithub,
  LogoTwitter, LogoLinkedin, LogoFacebook
} from '@vicons/ionicons5'

// User data
const userData = reactive({
  fullName: 'Alexandra Chen',
  title: 'Senior Full Stack Developer',
  location: 'San Francisco, CA',
  company: 'Tech Innovations Inc.',
  joinDate: 'January 2022',
  about: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in Vue.js, Node.js, and cloud architecture. Love contributing to open source and mentoring junior developers.',
  projectsCompleted: 127,
  experience: '8+ years',
  rating: '4.9/5.0',
  email: 'alexandra.chen@example.com',
  phone: '+1 (555) 123-4567',
  website: 'www.alexandrachen.dev',
  skills: [
    { name: 'Vue.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'AWS', level: 'Intermediate' },
    { name: 'Docker', level: 'Intermediate' },
    { name: 'GraphQL', level: 'Advanced' },
    { name: 'MongoDB', level: 'Advanced' }
  ],
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com', icon: LogoGithub },
    { platform: 'Twitter', url: 'https://twitter.com', icon: LogoTwitter },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: LogoLinkedin },
    { platform: 'Facebook', url: 'https://facebook.com', icon: LogoFacebook }
  ],
  recentProjects: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with Vue 3',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Collaborative project management tool',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      description: 'Real-time data visualization platform',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 156,
      comments: 28
    }
  ]
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    type: 'project',
    icon: DocumentTextOutline,
    text: 'Completed E-Commerce Platform project',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'achievement',
    icon: TrophyOutline,
    text: 'Earned "Top Contributor" badge',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'social',
    icon: PeopleOutline,
    text: 'Connected with 5 new developers',
    time: '2 days ago'
  },
  {
    id: 4,
    type: 'time',
    icon: TimeOutline,
    text: 'Logged 40 hours this week',
    time: '3 days ago'
  }
])

// Activity filter options
const activityOptions = [
  { label: 'All Activities', key: 'all' },
  { label: 'Projects', key: 'project' },
  { label: 'Achievements', key: 'achievement' },
  { label: 'Social', key: 'social' }
]

// Modal state
const showEditModal = ref(false)
const editForm = reactive({
  fullName: userData.fullName,
  title: userData.title,
  location: userData.location,
  company: userData.company,
  about: userData.about
})

// Methods
const editProfile = () => {
  showEditModal.value = true
}

const saveProfile = () => {
  Object.assign(userData, editForm)
  showEditModal.value = false
}

const viewSettings = () => {
  console.log('Navigate to settings')
}

const editAbout = () => {
  editProfile()
}

const editSkills = () => {
  console.log('Edit skills')
}

const editSocial = () => {
  console.log('Edit social links')
}

const viewAllProjects = () => {
  console.log('View all projects')
}

const viewProject = (project: any) => {
  console.log('View project:', project.name)
}

const editContact = () => {
  console.log('Edit contact information')
}
</script>

<style scoped>
.user-profile {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* Profile Header */
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
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
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
  border: 4px solid var(--bg-primary);
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-badge:hover {
  transform: scale(1.1);
}

.profile-details {
  flex: 1;
  color: white;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.profile-title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.profile-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
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

/* Main Content */
.profile-content {
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
.about-card,
.skills-card,
.social-card,
.activity-card,
.projects-card,
.contact-card {
  transition: all 0.3s ease;
}

.about-card:hover,
.skills-card:hover,
.social-card:hover,
.activity-card:hover,
.projects-card:hover,
.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
}

/* About Section */
.about-text {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.about-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Skills Section */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Social Links */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--bg-secondary);
  transform: translateX(4px);
}

/* Activity Feed */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon--project {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
}

.activity-icon--achievement {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.activity-icon--social {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.activity-icon--time {
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.project-item {
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-item:hover .project-overlay {
  opacity: 1;
}

.project-info {
  padding: 1rem;
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.project-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-item .n-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.contact-value {
  color: var(--text-primary);
  text-decoration: none;
}

.contact-value:hover {
  color: var(--primary-color);
}

/* Edit Form */
.edit-form {
  padding: 1rem 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .profile-content {
    padding: 0 1rem;
  }

  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .profile-meta {
    justify-content: center;
  }

  .profile-actions {
    width: 100%;
    justify-content: center;
  }

  .about-stats {
    justify-content: center;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .profile-avatar img {
    width: 80px;
    height: 80px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-actions {
    flex-direction: column;
  }
}
</style>
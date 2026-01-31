<script setup lang="ts">
import ProfileHeader from './widgets/ProfileHeader.vue'
import AboutSection from './widgets/AboutSection.vue'
import SkillsSection from './widgets/SkillsSection.vue'
import SocialLinks from './widgets/SocialLinks.vue'
import RecentProjects from './widgets/RecentProjects.vue'
import ActivityFeed from './widgets/ActivityFeed.vue'
import EditProfileModal from './widgets/EditProfileModal.vue'
</script>

<template>
  <div class="user-profile">
    <!-- Profile Header -->
    <ProfileHeader />

    <!-- Main Content -->
    <div class="profile-content">
      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-column">
          <AboutSection />
          <SkillsSection />
          <SocialLinks />
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <RecentProjects />
          <ActivityFeed />
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal />
  </div>
</template>

<style scoped lang="scss">
.user-profile {
  padding: 0;
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
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
}

@media (max-width: 768px) {
  .profile-content {
    padding: 0 1rem 2rem;
  }
  
  .content-grid {
    gap: 1rem;
  }
  
  .left-column,
  .right-column {
    gap: 1rem;
  }
}
</style>

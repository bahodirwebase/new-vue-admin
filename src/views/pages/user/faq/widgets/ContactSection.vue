<template>
  <div class="contact-section">
    <div class="contact-card">
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-icon">
            <n-icon :component="HeadsetOutline" />
          </div>
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Our support team is here to help you 24/7.</p>
        </div>
        <div class="contact-buttons">
          <n-button type="primary" size="large" @click="contactSupport">
            <template #icon>
              <n-icon :component="MailOutline" />
            </template>
            Contact Support
          </n-button>
          <n-button size="large" @click="startLiveChat">
            <template #icon>
              <n-icon :component="ChatbubbleOutline" />
            </template>
            Live Chat
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  HeadsetOutline, 
  MailOutline, 
  ChatbubbleOutline 
} from '@vicons/ionicons5'
import { useFaqInteractions } from '../composables/useFaqInteractions'

const {
  contactSupport,
  startLiveChat
} = useFaqInteractions()
</script>

<style scoped>
.contact-section {
  margin-top: 3rem;
}

.contact-card {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  border-radius: 16px;
  padding: 3rem;
  color: white;
}

.contact-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.contact-info {
  flex: 1;
}

.contact-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.contact-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.contact-buttons .n-button:first-child {
  background: white;
  color: var(--primary-color);
}

.contact-buttons .n-button:last-child {
  background: transparent;
  color: white;
  border: 2px solid white;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
    text-align: center;
  }

  .contact-buttons {
    flex-direction: column;
    width: 100%;
  }

  .contact-buttons .n-button {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  ArchiveOutline,
  TrashOutline,
  StarOutline,
  CreateOutline,
  SearchOutline,
  CheckboxOutline,
  ArrowBackOutline,
  RefreshOutline,
  EllipsisVerticalOutline,
} from '@vicons/ionicons5'

import EmailSidebar from './widgets/EmailSidebar.vue'
import EmailList from './widgets/EmailList.vue'
import EmailContent from './widgets/EmailContent.vue'
import ComposeModal from './widgets/ComposeModal.vue'
import EmailSettings from './widgets/EmailSettings.vue'

import { useEmailStore } from './store'
import type { Email } from './store'
import { useBreakpoints } from '@/composables/useBreakpoints'

const emailStore = useEmailStore()
const { isDesktop } = useBreakpoints()

const selectedEmails = ref<number[]>([])
const searchQuery = ref('')
const showCompose = ref(false)
const showSettings = ref(false)

// Computed properties
const currentFolder = computed(() => emailStore.currentFolder)
const filteredEmails = computed(() => {
  let emails = emailStore.filteredEmails
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    emails = emails.filter((email: Email) => 
      email.subject.toLowerCase().includes(query) ||
      email.from.name.toLowerCase().includes(query) ||
      email.content.toLowerCase().includes(query)
    )
  }
  
  return emails
})

const selectedEmail = computed(() => emailStore.selectedEmail)
const isSelectionMode = computed(() => selectedEmails.value.length > 0)

// Methods
const selectEmail = (emailId: number) => {
  emailStore.selectEmail(emailId)
}

const toggleEmailSelection = (emailId: number) => {
  const index = selectedEmails.value.indexOf(emailId)
  if (index > -1) {
    selectedEmails.value.splice(index, 1)
  } else {
    selectedEmails.value.push(emailId)
  }
}

const selectAllEmails = () => {
  if (selectedEmails.value.length === filteredEmails.value.length) {
    selectedEmails.value = []
  } else {
    selectedEmails.value = filteredEmails.value.map((email: Email) => email.id)
  }
}

const markAsRead = () => {
  emailStore.markAsRead(selectedEmails.value)
  selectedEmails.value = []
}

const starEmails = () => {
  emailStore.starEmails(selectedEmails.value)
  selectedEmails.value = []
}

const archiveEmails = () => {
  emailStore.archiveEmails(selectedEmails.value)
  selectedEmails.value = []
}

const deleteEmails = () => {
  emailStore.deleteEmails(selectedEmails.value)
  selectedEmails.value = []
}

const refreshEmails = () => {
  emailStore.refreshEmails()
}

const openCompose = () => {
  showCompose.value = true
}

const goBack = () => {
  if (selectedEmail.value) {
    emailStore.selectedEmail = null
  } else {
    emailStore.goBack()
  }
}

onMounted(() => {
  emailStore.loadEmails()
})
</script>

<template>
  <div class="email-app">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Email</h1>
        <p class="page-subtitle">Advanced email client with inbox management, compose, and organizational features</p>
      </div>
      
      <div class="email-layout">
        <!-- Sidebar -->
        <aside class="email-sidebar" v-if="isDesktop">
          <EmailSidebar @compose="openCompose" />
        </aside>

        <!-- Main Email Area -->
        <main class="email-main">
          <!-- Header -->
          <header class="email-header">
            <div class="header-left d-flex align-center gap-3">
              <n-button
                v-if="!isDesktop || selectedEmail"
                quaternary
                @click="goBack"
              >
                <template #icon>
                  <n-icon>
                    <ArrowBackOutline />
                  </n-icon>
                </template>
              </n-button>
            
            <h2 class="header-title m-0">
              {{ emailStore.isStarredView ? 'Starred' : (currentFolder === 'inbox' ? 'Inbox' : currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1)) }}
            </h2>
          </div>

          <div class="header-center flex-1" v-if="isDesktop">
            <n-input
              v-model:value="searchQuery"
              placeholder="Search emails..."
              clearable
              class="search-input w-100"
            >
              <template #prefix>
                <n-icon>
                  <SearchOutline />
                </n-icon>
              </template>
            </n-input>
          </div>

          <div class="header-right">
            <n-space>
              <!-- Selection Mode Actions -->
              <template v-if="isSelectionMode">
                <n-button-group>
                  <n-button @click="selectAllEmails">
                    <template #icon>
                      <n-icon>
                        <CheckboxOutline v-if="selectedEmails.length === filteredEmails.length" />
                        <span v-else>□</span>
                      </n-icon>
                    </template>
                  </n-button>
                  <n-button @click="markAsRead" :disabled="!selectedEmails.length">
                    Mark as Read
                  </n-button>
                  <n-button @click="starEmails" :disabled="!selectedEmails.length">
                    <template #icon>
                      <n-icon>
                        <StarOutline />
                      </n-icon>
                    </template>
                  </n-button>
                  <n-button @click="archiveEmails" :disabled="!selectedEmails.length">
                    <template #icon>
                      <n-icon>
                        <ArchiveOutline />
                      </n-icon>
                    </template>
                  </n-button>
                  <n-button @click="deleteEmails" type="error" :disabled="!selectedEmails.length">
                    <template #icon>
                      <n-icon>
                        <TrashOutline />
                      </n-icon>
                    </template>
                  </n-button>
                </n-button-group>
              </template>

              <!-- Regular Actions -->
              <template v-else>
                <n-button @click="refreshEmails" quaternary>
                  <template #icon>
                    <n-icon>
                      <RefreshOutline />
                    </n-icon>
                  </template>
                </n-button>
                
                
                <n-button @click="showSettings = true" quaternary>
                  <template #icon>
                    <n-icon>
                      <EllipsisVerticalOutline />
                    </n-icon>
                  </template>
                </n-button>
              </template>
            </n-space>
          </div>
        </header>

        <!-- Mobile Search -->
        <div class="mobile-search p-4" v-if="!isDesktop">
          <n-input
            v-model:value="searchQuery"
            placeholder="Search emails..."
            clearable
          >
            <template #prefix>
              <n-icon>
                <SearchOutline />
              </n-icon>
            </template>
          </n-input>
        </div>

        <!-- Email Content Area -->
        <div class="email-content-area">
          <!-- Email List (shown when no email selected) -->
          <div v-if="!selectedEmail" class="email-list-container">
            <EmailList
              :emails="filteredEmails"
              :selected-emails="selectedEmails"
              :selected-email="selectedEmail"
              @select-email="selectEmail"
              @toggle-selection="toggleEmailSelection"
            />
          </div>

          <!-- Email Content (shown when email selected) -->
          <div v-else class="email-content-container">
            <EmailContent
              :email="selectedEmail"
              @close="emailStore.selectedEmail = null"
            />
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Compose Button -->
    <n-button
      v-if="!isDesktop"
      class="mobile-compose-btn"
      type="primary"
      circle
      size="large"
      @click="openCompose"
    >
      <template #icon>
        <n-icon>
          <CreateOutline />
        </n-icon>
      </template>
    </n-button>

    <!-- Modals -->
    <ComposeModal v-model:show="showCompose" />
    <EmailSettings v-model:show="showSettings" />
  </n-space>
</div>
</template>

<style lang="scss">
@use "./styles/email.scss";

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
<template>
  <div class="mention-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Mention">
            <n-space vertical :size="16">
              <n-mention v-model:value="basicValue" :options="basicOptions" placeholder="Type @ to mention..." />
              <n-p>Text: {{ basicValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Mention with Different Prefixes">
            <n-space vertical :size="16">
              <n-mention v-model:value="prefixValue" :options="prefixOptions" :prefix="['@', '#']"
                placeholder="Type @ or # to mention..." />
              <n-p>Text: {{ prefixValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Mention with Async Options">
            <n-space vertical :size="16">
              <n-mention v-model:value="asyncValue" :options="asyncOptions" :loading="asyncLoading"
                placeholder="Type @ to search users..." @search="handleSearch" />
              <n-p>Text: {{ asyncValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Mention with Custom Render">
            <n-space vertical :size="16">
              <n-mention v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
                placeholder="Type @ to mention..." />
              <n-p>Text: {{ customValue }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Mention in Textarea">
            <n-space vertical :size="16">
              <n-mention v-model:value="textareaValue" type="textarea" :options="basicOptions"
                placeholder="Type @ to mention in textarea..." :rows="4" />
              <n-p>Text: {{ textareaValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Mention with Validation">
            <n-space vertical :size="16">
              <n-mention v-model:value="validatedValue" :options="basicOptions"
                placeholder="Mention team members only..." :on-select="validateMention" />
              <n-p>Text: {{ validatedValue }}</n-p>
              <n-p v-if="validationMessage" :style="{ color: validationColor }">
                {{ validationMessage }}
              </n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Comment System">
            <n-space vertical :size="16">
              <div class="comment-system">
                <n-space vertical :size="12">
                  <span>Write a comment:</span>
                  <n-mention v-model:value="commentText" type="textarea" :options="userOptions" :prefix="['@', '#']"
                    :render-option="renderUserOption"
                    placeholder="Write your comment... Use @ to mention users, # for tags" :rows="3" />
                  <n-space :size="8">
                    <n-button type="primary" @click="postComment">
                      Post Comment
                    </n-button>
                    <n-button @click="clearComment">
                      Clear
                    </n-button>
                  </n-space>
                </n-space>
                <div class="comments-list">
                  <div v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-header">
                      <strong>{{ comment.author }}</strong>
                      <span class="comment-time">{{ comment.time }}</span>
                    </div>
                    <div class="comment-content" v-html="formatComment(comment.text)"></div>
                  </div>
                </div>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NAvatar } from 'naive-ui'

// Basic Mention
const basicValue = ref('')

const basicOptions = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Alice Brown', value: 'alice' }
]

// Mention with Different Prefixes
const prefixValue = ref('')

const prefixOptions = [
  // Users
  { label: 'John Doe', value: 'john', type: 'user' },
  { label: 'Jane Smith', value: 'jane', type: 'user' },
  // Tags
  { label: 'urgent', value: 'urgent', type: 'tag' },
  { label: 'important', value: 'important', type: 'tag' },
  { label: 'review', value: 'review', type: 'tag' }
]

// Mention with Async Options
const asyncValue = ref('')
const asyncOptions = ref<any[]>([])
const asyncLoading = ref(false)

const handleSearch = (query: string) => {
  if (!query) {
    asyncOptions.value = []
    return
  }

  asyncLoading.value = true
  setTimeout(() => {
    asyncOptions.value = [
      { label: `${query}_user1`, value: `${query}_user1` },
      { label: `${query}_user2`, value: `${query}_user2` },
      { label: `${query}_user3`, value: `${query}_user3` }
    ]
    asyncLoading.value = false
  }, 500)
}

// Mention with Custom Render
const customValue = ref('')

const customOptions = [
  { label: 'Admin', value: 'admin', role: 'Administrator', avatar: '👨‍💼' },
  { label: 'Developer', value: 'dev', role: 'Developer', avatar: '👨‍💻' },
  { label: 'Designer', value: 'designer', role: 'Designer', avatar: '👩‍🎨' }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('span', { style: 'font-size: 20px;' }, option.avatar),
    h('div', [
      h('div', { style: 'font-weight: 600;' }, option.label),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, option.role)
    ])
  ])
}

// Mention in Textarea
const textareaValue = ref('')

// Mention with Validation
const validatedValue = ref('')
const validationMessage = ref('')
const validationColor = ref('')

const validateMention = (option: any) => {
  if (option.value === 'john' || option.value === 'jane') {
    validationMessage.value = '✓ Valid team member'
    validationColor.value = '#18a058'
  } else {
    validationMessage.value = '✗ Not a team member'
    validationColor.value = '#d03050'
  }
}

// Real World Example - Comment System
const commentText = ref('')
const comments = ref([
  {
    id: 1,
    author: 'John Doe',
    text: 'Great work @jane! This is really #awesome',
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'Jane Smith',
    text: 'Thanks @john! Looking forward to the #review',
    time: '1 hour ago'
  }
])

const userOptions = [
  { label: 'John Doe', value: 'john', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
  { label: 'Jane Smith', value: 'jane', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
  { label: 'Bob Johnson', value: 'bob', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
  { label: 'Alice Brown', value: 'alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' }
]

const renderUserOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(NAvatar, {
      size: 24,
      src: option.avatar
    }),
    h('span', option.label)
  ])
}

const postComment = () => {
  if (commentText.value.trim()) {
    comments.value.unshift({
      id: Date.now(),
      author: 'You',
      text: commentText.value,
      time: 'Just now'
    })
    commentText.value = ''
  }
}

const clearComment = () => {
  commentText.value = ''
}

const formatComment = (text: string) => {
  return text
    .replace(/@(\w+)/g, '<span style="color: #6366f1; font-weight: 600;">@$1</span>')
    .replace(/#(\w+)/g, '<span style="color: #18a058; font-weight: 600;">#$1</span>')
}
</script>

<style scoped>
.mention-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 12px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.comment-system {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}

.comments-list {
  margin-top: 16px;
}

.comment-item {
  border-bottom: 1px solid var(--border-color);
  padding: 12px 0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-time {
  color: var(--text-secondary);
  font-size: 12px;
}

.comment-content {
  line-height: 1.5;
}
</style>

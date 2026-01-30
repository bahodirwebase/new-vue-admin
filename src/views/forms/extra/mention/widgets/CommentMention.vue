<template>
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
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NAvatar } from 'naive-ui'

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

<script setup lang="ts">
import {
  PersonCircleOutline,
  ShieldCheckmarkOutline,
  NotificationsOutline,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
</script>

<template>
  <n-card title="Collapse Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Accordion Mode
        </h3>
        <n-collapse accordion>
          <n-collapse-item title="Installation" name="1">
            <h4>Step 1: Install Dependencies</h4>
            <pre><code>npm install naive-ui @vicons/ionicons5</code></pre>
            <h4>Step 2: Configure</h4>
            <pre><code>import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)</code></pre>
          </n-collapse-item>
          <n-collapse-item title="Basic Usage" name="2">
            <p>
              Once installed, you can use any Naive UI component in your
              templates:
            </p>
            <pre><code>&lt;n-button&gt;Click me&lt;/n-button&gt;
&lt;n-card title="Hello"&gt;World&lt;/n-card&gt;</code></pre>
          </n-collapse-item>
          <n-collapse-item title="Advanced Features" name="3">
            <ul>
              <li>Theme customization</li>
              <li>Internationalization support</li>
              <li>Accessibility features</li>
              <li>Responsive design</li>
            </ul>
          </n-collapse-item>
        </n-collapse>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Custom Icons
        </h3>
        <n-collapse>
          <n-collapse-item name="1">
            <template #header>
              <div style="display: flex; align-items: center; gap: 8px">
                <n-icon :component="PersonCircleOutline" />
                <span>User Profile</span>
              </div>
            </template>
            Manage your personal information, avatar, and account
            settings.
          </n-collapse-item>
          <n-collapse-item name="2">
            <template #header>
              <div style="display: flex; align-items: center; gap: 8px">
                <n-icon :component="ShieldCheckmarkOutline" />
                <span>Security</span>
              </div>
            </template>
            Configure password, two-factor authentication, and security
            preferences.
          </n-collapse-item>
          <n-collapse-item name="3">
            <template #header>
              <div style="display: flex; align-items: center; gap: 8px">
                <n-icon :component="NotificationsOutline" />
                <span>Notifications</span>
              </div>
            </template>
            Set up email, push, and in-app notification preferences.
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
pre {
  background: var(--bg-secondary);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

code {
  font-family: "Courier New", monospace;
  font-size: 14px;
}
</style>

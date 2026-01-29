<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Collapse</h1>
        <p class="page-subtitle">
          Accordion components for building collapsible content sections
        </p>
      </div>

      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Collapse">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Default Collapse
                </h3>
                <n-collapse>
                  <n-collapse-item title="What is Vue.js?" name="1">
                    Vue.js is a progressive JavaScript framework for building
                    user interfaces. It's designed to be incrementally adoptable
                    and can easily integrate with other libraries.
                  </n-collapse-item>
                  <n-collapse-item title="How does Naive UI work?" name="2">
                    Naive UI is a Vue 3 component library that provides a
                    complete set of UI components with excellent TypeScript
                    support and modern design principles.
                  </n-collapse-item>
                  <n-collapse-item title="Why use TypeScript?" name="3">
                    TypeScript provides static typing, better IDE support, and
                    helps catch errors during development rather than at
                    runtime, making applications more maintainable.
                  </n-collapse-item>
                </n-collapse>
              </div>
            </n-space>
          </n-card>
          <n-card title="Collapse Features">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Nested Collapse
                </h3>
                <n-collapse>
                  <n-collapse-item title="Project Structure" name="1">
                    <n-collapse>
                      <n-collapse-item title="src/" name="1-1">
                        <n-collapse>
                          <n-collapse-item title="components/" name="1-1-1">
                            <p>Reusable Vue components</p>
                          </n-collapse-item>
                          <n-collapse-item title="views/" name="1-1-2">
                            <p>Page-level components</p>
                          </n-collapse-item>
                          <n-collapse-item title="utils/" name="1-1-3">
                            <p>Utility functions and helpers</p>
                          </n-collapse-item>
                        </n-collapse>
                      </n-collapse-item>
                      <n-collapse-item title="public/" name="1-2">
                        <p>Static assets and public files</p>
                      </n-collapse-item>
                    </n-collapse>
                  </n-collapse-item>
                </n-collapse>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Controlled Collapse
                </h3>
                <div class="control-buttons">
                  <n-space>
                    <n-button @click="expandAll">Expand All</n-button>
                    <n-button @click="collapseAll">Collapse All</n-button>
                    <n-button @click="toggleRandom">Toggle Random</n-button>
                  </n-space>
                </div>
                <n-collapse v-model:expanded-names="expandedNames">
                  <n-collapse-item title="First Panel" name="first">
                    This panel can be controlled programmatically.
                  </n-collapse-item>
                  <n-collapse-item title="Second Panel" name="second">
                    You can expand or collapse multiple panels at once.
                  </n-collapse-item>
                  <n-collapse-item title="Third Panel" name="third">
                    The state is managed by v-model binding.
                  </n-collapse-item>
                </n-collapse>
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
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
          <n-card title="Rich Content">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Statistics in Collapse
                </h3>
                <n-collapse>
                  <n-collapse-item title="User Statistics" name="stats">
                    <div class="stats-grid">
                      <div class="stat-item">
                        <n-statistic label="Total Users" :value="1234" />
                      </div>
                      <div class="stat-item">
                        <n-statistic label="Active Now" :value="567" />
                      </div>
                      <div class="stat-item">
                        <n-statistic label="New Today" :value="89" />
                      </div>
                      <div class="stat-item">
                        <n-statistic
                          label="Growth Rate"
                          :value="12.5"
                          suffix="%"
                        />
                      </div>
                    </div>
                  </n-collapse-item>
                  <n-collapse-item title="Progress Overview" name="progress">
                    <div class="progress-list">
                      <div class="progress-item">
                        <span>Frontend Development</span>
                        <n-progress :percentage="85" />
                      </div>
                      <div class="progress-item">
                        <span>Backend API</span>
                        <n-progress :percentage="70" />
                      </div>
                      <div class="progress-item">
                        <span>Database Design</span>
                        <n-progress :percentage="90" />
                      </div>
                    </div>
                  </n-collapse-item>
                </n-collapse>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  PersonCircleOutline,
  ShieldCheckmarkOutline,
  NotificationsOutline,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

const expandedNames = ref<string[]>([]);

const expandAll = () => {
  expandedNames.value = ["first", "second", "third"];
};

const collapseAll = () => {
  expandedNames.value = [];
};

const toggleRandom = () => {
  const allPanels = ["first", "second", "third"];
  const randomPanel = allPanels[Math.floor(Math.random() * allPanels.length)];

  if (expandedNames.value.includes(randomPanel)) {
    expandedNames.value = expandedNames.value.filter(
      (name) => name !== randomPanel
    );
  } else {
    expandedNames.value.push(randomPanel);
  }
};
</script>

<style scoped>

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

.control-buttons {
  margin-bottom: 16px;
}

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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.stat-item {
  text-align: center;
}

.progress-list {
  padding: 16px 0;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.progress-item span {
  min-width: 120px;
  font-weight: 500;
}


</style>

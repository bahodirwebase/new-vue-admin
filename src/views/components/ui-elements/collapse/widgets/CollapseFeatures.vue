<script setup lang="ts">
import { ref } from "vue";

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

<template>
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
</template>

<style scoped>
.control-buttons {
  margin-bottom: 16px;
}
</style>

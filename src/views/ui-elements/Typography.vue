<template>
  <div class="typography-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Typography</h1>
        <p class="page-subtitle">Text styles and typography examples</p>
      </div>

      <n-card title="Headings">
        <n-space vertical :size="16">
          <h1 class="heading-1">Heading 1 - Main Title</h1>
          <h2 class="heading-2">Heading 2 - Section Title</h2>
          <h3 class="heading-3">Heading 3 - Subsection Title</h3>
          <h4 class="heading-4">Heading 4 - Component Title</h4>
          <h5 class="heading-5">Heading 5 - Small Title</h5>
          <h6 class="heading-6">Heading 6 - Micro Title</h6>
        </n-space>
      </n-card>

      <n-card title="Text Styles">
        <n-space vertical :size="16">
          <div>
            <h4>Regular Text</h4>
            <p class="text-regular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div>
            <h4>Text Secondary</h4>
            <p class="text-secondary">
              This is secondary text with reduced opacity for less important information.
            </p>
          </div>

          <div>
            <h4>Text Tertiary</h4>
            <p class="text-tertiary">
              This is tertiary text with even more reduced opacity for supplementary information.
            </p>
          </div>

          <div>
            <h4>Text Success</h4>
            <p class="text-success">
              ✓ Success message with green color
            </p>
          </div>

          <div>
            <h4>Text Warning</h4>
            <p class="text-warning">
              ⚠ Warning message with orange color
            </p>
          </div>

          <div>
            <h4>Text Error</h4>
            <p class="text-error">
              ✗ Error message with red color
            </p>
          </div>

          <div>
            <h4>Text Info</h4>
            <p class="text-info">
              ℹ Info message with blue color
            </p>
          </div>
        </n-space>
      </n-card>

      <n-card title="Font Sizes">
        <n-space vertical :size="12">
          <div class="text-xs">Extra Small Text - 12px</div>
          <div class="text-sm">Small Text - 14px</div>
          <div class="text-base">Base Text - 16px</div>
          <div class="text-lg">Large Text - 18px</div>
          <div class="text-xl">Extra Large Text - 20px</div>
          <div class="text-2xl">2X Large Text - 24px</div>
          <div class="text-3xl">3X Large Text - 30px</div>
          <div class="text-4xl">4X Large Text - 36px</div>
        </n-space>
      </n-card>

      <n-card title="Font Weights">
        <n-space vertical :size="12">
          <div class="font-thin">Thin Font Weight (100)</div>
          <div class="font-light">Light Font Weight (300)</div>
          <div class="font-normal">Normal Font Weight (400)</div>
          <div class="font-medium">Medium Font Weight (500)</div>
          <div class="font-semibold">Semibold Font Weight (600)</div>
          <div class="font-bold">Bold Font Weight (700)</div>
          <div class="font-extrabold">Extra Bold Font Weight (800)</div>
          <div class="font-black">Black Font Weight (900)</div>
        </n-space>
      </n-card>

      <n-card title="Text Transformations">
        <n-space vertical :size="12">
          <div class="text-uppercase">Uppercase Text</div>
          <div class="text-lowercase">LOWERCASE TEXT</div>
          <div class="text-capitalize">capitalized text</div>
          <div class="text-normal-case">Normal Case Text</div>
        </n-space>
      </n-card>

      <n-card title="Text Alignment">
        <n-space vertical :size="12">
          <div class="text-left">Left aligned text</div>
          <div class="text-center">Center aligned text</div>
          <div class="text-right">Right aligned text</div>
          <div class="text-justify">Justified text that spans multiple lines and demonstrates how text justification works when there is enough content to wrap across multiple lines. The text is distributed evenly across the line.</div>
        </n-space>
      </n-card>

      <n-card title="Text Decorations">
        <n-space vertical :size="12">
          <div class="text-underline">Underlined Text</div>
          <div class="text-line-through">Line Through Text</div>
          <div class="text-overline">Overline Text</div>
          <div class="text-no-decoration">No Decoration Text</div>
        </n-space>
      </n-card>

      <n-card title="Lists">
        <n-grid :cols="gridCols" :x-gap="24" :y-gap="16">
          <n-grid-item>
            <h4>Unordered List</h4>
            <ul class="list-disc">
              <li>First item</li>
              <li>Second item
                <ul class="list-circle">
                  <li>Nested item 1</li>
                  <li>Nested item 2</li>
                </ul>
              </li>
              <li>Third item</li>
            </ul>
          </n-grid-item>
          
          <n-grid-item>
            <h4>Ordered List</h4>
            <ol class="list-decimal">
              <li>First step</li>
              <li>Second step
                <ol class="list-alpha">
                  <li>Sub-step A</li>
                  <li>Sub-step B</li>
                </ol>
              </li>
              <li>Third step</li>
            </ol>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Code and Inline Elements">
        <n-space vertical :size="16">
          <div>
            <h4>Inline Code</h4>
            <p>Use the <code class="inline-code">console.log()</code> function to debug your code.</p>
          </div>

          <div>
            <h4>Keyboard Input</h4>
            <p>Press <kbd class="keyboard">Ctrl</kbd> + <kbd class="keyboard">C</kbd> to copy.</p>
          </div>

          <div>
            <h4>Marked Text</h4>
            <p>This is <mark class="marked">highlighted text</mark> that stands out.</p>
          </div>

          <div>
            <h4>Deleted and Inserted Text</h4>
            <p><del class="deleted">Old text</del> <ins class="inserted">New text</ins></p>
          </div>

          <div>
            <h4>Block Code</h4>
            <pre class="block-code"><code>function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));</code></pre>
          </div>
        </n-space>
      </n-card>

      <n-card title="Blockquote">
        <blockquote class="blockquote">
          <p class="blockquote-text">
            "The best way to predict the future is to invent it."
          </p>
          <footer class="blockquote-footer">— Alan Kay</footer>
        </blockquote>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)

const gridCols = computed(() => {
  if (windowWidth.value < 480) return 1
  if (windowWidth.value < 768) return 2
  return 2
})

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.typography-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

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

/* Headings */
.heading-1 {
  font-family: var(--font-secondary);
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
}

.heading-2 {
  font-family: var(--font-secondary);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  margin: 0;
}

.heading-3 {
  font-family: var(--font-secondary);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  margin: 0;
}

.heading-4 {
  font-family: var(--font-secondary);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  margin: 0;
}

.heading-5 {
  font-family: var(--font-secondary);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-primary);
  margin: 0;
}

.heading-6 {
  font-family: var(--font-secondary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-primary);
  margin: 0;
}

/* Text Colors */
.text-regular {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-tertiary {
  color: var(--text-tertiary);
}

.text-success {
  color: var(--color-success);
}

.text-warning {
  color: var(--color-warning);
}

.text-error {
  color: var(--color-error);
}

.text-info {
  color: var(--color-info);
}

/* Font Sizes */
.text-xs {
  font-size: 12px;
  line-height: 1.4;
}

.text-sm {
  font-size: 14px;
  line-height: 1.4;
}

.text-base {
  font-size: 16px;
  line-height: 1.5;
}

.text-lg {
  font-size: 18px;
  line-height: 1.5;
}

.text-xl {
  font-size: 20px;
  line-height: 1.5;
}

.text-2xl {
  font-size: 24px;
  line-height: 1.5;
}

.text-3xl {
  font-size: 30px;
  line-height: 1.4;
}

.text-4xl {
  font-size: 36px;
  line-height: 1.3;
}

/* Font Weights */
.font-thin {
  font-weight: 100;
}

.font-light {
  font-weight: 300;
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.font-extrabold {
  font-weight: 800;
}

.font-black {
  font-weight: 900;
}

/* Text Transform */
.text-uppercase {
  text-transform: uppercase;
}

.text-lowercase {
  text-transform: lowercase;
}

.text-capitalize {
  text-transform: capitalize;
}

.text-normal-case {
  text-transform: none;
}

/* Text Alignment */
.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-justify {
  text-align: justify;
}

/* Text Decoration */
.text-underline {
  text-decoration: underline;
}

.text-line-through {
  text-decoration: line-through;
}

.text-overline {
  text-decoration: overline;
}

.text-no-decoration {
  text-decoration: none;
}

/* Lists */
.list-disc {
  list-style-type: disc;
  padding-left: 20px;
}

.list-circle {
  list-style-type: circle;
  padding-left: 20px;
}

.list-decimal {
  list-style-type: decimal;
  padding-left: 20px;
}

.list-alpha {
  list-style-type: lower-alpha;
  padding-left: 20px;
}

/* Code and Inline Elements */
.inline-code {
  background-color: var(--bg-tertiary);
  color: var(--color-error);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.keyboard {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  box-shadow: 0 2px 0 var(--border-color);
}

.marked {
  background-color: #fef3c7;
  color: #92400e;
  padding: 2px 4px;
  border-radius: 4px;
}

.deleted {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.inserted {
  text-decoration: underline;
  color: var(--color-success);
}

.block-code {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* Blockquote */
.blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
}

.blockquote-text {
  font-size: 18px;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.blockquote-footer {
  font-size: 14px;
  color: var(--text-secondary);
  font-style: normal;
}

/* Dark theme adjustments */
[data-theme="dark"] .marked {
  background-color: #451a03;
  color: #fed7aa;
}

[data-theme="dark"] .keyboard {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  box-shadow: 0 2px 0 var(--border-color);
}
</style>
